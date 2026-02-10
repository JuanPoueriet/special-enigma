import { Module } from '@nestjs/common';
import { CreateProductionOrderUseCase } from './use-cases/create-production-order.use-case';

@Module({
  providers: [CreateProductionOrderUseCase],
  exports: [CreateProductionOrderUseCase]
})
export class ManufacturingApplicationModule {}
