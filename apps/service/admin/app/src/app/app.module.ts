import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { AdminPresentationModule } from '@virtex/domain-admin-presentation';
import { TenantModule, Tenant, TenantControlRecord, TenantOperation } from '@virtex/kernel-tenant';
import { CanonicalTenantMiddleware, AuthModule } from '@virtex/kernel-auth';
import { TenantConfig, Incident } from '@virtex/domain-admin-domain';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: [Tenant, TenantControlRecord, TenantOperation, TenantConfig, Incident],
      dbName: 'virtex_admin',
      driver: PostgreSqlDriver,
      allowGlobalContext: true,
      connect: true,
    }),
    AuthModule,
    TenantModule,
    AdminPresentationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CanonicalTenantMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
