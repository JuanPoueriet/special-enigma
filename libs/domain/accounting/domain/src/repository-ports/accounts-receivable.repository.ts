export interface AccountsReceivableRepository {
  findAll(tenantId: string): Promise<any[]>;
  findByCustomer(tenantId: string, customerId: string): Promise<any[]>;
  getAgingReport(tenantId: string, asOfDate: Date): Promise<any>;
  save(invoice: any): Promise<any>;
}

export const ACCOUNTS_RECEIVABLE_REPOSITORY = 'ACCOUNTS_RECEIVABLE_REPOSITORY';
