import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CloseFiscalPeriodUseCase } from './close-fiscal-period.use-case';
import { JournalEntry, JournalEntryType, Account, AccountType, AccountingDomainError } from '@virtex/domain-accounting-domain';
import { Decimal } from 'decimal.js';

describe('CloseFiscalPeriodUseCase', () => {
  let useCase: CloseFiscalPeriodUseCase;
  let journalEntryRepository: any;
  let accountRepository: any;
  let fiscalPeriodRepository: any;
  let closingTaskRepository: any;
  let policyService: any;
  let logger: any;

  const tenantId = 'tenant-1';
  const closingDate = new Date('2026-12-31');

  beforeEach(() => {
    journalEntryRepository = {
      getBalancesByAccount: vi.fn(),
      create: vi.fn(),
      findUnpostedEntries: vi.fn().mockResolvedValue([]),
    };
    accountRepository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      findByCode: vi.fn(),
    };
    fiscalPeriodRepository = {
      findByDate: vi.fn().mockResolvedValue({ id: 'fp-1', status: 'OPEN' }),
      save: vi.fn(),
    };
    closingTaskRepository = {
      findByFiscalPeriod: vi.fn().mockResolvedValue([{ id: 'task-1', status: 'COMPLETED' }]),
    };
    policyService = {
      resolveAccountsForClosing: vi.fn().mockResolvedValue({ retainedEarningsAccountCode: '302.01' }),
    };
    logger = {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
    };

    useCase = new CloseFiscalPeriodUseCase(
      journalEntryRepository,
      accountRepository,
      fiscalPeriodRepository,
      closingTaskRepository,
      policyService,
      logger
    );
  });

  it('should throw error if retained earnings account is missing and there is net income', async () => {
    const revenueAccount = new Account(tenantId, '401', 'Sales', AccountType.REVENUE);
    revenueAccount.id = 'acc-1';

    accountRepository.findAll.mockResolvedValue([revenueAccount]);
    journalEntryRepository.getBalancesByAccount.mockResolvedValue(new Map([
      ['acc-1', { debit: '0', credit: '1000' }]
    ]));
    accountRepository.findById.mockResolvedValue(revenueAccount);
    accountRepository.findByCode.mockResolvedValue(null); // Missing retained earnings

    await expect(useCase.execute(tenantId, closingDate))
      .rejects.toThrow(AccountingDomainError);

    await expect(useCase.execute(tenantId, closingDate))
      .rejects.toThrow('Retained earnings account with code 302.01 not found');
  });

  it('should validate balance before creating the entry', async () => {
    const revenueAccount = new Account(tenantId, '401', 'Sales', AccountType.REVENUE);
    revenueAccount.id = 'acc-1';
    const equityAccount = new Account(tenantId, '302.01', 'Retained Earnings', AccountType.EQUITY);
    equityAccount.id = 'acc-2';

    accountRepository.findAll.mockResolvedValue([revenueAccount]);
    journalEntryRepository.getBalancesByAccount.mockResolvedValue(new Map([
      ['acc-1', { debit: '0', credit: '1000' }]
    ]));
    accountRepository.findById.mockResolvedValue(revenueAccount);
    accountRepository.findByCode.mockResolvedValue(equityAccount);

    // Mock validateBalance to throw error to test it's called
    const originalValidate = JournalEntry.prototype.validateBalance;
    JournalEntry.prototype.validateBalance = vi.fn().mockImplementation(() => {
        throw new Error('Validation called');
    });

    await expect(useCase.execute(tenantId, closingDate))
      .rejects.toThrow('Validation called');

    JournalEntry.prototype.validateBalance = originalValidate;
  });
});
