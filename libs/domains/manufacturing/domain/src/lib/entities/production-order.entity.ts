import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { ProductionOrderStatus } from '@virteex/contracts';
import type { BillOfMaterials } from '@virteex/manufacturing-domain/lib/entities/bill-of-materials.entity';

@Entity()
export class ProductionOrder {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  tenantId!: string;

  @Property()
  orderNumber!: string;

  @Property()
  productId!: string; // Reference to Inventory Product

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  quantity!: number;

  @Property()
  startDate!: Date;

  @Property({ nullable: true })
  endDate?: Date;

  @Enum(() => ProductionOrderStatus)
  status: ProductionOrderStatus = ProductionOrderStatus.PLANNED;

  @ManyToOne('BillOfMaterials')
  billOfMaterials!: BillOfMaterials;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(tenantId: string, orderNumber: string, productId: string, quantity: number, billOfMaterials: BillOfMaterials, startDate: Date) {
    this.tenantId = tenantId;
    this.orderNumber = orderNumber;
    this.productId = productId;
    this.quantity = quantity;
    this.billOfMaterials = billOfMaterials;
    this.startDate = startDate;
  }
}
