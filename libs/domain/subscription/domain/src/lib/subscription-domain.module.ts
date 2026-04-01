import { CustomerIdentityService } from './services/customer-identity.service';
import { resolveStripeSecretKey } from './services/stripe-runtime-config.service';

export class SubscriptionDomainModule {
  static getProviders() {
    return [CustomerIdentityService, resolveStripeSecretKey];
  }
}
