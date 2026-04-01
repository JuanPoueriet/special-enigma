export interface AccountsPayableRepository {
  findAll(tenantId: string): Promise<any[]>;
  findByVendor(tenantId: string, vendorId: string): Promise<any[]>;
  getAgingReport(tenantId: string, asOfDate: Date): Promise<any>;
  save(invoice: any): Promise<any>;
}

export const ACCOUNTS_PAYABLE_REPOSITORY = 'ACCOUNTS_PAYABLE_REPOSITORY';
