import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AdminDashboardController } from './controllers/admin-dashboard.controller';
import { AdminApplicationModule } from '@virteex/admin-application';
import { AdminInfrastructureModule } from '@virteex/admin-infrastructure';

@Module({
  imports: [AdminApplicationModule, AdminInfrastructureModule],
  controllers: [AdminController, AdminDashboardController],
  providers: [],
})
export class AdminPresentationModule {}
