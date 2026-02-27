import { v4 } from 'uuid';

export interface PlanLimits {
  invoices: number; // -1 for unlimited
  users: number;
  storage: number; // in MB
}

export class SubscriptionPlan {
  id: string;
  slug: string;
  name: string;
  price: string;
  stripePriceId?: string;
  description: string;
  features: string[] = [];
  limits: PlanLimits = { invoices: 100, users: 1, storage: 100 };
  isActive = true;
  createdAt: Date;
  updatedAt: Date;

  constructor(slug: string, name: string, price: string, description: string, features: string[], limits?: PlanLimits, id?: string) {
    this.id = id || v4();
    this.slug = slug;
    this.name = name;
    this.price = price;
    this.description = description;
    this.features = features;
    if (limits) {
      this.limits = limits;
    }
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
