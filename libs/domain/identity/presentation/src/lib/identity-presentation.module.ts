import { Module } from '@nestjs/common';
import { AuthSessionController } from './controllers/auth-session.controller';
import { AuthSecurityController } from './controllers/auth-security.controller';
import { AuthMfaController } from './controllers/auth-mfa.controller';
import { AuthSocialController } from './controllers/auth-social.controller';
import { AuthRecoveryController } from './controllers/auth-recovery.controller';
import { AuthPasskeyController } from './controllers/auth-passkey.controller';
import { AuthOnboardingController } from './controllers/auth-onboarding.controller';
import { UserProfileController } from './controllers/user-profile.controller';
import { UserAdminController } from './controllers/user-admin.controller';
import { UserSecurityController } from './controllers/user-security.controller';
import { LocalizationController } from './controllers/localization.controller';
import { CommonController } from './controllers/common.controller';
import { TenantController } from './controllers/tenant.controller';
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
