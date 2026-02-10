import { Module } from '@nestjs/common';
import { FixedAssetsController } from './controllers/fixed-assets.controller';
import { FixedAssetsApplicationModule } from '@virteex/fixed-assets-application';

@Module({
  imports: [FixedAssetsApplicationModule],
  controllers: [FixedAssetsController],
})
export class FixedAssetsPresentationModule {}
