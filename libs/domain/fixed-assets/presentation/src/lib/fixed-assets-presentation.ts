import { Module } from '@nestjs/common';
import { FixedAssetsController } from './controllers/fixed-assets.controller';
import { FixedAssetsApplicationModule } from '@virtex/domain-fixed-assets-application';
import { FixedAssetsInfrastructureModule } from '@virtex/domain-fixed-assets-infrastructure';

@Module({
  imports: [FixedAssetsApplicationModule, FixedAssetsInfrastructureModule],
  controllers: [FixedAssetsController],
})
export class FixedAssetsPresentationModule {}
