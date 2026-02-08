import { Module, Global, OnModuleInit } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TenantService } from './tenant.service';
import { TenantRlsInterceptor } from './interceptors/tenant-rls.interceptor';
import { TenantModelSubscriber } from './subscribers/tenant-model.subscriber';
import { EntityManager } from '@mikro-orm/core';

@Global()
@Module({
  providers: [
    TenantService,
    TenantModelSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantRlsInterceptor,
    },
  ],
  exports: [TenantService],
})
export class TenantModule implements OnModuleInit {
  constructor(
    private readonly em: EntityManager,
    private readonly subscriber: TenantModelSubscriber
  ) {}

  onModuleInit() {
    this.em.getEventManager().registerSubscriber(this.subscriber);
  }
}
