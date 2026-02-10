import { Module } from '@nestjs/common';
import { GetProductsUseCase } from './use-cases/get-products.use-case';

@Module({
  providers: [GetProductsUseCase],
  exports: [GetProductsUseCase],
})
export class CatalogApplicationModule {}
