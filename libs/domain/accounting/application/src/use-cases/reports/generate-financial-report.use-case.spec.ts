import { vi, describe, it, expect, beforeEach } from 'vitest';
import { GenerateFinancialReportUseCase } from './generate-financial-report.use-case';
import { type JournalEntryRepository, type AccountRepository } from '@virteex/domain-accounting-domain';

describe('GenerateFinancialReportUseCase', () => {
  let service: GenerateFinancialReportUseCase;
  let journalRepo: JournalEntryRepository;
  let accountRepo: AccountRepository;
  let logger: any;

  beforeEach(() => {
    journalRepo = {
        getBalancesByAccount: vi.fn(),
        findAll: vi.fn().mockResolvedValue([]),
        findByAccountIdsAndDateRange: vi.fn().mockResolvedValue([]),
    } as unknown as JournalEntryRepository;
    accountRepo = {
        findAll: vi.fn(),
    } as unknown as AccountRepository;
    logger = {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
    };
    service = new GenerateFinancialReportUseCase(journalRepo, accountRepo, logger);
  });

  it('should generate a Balance Sheet', async () => {
    const balances = new Map();
    balances.set('1', { debit: '1000.00', credit: '0.00' });

    (journalRepo.getBalancesByAccount as any).mockResolvedValue(balances);
    (accountRepo.findAll as any).mockResolvedValue([
        { id: '1', name: 'Cash', code: '100', type: 'ASSET' }
    ]);

    const result = await service.execute('tenant1', 'BALANCE_SHEET', new Date());

    expect(result.lines).toHaveLength(1);
    expect(result.lines[0].balance).toBe('1000.00');
  });

  it('should generate a P&L', async () => {
      const balances = new Map();
      balances.set('2', { debit: '0.00', credit: '500.00' });

      (journalRepo.getBalancesByAccount as any).mockResolvedValue(balances);
      (accountRepo.findAll as any).mockResolvedValue([
          { id: '2', name: 'Sales', code: '400', type: 'REVENUE' }
      ]);

      const result = await service.execute('tenant1', 'PROFIT_AND_LOSS', new Date());

      expect(result.lines).toHaveLength(1);
      expect(result.lines[0].balance).toBe('-500.00');
  });
});
