import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '@virteex/infrastructure/lib/persistence/mikro-orm.config';
import { TenantPersistenceMiddleware } from '@virteex/infrastructure/lib/middleware/tenant-persistence.middleware';
import { TenantModule } from '@virteex/tenant';

@Module({
  imports: [
    TenantModule,
    MikroOrmModule.forRoot({
      ...config,
    }),
    MikroOrmModule.forFeature([]),
  ],
  providers: [TenantPersistenceMiddleware],
  exports: [MikroOrmModule],
})
export class InfrastructureModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantPersistenceMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
