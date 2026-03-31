
import { v4 } from 'uuid';

export interface PlanLimits {
  [key: string]: number;
}

export class SubscriptionPlan {
    id: string = v4();

    slug!: string;


    name!: string;

    price!: string;

    stripePriceId?: string;


    description!: string;

    features: string[] = [];

    limits: PlanLimits = { invoices: 100, users: 1, storage: 100 }; // Default limits

    isActive = true;


    createdAt: Date = new Date();


    updatedAt: Date = new Date();

  constructor(slug: string, name: string, price: string, description: string, features: string[], limits?: PlanLimits) {
    this.slug = slug;
    this.name = name;
    this.price = price;
    this.description = description;
    this.features = features;
    if (limits) {
      this.limits = limits;
    }
  }
}
