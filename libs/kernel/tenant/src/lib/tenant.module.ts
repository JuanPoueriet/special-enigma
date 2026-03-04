import { Module, Global, OnModuleInit } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TenantService } from './tenant.service';
import { MigrationOrchestratorService } from './migration-orchestrator.service';
import { TenantRlsInterceptor } from './interceptors/tenant-rls.interceptor';
import { TenantModelSubscriber } from './subscribers/tenant-model.subscriber';
import { EntityManager } from '@mikro-orm/core';
import { MigrationGuard } from './migration-guard';
import { DualWriteManager } from './dual-write-manager';
import { FailoverService } from './failover.service';
import { RoutingPlaneService } from './routing-plane.service';
import { FinOpsService } from './finops.service';

@Global()
@Module({
  providers: [
    TenantService,
    MigrationOrchestratorService,
    MigrationGuard,
    DualWriteManager,
    FailoverService,
    RoutingPlaneService,
    FinOpsService,
    TenantModelSubscriber,
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantRlsInterceptor,
    },
  ],
  exports: [TenantService, MigrationOrchestratorService, MigrationGuard, DualWriteManager, FailoverService, RoutingPlaneService, FinOpsService],
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
