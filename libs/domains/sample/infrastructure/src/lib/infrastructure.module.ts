import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TenantModule } from '@virteex/tenant';
import config from './persistence/mikro-orm.config';
import { TenantPersistenceMiddleware } from './middleware/tenant-persistence.middleware';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    TenantModule,
  ],
  providers: [TenantPersistenceMiddleware],
  exports: [TenantPersistenceMiddleware],
})
export class InfrastructureModule {}
