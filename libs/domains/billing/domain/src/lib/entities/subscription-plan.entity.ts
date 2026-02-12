import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class SubscriptionPlan {
  @PrimaryKey()
  id: string = v4();

  @Property()
  slug!: string;

  @Property()
  name!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  price!: string;

  @Property()
  description!: string;

  @Property()
  features!: string; // JSON string or array

  @Property()
  isActive: boolean = true;

  constructor(slug: string, name: string, price: string, description: string, features: string[]) {
    this.slug = slug;
    this.name = name;
    this.price = price;
    this.description = description;
    this.features = JSON.stringify(features);
  }
}
