/**
 * Integration Events for Accounting Module (V1)
 * These are the canonical contracts for external domains (Billing, Payroll)
 * to integrate with Accounting.
 */

export interface InvoiceStampedV1EventDto {
  invoiceId: string;
  tenantId: string;
  totalAmount: number;
  taxAmount: number;
  stampedAt: string; // ISO Date
}

export interface PayrollStampedV1EventDto {
  payrollId: string;
  tenantId: string;
  netAmount: number;
  taxAmount: number;
  stampedAt: string; // ISO Date
}

/**
 * @deprecated Use InvoiceStampedV1EventDto
 */
export interface InvoiceValidatedEventDto {
  invoiceId: string;
  tenantId: string;
  totalAmount: number;
  currency: string;
  date: string;
  customerId: string;
  lines: Array<{
    description: string;
    amount: number;
    taxAmount: number;
    accountCode?: string;
  }>;
}

/**
 * @deprecated Use InvoiceStampedV1EventDto
 */
export interface InvoiceStampedEventDto {
  invoiceId: string;
  tenantId: string;
  stampDate: string;
  taxAuthId: string;
}

/**
 * @deprecated Use PayrollStampedV1EventDto
 */
export interface PayrollStampedEventDto {
  payrollId: string;
  tenantId: string;
  totalAmount: number;
  date: string;
}

export const ACCOUNTING_INTEGRATION_EVENTS = {
  INVOICE_STAMPED_V1: 'integration.v1.billing.invoice.stamped',
  PAYROLL_STAMPED_V1: 'integration.v1.payroll.payroll.stamped',

  // Legacy events for backward compatibility during transition
  LEGACY: {
    BILLING_INVOICE_VALIDATED: 'billing.invoice.validated',
    INVOICE_STAMPED: 'invoice.stamped',
    PAYROLL_STAMPED: 'payroll.stamped',
  }
} as const;

/**
 * @deprecated Use ACCOUNTING_INTEGRATION_EVENTS
 */
export const ACCOUNTING_EVENTS = ACCOUNTING_INTEGRATION_EVENTS.LEGACY;
