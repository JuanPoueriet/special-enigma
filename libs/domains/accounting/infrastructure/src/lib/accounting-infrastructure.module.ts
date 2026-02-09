import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ACCOUNT_REPOSITORY, JOURNAL_ENTRY_REPOSITORY, Account, JournalEntry, JournalEntryLine, FiscalYear } from '@virteex/accounting-domain';
import { MikroOrmAccountRepository } from '@virteex/accounting-infrastructure/lib/repositories/mikro-orm-account.repository';
import { MikroOrmJournalEntryRepository } from '@virteex/accounting-infrastructure/lib/repositories/mikro-orm-journal-entry.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([Account, JournalEntry, JournalEntryLine, FiscalYear]),
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
  ],
  exports: [
    ACCOUNT_REPOSITORY,
    JOURNAL_ENTRY_REPOSITORY,
    MikroOrmModule
  ],
})
export class AccountingInfrastructureModule {}
