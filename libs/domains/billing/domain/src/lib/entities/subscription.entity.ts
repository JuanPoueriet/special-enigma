import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Subscription {
  @PrimaryKey()
  id: string = v4();

  @Property()
  tenantId!: string;

  @Property()
  planId!: string;

  @Property()
  status: 'Active' | 'Inactive' | 'Trial' = 'Active';

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: string;

  @Property()
  billingCycle!: string;

  @Property()
  nextBillingDate!: Date;

  @Property({ nullable: true })
  trialEndsDate?: Date;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(
    tenantId: string,
    planId: string,
    price: string,
    billingCycle: string,
    nextBillingDate: Date,
    status: 'Active' | 'Inactive' | 'Trial' = 'Active'
  ) {
    this.tenantId = tenantId;
    this.planId = planId;
    this.price = price;
    this.billingCycle = billingCycle;
    this.nextBillingDate = nextBillingDate;
    this.status = status;
  }
}
