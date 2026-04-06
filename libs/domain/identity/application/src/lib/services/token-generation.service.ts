import { Injectable, Inject, Optional } from '@nestjs/common';
import * as crypto from 'crypto';
import { SessionRepository, AuthService, CachePort, User, Session } from '@virtex/domain-identity-domain';
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from '@virtex/domain-subscription-domain';

export interface TokenGenerationResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  session: Session;
}

@Injectable()
export class TokenGenerationService {
  constructor(
    @Inject(SessionRepository) private readonly sessionRepository: SessionRepository,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(CachePort) private readonly cachePort: CachePort,
    @Optional() @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository?: SubscriptionRepository
  ) {}

  async createSessionAndTokens(
    user: User,
    context: { ip: string; userAgent: string },
    riskScore: number = 0,
    mfaVerified = false
  ): Promise<TokenGenerationResult> {
    const refreshTokenSecret = crypto.randomBytes(32).toString('hex');
    const refreshTokenHash = crypto.createHash('sha256').update(refreshTokenSecret).digest('hex');

    const SESSION_TTL = 7 * 24 * 3600; // 7 days in seconds
    const expiresAt = new Date(Date.now() + SESSION_TTL * 1000);

    const session = new Session(user, context.ip, context.userAgent, expiresAt, riskScore);
    session.currentRefreshTokenHash = refreshTokenHash;
    await this.sessionRepository.save(session);

    await this.cachePort.set(`session:${session.id}`, 'valid', SESSION_TTL);

    const subscription = this.subscriptionRepository
      ? await this.subscriptionRepository.findByTenantId(user.company.id)
      : undefined;
    const entitlements = subscription?.getPlan()?.features || [];
    const subscriptionVersion = subscription?.updatedAt?.getTime().toString() || '1';

    const accessToken = await this.authService.generateToken({
      sub: user.id,
      tenantId: user.company.id,
      sessionId: session.id,
      amr: mfaVerified ? ['pwd', 'mfa'] : ['pwd'],
    }, { tokenType: 'access', subject: user.id });

    const refreshToken = await this.authService.generateToken({
      sub: user.id,
      sessionId: session.id,
      secret: refreshTokenSecret,
    }, { tokenType: 'refresh', subject: user.id, expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes
      session
    };
  }

  async rotateSessionToken(session: Session, user: User, mfaVerified = false): Promise<TokenGenerationResult> {
    const refreshTokenSecret = crypto.randomBytes(32).toString('hex');
    const refreshTokenHash = crypto.createHash('sha256').update(refreshTokenSecret).digest('hex');

    const SESSION_TTL = 7 * 24 * 3600;
    session.expiresAt = new Date(Date.now() + SESSION_TTL * 1000);
    session.currentRefreshTokenHash = refreshTokenHash;

    await this.sessionRepository.save(session);
    await this.cachePort.set(`session:${session.id}`, 'valid', SESSION_TTL);

    const subscription = this.subscriptionRepository
      ? await this.subscriptionRepository.findByTenantId(user.company.id)
      : undefined;
    const entitlements = subscription?.getPlan()?.features || [];
    const subscriptionVersion = subscription?.updatedAt?.getTime().toString() || '1';

    const accessToken = await this.authService.generateToken({
      sub: user.id,
      tenantId: user.company.id,
      sessionId: session.id,
      amr: mfaVerified ? ['pwd', 'mfa'] : ['pwd'],
    }, { tokenType: 'access', subject: user.id });

    const refreshToken = await this.authService.generateToken({
      sub: user.id,
      sessionId: session.id,
      secret: refreshTokenSecret,
    }, { tokenType: 'refresh', subject: user.id, expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900,
      session
    };
  }
}
