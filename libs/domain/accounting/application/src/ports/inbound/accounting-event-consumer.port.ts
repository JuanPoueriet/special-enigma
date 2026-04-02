import { InvoiceStampedV1EventDto, InvoiceValidatedEventDto, PayrollStampedV1EventDto } from '@virtex/domain-accounting-contracts';

export const ACCOUNTING_EVENT_CONSUMER_PORT = Symbol('ACCOUNTING_EVENT_CONSUMER_PORT');

export interface AccountingEventConsumerPort {
  consumeInvoiceStampedV1(event: InvoiceStampedV1EventDto): Promise<void>;
  consumePayrollStampedV1(event: PayrollStampedV1EventDto): Promise<void>;
  consumeInvoiceValidated(event: InvoiceValidatedEventDto): Promise<void>;
}
