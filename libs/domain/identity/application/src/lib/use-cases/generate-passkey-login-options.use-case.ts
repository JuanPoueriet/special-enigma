import { Injectable, Inject } from '@nestjs/common';
import { EntityNotFoundException } from "@virtex/kernel-exceptions";
import { UserRepository, WebAuthnService } from '@virtex/domain-identity-domain';
import { UnauthorizedException } from '@virtex/kernel-exceptions';

@Injectable()
export class GeneratePasskeyLoginOptionsUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(WebAuthnService) private readonly webAuthnService: WebAuthnService
  ) {}

  async execute(email?: string) {
    let allowCredentials = undefined;

    if (email) {
      const user = await this.userRepository.findByEmail(email);
      if (user && user.authenticators.length > 0) {
        allowCredentials = user.authenticators.map(auth => ({
          id: auth.credentialID,
          type: 'public-key' as const,
          transports: auth.transports as any,
        }));
      }
    }

    return this.webAuthnService.generateAuthenticationOptions({
      allowCredentials,
      userVerification: 'preferred',
    });
  }
}
