import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TaxDeclaration, TAX_DECLARATION_REPOSITORY } from '@virteex/fiscal-domain';
import { MikroOrmTaxDeclarationRepository } from './repositories/mikro-orm-tax-declaration.repository';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([TaxDeclaration])
  ],
  providers: [
    {
      provide: TAX_DECLARATION_REPOSITORY,
      useClass: MikroOrmTaxDeclarationRepository
    }
  ],
  exports: [
    MikroOrmModule,
    TAX_DECLARATION_REPOSITORY
  ]
})
export class FiscalInfrastructureModule {}
