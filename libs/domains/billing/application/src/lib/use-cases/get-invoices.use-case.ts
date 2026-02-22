import { Injectable, Inject } from '@nestjs/common';
import { Invoice, InvoiceRepository, INVOICE_REPOSITORY } from '@virteex/billing-domain';

export interface PaginatedInvoices {
  items: Invoice[];
  total: number;
}

@Injectable()
export class GetInvoicesUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository
  ) {}

  async execute(tenantId: string, page: number = 1, limit: number = 10): Promise<PaginatedInvoices> {
    const offset = (page - 1) * limit;
    return this.invoiceRepository.findPaginatedByTenantId(tenantId, limit, offset);
  }
}
