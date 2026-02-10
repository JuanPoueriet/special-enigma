import { Module } from '@nestjs/common';
import { AccountingApplicationModule } from '@virteex/accounting-application';
import { AccountingInfrastructureModule } from '@virteex/accounting-infrastructure';
import { AccountingController } from './controllers/accounting.controller';

@Module({
  imports: [AccountingApplicationModule, AccountingInfrastructureModule],
  controllers: [AccountingController],
  providers: [],
})
export class AccountingPresentationModule {}
