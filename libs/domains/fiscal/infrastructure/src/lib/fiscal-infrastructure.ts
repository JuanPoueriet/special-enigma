import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  TaxDeclaration,
  TAX_DECLARATION_REPOSITORY,
  FISCAL_DATA_PROVIDER,
  TaxRule,
  TAX_RULE_REPOSITORY
} from '@virteex/fiscal-domain';
import { MikroOrmTaxDeclarationRepository } from './repositories/mikro-orm-tax-declaration.repository';
import { MikroOrmTaxRuleRepository } from './repositories/mikro-orm-tax-rule.repository';
import { FiscalDataAdapter } from './adapters/fiscal-data.adapter';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([TaxDeclaration, TaxRule])
  ],
  providers: [
    {
      provide: TAX_DECLARATION_REPOSITORY,
      useClass: MikroOrmTaxDeclarationRepository
    },
    {
      provide: FISCAL_DATA_PROVIDER,
      useClass: FiscalDataAdapter
    },
    {
      provide: TAX_RULE_REPOSITORY,
      useClass: MikroOrmTaxRuleRepository
    }
  ],
  exports: [
    MikroOrmModule,
    TAX_DECLARATION_REPOSITORY,
    FISCAL_DATA_PROVIDER,
    TAX_RULE_REPOSITORY
  ]
})
export class FiscalInfrastructureModule {}
