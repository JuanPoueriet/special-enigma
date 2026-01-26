import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  tenantId!: string; // Managed by TenantSubscriber, not by user

  @Property()
  sku!: string;

  @Property()
  name!: string;

  @Property()
  price!: number;

  @Property()
  isActive: boolean = true;

  constructor(sku: string, name: string, price: number) {
    this.sku = sku;
    this.name = name;
    this.changePrice(price);
  }

  // Business Logic (DDD)
  changePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    this.price = newPrice;
    // Here we could emit a domain event: ProductPriceChanged
  }
}
