import { DomainException } from '@virtex/shared-util-server-server-config';
import { Injectable, Inject } from '@nestjs/common';
import { BadRequestException } from '@virtex/kernel-exceptions';
import { AuthService, NotificationService, UserRepository, CachePort, RecaptchaPort, AuditLogRepository, AuditLog } from '@virtex/domain-identity-domain';
import { InitiateSignupDto } from '@virtex/domain-identity-contracts';

@Injectable()
export class InitiateSignupUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(NotificationService) private readonly notificationService: NotificationService,
    @Inject(CachePort) private readonly cachePort: CachePort,
    @Inject(RecaptchaPort) private readonly recaptchaService: RecaptchaPort,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
  ) {}

  async execute(dto: InitiateSignupDto): Promise<void> {
    if (!(await this.recaptchaService.verify(dto.recaptchaToken, 'signup'))) {
      throw new BadRequestException('reCAPTCHA verification failed');
    }

    const cooldownKey = `signup-cooldown:${dto.email}`;
    const attemptsKey = `signup-attempts:${dto.email}`;

    const isCooldown = await this.cachePort.get(cooldownKey);
    if (isCooldown) {
      throw new BadRequestException('Too many signup attempts. Please try again later.');
    }

    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
        await this.auditLogRepository.save(new AuditLog('SIGNUP_FAILED_USER_EXISTS', undefined, { email: dto.email }));
        throw new DomainException('User already exists', 'CONFLICT');
    }

    const attemptsStr = await this.cachePort.get(attemptsKey);
    const attempts = attemptsStr ? parseInt(attemptsStr, 10) : 0;

    if (attempts >= 3) {
      await this.cachePort.set(cooldownKey, 'true', 3600); // 1 hour cooldown
      await this.cachePort.del(attemptsKey);
      throw new BadRequestException('Too many attempts. Account creation suspended for 1 hour.');
    }

    const passwordHash = await this.authService.hashPassword(dto.password);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const payload = JSON.stringify({
        passwordHash,
        otp,
        timestamp: Date.now()
    });

    await this.cachePort.set(`signup:${dto.email}`, payload, 600);
    await this.cachePort.set(attemptsKey, (attempts + 1).toString(), 600);

    await this.auditLogRepository.save(new AuditLog('SIGNUP_INITIATED', undefined, { email: dto.email }));

    await this.notificationService.sendOtp(dto.email, otp);
  }
}
