import { Injectable, Inject } from '@nestjs/common';
import { SessionRepository, CachePort, AuditLogRepository, AuditLog } from '@virtex/domain-identity-domain';

@Injectable()
export class ForceLogoutUseCase {
  constructor(
    @Inject(SessionRepository) private readonly sessionRepository: SessionRepository,
    @Inject(CachePort) private readonly cachePort: CachePort,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const sessions = await this.sessionRepository.findByUserId(userId);
    for (const session of sessions) {
      await this.cachePort.del(`session:${session.id}`);
    }
    await this.sessionRepository.deleteByUserId(userId);

    await this.auditLogRepository.save(new AuditLog('FORCE_LOGOUT', userId, { reason: 'Administrative action' }));
  }
}
