import { Module } from '@nestjs/common';
import { CreateInvoiceUseCase } from './use-cases/create-invoice.use-case';
import { GetInvoicesUseCase } from './use-cases/get-invoices.use-case';
import { CreateSubscriptionUseCase } from './use-cases/create-subscription.use-case';
import { GetSubscriptionUseCase } from './use-cases/get-subscription.use-case';
import { AddPaymentMethodUseCase } from './use-cases/add-payment-method.use-case';
import { GetPaymentMethodUseCase } from './use-cases/get-payment-method.use-case';

@Module({
  providers: [
    CreateInvoiceUseCase,
    GetInvoicesUseCase,
    CreateSubscriptionUseCase,
    GetSubscriptionUseCase,
    AddPaymentMethodUseCase,
    GetPaymentMethodUseCase
  ],
  exports: [
    CreateInvoiceUseCase,
    GetInvoicesUseCase,
    CreateSubscriptionUseCase,
    GetSubscriptionUseCase,
    AddPaymentMethodUseCase,
    GetPaymentMethodUseCase
  ]
})
export class BillingApplicationModule {}
