import { DomainException } from '@virtex/kernel-exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { AuthService, CachePort, AuditLogRepository, AuditLog } from '@virtex/domain-identity-domain';
import { VerifySignupDto, VerifySignupResponse } from '@virtex/domain-identity-contracts';

@Injectable()
export class VerifySignupUseCase {
  constructor(
    @Inject(CachePort) private readonly cachePort: CachePort,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
  ) {}

  async execute(dto: VerifySignupDto): Promise<VerifySignupResponse> {
    const key = `signup:${dto.email}`;
    const payloadStr = await this.cachePort.get(key);

    if (!payloadStr) {
      throw new DomainException('OTP expired or invalid', 'UNAUTHORIZED');
    }

    let payload: { otp: string; passwordHash: string; timestamp: number };
    try {
      payload = JSON.parse(payloadStr);
    } catch {
      throw new DomainException('Invalid payload', 'UNAUTHORIZED');
    }

    if (payload.otp !== dto.otp) {
        await this.auditLogRepository.save(new AuditLog('SIGNUP_OTP_FAILED', undefined, { email: dto.email }));
        throw new DomainException('Invalid OTP', 'BAD_REQUEST');
    }

    await this.cachePort.set(key, payloadStr, 3600);

    await this.auditLogRepository.save(new AuditLog('SIGNUP_OTP_SUCCESS', undefined, { email: dto.email }));

    const onboardingToken = await this.authService.generateToken({
        email: dto.email,
        scope: 'onboarding',
        verified: true
    });

    return { onboardingToken };
  }
}
