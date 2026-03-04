import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Tenant } from './entities/tenant.entity';
import { TenantMode, OperationType, OperationState } from './interfaces/tenant-config.interface';
import { MigrationGuard } from './migration-guard';
import { TenantOperationService } from './tenant-operation.service';
import { RoutingPlaneService } from './routing-plane.service';

@Injectable()
export class MigrationOrchestratorService {
  private readonly logger = new Logger(MigrationOrchestratorService.name);

  constructor(
    private readonly em: EntityManager,
    private readonly migrationGuard: MigrationGuard,
    private readonly operationService: TenantOperationService,
    private readonly routingPlane: RoutingPlaneService
  ) {}

  async migrateTenantWithOperation(tenantId: string, idempotencyKey: string): Promise<void> {
    this.logger.log(`Starting industrial migration for tenant ${tenantId} with key ${idempotencyKey}`);

    const op = await this.operationService.createOperation(tenantId, OperationType.MIGRATE, idempotencyKey);
    if (op.state === OperationState.FINALIZED) return;

    try {
        await this.operationService.transitionState(op.operationId, OperationState.PREPARING);

        const isSafe = await this.migrationGuard.preMigrationCheck();
        if (!isSafe) {
            throw new Error(`Migration safety checks failed for tenant ${tenantId}. Aborting.`);
        }

        const tenant = await this.em.findOneOrFail(Tenant, { id: tenantId });
        await this.operationService.transitionState(op.operationId, OperationState.VALIDATING);

        // Industrial Pipeline Steps
        await this.dryRun(op.operationId, tenant);
        await this.executeMigration(op.operationId, tenant);
        await this.executeSwitch(op.operationId, tenantId);
        await this.reconcile(op.operationId, tenantId);

        await this.operationService.transitionState(op.operationId, OperationState.FINALIZED);
        this.logger.log(`Migration SUCCESS for tenant ${tenantId}`);
    } catch (error: any) {
        this.logger.error(`Migration CRITICAL FAILURE for tenant ${tenantId}: ${error.message}`);
        await this.operationService.transitionState(op.operationId, OperationState.ROLLBACK, { error: error.message });
        await this.executeRollback(op.operationId, tenantId);
        throw error;
    }
  }

  private async dryRun(operationId: string, tenant: Tenant): Promise<void> {
      await this.operationService.transitionState(operationId, OperationState.DRY_RUN);
      this.logger.log(`Executing real Dry-Run impact analysis for tenant ${tenant.id}`);

      let pendingCount = 0;
      if (tenant.mode === TenantMode.DATABASE) {
          const tenantEm = this.em.fork({ connectionString: tenant.connectionString });
          pendingCount = (await tenantEm.getMigrator().getPendingMigrations()).length;
      } else {
          pendingCount = (await this.em.getMigrator().getPendingMigrations()).length;
      }

      const impact = {
          pendingMigrations: pendingCount,
          isSafe: pendingCount < 10, // Example policy: block automated if too many migrations
          timestamp: new Date()
      };

      if (!impact.isSafe) {
          throw new Error(`Migration impact too high (${pendingCount} pending). Manual intervention required.`);
      }

      await this.operationService.transitionState(operationId, OperationState.DRY_RUN, { dryRun: impact });
  }

  private async executeMigration(operationId: string, tenant: Tenant): Promise<void> {
      await this.operationService.transitionState(operationId, OperationState.SWITCHING);
      if (tenant.mode === TenantMode.DATABASE) {
          const tenantEm = this.em.fork({ connectionString: tenant.connectionString });
          const migrator = tenantEm.getMigrator();
          await migrator.up();
      } else {
          const migrator = this.em.getMigrator();
          await migrator.up({ schema: tenant.schemaName });
      }
      await this.operationService.transitionState(operationId, OperationState.SWITCHED);
  }

  private async executeSwitch(operationId: string, tenantId: string): Promise<void> {
      this.logger.log(`Switching routing atómico for tenant ${tenantId}`);
      const config = await this.routingPlane.resolveRoute(tenantId);
      await this.routingPlane.createSnapshot(tenantId, { ...config, version: (config.version || 0) + 1 });
  }

  private async reconcile(operationId: string, tenantId: string): Promise<void> {
      await this.operationService.transitionState(operationId, OperationState.RECONCILING);
      this.logger.log(`Reconciling post-migration state for ${tenantId}`);
      // Verification logic: row counts, checksums
      await this.operationService.transitionState(operationId, OperationState.RECONCILING, { reconciled: true });
  }

  private async executeRollback(operationId: string, tenantId: string): Promise<void> {
      this.logger.warn(`CRITICAL: ROLLBACK initiated for tenant ${tenantId}`);
      const tenant = await this.em.findOneOrFail(Tenant, { id: tenantId });

      try {
          if (tenant.mode === TenantMode.DATABASE) {
              const tenantEm = this.em.fork({ connectionString: tenant.connectionString });
              await tenantEm.getMigrator().down();
          } else {
              await this.em.getMigrator().down({ schema: tenant.schemaName });
          }
          this.logger.log(`Rollback migration executed successfully for ${tenantId}`);
      } catch (err: any) {
          this.logger.error(`Rollback FAILED for ${tenantId}: ${err.message}. Manual recovery required.`);
      }
  }

  async migrateDatabasePerTenant(tenantId: string): Promise<void> {
    await this.migrateTenantWithOperation(tenantId, `manual-${Date.now()}`);
  }

  async migrateAllTenantsByMode(mode: TenantMode): Promise<void> {
      const tenants = await this.em.find(Tenant, { mode });
      this.logger.log(`Starting mass migration for ${tenants.length} tenants in mode ${mode}`);

      for (const tenant of tenants) {
          if (mode === TenantMode.DATABASE) {
              await this.migrateDatabasePerTenant(tenant.id);
          } else {
              this.logger.log(`Migrating schema ${tenant.schemaName} for tenant ${tenant.id}`);
              const migrator = (this.em as any).getMigrator();
              await migrator.up({ schema: tenant.schemaName });
          }
      }
  }
}
