import { Injectable, Inject } from '@nestjs/common';
import { CachePort, SessionRepository, AuditLogRepository, AuditLog } from '@virtex/domain-identity-domain';

@Injectable()
export class LogoutUserUseCase {
  constructor(
    @Inject(CachePort) private readonly cachePort: CachePort,
    @Inject(SessionRepository) private readonly sessionRepository: SessionRepository,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
  ) {}

  async execute(sessionId: string): Promise<void> {
    const session = await this.sessionRepository.findById(sessionId);
    if (session) {
      const userId = typeof session.user === 'string' ? session.user : session.user.id;
      await this.auditLogRepository.save(new AuditLog('LOGOUT_SUCCESS', userId, { sessionId: session.id, ip: session.ipAddress }));

      await this.cachePort.del(`session:${sessionId}`);
      await this.sessionRepository.delete(sessionId);
    }
  }
}
