import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ProductionOrder {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  tenantId!: string;

  @Property()
  productSku!: string;

  @Property()
  quantity!: number;

  @Property()
  status!: string;

  @Property()
  dueDate!: Date;

  constructor(tenantId: string, productSku: string, quantity: number, dueDate: Date) {
    this.tenantId = tenantId;
    this.productSku = productSku;
    this.quantity = quantity;
    this.dueDate = dueDate;
    this.status = 'PLANNED';
  }
}
