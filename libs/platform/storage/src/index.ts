import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StoragePort } from './lib/ports/storage.port';
import { FileSystemStorageAdapter } from './lib/adapters/filesystem-storage.adapter';
import { S3StorageAdapter } from './lib/adapters/s3-storage.adapter';
import { SECRET_MANAGER } from './lib/ports/secret-manager.port';
import { AwsSecretManagerAdapter } from './lib/adapters/aws-secret-manager.adapter';

@Global()
@Module({
  providers: [
    {
      provide: StoragePort,
      useFactory: (configService: ConfigService) => {
        const provider = configService.get<string>('STORAGE_PROVIDER', 'local');
        if (provider === 's3') {
          return new S3StorageAdapter(configService);
        }
        return new FileSystemStorageAdapter();
      },
      inject: [ConfigService],
    },
    // Backward compatibility: Provide 'StorageService' token aliased to StoragePort
    {
      provide: 'StorageService',
      useExisting: StoragePort
    },
    {
      provide: SECRET_MANAGER,
      useClass: AwsSecretManagerAdapter
    }
  ],
  exports: [StoragePort, 'StorageService', SECRET_MANAGER],
})
export class SharedInfrastructureStorageModule {}

export * from './lib/ports/storage.port';
export * from './lib/ports/secret-manager.port';
export * from './lib/adapters/filesystem-storage.adapter';
export * from './lib/adapters/s3-storage.adapter';
export * from './lib/adapters/aws-secret-manager.adapter';
// Alias for backward compatibility
export { StoragePort as StorageService } from './lib/ports/storage.port';
