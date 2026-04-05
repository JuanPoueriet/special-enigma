import { Injectable, Inject } from '@nestjs/common';
import { UserRepository, SessionRepository, CachePort, AuditLogRepository, AuditLog } from '@virtex/domain-identity-domain';
import { DomainException } from '@virtex/kernel-exceptions';

@Injectable()
export class BlockUserUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(SessionRepository) private readonly sessionRepository: SessionRepository,
    @Inject(CachePort) private readonly cachePort: CachePort,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new DomainException('User not found', 'ENTITY_NOT_FOUND');
    }

    user.isActive = false;
    user.status = 'BLOCKED';
    await this.userRepository.save(user);

    await this.auditLogRepository.save(new AuditLog('USER_BLOCKED', userId, { reason: 'Administrative action' }));

    // Revoke all sessions
    const sessions = await this.sessionRepository.findByUserId(userId);
    for (const session of sessions) {
      await this.cachePort.del(`session:${session.id}`);
    }
    await this.sessionRepository.deleteByUserId(userId);
  }
}
