import { Module } from '@nestjs/common';
import { CatalogInfrastructureModule } from '@virteex/catalog-infrastructure';
import { GetProductsUseCase } from './use-cases/get-products.use-case';

@Module({
  imports: [CatalogInfrastructureModule],
  providers: [GetProductsUseCase],
  exports: [GetProductsUseCase],
})
export class CatalogApplicationModule {}
