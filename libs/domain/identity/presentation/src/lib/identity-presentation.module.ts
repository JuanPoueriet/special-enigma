import { Module } from '@nestjs/common';
import { AuthSessionController } from './iam/auth-session.controller';
import { AuthSecurityController } from './iam/auth-security.controller';
import { AuthMfaController } from './iam/auth-mfa.controller';
import { AuthSocialController } from './iam/auth-social.controller';
import { AuthRecoveryController } from './iam/auth-recovery.controller';
import { AuthPasskeyController } from './iam/auth-passkey.controller';
import { AuthOnboardingController } from './onboarding/auth-onboarding.controller';
import { UserProfileController } from './user-profile/user-profile.controller';
import { UserAdminController } from './iam/user-admin.controller';
import { UserSecurityController } from './iam/user-security.controller';
import { LocalizationController } from './user-profile/localization.controller';
import { CommonController } from './iam/common.controller';
import { TenantController } from './iam/tenant.controller';
import { IdentityInfrastructureModule } from '@virtex/domain-identity-infrastructure';
import { AuthModule } from '@virtex/kernel-auth';
import { IdentityResolver } from './graphql/identity.resolver';
import { RequestContextService } from './services/request-context.service';
import { CookiePolicyService } from '@virtex/kernel-auth';

@Module({
  imports: [IdentityInfrastructureModule, AuthModule],
  controllers: [
    AuthSessionController,
    AuthSecurityController,
    AuthMfaController,
    AuthSocialController,
    AuthRecoveryController,
    AuthPasskeyController,
    AuthOnboardingController,
    UserProfileController,
    UserAdminController,
    UserSecurityController,
    LocalizationController,
    CommonController,
    TenantController
  ],
  providers: [IdentityResolver, RequestContextService, CookiePolicyService],
  exports: [],
})
export class IdentityPresentationModule {}
