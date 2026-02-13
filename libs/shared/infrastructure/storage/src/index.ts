import { Module, Global } from '@nestjs/common';
import { StorageService } from './lib/storage.service';

@Global()
@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class SharedInfrastructureStorageModule {}

export * from './lib/storage.service';
