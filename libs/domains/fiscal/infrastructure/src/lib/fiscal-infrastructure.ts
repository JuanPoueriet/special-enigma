import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TaxDeclaration, TAX_DECLARATION_REPOSITORY, FISCAL_DATA_PROVIDER } from '@virteex/fiscal-domain';
import { MikroOrmTaxDeclarationRepository } from './repositories/mikro-orm-tax-declaration.repository';
import { FiscalDataAdapter } from './adapters/fiscal-data.adapter';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([TaxDeclaration])
  ],
  providers: [
    {
      provide: TAX_DECLARATION_REPOSITORY,
      useClass: MikroOrmTaxDeclarationRepository
    },
    {
      provide: FISCAL_DATA_PROVIDER,
      useClass: FiscalDataAdapter
    }
  ],
  exports: [
    MikroOrmModule,
    TAX_DECLARATION_REPOSITORY,
    FISCAL_DATA_PROVIDER
  ]
})
export class FiscalInfrastructureModule {}
