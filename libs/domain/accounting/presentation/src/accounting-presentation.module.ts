import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AccountingApplicationModule } from '@virteex/domain-accounting-application';
import { AccountingController } from './http/controllers/accounting.controller';
import { AccountingHealthController } from './http/controllers/accounting-health.controller';
import { AccountingEventsController } from './http/controllers/accounting-events.controller';
import { AccountsResolver } from './graphql/accounts.resolver';
import { JournalEntriesResolver } from './graphql/journal-entries.resolver';
import { AccountLoader } from './graphql/account.loader';

@Module({
  imports: [AccountingApplicationModule, TerminusModule],
  controllers: [AccountingController, AccountingEventsController, AccountingHealthController],
  providers: [AccountsResolver, JournalEntriesResolver, AccountLoader],
  exports: [AccountLoader]
})
export class AccountingPresentationModule {}
