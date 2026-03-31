import {
  InvoiceStampedV1EventDto as SharedInvoiceStampedV1EventDto,
  PayrollStampedV1EventDto as SharedPayrollStampedV1EventDto,
  ACCOUNTING_INTEGRATION_EVENTS as SharedACCOUNTING_INTEGRATION_EVENTS
} from '@virteex/shared-contracts';

/**
 * Integration Events for Accounting Module (V1)
 * These are the canonical contracts for external domains (Billing, Payroll)
 * to integrate with Accounting.
 */

export type InvoiceStampedV1EventDto = SharedInvoiceStampedV1EventDto;
export type PayrollStampedV1EventDto = SharedPayrollStampedV1EventDto;

export const ACCOUNTING_INTEGRATION_EVENTS = SharedACCOUNTING_INTEGRATION_EVENTS;
