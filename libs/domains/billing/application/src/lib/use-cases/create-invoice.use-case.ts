import { Injectable, Inject, Logger } from '@nestjs/common';
import { Invoice, InvoiceRepository, INVOICE_REPOSITORY, FiscalStampingService } from '@virteex/billing-domain';

export class CreateInvoiceDto {
  tenantId!: string;
  customerId!: string;
  totalAmount!: string;
  taxAmount!: string;
}

@Injectable()
export class CreateInvoiceUseCase {
  private readonly logger = new Logger(CreateInvoiceUseCase.name);

  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository,
    private readonly fiscalStampingService: FiscalStampingService
  ) {}

  async execute(dto: CreateInvoiceDto): Promise<Invoice> {
    const invoice = new Invoice(dto.tenantId, dto.customerId, dto.totalAmount, dto.taxAmount);

    try {
      this.logger.log(`Stamping invoice for customer ${dto.customerId}`);
      const stamp = await this.fiscalStampingService.stampInvoice(invoice);

      invoice.fiscalUuid = stamp.uuid;
      invoice.xmlContent = stamp.xml;
      invoice.stampedAt = new Date(stamp.fechaTimbrado);
      invoice.status = 'STAMPED';

      this.logger.log(`Invoice stamped. UUID: ${stamp.uuid}`);
    } catch (error) {
      this.logger.error(`Failed to stamp invoice: ${error}`);
      // Depending on business logic, we might save as DRAFT or fail.
      // Here we fail or save as ERROR.
      // For now, let's propagate error but maybe save as draft first?
      // Usually, if stamping fails, invoice is not valid.
      throw error;
    }

    await this.invoiceRepository.save(invoice);
    return invoice;
  }
}
