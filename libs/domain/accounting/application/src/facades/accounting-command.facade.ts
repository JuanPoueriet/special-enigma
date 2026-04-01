import { Injectable, Inject } from '@nestjs/common';
import {
  CreateAccountUseCase,
} from '../use-cases/accounts/create-account.use-case';
import {
  RecordJournalEntryUseCase,
} from '../use-cases/journal-entries/record-journal-entry.use-case';
import {
  SetupChartOfAccountsUseCase,
} from '../use-cases/accounts/setup-chart-of-accounts.use-case';
import {
  CloseFiscalPeriodUseCase,
} from '../use-cases/fiscal-periods/close-fiscal-period.use-case';
import {
  ConsolidateAccountsUseCase,
} from '../use-cases/consolidation/consolidate-accounts.use-case';
import {
  BankReconciliationUseCase,
} from '../use-cases/bank/bank-reconciliation.use-case';
import { RecordInvoiceUseCase } from '../use-cases/subledgers/record-invoice.use-case';
import { RecordPaymentUseCase } from '../use-cases/subledgers/record-payment.use-case';
import { CreateAccountDto, RecordJournalEntryDto, RecordInvoiceDto, RecordPaymentDto } from '@virteex/domain-accounting-contracts';
import { CLOSING_TASK_REPOSITORY, type ClosingTaskRepository, type ClosingTaskStatus, Invoice, Payment } from '@virteex/domain-accounting-domain';

@Injectable()
export class AccountingCommandFacade {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly recordJournalEntryUseCase: RecordJournalEntryUseCase,
    private readonly setupChartOfAccountsUseCase: SetupChartOfAccountsUseCase,
    private readonly closeFiscalPeriodUseCase: CloseFiscalPeriodUseCase,
    private readonly consolidateAccountsUseCase: ConsolidateAccountsUseCase,
    private readonly bankReconciliationUseCase: BankReconciliationUseCase,
    private readonly recordInvoiceUseCase: RecordInvoiceUseCase,
    private readonly recordPaymentUseCase: RecordPaymentUseCase,
    @Inject(CLOSING_TASK_REPOSITORY) private readonly closingTaskRepository: ClosingTaskRepository,
  ) {}

  async createAccount(dto: CreateAccountDto & { tenantId: string }) {
    return this.createAccountUseCase.execute(dto);
  }

  async recordJournalEntry(dto: RecordJournalEntryDto & { tenantId: string; userId?: string }) {
    return this.recordJournalEntryUseCase.execute(dto);
  }

  async setupChartOfAccounts(tenantId: string) {
    return this.setupChartOfAccountsUseCase.execute(tenantId);
  }

  async closeFiscalPeriod(tenantId: string, closingDate: Date, userId: string = 'system') {
    return this.closeFiscalPeriodUseCase.execute(tenantId, closingDate, userId);
  }

  async reopenFiscalPeriod(tenantId: string, closingDate: Date, userId: string = 'system', reason?: string, approverId?: string, hasOverridePermission: boolean = false) {
    return this.closeFiscalPeriodUseCase.reopen(tenantId, closingDate, userId, reason, approverId, hasOverridePermission);
  }

  async consolidateAccounts(targetTenantId: string, sourceTenantIds: string[], asOfDate: Date) {
    return this.consolidateAccountsUseCase.execute(targetTenantId, sourceTenantIds, asOfDate);
  }

  async updateClosingTask(tenantId: string, taskId: string, status: ClosingTaskStatus, userId: string, evidenceUrl?: string) {
    const task = await this.closingTaskRepository.findById(tenantId, taskId);
    if (!task) throw new Error('Task not found');

    if (status === 'COMPLETED') {
        task.complete(userId, evidenceUrl);
    } else {
        task.reset();
    }
    return this.closingTaskRepository.save(task);
  }

  async bankReconciliation(tenantId: string, accountId: string, statementLines: any[], rules?: any) {
    const lines = statementLines.map(l => ({ ...l, date: new Date(l.date) }));
    return this.bankReconciliationUseCase.execute(tenantId, accountId, lines, rules);
  }

  async recordInvoice(tenantId: string, dto: RecordInvoiceDto, userId: string = 'system') {
    const invoice = new Invoice(tenantId, dto.number, dto.type);
    invoice.issueDate = new Date(dto.issueDate);
    invoice.dueDate = new Date(dto.dueDate);
    invoice.currency = dto.currency;
    invoice.amount = dto.amount;
    invoice.taxAmount = dto.taxAmount || '0.00';
    invoice.vendorId = dto.vendorId;
    invoice.customerId = dto.customerId;
    invoice.notes = dto.notes;
    invoice.lineItems = (dto.lineItems || []) as any;

    return this.recordInvoiceUseCase.execute(tenantId, invoice, dto.expenseAccountCode, dto.payableAccountCode, userId);
  }

  async recordPayment(tenantId: string, dto: RecordPaymentDto, userId: string = 'system') {
    const payment = new Payment(tenantId, 'N/A', dto.amount, new Date(dto.paymentDate));
    payment.reference = dto.reference;

    return this.recordPaymentUseCase.execute(tenantId, payment, dto.bankAccountCode, dto.receivableAccountCode, userId);
  }
}
