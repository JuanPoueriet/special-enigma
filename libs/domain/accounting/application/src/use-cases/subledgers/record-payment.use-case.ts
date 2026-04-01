import { type JournalEntryRepository, type AccountRepository, JournalEntry, JournalEntryLine, JournalEntryStatus, JournalEntryType, Payment, type AuditLogRepository, AuditLog, type AccountsReceivableRepository, type AccountsPayableRepository, InvoiceStatus } from '@virteex/domain-accounting-domain';
import { Decimal } from 'decimal.js';

export class RecordPaymentUseCase {
  constructor(
    private journalEntryRepository: JournalEntryRepository,
    private accountRepository: AccountRepository,
    private arRepository: AccountsReceivableRepository,
    private apRepository: AccountsPayableRepository,
    private auditLogRepository?: AuditLogRepository
  ) {}

  async execute(tenantId: string, payment: Payment, bankAccountCode: string, receivableAccountCode: string, userId: string = 'system'): Promise<void> {
    console.log(`[SUBLEDGER] Recording payment ${payment.reference} for tenant ${tenantId}`);

    const entry = new JournalEntry(tenantId, `Payment ${payment.reference}`, payment.paymentDate);

    const bankAccount = await this.accountRepository.findByCode(tenantId, bankAccountCode);
    const receivableAccount = await this.accountRepository.findByCode(tenantId, receivableAccountCode);

    if (!bankAccount || !receivableAccount) {
      throw new Error('Bank or Receivable account not found');
    }

    entry.addLine(new JournalEntryLine(bankAccount, payment.amount, '0.00'));
    entry.addLine(new JournalEntryLine(receivableAccount, '0.00', payment.amount));

    entry.status = JournalEntryStatus.POSTED;
    entry.type = JournalEntryType.REGULAR;
    entry.validateBalance();

    const savedEntry = await this.journalEntryRepository.create(entry);

    // Update invoice subledger
    // Try to find in AR first, then AP
    let repo: any = this.arRepository;
    let invoice = await this.arRepository.findById(tenantId, payment.invoiceId);

    if (!invoice) {
      invoice = await this.apRepository.findById(tenantId, payment.invoiceId);
      repo = this.apRepository;
    }

    if (invoice) {
      const currentPaid = new Decimal(invoice.paidAmount || '0.00');
      const newPaid = currentPaid.plus(new Decimal(payment.amount));
      invoice.paidAmount = newPaid.toFixed(2);

      const totalAmount = new Decimal(invoice.amount);
      if (newPaid.greaterThanOrEqualTo(totalAmount)) {
        invoice.status = InvoiceStatus.PAID;
      } else {
        invoice.status = InvoiceStatus.PARTIAL;
      }

      await repo.save(invoice);
    }

    if (this.auditLogRepository) {
      await this.auditLogRepository.create(new AuditLog(
        tenantId,
        userId,
        'RECORD_PAYMENT_SUBLEDGER',
        'Payment',
        payment.id || payment.reference,
        { journalEntryId: savedEntry.id, amount: payment.amount, reference: payment.reference }
      ));
    }
  }
}
