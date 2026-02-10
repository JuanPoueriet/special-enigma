import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TenantConfig, TENANT_CONFIG_REPOSITORY } from '@virteex/admin-domain';
import { MikroOrmTenantConfigRepository } from './repositories/mikro-orm-tenant-config.repository';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([TenantConfig])
  ],
  providers: [
    {
      provide: TENANT_CONFIG_REPOSITORY,
      useClass: MikroOrmTenantConfigRepository
    }
  ],
  exports: [
    MikroOrmModule,
    TENANT_CONFIG_REPOSITORY
  ]
})
export class AdminInfrastructureModule {}
