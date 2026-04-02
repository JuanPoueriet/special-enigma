import { JournalEntry } from '../entities/journal-entry.entity';

export interface JournalEntryRepository {
  create(entry: JournalEntry): Promise<JournalEntry>;
  findById(tenantId: string, id: string): Promise<JournalEntry | null>;
  findAll(tenantId: string): Promise<JournalEntry[]>;
  findByAccountIdsAndDateRange(tenantId: string, accountIds: string[], startDate?: Date, endDate?: Date): Promise<JournalEntry[]>;
  count(tenantId: string): Promise<number>;
  getBalancesByAccount(tenantId: string, startDate?: Date, endDate?: Date, dimensions?: Record<string, string>, accountIds?: string[]): Promise<Map<string, { debit: string; credit: string }>>;
  findLatestClosedDate(tenantId: string): Promise<Date | null>;
  findUnpostedEntries(tenantId: string, endDate: Date): Promise<JournalEntry[]>;
  findByTypeAndDate(tenantId: string, type: any, date: Date): Promise<JournalEntry[]>;
}

export const JOURNAL_ENTRY_REPOSITORY = 'JOURNAL_ENTRY_REPOSITORY';
