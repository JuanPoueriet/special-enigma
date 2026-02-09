import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { TenantContextMiddleware } from '@virteex/auth/lib/middleware/tenant-context.middleware';
import { TenantGuard } from '@virteex/auth/lib/guards/tenant.guard';
import { TelemetryModule } from '@virteex/telemetry';

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
