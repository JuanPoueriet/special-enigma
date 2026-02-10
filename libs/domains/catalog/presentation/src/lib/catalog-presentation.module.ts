import { Module } from '@nestjs/common';
import { CatalogApplicationModule } from '@virteex/catalog-application';
import { CatalogInfrastructureModule } from '@virteex/catalog-infrastructure';
import { CatalogController } from './controllers/catalog.controller';

@Module({
  imports: [CatalogApplicationModule, CatalogInfrastructureModule],
  controllers: [CatalogController],
})
export class CatalogPresentationModule {}
