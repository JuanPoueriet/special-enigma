import { Module } from '@nestjs/common';
import { CrmInfrastructureModule } from '../../../infrastructure/src/index';
import { CreateSaleUseCase } from './use-cases/create-sale.use-case';

@Module({
  imports: [CrmInfrastructureModule],
  providers: [CreateSaleUseCase],
  exports: [CreateSaleUseCase],
})
export class CrmApplicationModule {}
