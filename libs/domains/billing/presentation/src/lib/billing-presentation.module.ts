import { Module } from '@nestjs/common';
import { BillingController } from './controllers/billing.controller';
import { BillingApplicationModule } from '@virteex/billing-application';

@Module({
  imports: [BillingApplicationModule],
  controllers: [BillingController],
})
export class BillingPresentationModule {}
