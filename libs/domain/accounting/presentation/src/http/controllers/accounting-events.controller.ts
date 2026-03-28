import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AccountingEventHandlerService } from '@virteex/domain-accounting-application';

interface InvoiceValidatedEvent {
    id: string;
    tenantId: string;
    totalAmount: string;
    taxAmount: string;
    stampedAt: string | Date;
}

@Controller()
export class AccountingEventsController {
  private readonly logger = new Logger(AccountingEventsController.name);

  constructor(
    private readonly eventHandlerService: AccountingEventHandlerService
  ) {}

  @EventPattern('billing.invoice.validated')
  async handleInvoiceValidated(@Payload() event: InvoiceValidatedEvent) {
    this.logger.log(`Processing accounting for Invoice ${event.id} (Microservice Event)`);

    try {
        await this.eventHandlerService.handleInvoiceStamped({
            invoiceId: event.id,
            tenantId: event.tenantId,
            total: Number(event.totalAmount),
            taxes: Number(event.taxAmount),
            date: new Date(event.stampedAt)
        });
        this.logger.log(`Journal Entry created for Invoice ${event.id}`);
    } catch (e) {
        const error = e as Error;
        this.logger.error(`Failed to create Journal Entry for Invoice ${event.id}: ${error.message}`);
    }
  }
}
