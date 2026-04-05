import { Injectable, Inject } from '@nestjs/common';
import { UserRepository, UserAuthenticator, WebAuthnService, AuditLogRepository, AuditLog } from '@virtex/domain-identity-domain';
import { UnauthorizedException } from '@virtex/kernel-exceptions';
import { RegistrationResponseJSON } from '@simplewebauthn/types';

@Injectable()
export class VerifyPasskeyRegistrationUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(WebAuthnService) private readonly webAuthnService: WebAuthnService,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
  ) {}

  async execute(userId: string, currentOptions: any, body: RegistrationResponseJSON) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const verification = await this.webAuthnService.verifyRegistrationResponse({
      response: body,
      expectedChallenge: currentOptions.challenge,
    });

    if (verification.verified && verification.registrationInfo) {
      const { credentialID, credentialPublicKey, counter, credentialDeviceType, credentialBackedUp } = verification.registrationInfo;

      const newAuthenticator = new UserAuthenticator(
        credentialID,
        credentialPublicKey,
        counter,
        credentialDeviceType,
        credentialBackedUp
      );

      user.authenticators.push(newAuthenticator);
      await this.userRepository.save(user);

      await this.auditLogRepository.save(new AuditLog('PASSKEY_REGISTERED', userId, { deviceType: credentialDeviceType }));

      return { verified: true };
    }

    await this.auditLogRepository.save(new AuditLog('PASSKEY_REGISTRATION_FAILED', userId, {}));
    return { verified: false };
  }
}
