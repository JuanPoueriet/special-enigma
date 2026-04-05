import { Injectable, Inject } from '@nestjs/common';
import { UnauthorizedException } from '@virtex/kernel-exceptions';
import { SessionRepository, CachePort, AuditLogRepository, AuditLog } from '@virtex/domain-identity-domain';

@Injectable()
export class RevokeSessionUseCase {
  constructor(
    @Inject(SessionRepository) private readonly sessionRepository: SessionRepository,
    @Inject(CachePort) private readonly cachePort: CachePort,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
  ) {}

  async execute(userId: string, sessionId: string): Promise<void> {
    const session = await this.sessionRepository.findById(sessionId);
    if (!session || session.user.id !== userId) {
      throw new UnauthorizedException('Session not found or not owned by user');
    }

    await this.auditLogRepository.save(new AuditLog('SESSION_REVOKED', userId, { sessionId: session.id, ip: session.ipAddress, revokedBy: userId }));

    await this.cachePort.del(`session:${sessionId}`);
    await this.sessionRepository.delete(sessionId);
  }
}
