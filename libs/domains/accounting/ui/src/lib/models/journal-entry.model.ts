import { JournalEntryStatus } from '@virteex/accounting-contracts';

export interface JournalEntryLine {
  id: string;
  accountId: string;
  debit: number;
  credit: number;
  description: string;
}

export interface JournalEntry {
  id: string;
  tenantId: string;
  date: Date;
  description: string;
  status: JournalEntryStatus;
  lines: JournalEntryLine[];
}
