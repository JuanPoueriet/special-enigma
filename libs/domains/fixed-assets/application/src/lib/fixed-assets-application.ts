import { Module } from '@nestjs/common';
import { CreateFixedAssetUseCase } from './use-cases/create-fixed-asset.use-case';

@Module({
  providers: [CreateFixedAssetUseCase],
  exports: [CreateFixedAssetUseCase]
})
export class FixedAssetsApplicationModule {}
