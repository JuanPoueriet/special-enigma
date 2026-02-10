import { Injectable, Inject } from '@nestjs/common';
import { Invoice, InvoiceRepository, INVOICE_REPOSITORY } from '@virteex/billing-domain';

export class CreateInvoiceDto {
  tenantId!: string;
  customerId!: string;
  totalAmount!: string;
  taxAmount!: string;
}

@Injectable()
export class CreateInvoiceUseCase {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository
  ) {}

  async execute(dto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = new Invoice(dto.tenantId, dto.customerId, dto.totalAmount, dto.taxAmount);
    await this.invoiceRepository.save(invoice);
    return invoice;
  }
}
