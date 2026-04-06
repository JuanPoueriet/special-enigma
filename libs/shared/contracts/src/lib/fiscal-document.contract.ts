export interface InvoiceContract {
  id: string;
  number: string;
  issueDate: Date;
  dueDate: Date;
  currency: string;
  totalAmount: number;
  taxAmount: number;
  items: InvoiceItemContract[];
}

export interface InvoiceItemContract {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
}

export interface CustomerBillingInfoContract {
  taxId: string;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}
