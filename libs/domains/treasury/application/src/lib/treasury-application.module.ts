import { Module } from '@nestjs/common';
import { CreateBankAccountUseCase } from './use-cases/create-bank-account.use-case';
import { GetBankAccountsUseCase } from './use-cases/get-bank-accounts.use-case';

@Module({
  providers: [
    CreateBankAccountUseCase,
    GetBankAccountsUseCase
  ],
  exports: [
    CreateBankAccountUseCase,
    GetBankAccountsUseCase
  ],
})
export class TreasuryApplicationModule {}
