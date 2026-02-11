import { Injectable, Inject } from '@nestjs/common';
import { Subscription, ISubscriptionRepository, SUBSCRIPTION_REPOSITORY } from '@virteex/billing-domain';

@Injectable()
export class GetSubscriptionUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute(tenantId: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findByTenantId(tenantId);
  }
}
