import { Module } from '@nestjs/common';
import { CreateInvoiceUseCase } from './use-cases/create-invoice.use-case';
import { GetInvoicesUseCase } from './use-cases/get-invoices.use-case';

@Module({
  providers: [CreateInvoiceUseCase, GetInvoicesUseCase],
  exports: [CreateInvoiceUseCase, GetInvoicesUseCase]
})
export class BillingApplicationModule {}
