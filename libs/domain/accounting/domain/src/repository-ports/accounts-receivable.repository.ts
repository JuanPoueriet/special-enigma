import { Invoice } from '../entities/invoice.entity';

export interface AccountsReceivableAgingReport {
  asOfDate: Date;
  buckets: {
    current: string;
    '1-30': string;
    '31-60': string;
    '61-90': string;
    '90+': string;
  };
  totalAmount: string;
}

export interface AccountsReceivableRepository {
  findAll(tenantId: string): Promise<Invoice[]>;
  findByCustomer(tenantId: string, customerId: string): Promise<Invoice[]>;
  getAgingReport(tenantId: string, asOfDate: Date): Promise<AccountsReceivableAgingReport>;
  save(invoice: Invoice): Promise<Invoice>;
}

export const ACCOUNTS_RECEIVABLE_REPOSITORY = 'ACCOUNTS_RECEIVABLE_REPOSITORY';
