import { Module } from '@nestjs/common';
import { BillingController } from './controllers/billing.controller';
import { SubscriptionController } from './controllers/subscription.controller';
import { PaymentMethodController } from './controllers/payment-method.controller';
import { BillingApplicationModule } from '@virteex/billing-application';

@Module({
  imports: [BillingApplicationModule],
  controllers: [
    BillingController,
    SubscriptionController,
    PaymentMethodController
  ],
})
export class BillingPresentationModule {}
