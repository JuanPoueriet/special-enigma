import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MikroOrmModule as NestMikroOrmModule } from '@mikro-orm/nestjs';
import {
  ACCOUNT_REPOSITORY,
  JOURNAL_ENTRY_REPOSITORY,
  POLICY_REPOSITORY,
  OUTBOX_REPOSITORY,
  FISCAL_PERIOD_REPOSITORY,
  CLOSING_TASK_REPOSITORY,
  ACCOUNTS_PAYABLE_REPOSITORY,
  ACCOUNTS_RECEIVABLE_REPOSITORY,
  BANK_RECONCILIATION_REPOSITORY,
  AUDIT_LOG_REPOSITORY,
  FINANCIAL_REPORT_SNAPSHOT_REPOSITORY,
} from '@virtex/domain-accounting-domain';
import { TELEMETRY_SERVICE } from '@virtex/kernel-telemetry';
import {
  MESSAGE_BROKER,
  I_UNIT_OF_WORK,
  DimensionValidator,
  ACCOUNTING_EVENT_CONSUMER_PORT,
} from '@virtex/domain-accounting-application';
import { ACCOUNTING_REPORTING_PORT } from '@virtex/domain-accounting-contracts';
import { TelemetryService } from '@virtex/kernel-telemetry';
import { MikroOrmAccountRepository } from './persistence/repositories/mikro-orm-account.repository';
import { JournalEntryRepositoryAdapter } from './persistence/repositories/journal-entry-repository-adapter';
import { MikroOrmReportingAdapter } from './persistence/repositories/mikro-orm-reporting-adapter';
import { MikroOrmUnitOfWorkAdapter } from './persistence/repositories/mikro-orm-unit-of-work-adapter';
import { MikroOrmPolicyRepository } from './persistence/repositories/mikro-orm-policy.repository';
import { MikroOrmOutboxRepository } from './persistence/repositories/mikro-orm-outbox.repository';
import { MikroOrmFiscalPeriodRepository } from './persistence/repositories/mikro-orm-fiscal-period.repository';
import { MikroOrmClosingTaskRepository } from './persistence/repositories/mikro-orm-closing-task.repository';
import { MikroOrmAccountsPayableRepository } from './persistence/repositories/mikro-orm-accounts-payable.repository';
import { MikroOrmAccountsReceivableRepository } from './persistence/repositories/mikro-orm-accounts-receivable.repository';
import { MikroOrmBankReconciliationRepository } from './persistence/repositories/mikro-orm-bank-reconciliation.repository';
import { MikroOrmAuditLogRepository } from './persistence/repositories/mikro-orm-audit-log.repository';
import { MikroOrmFinancialReportSnapshotRepository } from './persistence/repositories/mikro-orm-financial-report-snapshot.repository';
import {
  AccountSchema,
  JournalEntrySchema,
  JournalEntryLineSchema,
  FiscalYearSchema,
  FiscalPeriodSchema,
  ClosingTaskSchema,
  InvoiceSchema,
  PaymentSchema,
  BankReconciliationSchema,
  BankStatementLineSchema,
  AccountingPolicySchema,
  AuditLogSchema,
  FinancialReportSnapshotSchema,
} from './persistence/orm/mikro-orm.schemas';
import { OutboxMessageSchema } from './persistence/orm/outbox.schema';
import { OutboxRelayService } from './messaging/outbox/outbox-relay.service';
import { KafkaMessageBroker } from './messaging/producers/kafka-message-broker';
import { AccountingEventConsumerService } from './messaging/consumers/accounting-event-consumer.service';

@Global()
@Module({
  imports: [
    ScheduleModule.forRoot(),
    NestMikroOrmModule.forFeature([
      AccountSchema,
      JournalEntrySchema,
      JournalEntryLineSchema,
      FiscalYearSchema,
      FiscalPeriodSchema,
      ClosingTaskSchema,
      InvoiceSchema,
      PaymentSchema,
      BankReconciliationSchema,
      BankStatementLineSchema,
      AccountingPolicySchema,
      AuditLogSchema,
      FinancialReportSnapshotSchema,
      OutboxMessageSchema,
    ]),
  ],
  providers: [
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: MikroOrmAccountRepository,
    },
    {
      provide: JOURNAL_ENTRY_REPOSITORY,
      useClass: JournalEntryRepositoryAdapter,
    },
    {
      provide: ACCOUNTING_REPORTING_PORT,
      useClass: MikroOrmReportingAdapter,
    },
    {
      provide: I_UNIT_OF_WORK,
      useClass: MikroOrmUnitOfWorkAdapter,
    },
    {
      provide: POLICY_REPOSITORY,
      useClass: MikroOrmPolicyRepository,
    },
    {
      provide: OUTBOX_REPOSITORY,
      useClass: MikroOrmOutboxRepository,
    },
    {
      provide: FISCAL_PERIOD_REPOSITORY,
      useClass: MikroOrmFiscalPeriodRepository,
    },
    {
      provide: CLOSING_TASK_REPOSITORY,
      useClass: MikroOrmClosingTaskRepository,
    },
    {
      provide: ACCOUNTS_PAYABLE_REPOSITORY,
      useClass: MikroOrmAccountsPayableRepository,
    },
    {
      provide: ACCOUNTS_RECEIVABLE_REPOSITORY,
      useClass: MikroOrmAccountsReceivableRepository,
    },
    {
      provide: BANK_RECONCILIATION_REPOSITORY,
      useClass: MikroOrmBankReconciliationRepository,
    },
    {
      provide: AUDIT_LOG_REPOSITORY,
      useClass: MikroOrmAuditLogRepository,
    },
    {
      provide: FINANCIAL_REPORT_SNAPSHOT_REPOSITORY,
      useClass: MikroOrmFinancialReportSnapshotRepository,
    },
    {
      provide: TELEMETRY_SERVICE,
      useClass: TelemetryService,
    },
    {
      provide: MESSAGE_BROKER,
      useClass: KafkaMessageBroker,
    },
    {
      provide: ACCOUNTING_EVENT_CONSUMER_PORT,
      useClass: AccountingEventConsumerService,
    },
    DimensionValidator,
    OutboxRelayService,
  ],
  exports: [
    ACCOUNTING_EVENT_CONSUMER_PORT,
    ACCOUNT_REPOSITORY,
    JOURNAL_ENTRY_REPOSITORY,
    POLICY_REPOSITORY,
    OUTBOX_REPOSITORY,
    ACCOUNTING_REPORTING_PORT,
    I_UNIT_OF_WORK,
    FISCAL_PERIOD_REPOSITORY,
    CLOSING_TASK_REPOSITORY,
    ACCOUNTS_PAYABLE_REPOSITORY,
    ACCOUNTS_RECEIVABLE_REPOSITORY,
    BANK_RECONCILIATION_REPOSITORY,
    AUDIT_LOG_REPOSITORY,
    FINANCIAL_REPORT_SNAPSHOT_REPOSITORY,
    MESSAGE_BROKER,
    TELEMETRY_SERVICE,
    NestMikroOrmModule,
    DimensionValidator,
  ],
})
export class AccountingInfrastructureModule {}
