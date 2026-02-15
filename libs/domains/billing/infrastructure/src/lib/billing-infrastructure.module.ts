import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  Invoice,
  Subscription,
  SubscriptionPlan,
  TaxLine,
  TaxRule,
  PAC_PROVIDER,
  PaymentMethod,
  INVOICE_REPOSITORY,
  SUBSCRIPTION_REPOSITORY,
  SUBSCRIPTION_PLAN_REPOSITORY,
  PAYMENT_METHOD_REPOSITORY
} from '@virteex/billing-domain';
import { MockPacProvider } from './providers/mock-pac.provider';
import { MikroOrmInvoiceRepository } from './repositories/mikro-orm-invoice.repository';
import { MikroOrmSubscriptionRepository } from './repositories/mikro-orm-subscription.repository';
import { MikroOrmSubscriptionPlanRepository } from './repositories/mikro-orm-subscription-plan.repository';
import { MikroOrmPaymentMethodRepository } from './repositories/mikro-orm-payment-method.repository';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([
      Invoice,
      Subscription,
      SubscriptionPlan,
      PaymentMethod,
      TaxLine,
      TaxRule
    ])
  ],
  providers: [
    {
      provide: INVOICE_REPOSITORY,
      useClass: MikroOrmInvoiceRepository
    },
    {
      provide: SUBSCRIPTION_REPOSITORY,
      useClass: MikroOrmSubscriptionRepository
    },
    {
      provide: SUBSCRIPTION_PLAN_REPOSITORY,
      useClass: MikroOrmSubscriptionPlanRepository
    },
    {
      provide: PAYMENT_METHOD_REPOSITORY,
      useClass: MikroOrmPaymentMethodRepository
    },
    {
      provide: PAC_PROVIDER,
      useClass: MockPacProvider
    }
  ],
  exports: [
    INVOICE_REPOSITORY,
    SUBSCRIPTION_REPOSITORY,
    SUBSCRIPTION_PLAN_REPOSITORY,
    PAYMENT_METHOD_REPOSITORY,
    PAC_PROVIDER,
    MikroOrmModule
  ]
})
export class BillingInfrastructureModule {}
