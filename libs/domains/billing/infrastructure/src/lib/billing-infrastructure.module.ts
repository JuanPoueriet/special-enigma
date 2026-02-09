import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PAC_PROVIDER, Invoice } from '@virteex/billing-domain';
import { FinkokPacProvider } from '@virteex/billing-infrastructure/lib/providers/finkok-pac.provider';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([Invoice])
  ],
  providers: [
    {
      provide: PAC_PROVIDER,
      useClass: FinkokPacProvider
    }
  ],
  exports: [
    PAC_PROVIDER,
    MikroOrmModule
  ]
})
export class BillingInfrastructureModule {}
