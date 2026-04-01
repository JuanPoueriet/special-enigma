import { Global, Module, Logger } from '@nestjs/common';
import { AccountingInfrastructureModule } from './accounting-infrastructure.module';
import {
  ACCOUNT_REPOSITORY,
  JOURNAL_ENTRY_REPOSITORY,
  OUTBOX_REPOSITORY,
  POLICY_REPOSITORY,
  FISCAL_PERIOD_REPOSITORY,
  CLOSING_TASK_REPOSITORY,
  AUDIT_LOG_REPOSITORY,
  FINANCIAL_REPORT_SNAPSHOT_REPOSITORY,
  BANK_RECONCILIATION_REPOSITORY,
  ACCOUNTS_PAYABLE_REPOSITORY,
  ACCOUNTS_RECEIVABLE_REPOSITORY,
  AccountRepository,
  JournalEntryRepository,
  OutboxRepository,
  PolicyRepository,
  FiscalPeriodRepository,
  ClosingTaskRepository,
  AuditLogRepository,
  FinancialReportSnapshotRepository,
  BankReconciliationRepository,
  AccountsPayableRepository,
  AccountsReceivableRepository,
} from '@virteex/domain-accounting-domain';
import {
  TELEMETRY_SERVICE,
  type ITelemetryService,
} from '@virteex/kernel-telemetry';
import { EntitlementService } from '@virteex/kernel-entitlements';
import {
  I_UNIT_OF_WORK,
  IUnitOfWork,
  DimensionValidator,
  AccountingPolicyService,
  AccountingEventHandlerService,
  CreateAccountUseCase,
  RecordJournalEntryUseCase,
  GetAccountsUseCase,
  GetJournalEntriesUseCase,
  GetAccountsByIdsUseCase,
  CountJournalEntriesUseCase,
  SetupChartOfAccountsUseCase,
  GenerateFinancialReportUseCase,
  GetMonthlyOpexUseCase,
  CloseFiscalPeriodUseCase,
  ConsolidateAccountsUseCase,
  BankReconciliationUseCase,
  RecordPaymentUseCase,
  AccountingCommandFacade,
  AccountingQueryFacade,
} from '@virteex/domain-accounting-application';

@Global()
@Module({
  imports: [AccountingInfrastructureModule],
  providers: [
    AccountingCommandFacade,
    {
      provide: AccountingQueryFacade,
      useFactory: (
        getAcc: GetAccountsUseCase,
        getJE: GetJournalEntriesUseCase,
        countJE: CountJournalEntriesUseCase,
        genReport: GenerateFinancialReportUseCase,
        getOpex: GetMonthlyOpexUseCase,
        fpRepo: FiscalPeriodRepository,
        ctRepo: ClosingTaskRepository,
      ) =>
        new AccountingQueryFacade(
          getAcc,
          getJE,
          countJE,
          genReport,
          getOpex,
          fpRepo,
          ctRepo,
        ),
      inject: [
        GetAccountsUseCase,
        GetJournalEntriesUseCase,
        CountJournalEntriesUseCase,
        GenerateFinancialReportUseCase,
        GetMonthlyOpexUseCase,
        FISCAL_PERIOD_REPOSITORY,
        CLOSING_TASK_REPOSITORY,
      ],
    },
    {
      provide: DimensionValidator,
      useValue: new DimensionValidator(),
    },
    {
      provide: AccountingPolicyService,
      useFactory: (repo?: PolicyRepository) =>
        new AccountingPolicyService(repo),
      inject: [{ token: POLICY_REPOSITORY, optional: true }],
    },
    {
      provide: AccountingEventHandlerService,
      useFactory: (
        recordJE: RecordJournalEntryUseCase,
        policy: AccountingPolicyService,
        accRepo: AccountRepository,
      ) => {
        const nestLogger = new Logger(AccountingEventHandlerService.name);
        return new AccountingEventHandlerService(recordJE, policy, accRepo, {
          debug: (msg, ...args) => nestLogger.debug(msg, ...args),
          info: (msg, ...args) => nestLogger.log(msg, ...args),
          warn: (msg, ...args) => nestLogger.warn(msg, ...args),
          error: (msg, ...args) => nestLogger.error(msg, ...args),
        });
      },
      inject: [
        RecordJournalEntryUseCase,
        AccountingPolicyService,
        ACCOUNT_REPOSITORY,
      ],
    },
    {
      provide: CreateAccountUseCase,
      useFactory: (
        repo: AccountRepository,
        outbox: OutboxRepository,
        telemetry: ITelemetryService,
      ) => new CreateAccountUseCase(repo, outbox, telemetry),
      inject: [ACCOUNT_REPOSITORY, OUTBOX_REPOSITORY, TELEMETRY_SERVICE],
    },
    {
      provide: RecordJournalEntryUseCase,
      useFactory: (
        jeRepo: JournalEntryRepository,
        accRepo: AccountRepository,
        fpRepo: FiscalPeriodRepository,
        telemetry: ITelemetryService,
        entitlement: EntitlementService,
        uow: IUnitOfWork,
        auditRepo?: AuditLogRepository,
      ) => new RecordJournalEntryUseCase(jeRepo, accRepo, fpRepo, telemetry, entitlement, uow, auditRepo),
      inject: [
        JOURNAL_ENTRY_REPOSITORY,
        ACCOUNT_REPOSITORY,
        FISCAL_PERIOD_REPOSITORY,
        TELEMETRY_SERVICE,
        EntitlementService,
        I_UNIT_OF_WORK,
        { token: AUDIT_LOG_REPOSITORY, optional: true },
      ],
    },
    {
      provide: GetAccountsUseCase,
      useFactory: (
        accRepo: AccountRepository,
        jeRepo: JournalEntryRepository,
      ) => new GetAccountsUseCase(accRepo, jeRepo),
      inject: [ACCOUNT_REPOSITORY, JOURNAL_ENTRY_REPOSITORY],
    },
    {
      provide: GetJournalEntriesUseCase,
      useFactory: (repo: JournalEntryRepository) =>
        new GetJournalEntriesUseCase(repo),
      inject: [JOURNAL_ENTRY_REPOSITORY],
    },
    {
      provide: GetAccountsByIdsUseCase,
      useFactory: (
        accRepo: AccountRepository,
        jeRepo: JournalEntryRepository,
      ) => new GetAccountsByIdsUseCase(accRepo, jeRepo),
      inject: [ACCOUNT_REPOSITORY, JOURNAL_ENTRY_REPOSITORY],
    },
    {
      provide: CountJournalEntriesUseCase,
      useFactory: (repo: JournalEntryRepository) =>
        new CountJournalEntriesUseCase(repo),
      inject: [JOURNAL_ENTRY_REPOSITORY],
    },
    {
      provide: GetMonthlyOpexUseCase,
      useFactory: (jeRepo: JournalEntryRepository, accRepo: AccountRepository) =>
        new GetMonthlyOpexUseCase(jeRepo, accRepo),
      inject: [JOURNAL_ENTRY_REPOSITORY, ACCOUNT_REPOSITORY],
    },
    {
      provide: SetupChartOfAccountsUseCase,
      useFactory: (repo: AccountRepository) =>
        new SetupChartOfAccountsUseCase(repo),
      inject: [ACCOUNT_REPOSITORY],
    },
    {
      provide: GenerateFinancialReportUseCase,
      useFactory: (
        jeRepo: JournalEntryRepository,
        accRepo: AccountRepository,
        apRepo: AccountsPayableRepository,
        arRepo: AccountsReceivableRepository,
        snapshotRepo?: FinancialReportSnapshotRepository,
      ) => new GenerateFinancialReportUseCase(jeRepo, accRepo, apRepo, arRepo, snapshotRepo),
      inject: [
        JOURNAL_ENTRY_REPOSITORY,
        ACCOUNT_REPOSITORY,
        ACCOUNTS_PAYABLE_REPOSITORY,
        ACCOUNTS_RECEIVABLE_REPOSITORY,
        { token: FINANCIAL_REPORT_SNAPSHOT_REPOSITORY, optional: true },
      ],
    },
    {
      provide: CloseFiscalPeriodUseCase,
      useFactory: (
        jeRepo: JournalEntryRepository,
        accRepo: AccountRepository,
        fpRepo: FiscalPeriodRepository,
        ctRepo: ClosingTaskRepository,
        policySvc: AccountingPolicyService,
        auditRepo?: AuditLogRepository,
      ) => new CloseFiscalPeriodUseCase(jeRepo, accRepo, fpRepo, ctRepo, policySvc, auditRepo),
      inject: [
        JOURNAL_ENTRY_REPOSITORY,
        ACCOUNT_REPOSITORY,
        FISCAL_PERIOD_REPOSITORY,
        CLOSING_TASK_REPOSITORY,
        AccountingPolicyService,
        { token: AUDIT_LOG_REPOSITORY, optional: true },
      ],
    },
    {
      provide: ConsolidateAccountsUseCase,
      useFactory: (
        jeRepo: JournalEntryRepository,
        accRepo: AccountRepository,
        policyRepo: PolicyRepository,
      ) => new ConsolidateAccountsUseCase(jeRepo, accRepo, policyRepo),
      inject: [
        JOURNAL_ENTRY_REPOSITORY,
        ACCOUNT_REPOSITORY,
        POLICY_REPOSITORY,
      ],
    },
    {
      provide: BankReconciliationUseCase,
      useFactory: (
        jeRepo: JournalEntryRepository,
        reconRepo: BankReconciliationRepository,
      ) => new BankReconciliationUseCase(jeRepo, reconRepo),
      inject: [
        JOURNAL_ENTRY_REPOSITORY,
        BANK_RECONCILIATION_REPOSITORY,
      ],
    },
    {
      provide: 'RecordPaymentUseCase',
      useFactory: (
        jeRepo: JournalEntryRepository,
        accRepo: AccountRepository,
        arRepo: AccountsReceivableRepository,
        apRepo: AccountsPayableRepository,
        auditRepo?: AuditLogRepository,
      ) => new RecordPaymentUseCase(jeRepo, accRepo, arRepo, apRepo, auditRepo),
      inject: [
        JOURNAL_ENTRY_REPOSITORY,
        ACCOUNT_REPOSITORY,
        ACCOUNTS_RECEIVABLE_REPOSITORY,
        ACCOUNTS_PAYABLE_REPOSITORY,
        { token: AUDIT_LOG_REPOSITORY, optional: true },
      ],
    },
  ],
  exports: [
    AccountingPolicyService,
    AccountingEventHandlerService,
    DimensionValidator,
    CreateAccountUseCase,
    RecordJournalEntryUseCase,
    GetAccountsUseCase,
    GetAccountsByIdsUseCase,
    GetJournalEntriesUseCase,
    CountJournalEntriesUseCase,
    SetupChartOfAccountsUseCase,
    GenerateFinancialReportUseCase,
    CloseFiscalPeriodUseCase,
    ConsolidateAccountsUseCase,
    BankReconciliationUseCase,
    AccountingCommandFacade,
    AccountingQueryFacade,
  ],
})
export class AccountingApplicationWiringModule {}
