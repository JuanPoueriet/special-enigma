import { Module } from '@nestjs/common';
import { FiscalController } from './controllers/fiscal.controller';
import {
  FiscalApplicationModule,
  CreateDeclarationUseCase,
  GetFiscalStatsUseCase,
  GetTaxRulesUseCase,
  CreateTaxRuleUseCase,
  GetTaxRateUseCase,
} from '@virtex/domain-fiscal-application';
import { FiscalInfrastructureModule } from '@virtex/domain-fiscal-infrastructure';

@Module({
  imports: [FiscalApplicationModule, FiscalInfrastructureModule],
  controllers: [FiscalController],
  providers: [
    CreateDeclarationUseCase,
    GetFiscalStatsUseCase,
    GetTaxRulesUseCase,
    CreateTaxRuleUseCase,
    GetTaxRateUseCase,
  ],
})
export class FiscalPresentationModule {}
