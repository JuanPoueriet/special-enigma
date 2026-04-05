import { DomainException } from '@virtex/kernel-exceptions';
import { Injectable, Inject } from '@nestjs/common';
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository } from '@virtex/domain-subscription-domain';

@Injectable()
export class GetSubscriptionStatusUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  async execute(tenantId: string): Promise<{ status: string; plan: string; billingCycle: string }> {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);

    if (!subscription) {
      return {
        status: 'INACTIVE',
        plan: 'FREE',
        billingCycle: 'MONTHLY'
      };
    }

    return {
      status: subscription.getStatus(),
      plan: subscription.getPlan().slug,
      billingCycle: 'MONTHLY' // This could be added to subscription entity if needed, for now using default
    };
  }
}
