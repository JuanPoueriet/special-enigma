import { Module } from '@nestjs/common';
import { CatalogApplicationModule } from '@virteex/catalog-application';
import { CatalogController } from './controllers/catalog.controller';

@Module({
  imports: [CatalogApplicationModule],
  controllers: [CatalogController],
})
export class CatalogPresentationModule {}
