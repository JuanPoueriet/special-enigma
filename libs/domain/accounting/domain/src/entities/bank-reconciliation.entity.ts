export class BankReconciliation {
  id!: string;
  tenantId!: string;
  accountId!: string;
  statementDate!: Date;
  matchedEntriesCount: number = 0;
  unmatchedEntriesCount: number = 0;
  status: 'PENDING' | 'COMPLETED' = 'PENDING';
  completedAt?: Date;
  completedBy?: string;

  constructor(tenantId: string, accountId: string, statementDate: Date) {
    this.tenantId = tenantId;
    this.accountId = accountId;
    this.statementDate = statementDate;
  }
}
