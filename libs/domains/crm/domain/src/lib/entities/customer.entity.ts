import { Entity, PrimaryKey, Property, Enum, OneToMany, Collection, Cascade } from '@mikro-orm/core';
import { CustomerType } from '@virteex/contracts';
import type { Opportunity } from '@virteex/crm-domain/lib/entities/opportunity.entity';

@Entity()
export class Customer {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  tenantId!: string;

  @Enum(() => CustomerType)
  type: CustomerType = CustomerType.COMPANY;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property({ nullable: true })
  companyName?: string;

  @Property({ nullable: true })
  email?: string;

  @Property({ nullable: true })
  phone?: string;

  @OneToMany('Opportunity', 'customer', { cascade: [Cascade.ALL] })
  opportunities = new Collection<Opportunity>(this);

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(tenantId: string, type: CustomerType) {
    this.tenantId = tenantId;
    this.type = type;
  }
}
