import { Subscription } from '../entities/subscription.entity';

export const SUBSCRIPTION_REPOSITORY = 'SUBSCRIPTION_REPOSITORY';

export interface ISubscriptionRepository {
  save(subscription: Subscription): Promise<void>;
  findByTenantId(tenantId: string): Promise<Subscription | null>;
}
