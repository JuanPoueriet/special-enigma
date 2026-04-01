export interface PlanLimit {
  resource: string;
  limit: number;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  monthlyPriceId: string;
  description?: string;
  price?: number;
  features?: string[];
  limits?: PlanLimit[];
  annualPriceId?: string;
}
