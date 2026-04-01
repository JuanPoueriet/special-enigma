import { vi, describe, it, expect, beforeEach } from 'vitest';
import { RecordInvoiceUseCase } from './record-invoice.use-case';
import {
    type JournalEntryRepository,
    type AccountRepository,
    type AccountsReceivableRepository,
    type AccountsPayableRepository,
    Account,
    Invoice,
    JournalEntryStatus
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
        save: vi.fn().mockImplementation((invoice) => Promise.resolve(invoice)),
    } as unknown as AccountsReceivableRepository;

    apRepo = {
        save: vi.fn().mockImplementation((invoice) => Promise.resolve(invoice)),
    } as unknown as AccountsPayableRepository;

    service = new RecordInvoiceUseCase(journalRepo, accountRepo, arRepo, apRepo);
  });

  it('should record receivable invoice and persist in AR repository', async () => {
    const tenantId = 'tenant1';
    const invoice = new Invoice(tenantId, 'INV-001', 'RECEIVABLE');
    invoice.amount = '1000.00';
    invoice.issueDate = new Date();

    await service.execute(tenantId, invoice, '401', '101');

    expect(journalRepo.create).toHaveBeenCalled();
    expect(arRepo.save).toHaveBeenCalledWith(invoice);
    expect(apRepo.save).not.toHaveBeenCalled();
  });

  it('should record payable invoice and persist in AP repository', async () => {
    const tenantId = 'tenant1';
    const invoice = new Invoice(tenantId, 'INV-002', 'PAYABLE');
    invoice.amount = '500.00';
    invoice.issueDate = new Date();

    await service.execute(tenantId, invoice, '501', '201');

    expect(journalRepo.create).toHaveBeenCalled();
    expect(apRepo.save).toHaveBeenCalledWith(invoice);
    expect(arRepo.save).not.toHaveBeenCalled();
  });
});
