import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { PlanLimits } from '@virteex/domain-subscription-domain';

@Entity({ tableName: 'subscription_plan' })
export class SubscriptionPlanOrmEntity {
  @PrimaryKey()
  id: string = v4();

  @Property()
  slug!: string;

  @Property()
  name!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: string;

  @Property({ nullable: true })
  stripePriceId?: string;

  @Property()
  description!: string;

  @Property({ type: 'json' })
  features: string[] = [];

  @Property({ type: 'json' })
  limits: PlanLimits = { invoices: 100, users: 1, storage: 100 };

  @Property()
  isActive = true;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
