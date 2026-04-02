import { EntitySchema } from '@mikro-orm/core';
import {
  Account,
  JournalEntry,
  JournalEntryLine,
  FiscalYear,
  FiscalYearStatus,
  AccountingPolicy,
  AccountType,
  JournalEntryStatus,
  JournalEntryType,
  FiscalPeriod,
  FiscalPeriodStatus,
  ClosingTask,
  ClosingTaskStatus,
  Invoice,
  InvoiceStatus,
  Payment,
  BankReconciliation,
  BankReconciliationStatus,
  BankStatementLine,
  BankStatementLineStatus,
  AuditLog,
  FinancialReportSnapshot
} from '@virtex/domain-accounting-domain';

export const AccountSchema = new EntitySchema<Account>({
  class: Account,
  uniques: [{ properties: ['tenantId', 'code'] }],
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    code: { type: 'string' },
    name: { type: 'string' },
    type: { enum: true, items: () => AccountType },
    parent: { kind: 'm:1', entity: () => 'Account', nullable: true },
    level: { type: 'number' },
    isControl: { type: 'boolean', default: false },
    currency: { type: 'string', nullable: true },
    domainEvents: { type: 'json', persist: false },
  },
});

export const FiscalPeriodSchema = new EntitySchema<FiscalPeriod>({
  class: FiscalPeriod,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    fiscalYearId: { type: 'string' },
    periodNumber: { type: 'number' },
    startDate: { type: 'date' },
    endDate: { type: 'date' },
    status: { enum: true, items: () => FiscalPeriodStatus, default: FiscalPeriodStatus.OPEN },
    isLocked: { type: 'boolean', default: false },
    closedAt: { type: 'date', nullable: true },
    closedBy: { type: 'string', nullable: true },
    domainEvents: { type: 'json', persist: false },
  },
});

export const ClosingTaskSchema = new EntitySchema<ClosingTask>({
  class: ClosingTask,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    fiscalPeriodId: { type: 'string', index: true },
    title: { type: 'string' },
    status: { enum: true, items: () => ClosingTaskStatus, default: ClosingTaskStatus.PENDING },
    description: { type: 'string' },
    requiredEvidence: { type: 'boolean', default: false },
    evidenceProvided: { type: 'boolean', default: false },
    evidenceUrl: { type: 'string', nullable: true },
    completedAt: { type: 'date', nullable: true },
    completedBy: { type: 'string', nullable: true },
  },
});

export const InvoiceSchema = new EntitySchema<Invoice>({
  class: Invoice,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    vendorId: { type: 'string', nullable: true },
    customerId: { type: 'string', nullable: true },
    number: { type: 'string' },
    issueDate: { type: 'date' },
    dueDate: { type: 'date' },
    currency: { type: 'string' },
    amount: { type: 'string' },
    paidAmount: { type: 'string', default: '0.00' },
    taxAmount: { type: 'string', default: '0.00' },
    status: { enum: true, items: () => InvoiceStatus },
    type: { type: 'string' },
    notes: { type: 'string', nullable: true },
    lineItems: { type: 'json', default: [] },
  },
});

export const PaymentSchema = new EntitySchema<Payment>({
  class: Payment,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    invoiceId: { type: 'string', index: true },
    amount: { type: 'string' },
    paymentDate: { type: 'date' },
    reference: { type: 'string' },
    method: { type: 'string' },
  },
});

export const BankReconciliationSchema = new EntitySchema<BankReconciliation>({
  class: BankReconciliation,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    accountId: { type: 'string', index: true },
    statementDate: { type: 'date' },
    matchedEntriesCount: { type: 'number', default: 0 },
    unmatchedEntriesCount: { type: 'number', default: 0 },
    status: { enum: true, items: () => BankReconciliationStatus, default: BankReconciliationStatus.PENDING },
    completedAt: { type: 'date', nullable: true },
    completedBy: { type: 'string', nullable: true },
    lines: { kind: '1:m', entity: () => 'BankStatementLine', mappedBy: 'reconciliation', orphanRemoval: true },
  },
});

export const BankStatementLineSchema = new EntitySchema<BankStatementLine>({
  class: BankStatementLine,
  properties: {
    id: { primary: true, type: 'uuid' },
    reconciliation: { kind: 'm:1', entity: () => 'BankReconciliation' },
    date: { type: 'date' },
    description: { type: 'string' },
    amount: { type: 'string' },
    reference: { type: 'string' },
    status: { enum: true, items: () => BankStatementLineStatus, default: BankStatementLineStatus.UNMATCHED },
    matchedJournalEntryId: { type: 'string', nullable: true },
    notes: { type: 'string', nullable: true },
  },
});

export const AuditLogSchema = new EntitySchema<AuditLog>({
  class: AuditLog,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    userId: { type: 'string', index: true },
    action: { type: 'string' },
    entityType: { type: 'string' },
    entityId: { type: 'string' },
    details: { type: 'json' },
    createdAt: { type: 'date' },
  },
});

export const FinancialReportSnapshotSchema = new EntitySchema<FinancialReportSnapshot>({
  class: FinancialReportSnapshot,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    type: { type: 'string' },
    endDate: { type: 'date' },
    generatedAt: { type: 'date' },
    data: { type: 'json' },
    version: { type: 'number' },
    userId: { type: 'string' },
  },
});

export const JournalEntrySchema = new EntitySchema<JournalEntry>({
  class: JournalEntry,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    date: { type: 'date', index: true },
    description: { type: 'string' },
    status: { enum: true, items: () => JournalEntryStatus, default: JournalEntryStatus.DRAFT },
    type: { enum: true, items: () => JournalEntryType, default: JournalEntryType.REGULAR },
    reference: { type: 'string', nullable: true },
    dimensions: { type: 'json', nullable: true },
    lines: { kind: '1:m', entity: () => 'JournalEntryLine', mappedBy: 'journalEntry', orphanRemoval: true },
    domainEvents: { type: 'json', persist: false },
  },
});

export const JournalEntryLineSchema = new EntitySchema<JournalEntryLine>({
  class: JournalEntryLine,
  properties: {
    id: { primary: true, type: 'uuid' },
    journalEntry: { kind: 'm:1', entity: () => 'JournalEntry' },
    account: { kind: 'm:1', entity: () => 'Account' },
    debit: { type: 'string', default: '0' },
    credit: { type: 'string', default: '0' },
    description: { type: 'string', nullable: true },
    currencyId: { type: 'string', nullable: true },
    amountCurrency: { type: 'string', nullable: true },
    exchangeRate: { type: 'string', nullable: true },
  },
});

export const FiscalYearSchema = new EntitySchema<FiscalYear>({
  class: FiscalYear,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    year: { type: 'number' },
    status: { enum: true, items: () => FiscalYearStatus, default: FiscalYearStatus.OPEN },
    startDate: { type: 'date' },
    endDate: { type: 'date' },
    domainEvents: { type: 'json', persist: false },
  },
});

export const AccountingPolicySchema = new EntitySchema<AccountingPolicy>({
  class: AccountingPolicy,
  uniques: [{ properties: ['tenantId', 'type'] }],
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string', index: true },
    type: { type: 'string' },
    rules: { type: 'json' },
    domainEvents: { type: 'json', persist: false },
  },
});
