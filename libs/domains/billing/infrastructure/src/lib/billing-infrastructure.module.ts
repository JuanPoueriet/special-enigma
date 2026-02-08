import { Module, Global } from '@nestjs/common';
import { PAC_PROVIDER } from '@virteex/billing-domain';
import { FinkokPacProvider } from './providers/finkok-pac.provider';

@Global()
@Module({
  providers: [
    {
      provide: PAC_PROVIDER,
      useClass: FinkokPacProvider
    }
  ],
  exports: [
    PAC_PROVIDER
  ]
})
export class BillingInfrastructureModule {}
