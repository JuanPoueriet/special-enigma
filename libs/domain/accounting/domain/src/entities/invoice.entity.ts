export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: string;
  total: string;
  taxAmount?: string;
}

export class Invoice {
  id!: string;
  tenantId!: string;
  vendorId?: string;
  customerId?: string;
  number!: string;
  issueDate!: Date;
  dueDate!: Date;
  currency!: string;
  amount!: string;
  paidAmount: string = '0.00';
  taxAmount: string = '0.00';
  status: InvoiceStatus = InvoiceStatus.DRAFT;
  type: 'PAYABLE' | 'RECEIVABLE';
  notes?: string;
  lineItems: InvoiceLineItem[] = [];

  constructor(tenantId: string, number: string, type: 'PAYABLE' | 'RECEIVABLE') {
    this.tenantId = tenantId;
    this.number = number;
    this.type = type;
  }
}
