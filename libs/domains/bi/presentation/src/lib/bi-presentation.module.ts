import { Module } from '@nestjs/common';
import { BiController } from './controllers/bi.controller';
import {
  BiApplicationModule,
  GenerateReportUseCase,
  GetTopProductsUseCase
} from '@virteex/bi-application';
import { BiInfrastructureModule } from '../../../infrastructure/src/index';
import { AccountingInfrastructureModule } from '@virteex/accounting-infrastructure';
import { CrmInfrastructureModule } from '../../../../crm/infrastructure/src/index';

@Module({
  imports: [BiApplicationModule, BiInfrastructureModule, AccountingInfrastructureModule, CrmInfrastructureModule],
  controllers: [BiController],
  providers: [
    GenerateReportUseCase,
    GetTopProductsUseCase
  ]
})
export class BiPresentationModule {}
