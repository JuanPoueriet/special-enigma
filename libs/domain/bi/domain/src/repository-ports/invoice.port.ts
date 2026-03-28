export const INVOICE_PORT = 'INVOICE_PORT';

export interface InvoiceStatusSummary {
  status: string;
  count: number;
  totalAmount: number;
}

export interface ArAging {
  bucket: string;
  amount: number;
}

export interface InvoicePort {
  getInvoiceStatusSummary(tenantId: string): Promise<InvoiceStatusSummary[]>;
  getArAging(tenantId: string): Promise<ArAging[]>;
}
