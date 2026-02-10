import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from '@virteex/catalog-domain';
import { MikroOrmProductRepository } from './repositories/mikro-orm-product.repository';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: MikroOrmProductRepository,
    },
  ],
  exports: ['ProductRepository'],
})
export class CatalogInfrastructureModule {}
