import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScheduleModule } from '@nestjs/schedule';
import { ACCOUNT_REPOSITORY, JOURNAL_ENTRY_REPOSITORY, POLICY_REPOSITORY, OUTBOX_REPOSITORY, TELEMETRY_SERVICE, IDEMPOTENCY_REPOSITORY } from '@virteex/domain-accounting-domain';
import { MikroOrmAccountRepository } from './persistence/repositories/mikro-orm-account.repository';
import { MikroOrmJournalEntryRepository } from './persistence/repositories/mikro-orm-journal-entry.repository';
import { MikroOrmPolicyRepository } from './persistence/repositories/mikro-orm-policy.repository';
import { MikroOrmOutboxRepository } from './persistence/repositories/mikro-orm-outbox.repository';
import { MikroOrmIdempotencyRepository } from './persistence/repositories/mikro-orm-idempotency.repository';
import { AccountSchema, JournalEntrySchema, JournalEntryLineSchema, FiscalYearSchema, AccountingPolicySchema } from './persistence/orm/mikro-orm.schemas';
import { OutboxMessageSchema } from './persistence/orm/outbox.schema';
import { IdempotencySchema } from './persistence/orm/idempotency.schema';
import { OutboxRelayService } from './messaging/outbox/outbox-relay.service';

@Global()
@Module({
  imports: [
    ScheduleModule.forRoot(),
    MikroOrmModule.forFeature([AccountSchema, JournalEntrySchema, JournalEntryLineSchema, FiscalYearSchema, AccountingPolicySchema, OutboxMessageSchema, IdempotencySchema]),
  ],
  providers: [
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: MikroOrmAccountRepository,
    },
    {
      provide: JOURNAL_ENTRY_REPOSITORY,
      useClass: MikroOrmJournalEntryRepository,
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
      provide: IDEMPOTENCY_REPOSITORY,
      useClass: MikroOrmIdempotencyRepository,
    },
    {
      provide: TELEMETRY_SERVICE,
      useValue: {
        recordSecurityEvent: () => {},
        recordBusinessMetric: () => {},
        setTraceAttributes: () => {},
      },
    },
    OutboxRelayService,
  ],
  exports: [
    ACCOUNT_REPOSITORY,
    JOURNAL_ENTRY_REPOSITORY,
    POLICY_REPOSITORY,
    IDEMPOTENCY_REPOSITORY,
    MikroOrmModule
  ],
})
export class AccountingInfrastructureModule {}
