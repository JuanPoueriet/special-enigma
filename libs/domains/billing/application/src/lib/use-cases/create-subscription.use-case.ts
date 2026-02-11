import { Injectable, Inject } from '@nestjs/common';
import { Subscription, ISubscriptionRepository, SUBSCRIPTION_REPOSITORY } from '@virteex/billing-domain';

export interface CreateSubscriptionDto {
  tenantId: string;
  planId: string;
  price: string;
  billingCycle: string;
}

@Injectable()
export class CreateSubscriptionUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute(dto: CreateSubscriptionDto): Promise<Subscription> {
    const nextBillingDate = new Date();
    // Simple logic for next billing date: +30 days if monthly, etc.
    // For now assuming monthly for simplicity or based on billingCycle
    if (dto.billingCycle === 'monthly') {
        nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    } else if (dto.billingCycle === 'yearly') {
        nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
    }

    const subscription = new Subscription(
      dto.tenantId,
      dto.planId,
      dto.price,
      dto.billingCycle,
      nextBillingDate
    );

    await this.subscriptionRepository.save(subscription);
    return subscription;
  }
}
