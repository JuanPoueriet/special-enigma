import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  PAC_PROVIDER,
  Invoice,
  INVOICE_REPOSITORY,
  Subscription,
  SUBSCRIPTION_REPOSITORY,
  PaymentMethod,
  PAYMENT_METHOD_REPOSITORY
} from '@virteex/billing-domain';
import { FinkokPacProvider } from './providers/finkok-pac.provider';
import { MikroOrmInvoiceRepository } from './repositories/mikro-orm-invoice.repository';
import { MikroOrmSubscriptionRepository } from './repositories/mikro-orm-subscription.repository';
import { MikroOrmPaymentMethodRepository } from './repositories/mikro-orm-payment-method.repository';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([Invoice, Subscription, PaymentMethod])
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
    }
  ],
  exports: [
    PAC_PROVIDER,
    MikroOrmModule,
    INVOICE_REPOSITORY,
    SUBSCRIPTION_REPOSITORY,
    PAYMENT_METHOD_REPOSITORY
  ]
})
export class BillingInfrastructureModule {}
