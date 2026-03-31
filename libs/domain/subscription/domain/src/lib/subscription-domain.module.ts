import { customerIdentityService } from './services/customer-identity.service';
import { StripeRuntimeConfigService } from './services/stripe-runtime-config.service';

export class SubscriptionDomainModule {
  static getProviders() {
    return [
      customerIdentityService,
      StripeRuntimeConfigService
    ];
  }
}
