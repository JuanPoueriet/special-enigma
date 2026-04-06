import { Injectable, Inject } from '@nestjs/common';
import { CachePort, SessionRepository, AuditLogRepository, AuditLog } from '@virtex/domain-identity-domain';
import { JwtTokenService } from '@virtex/kernel-auth';

@Injectable()
export class LogoutUserUseCase {
  constructor(
    @Inject(CachePort) private readonly cachePort: CachePort,
    @Inject(SessionRepository) private readonly sessionRepository: SessionRepository,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(sessionId: string, jtis?: string[]): Promise<void> {
    const session = await this.sessionRepository.findById(sessionId);
    if (session) {
      const userId = typeof session.user === 'string' ? session.user : session.user.id;
      await this.auditLogRepository.save(new AuditLog('LOGOUT_SUCCESS', userId, { sessionId: session.id, ip: session.ipAddress }));

      await this.cachePort.del(`session:${sessionId}`);
      await this.sessionRepository.delete(sessionId);

      if (jtis) {
        for (const jti of jtis) {
          await this.jwtTokenService.revokeToken(jti);
        }
      }
    }
  }
}
