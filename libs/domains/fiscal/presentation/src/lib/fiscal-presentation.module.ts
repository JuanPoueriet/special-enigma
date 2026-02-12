import { Module } from '@nestjs/common';
import { FiscalController } from './controllers/fiscal.controller';
import {
  FiscalApplicationModule,
  CreateDeclarationUseCase,
  GetFiscalStatsUseCase,
  GetTaxRulesUseCase
} from '@virteex/fiscal-application';
import { FiscalInfrastructureModule } from '../../../infrastructure/src/index';

@Module({
  imports: [FiscalApplicationModule, FiscalInfrastructureModule],
  controllers: [FiscalController],
  providers: [
    CreateDeclarationUseCase,
    GetFiscalStatsUseCase,
    GetTaxRulesUseCase
  ]
})
export class FiscalPresentationModule {}
