import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BankAccount, CashFlow } from '../../../domain/src/index';
import { MikroOrmBankAccountRepository } from './repositories/mikro-orm-bank-account.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([BankAccount, CashFlow]),
  ],
  providers: [
    {
      provide: 'BANK_ACCOUNT_REPOSITORY',
      useClass: MikroOrmBankAccountRepository,
    },
  ],
  exports: [
    'BANK_ACCOUNT_REPOSITORY',
    MikroOrmModule
  ],
})
export class TreasuryInfrastructureModule {}
