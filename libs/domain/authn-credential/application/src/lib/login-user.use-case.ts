
import { Injectable, Inject } from '@nestjs/common';
import { LoginUserDto, LoginResponseDto } from '@virtex/domain-authn-credential-contracts';
import { CredentialRepository, AuthService, RecaptchaPort } from '@virtex/domain-authn-credential-domain';
import { ForbiddenException, UnauthorizedException, BadRequestException } from '@virtex/kernel-exceptions';

export interface LoginContext {
  ip: string;
  userAgent: string;
}

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('CredentialRepository') private readonly credentialRepository: CredentialRepository,
    @Inject('AuthService') private readonly authService: AuthService,
    @Inject('RecaptchaPort') private readonly recaptchaService: RecaptchaPort,
    @Inject('IdentityServiceClient') private readonly identityServiceClient: any,
    @Inject('TokenServiceClient') private readonly tokenServiceClient: any,
  ) {}

  async execute(dto: LoginUserDto, context: LoginContext = { ip: 'unknown', userAgent: 'unknown' }): Promise<LoginResponseDto> {
    if (!(await this.recaptchaService.verify(dto.recaptchaToken, 'login'))) {
      throw new BadRequestException('reCAPTCHA verification failed');
    }

    const credential = await this.credentialRepository.findByEmail(dto.email);

    if (!credential) {
      // In a real decoupled scenario, we might still want to emit an event or call an audit service
      throw new UnauthorizedException('Invalid credentials');
    }

    if (credential.lockedUntil && credential.lockedUntil > new Date()) {
      throw new ForbiddenException(`Account locked until ${credential.lockedUntil.toISOString()}`);
    }

    const isPasswordValid = await this.authService.verifyPassword(dto.password, credential.passwordHash);

    if (!isPasswordValid) {
      credential.failedLoginAttempts += 1;
      if (credential.failedLoginAttempts >= 3) {
        credential.lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
      }
      await this.credentialRepository.save(credential);
      throw new UnauthorizedException('Invalid credentials');
    }

    // Call Identity Profile Service to check user status and role
    const userProfile = await this.identityServiceClient.getUserProfile(credential.userId);
    if (!userProfile.isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    // Risk check (placeholder for calling risk-adaptive-auth-service)
    const riskScore = 0;

    credential.failedLoginAttempts = 0;
    credential.lockedUntil = undefined;
    await this.credentialRepository.save(credential);

    // Call Token Service to issue tokens
    const tokens = await this.tokenServiceClient.issueTokens({
      userId: credential.userId,
      email: credential.email,
      role: userProfile.role,
      tenantId: userProfile.companyId,
      riskScore
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn,
      mfaRequired: false
    };
  }
}
