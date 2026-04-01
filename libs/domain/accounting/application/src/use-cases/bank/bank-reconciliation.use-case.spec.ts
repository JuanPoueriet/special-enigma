import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BankReconciliationUseCase } from './bank-reconciliation.use-case';
import {
    type JournalEntryRepository,
    type BankReconciliationRepository,
    JournalEntry,
    JournalEntryLine,
    Account,
    BankReconciliationStatus
} from '@virteex/domain-accounting-domain';
import { AccountType } from '@virteex/domain-accounting-contracts';

describe('BankReconciliationUseCase', () => {
  let service: BankReconciliationUseCase;
  let journalRepo: JournalEntryRepository;
  let reconRepo: BankReconciliationRepository;

  beforeEach(() => {
    journalRepo = {
      findAll: vi.fn().mockResolvedValue([]),
    } as unknown as JournalEntryRepository;

    reconRepo = {
        save: vi.fn().mockImplementation((recon) => Promise.resolve(recon)),
    } as unknown as BankReconciliationRepository;

    service = new BankReconciliationUseCase(journalRepo, reconRepo);
  });

  it('should match a statement line with a journal entry by amount and date', async () => {
    const tenantId = 'tenant1';
    const accountId = 'bank-acc-1';
    const bankAccount = new Account(tenantId, '101', 'Bank', AccountType.ASSET as any);
    bankAccount.id = accountId;

    const entry = new JournalEntry(tenantId, 'Payment Test', new Date('2023-01-01'));
    entry.id = 'entry-1';
    entry.addLine(new JournalEntryLine(bankAccount, '100.00', '0.00'));

    (journalRepo.findAll as any).mockResolvedValue([entry]);

    const result = await service.execute(tenantId, accountId, [
        { date: '2023-01-01', description: 'Payment', amount: '100.00', reference: 'REF1' }
    ]);

    expect(result.matchedEntriesCount).toBe(1);
    expect(result.status).toBe(BankReconciliationStatus.COMPLETED);
    expect(result.lines[0].matchedJournalEntryId).toBe('entry-1');
  });

  it('should not match if accountId is different', async () => {
    const tenantId = 'tenant1';
    const accountId = 'bank-acc-1';
    const otherAccount = new Account(tenantId, '102', 'Other', AccountType.ASSET as any);
    otherAccount.id = 'other-acc';

    const entry = new JournalEntry(tenantId, 'Payment Test', new Date('2023-01-01'));
    entry.addLine(new JournalEntryLine(otherAccount, '100.00', '0.00'));

    (journalRepo.findAll as any).mockResolvedValue([entry]);

    const result = await service.execute(tenantId, accountId, [
        { date: '2023-01-01', description: 'Payment Test', amount: '100.00', reference: 'REF1' }
    ]);

    expect(result.matchedEntriesCount).toBe(0);
    expect(result.status).toBe(BankReconciliationStatus.IN_PROGRESS);
  });

  it('should match using fuzzy amount rules', async () => {
    const tenantId = 'tenant1';
    const accountId = 'bank-acc-1';
    const bankAccount = new Account(tenantId, '101', 'Bank', AccountType.ASSET as any);
    bankAccount.id = accountId;

    const entry = new JournalEntry(tenantId, 'Payment Test', new Date('2023-01-01'));
    entry.id = 'entry-1';
    entry.addLine(new JournalEntryLine(bankAccount, '100.00', '0.00'));

    (journalRepo.findAll as any).mockResolvedValue([entry]);

    const result = await service.execute(tenantId, accountId, [
        { date: '2023-01-01', description: 'Payment', amount: '100.005', reference: 'REF1' }
    ], { dateToleranceDays: 3, fuzzyAmountMatch: true });

    expect(result.matchedEntriesCount).toBe(1);
    expect(result.status).toBe(BankReconciliationStatus.COMPLETED);
  });

  it('should match within date tolerance', async () => {
    const tenantId = 'tenant1';
    const accountId = 'bank-acc-1';
    const bankAccount = new Account(tenantId, '101', 'Bank', AccountType.ASSET as any);
    bankAccount.id = accountId;

    const entry = new JournalEntry(tenantId, 'Payment Test', new Date('2023-01-01'));
    entry.id = 'entry-1';
    entry.addLine(new JournalEntryLine(bankAccount, '100.00', '0.00'));

    (journalRepo.findAll as any).mockResolvedValue([entry]);

    const result = await service.execute(tenantId, accountId, [
        { date: '2023-01-03', description: 'Payment', amount: '100.00', reference: 'REF1' }
    ], { dateToleranceDays: 3, fuzzyAmountMatch: false });

    expect(result.matchedEntriesCount).toBe(1);
    expect(result.status).toBe(BankReconciliationStatus.COMPLETED);
  });
});
