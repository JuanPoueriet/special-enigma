import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AccountingController } from './accounting.controller';
import {
  type AccountingCommandFacade,
  type AccountingQueryFacade,
} from '@virteex/domain-accounting-application';
import { AccountType } from '@virteex/domain-accounting-contracts';

describe('AccountingController', () => {
  let controller: AccountingController;

  const mockCommandFacade = {
    createAccount: vi.fn(),
    recordJournalEntry: vi.fn(),
    setupChartOfAccounts: vi.fn(),
    closeFiscalPeriod: vi.fn(),
  };
  const mockQueryFacade = {
    getAccounts: vi.fn(),
    getJournalEntries: vi.fn(),
    countJournalEntries: vi.fn(),
    generateFinancialReport: vi.fn(),
  };

  beforeEach(async () => {
    controller = new AccountingController(
      mockCommandFacade as unknown as AccountingCommandFacade,
      mockQueryFacade as unknown as AccountingQueryFacade,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAccount', () => {
    it('should call commandFacade.createAccount', async () => {
      const dto = { code: '101', name: 'Cash', type: AccountType.ASSET };
      const tenantId = 'tenant-1';
      await controller.createAccount(tenantId, dto);
      expect(mockCommandFacade.createAccount).toHaveBeenCalledWith({ ...dto, tenantId });
    });
  });

  describe('getAccounts', () => {
    it('should call queryFacade.getAccounts', async () => {
      const tenantId = 'tenant-1';
      await controller.getAccounts(tenantId);
      expect(mockQueryFacade.getAccounts).toHaveBeenCalledWith(tenantId);
    });
  });
});
