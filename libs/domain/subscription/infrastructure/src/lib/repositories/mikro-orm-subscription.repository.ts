import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Subscription, type SubscriptionRepository } from '@virtex/domain-subscription-domain';

export class MikroOrmSubscriptionRepository implements SubscriptionRepository {
  constructor(
    @InjectRepository(Subscription)
    private readonly repository: EntityRepository<Subscription>
  ) {}

  async save(subscription: Subscription): Promise<void> {
    await this.repository.getEntityManager().persistAndFlush(subscription);
  }

  async findByTenantId(tenantId: string): Promise<Subscription | null> {
    // Prioritize ACTIVE or TRIAL status, then by createdAt DESC
    const activeSubscription = await this.repository.findOne(
        { tenantId, status: { $in: ['ACTIVE', 'TRIAL'] } },
        { orderBy: { createdAt: 'DESC' } }
    );

    if (activeSubscription) {
        return activeSubscription;
    }

    // Fallback to the most recent subscription if no active one found
    return this.repository.findOne({ tenantId }, { orderBy: { createdAt: 'DESC' } });
  }

  async findByExternalId(externalSubscriptionId: string): Promise<Subscription | null> {
    return this.repository.findOne({ externalSubscriptionId });
  }
}
