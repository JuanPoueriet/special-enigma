import { Module } from '@nestjs/common';
import { AdminController } from './http/controllers/admin.controller';
import { AdminDashboardController } from './http/controllers/admin-dashboard.controller';
import { TenantsController } from './http/controllers/tenants.controller';
import { MonitoringController } from './http/controllers/monitoring.controller';
import { SecurityController } from './http/controllers/security.controller';
import { IncidentsController } from './http/controllers/incidents.controller';
import { OperationsController } from './http/controllers/operations.controller';
import { AdminApplicationModule } from '@virtex/domain-admin-application';

@Module({
  imports: [AdminApplicationModule],
  controllers: [AdminController, AdminDashboardController, TenantsController, MonitoringController, SecurityController, IncidentsController, OperationsController],
  providers: [],
})
export class AdminPresentationModule {}
