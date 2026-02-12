import { Module } from '@nestjs/common';
import { CrmInfrastructureModule } from '../../../infrastructure/src/index';
import { CreateSaleUseCase } from './use-cases/create-sale.use-case';
import { ListSalesUseCase } from './use-cases/list-sales.use-case';

@Module({
  imports: [CrmInfrastructureModule],
  providers: [CreateSaleUseCase, ListSalesUseCase],
  exports: [CreateSaleUseCase, ListSalesUseCase],
})
export class CrmApplicationModule {}
