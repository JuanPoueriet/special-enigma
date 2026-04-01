import type { BankReconciliation } from './bank-reconciliation.entity';

export enum BankStatementLineStatus {
  UNMATCHED = 'UNMATCHED',
  MATCHED = 'MATCHED',
  ADJUSTED = 'ADJUSTED',
  IGNORED = 'IGNORED'
}

export class BankStatementLine {
  id!: string;
  reconciliation!: BankReconciliation;
  date!: Date;
  description!: string;
  amount!: string;
  reference!: string;
  status: BankStatementLineStatus = BankStatementLineStatus.UNMATCHED;
  matchedJournalEntryId?: string;
  notes?: string;

  constructor(date: Date, description: string, amount: string, reference: string) {
    this.date = date;
    this.description = description;
    this.amount = amount;
    this.reference = reference;
  }

  match(journalEntryId: string): void {
    this.status = BankStatementLineStatus.MATCHED;
    this.matchedJournalEntryId = journalEntryId;
  }

  adjust(notes: string): void {
    this.status = BankStatementLineStatus.ADJUSTED;
    this.notes = notes;
  }
}
