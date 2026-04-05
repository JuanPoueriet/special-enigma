import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DataImportService } from './services/data-import.service';
import { AdminDashboardService } from './services/admin-dashboard.service';
import { TenantSupportService } from './services/tenant-support.service';
import { ProvisioningService } from './use-cases/provisioning.service';
import { IncidentService } from './services/incident.service';
import { OperationsReadModelService } from './services/operations-read-model.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([])],
  providers: [
    DataImportService,
    AdminDashboardService,
    TenantSupportService,
    ProvisioningService,
    IncidentService,
    OperationsReadModelService
  ],
  exports: [
    DataImportService,
    AdminDashboardService,
    TenantSupportService,
    ProvisioningService,
    IncidentService,
    OperationsReadModelService
  ],
})
export class AdminApplicationModule {}
