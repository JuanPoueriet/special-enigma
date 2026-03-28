import { Injectable, Inject } from '@nestjs/common';
import { type InvoicePort, INVOICE_PORT, type ArAging } from '@virteex/domain-bi-domain';
import { GetArAgingQuery } from './get-ar-aging.query';

@Injectable()
export class GetArAgingHandler {
  constructor(
    @Inject(INVOICE_PORT) private readonly invoicePort: InvoicePort
  ) {}

  async handle(query: GetArAgingQuery): Promise<ArAging[]> {
    return this.invoicePort.getArAging(query.tenantId);
  }
}
