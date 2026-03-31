import { DomainException } from '@virteex/shared-util-server-server-config';
import { Injectable, Inject } from '@nestjs/common';
import { SUBSCRIPTION_REPOSITORY, type SubscriptionRepository, SUBSCRIPTION_PLAN_REPOSITORY, type SubscriptionPlanRepository, Subscription, SubscriptionStatus } from '@virteex/domain-subscription-domain';

export class UpdateTenantPlanDto {
  plan!: string; // slug: 'STARTER', 'PROFESSIONAL', 'ENTERPRISE'
  billingCycle!: string; // 'MONTHLY', 'ANNUAL'
}

@Injectable()
export class UpdateTenantPlanUseCase {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: SubscriptionRepository,
    @Inject(SUBSCRIPTION_PLAN_REPOSITORY) private readonly planRepository: SubscriptionPlanRepository
  ) {}

  async execute(tenantId: string, dto: UpdateTenantPlanDto): Promise<Subscription> {
    const plan = await this.planRepository.findBySlug(dto.plan);
    if (!plan) {
        throw new DomainException(`Plan ${dto.plan} not found`, 'ENTITY_NOT_FOUND');
    }

    let subscription = await this.subscriptionRepository.findByTenantId(tenantId);

    if (!subscription) {
        subscription = new Subscription(tenantId, plan);
    } else {
        subscription.changePlan(plan);
    }

    subscription.status = SubscriptionStatus.ACTIVE;
    // Note: billingCycle is not currently in the Subscription entity,
    // in a real scenario we'd update it there or in the provider.

    await this.subscriptionRepository.save(subscription);
    return subscription;
  }
}
