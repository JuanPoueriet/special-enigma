import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import {
  TaxDeclaration,
  TAX_DECLARATION_REPOSITORY,
  FISCAL_DATA_PROVIDER,
  FiscalTaxRule,
  TAX_RULE_REPOSITORY,
  TENANT_CONFIG_REPOSITORY
} from '@virteex/fiscal-domain';
import { MikroOrmTaxDeclarationRepository } from './repositories/mikro-orm-tax-declaration.repository';
import { MikroOrmTaxRuleRepository } from './repositories/mikro-orm-tax-rule.repository';
import { FiscalDataAdapter } from './adapters/fiscal-data.adapter';
import { MikroOrmTenantConfigRepository } from './repositories/mikro-orm-tenant-config.repository';
import { DianFiscalAdapter } from './adapters/dian-fiscal-provider.adapter';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([TaxDeclaration, FiscalTaxRule]),
    HttpModule
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
    },
    {
      provide: TENANT_CONFIG_REPOSITORY,
      useClass: MikroOrmTenantConfigRepository
    },
    {
      provide: 'FISCAL_PROVIDER',
      useClass: DianFiscalAdapter
    }
  ],
  exports: [
    MikroOrmModule,
    TAX_DECLARATION_REPOSITORY,
    FISCAL_DATA_PROVIDER,
    TAX_RULE_REPOSITORY,
    TENANT_CONFIG_REPOSITORY,
    'FISCAL_PROVIDER'
  ]
})
export class FiscalInfrastructureModule {}
