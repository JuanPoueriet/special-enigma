import { Module } from '@nestjs/common';
import { CreateInvoiceUseCase } from './use-cases/create-invoice.use-case';
import { GetInvoicesUseCase } from './use-cases/get-invoices.use-case';
import { CreateSubscriptionUseCase } from './use-cases/create-subscription.use-case';
import { GetSubscriptionUseCase } from './use-cases/get-subscription.use-case';
import { AddPaymentMethodUseCase } from './use-cases/add-payment-method.use-case';
import { GetPaymentMethodUseCase } from './use-cases/get-payment-method.use-case';
import { GetSubscriptionPlansUseCase } from './use-cases/get-subscription-plans.use-case';
import { GetPaymentHistoryUseCase } from './use-cases/get-payment-history.use-case';
import { BillingInfrastructureModule } from '../../../infrastructure/src/index';

@Module({
  imports: [BillingInfrastructureModule],
  providers: [
    CreateInvoiceUseCase,
    GetInvoicesUseCase,
    CreateSubscriptionUseCase,
    GetSubscriptionUseCase,
    AddPaymentMethodUseCase,
    GetPaymentMethodUseCase,
    GetSubscriptionPlansUseCase,
    GetPaymentHistoryUseCase
  ],
  exports: [
    CreateInvoiceUseCase,
    GetInvoicesUseCase,
    CreateSubscriptionUseCase,
    GetSubscriptionUseCase,
    AddPaymentMethodUseCase,
    GetPaymentMethodUseCase,
    GetSubscriptionPlansUseCase,
    GetPaymentHistoryUseCase
  ]
})
export class BillingApplicationModule {}
