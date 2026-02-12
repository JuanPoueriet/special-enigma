import { Injectable, Inject } from '@nestjs/common';
import { InvoiceRepository, INVOICE_REPOSITORY } from '@virteex/billing-domain';

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
    @Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository
  ) {}

  async execute(tenantId: string): Promise<UsageItem[]> {
    const invoices = await this.invoiceRepository.findByTenantId(tenantId);

    // In a real app, limits come from Subscription Plan.
    // For now, hardcode limit or fetch from plan if easy.
    // I'll assume 100 limit for now to match UI expectation but with real usage count.

    return [{
      resource: 'Invoices',
      used: invoices.length,
      limit: 100,
      type: 'numeric',
      isUnlimited: false,
      isEnabled: true
    }];
  }
}
