import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TenantContextMiddleware } from './middleware/tenant-context.middleware';
import { TenantGuard } from './guards/tenant.guard';
import { TelemetryModule } from '@virteex-erp/telemetry';

@Module({
  imports: [TelemetryModule],
  providers: [TenantContextMiddleware, TenantGuard],
  exports: [TenantContextMiddleware, TenantGuard],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
