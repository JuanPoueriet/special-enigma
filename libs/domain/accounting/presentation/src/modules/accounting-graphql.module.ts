import { Module } from '@nestjs/common';
import { AccountingApplicationModule } from '@virteex/domain-accounting-application';
import { AccountsResolver } from '../graphql/accounts.resolver';
import { JournalEntriesResolver } from '../graphql/journal-entries.resolver';
import { AccountLoader } from '../graphql/account.loader';

@Module({
  imports: [AccountingApplicationModule],
  providers: [
    AccountsResolver,
    JournalEntriesResolver,
    AccountLoader,
  ],
  exports: [AccountLoader],
})
export class AccountingGraphqlModule {}
