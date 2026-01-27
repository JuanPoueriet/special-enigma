import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Warehouse } from './warehouse.entity';
import { Location } from './location.entity';
import Decimal from 'decimal.js';

@Entity()
@Unique({ properties: ['warehouse', 'location', 'productId'] })
export class Stock {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  tenantId!: string;

  @Property()
  productId!: string;

  @ManyToOne(() => Warehouse)
  warehouse!: Warehouse;

  @ManyToOne(() => Location, { nullable: true })
  location?: Location;

  @Property({ type: 'decimal', precision: 14, scale: 4 })
  quantity: string = '0';

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(
    tenantId: string,
    productId: string,
    warehouse: Warehouse,
    quantity: string = '0',
    location?: Location
  ) {
    this.tenantId = tenantId;
    this.productId = productId;
    this.warehouse = warehouse;
    this.quantity = quantity;
    if (location) {
      this.location = location;
    }
  }

  addQuantity(qty: string): void {
    const current = new Decimal(this.quantity);
    const addition = new Decimal(qty);
    this.quantity = current.plus(addition).toString();
  }

  removeQuantity(qty: string): void {
    const current = new Decimal(this.quantity);
    const subtraction = new Decimal(qty);
    const result = current.minus(subtraction);

    if (result.isNegative()) {
      throw new Error('Insufficient stock');
    }

    this.quantity = result.toString();
  }
}
