import { Injectable, Inject } from '@nestjs/common';
import { UserRepository, CachePort, AuditLogRepository, AuditLog } from '@virtex/domain-identity-domain';
import { UnauthorizedException } from '@virtex/kernel-exceptions';

@Injectable()
export class Verify2faEmailVerificationUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(CachePort) private readonly cachePort: CachePort,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
  ) {}

  async execute(userId: string, code: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const storedCode = await this.cachePort.get(`2fa:email:${user.id}`);

    if (!storedCode || storedCode !== code) {
        await this.auditLogRepository.save(new AuditLog('2FA_EMAIL_VERIFICATION_FAILED', userId, {}));
        throw new UnauthorizedException('Invalid or expired verification code');
    }

    await this.auditLogRepository.save(new AuditLog('2FA_EMAIL_VERIFICATION_SUCCESS', userId, {}));

    await this.cachePort.del(`2fa:email:${user.id}`);
  }
}
