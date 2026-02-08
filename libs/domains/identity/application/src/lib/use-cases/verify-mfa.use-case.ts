import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { VerifyMfaDto } from '../dto/verify-mfa.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import {
  UserRepository, SessionRepository, Session, AuditLogRepository, AuditLog,
  AuthService
} from '@virteex-erp/identity-domain';

export interface VerifyMfaContext {
  ip: string;
  userAgent: string;
}

@Injectable()
export class VerifyMfaUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(SessionRepository) private readonly sessionRepository: SessionRepository,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository
  ) {}

  async execute(dto: VerifyMfaDto, context: VerifyMfaContext = { ip: 'unknown', userAgent: 'unknown' }): Promise<LoginResponseDto> {
    // 1. Validate Token
    let payload: any;
    try {
        payload = await this.authService.verifyToken(dto.tempToken);
    } catch (e) {
        throw new UnauthorizedException('Invalid or expired token');
    }

    if (!payload.partial || !payload.sub) {
        throw new UnauthorizedException('Invalid token type');
    }

    const userId = payload.sub;
    const user = await this.userRepository.findById(userId); // Assuming findById exists in Repo port

    if (!user) {
        throw new UnauthorizedException('User not found');
    }

    // 2. Validate Code
    if (!user.mfaSecret) {
        throw new UnauthorizedException('MFA not configured for this account.');
    }

    const isValid = this.authService.verifyMfaToken(dto.code, user.mfaSecret);

    if (!isValid) {
        await this.auditLogRepository.save(new AuditLog('MFA_FAILED', user.id, { ip: context.ip }));
        throw new UnauthorizedException('Invalid verification code');
    }

    // 3. Create Session
    const riskScore = payload.riskScore || 0;
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour
    const session = new Session(user, context.ip, context.userAgent, expiresAt, riskScore);
    await this.sessionRepository.save(session);

    // 4. Generate Full Tokens
    const token = await this.authService.generateToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      companyId: user.company.id,
      country: user.country,
      sessionId: session.id
      // No 'partial' flag
    });

    const refreshToken = `refresh-${session.id}`;

    await this.auditLogRepository.save(new AuditLog('MFA_SUCCESS', user.id, { ip: context.ip, sessionId: session.id }));

    return {
      accessToken: token,
      refreshToken: refreshToken,
      expiresIn: 3600,
      mfaRequired: false
    };
  }
}
