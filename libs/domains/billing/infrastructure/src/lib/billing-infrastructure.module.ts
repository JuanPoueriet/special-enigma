import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PAC_PROVIDER, Invoice, INVOICE_REPOSITORY } from '@virteex/billing-domain';
import { FinkokPacProvider } from './providers/finkok-pac.provider';
import { MikroOrmInvoiceRepository } from './repositories/mikro-orm-invoice.repository';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([Invoice])
  ],
  providers: [
    {
      provide: PAC_PROVIDER,
      useClass: FinkokPacProvider
    },
    {
      provide: INVOICE_REPOSITORY,
      useClass: MikroOrmInvoiceRepository
    }
  ],
  exports: [
    PAC_PROVIDER,
    MikroOrmModule,
    INVOICE_REPOSITORY
  ]
})
export class BillingInfrastructureModule {}
