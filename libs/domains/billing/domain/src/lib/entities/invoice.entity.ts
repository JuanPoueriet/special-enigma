import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Invoice {
  @PrimaryKey()
  id!: string;

  @Property()
  tenantId!: string;

  @Property()
  customerId!: string;

  @Property()
  issueDate!: Date;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  taxAmount!: string;

  @Property()
  status!: string;

  constructor(tenantId: string, customerId: string, totalAmount: string, taxAmount: string) {
    this.tenantId = tenantId;
    this.customerId = customerId;
    this.issueDate = new Date();
    this.totalAmount = totalAmount;
    this.taxAmount = taxAmount;
    this.status = 'DRAFT';
  }
}
