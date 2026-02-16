import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product, SAT_CATALOG_REPOSITORY } from '@virteex/catalog-domain';
import { MikroOrmProductRepository } from './repositories/mikro-orm-product.repository';
import { InMemorySatCatalogRepository } from './repositories/in-memory-sat-catalog.repository';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: MikroOrmProductRepository,
    },
    {
      provide: SAT_CATALOG_REPOSITORY,
      useClass: InMemorySatCatalogRepository,
    },
  ],
  exports: ['ProductRepository', SAT_CATALOG_REPOSITORY],
})
export class CatalogInfrastructureModule {}
