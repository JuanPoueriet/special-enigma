import { vi, describe, it, expect, beforeEach } from 'vitest';
import { RecordInvoiceUseCase } from './record-invoice.use-case';
import {
    type JournalEntryRepository,
    type AccountRepository,
    type AccountsReceivableRepository,
    type AccountsPayableRepository,
    Account,
    Invoice,
} from '@virteex/domain-accounting-domain';
import { AccountType } from '@virteex/domain-accounting-contracts';

describe('RecordInvoiceUseCase', () => {
  let service: RecordInvoiceUseCase;
  let journalRepo: JournalEntryRepository;
  let accountRepo: AccountRepository;
  let arRepo: AccountsReceivableRepository;
  let apRepo: AccountsPayableRepository;

  beforeEach(() => {
    journalRepo = {
      create: vi.fn().mockImplementation((entry) => Promise.resolve({ ...entry, id: 'entry1' })),
    } as unknown as JournalEntryRepository;

    accountRepo = {
      findByCode: vi.fn().mockImplementation((tenantId, code) => {
          const acc = new Account(tenantId, code, 'Account ' + code, AccountType.ASSET as any);
          acc.id = 'acc-' + code;
          return Promise.resolve(acc);
      }),
    } as unknown as AccountRepository;

    arRepo = {
        countByTenant: vi.fn().mockResolvedValue(0),
    } as unknown as AccountsReceivableRepository;

    apRepo = {
        countByTenant: vi.fn().mockResolvedValue(0),
    } as unknown as AccountsPayableRepository;

    const entitlementService = {
        checkQuota: vi.fn().mockResolvedValue({}),
    };

    const auditRepo = {
        create: vi.fn().mockResolvedValue({}),
    };

    service = new RecordInvoiceUseCase(journalRepo, accountRepo, arRepo, apRepo, entitlementService as any, auditRepo as any);
  });

  it('should record an invoice and check quota', async () => {
    const tenantId = 'tenant1';
    const invoice = new Invoice(tenantId, 'INV-001', 'RECEIVABLE');
    invoice.issueDate = new Date();
    invoice.amount = '100.00';

    await service.execute(tenantId, invoice, '600', '102');

    expect(journalRepo.create).toHaveBeenCalled();
    expect(arRepo.countByTenant).toHaveBeenCalledWith(tenantId);
  });
});
