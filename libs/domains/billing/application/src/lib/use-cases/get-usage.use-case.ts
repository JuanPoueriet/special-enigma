import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  InvoiceRepository,
  INVOICE_REPOSITORY,
  SubscriptionRepository,
  SUBSCRIPTION_REPOSITORY,
  SubscriptionPlan
} from '@virteex/billing-domain';

export interface UsageItem {
  resource: string;
  used: number;
  limit: number;
  type: string;
  isUnlimited: boolean;
  isEnabled: boolean;
}

@Injectable()
export class GetUsageUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository,
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  async execute(tenantId: string): Promise<UsageItem[]> {
    const invoices = await this.invoiceRepository.findByTenantId(tenantId);
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);

    // Default Limits if no subscription (e.g., Free Tier or Trial fallback)
    let limits = { invoices: 10, users: 1, storage: 50 }; // Very restrictive default

    if (subscription && subscription.isValid() && subscription.plan) {
       limits = subscription.plan.limits;
    }

    const isUnlimited = limits.invoices === -1;

    return [{
      resource: 'Invoices',
      used: invoices.length,
      limit: isUnlimited ? Infinity : limits.invoices,
      type: 'numeric',
      isUnlimited: isUnlimited,
      isEnabled: true
    }];
  }
}
