import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Invoice {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

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

  // Fiscal Stamping Fields
  @Property({ nullable: true })
  fiscalUuid?: string;

  @Property({ nullable: true, type: 'text' })
  xmlContent?: string;

  @Property({ nullable: true })
  stampedAt?: Date;

  constructor(tenantId: string, customerId: string, totalAmount: string, taxAmount: string) {
    this.tenantId = tenantId;
    this.customerId = customerId;
    this.issueDate = new Date();
    this.totalAmount = totalAmount;
    this.taxAmount = taxAmount;
    this.status = 'DRAFT';
  }
}
