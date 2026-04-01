import { vi, describe, it, expect, beforeEach } from 'vitest';
import { GenerateFinancialReportUseCase } from './generate-financial-report.use-case';
import { type JournalEntryRepository, type AccountRepository } from '@virteex/domain-accounting-domain';

describe('GenerateFinancialReportUseCase Hardening', () => {
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

  it('should pass dimensions to repository', async () => {
    const dimensions = { costCenter: 'CC1' };
    (journalRepo.getBalancesByAccount as any).mockResolvedValue(new Map());
    (accountRepo.findAll as any).mockResolvedValue([]);

    await service.execute('tenant1', 'BALANCE_SHEET', new Date(), dimensions);

    expect(journalRepo.getBalancesByAccount).toHaveBeenCalledWith('tenant1', undefined, expect.any(Date), dimensions);
  });
});
