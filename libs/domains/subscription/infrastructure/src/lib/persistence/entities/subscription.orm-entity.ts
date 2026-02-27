import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { SubscriptionPlanOrmEntity } from './subscription-plan.orm-entity';
import { SubscriptionStatus } from '@virteex/domain-subscription-domain';

@Entity({ tableName: 'subscription' })
export class SubscriptionOrmEntity {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  tenantId!: string;

  @ManyToOne(() => SubscriptionPlanOrmEntity)
  plan!: SubscriptionPlanOrmEntity;

  @Enum({ items: () => SubscriptionStatus })
  status: SubscriptionStatus = SubscriptionStatus.ACTIVE;

  @Property({ nullable: true })
  externalSubscriptionId?: string;

  @Property({ nullable: true })
  externalCustomerId?: string;

  @Property({ nullable: true })
  currentPeriodEnd?: Date;

  @Property()
  cancelAtPeriodEnd = false;

  @Property()
  startDate: Date = new Date();

  @Property({ nullable: true })
  endDate?: Date;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
