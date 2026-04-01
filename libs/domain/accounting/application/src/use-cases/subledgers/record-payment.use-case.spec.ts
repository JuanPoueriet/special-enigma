import { vi, describe, it, expect, beforeEach } from 'vitest';
import { RecordPaymentUseCase } from './record-payment.use-case';
import {
    type JournalEntryRepository,
    type AccountRepository,
    type AccountsReceivableRepository,
    type AccountsPayableRepository,
    Account,
    Payment,
    Invoice,
    InvoiceStatus
} from '@virteex/domain-accounting-domain';
import { AccountType } from '@virteex/domain-accounting-contracts';

describe('RecordPaymentUseCase', () => {
  let service: RecordPaymentUseCase;
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
        findById: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockImplementation((invoice) => Promise.resolve(invoice)),
    } as unknown as AccountsReceivableRepository;

    apRepo = {
        findById: vi.fn().mockResolvedValue(null),
        save: vi.fn().mockImplementation((invoice) => Promise.resolve(invoice)),
    } as unknown as AccountsPayableRepository;

    const auditRepo = {
        create: vi.fn().mockResolvedValue({}),
        countByType: vi.fn().mockResolvedValue(0),
    };

    const entitlementService = {
        checkQuota: vi.fn().mockResolvedValue({}),
    };

    service = new RecordPaymentUseCase(journalRepo, accountRepo, arRepo, apRepo, entitlementService as any, auditRepo as any);
  });

  it('should record payment and update AR invoice status to PAID when fully paid', async () => {
    const tenantId = 'tenant1';
    const invoiceId = 'inv-1';
    const invoice = new Invoice(tenantId, 'INV-001', 'RECEIVABLE');
    invoice.id = invoiceId;
    invoice.amount = '100.00';
    invoice.paidAmount = '0.00';
    invoice.status = InvoiceStatus.SENT;

    (arRepo.findById as any).mockResolvedValue(invoice);

    const payment = new Payment(tenantId, invoiceId, '100.00', new Date());
    payment.reference = 'PAY-001';

    await service.execute(tenantId, payment, '101', '102');

    expect(journalRepo.create).toHaveBeenCalled();
    expect(arRepo.save).toHaveBeenCalled();
    expect(invoice.paidAmount).toBe('100.00');
    expect(invoice.status).toBe(InvoiceStatus.PAID);
  });

  it('should record payment and update AR invoice status to PARTIAL when partially paid', async () => {
    const tenantId = 'tenant1';
    const invoiceId = 'inv-1';
    const invoice = new Invoice(tenantId, 'INV-001', 'RECEIVABLE');
    invoice.id = invoiceId;
    invoice.amount = '100.00';
    invoice.paidAmount = '0.00';
    invoice.status = InvoiceStatus.SENT;

    (arRepo.findById as any).mockResolvedValue(invoice);

    const payment = new Payment(tenantId, invoiceId, '40.00', new Date());
    payment.reference = 'PAY-001';

    await service.execute(tenantId, payment, '101', '102');

    expect(arRepo.save).toHaveBeenCalled();
    expect(invoice.paidAmount).toBe('40.00');
    expect(invoice.status).toBe(InvoiceStatus.PARTIAL);
  });

  it('should throw error when overpaid', async () => {
    const tenantId = 'tenant1';
    const invoiceId = 'inv-1';
    const invoice = new Invoice(tenantId, 'INV-001', 'RECEIVABLE');
    invoice.id = invoiceId;
    invoice.amount = '100.00';
    invoice.paidAmount = '90.00';
    invoice.status = InvoiceStatus.PARTIAL;

    (arRepo.findById as any).mockResolvedValue(invoice);

    const payment = new Payment(tenantId, invoiceId, '20.00', new Date());
    payment.reference = 'PAY-001';

    await expect(service.execute(tenantId, payment, '101', '102'))
      .rejects.toThrow(/Overpayment detected/);
  });
});
