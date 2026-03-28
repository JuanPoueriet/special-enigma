import { Injectable, Inject } from '@nestjs/common';
import { type InvoicePort, INVOICE_PORT, type InvoiceStatusSummary } from '@virteex/domain-bi-domain';
import { GetInvoiceStatusQuery } from './get-invoice-status.query';

@Injectable()
export class GetInvoiceStatusHandler {
  constructor(
    @Inject(INVOICE_PORT) private readonly invoicePort: InvoicePort
  ) {}

  async handle(query: GetInvoiceStatusQuery): Promise<InvoiceStatusSummary[]> {
    return this.invoicePort.getInvoiceStatusSummary(query.tenantId);
  }
}
