import { type JournalEntryRepository, type AccountRepository, JournalEntry, JournalEntryLine, JournalEntryStatus, JournalEntryType, Invoice, type AuditLogRepository, AuditLog } from '@virteex/domain-accounting-domain';

export class RecordInvoiceUseCase {
  constructor(
    private journalEntryRepository: JournalEntryRepository,
    private accountRepository: AccountRepository,
    private auditLogRepository?: AuditLogRepository
  ) {}

  async execute(tenantId: string, invoice: Invoice, expenseAccountCode: string, payableAccountCode: string, userId: string = 'system'): Promise<void> {
    console.log(`[SUBLEDGER] Recording invoice ${invoice.number} for tenant ${tenantId}`);

    const entry = new JournalEntry(tenantId, `Invoice ${invoice.number} - ${invoice.vendorId || invoice.customerId || ''}`, invoice.issueDate);

    const expenseAccount = await this.accountRepository.findByCode(tenantId, expenseAccountCode);
    const payableAccount = await this.accountRepository.findByCode(tenantId, payableAccountCode);

    if (!expenseAccount || !payableAccount) {
      throw new Error('Expense or Payable account not found');
    }

    entry.addLine(new JournalEntryLine(expenseAccount, invoice.amount, '0.00'));
    entry.addLine(new JournalEntryLine(payableAccount, '0.00', invoice.amount));

    entry.status = JournalEntryStatus.POSTED;
    entry.type = JournalEntryType.REGULAR;
    entry.validateBalance();

    const savedEntry = await this.journalEntryRepository.create(entry);

    if (this.auditLogRepository) {
      await this.auditLogRepository.create(new AuditLog(
        tenantId,
        userId,
        'RECORD_INVOICE_SUBLEDGER',
        'Invoice',
        invoice.id || invoice.number,
        { journalEntryId: savedEntry.id, amount: invoice.amount, taxAmount: invoice.taxAmount }
      ));
    }
  }
}
