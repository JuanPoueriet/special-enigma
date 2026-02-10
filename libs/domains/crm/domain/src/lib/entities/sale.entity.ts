import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  ManyToOne,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Sale {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  tenantId!: string;

  @Property()
  customerName!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  total!: string;

  @Property()
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' = 'PENDING';

  @OneToMany('SaleItem', 'sale', { cascade: [] })
  items = new Collection<any>(this);

  @Property()
  createdAt: Date = new Date();

  constructor(tenantId: string, customerName: string, total: string) {
    this.tenantId = tenantId;
    this.customerName = customerName;
    this.total = total;
  }
}

@Entity()
export class SaleItem {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  productId!: string;

  @Property()
  productName!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  quantity!: string;

  @ManyToOne(() => Sale)
  sale!: Sale;

  constructor(
    productId: string,
    productName: string,
    price: string,
    quantity: string,
  ) {
    this.productId = productId;
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
  }
}
