import { Injectable, Inject } from '@nestjs/common';
import { BadRequestException } from '@virtex/kernel-exceptions';
import { UserRepository, AuthService, AuditLogRepository, AuditLog, SessionRepository, CachePort } from '@virtex/domain-identity-domain';
import { ResetPasswordDto } from '@virtex/domain-identity-contracts';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
    @Inject(SessionRepository) private readonly sessionRepository: SessionRepository,
    @Inject(CachePort) private readonly cachePort: CachePort,
  ) {}

  async execute(dto: ResetPasswordDto, context: { ip: string, userAgent: string }): Promise<void> {
    /**
     * To find the user by reset token without exposing the plain token in the database,
     * we use a deterministic SHA-256 hash for lookup. This ensures that even if the
     * database is compromised, the original tokens cannot be easily recovered.
     */
    const tokenHash = this.authService.hashToken(dto.token);
    const user = await this.userRepository.findByResetPasswordToken(tokenHash);

    if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired reset password token');
    }

    const passwordHash = await this.authService.hashPassword(dto.password);
    user.passwordHash = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await this.userRepository.save(user);

    // Invalidate all active sessions for this user for security
    const sessions = await this.sessionRepository.findByUserId(user.id);
    for (const session of sessions) {
      await this.cachePort.del(`session:${session.id}`);
    }
    await this.sessionRepository.deleteByUserId(user.id);

    await this.auditLogRepository.save(new AuditLog('PASSWORD_RESET_COMPLETED', user.id, context));
  }
}
