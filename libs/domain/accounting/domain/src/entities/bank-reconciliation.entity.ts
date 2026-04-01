import { BankStatementLine } from './bank-statement-line.entity';

export enum BankReconciliationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export class BankReconciliation {
  id!: string;
  tenantId!: string;
  accountId!: string;
  statementDate!: Date;
  matchedEntriesCount: number = 0;
  unmatchedEntriesCount: number = 0;
  status: BankReconciliationStatus = BankReconciliationStatus.PENDING;
  completedAt?: Date;
  completedBy?: string;
  lines: BankStatementLine[] = [];

  constructor(tenantId: string, accountId: string, statementDate: Date) {
    this.tenantId = tenantId;
    this.accountId = accountId;
    this.statementDate = statementDate;
  }

  addLine(line: BankStatementLine): void {
    this.lines.push(line);
    line.reconciliation = this;
  }

  complete(userId: string): void {
    this.status = BankReconciliationStatus.COMPLETED;
    this.completedAt = new Date();
    this.completedBy = userId;
  }
}
