import { Invoice } from '../entities/invoice.entity';

export interface AccountsPayableAgingReport {
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

export interface AccountsPayableRepository {
  findAll(tenantId: string): Promise<Invoice[]>;
  findByVendor(tenantId: string, vendorId: string): Promise<Invoice[]>;
  getAgingReport(tenantId: string, asOfDate: Date): Promise<AccountsPayableAgingReport>;
  save(invoice: Invoice): Promise<Invoice>;
}

export const ACCOUNTS_PAYABLE_REPOSITORY = 'ACCOUNTS_PAYABLE_REPOSITORY';
