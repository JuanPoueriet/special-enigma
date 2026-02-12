import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  PAC_PROVIDER,
  Invoice,
  INVOICE_REPOSITORY,
  Subscription,
  SUBSCRIPTION_REPOSITORY,
  PaymentMethod,
  PAYMENT_METHOD_REPOSITORY,
  SubscriptionPlan,
  SUBSCRIPTION_PLAN_REPOSITORY
} from '@virteex/billing-domain';
import { FinkokPacProvider } from './providers/finkok-pac.provider';
import { MikroOrmInvoiceRepository } from './repositories/mikro-orm-invoice.repository';
import { MikroOrmSubscriptionRepository } from './repositories/mikro-orm-subscription.repository';
import { MikroOrmPaymentMethodRepository } from './repositories/mikro-orm-payment-method.repository';
import { MikroOrmSubscriptionPlanRepository } from './repositories/mikro-orm-subscription-plan.repository';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([Invoice, Subscription, PaymentMethod, SubscriptionPlan])
  ],
  providers: [
    {
      provide: PAC_PROVIDER,
      useClass: FinkokPacProvider
    },
    {
      provide: INVOICE_REPOSITORY,
      useClass: MikroOrmInvoiceRepository
    },
    {
      provide: SUBSCRIPTION_REPOSITORY,
      useClass: MikroOrmSubscriptionRepository
    },
    {
      provide: PAYMENT_METHOD_REPOSITORY,
      useClass: MikroOrmPaymentMethodRepository
    },
    {
      provide: SUBSCRIPTION_PLAN_REPOSITORY,
      useClass: MikroOrmSubscriptionPlanRepository
    }
  ],
  exports: [
    PAC_PROVIDER,
    MikroOrmModule,
    INVOICE_REPOSITORY,
    SUBSCRIPTION_REPOSITORY,
    PAYMENT_METHOD_REPOSITORY,
    SUBSCRIPTION_PLAN_REPOSITORY
  ]
})
export class BillingInfrastructureModule {}
