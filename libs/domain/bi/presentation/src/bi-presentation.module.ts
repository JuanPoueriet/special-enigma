import { Module } from '@nestjs/common';
import { BiApplicationModule } from '@virteex/domain-bi-application';
import { BiController } from './http/controllers/bi.controller';
import { DashboardController } from './http/controllers/dashboard.controller';

@Module({
  imports: [BiApplicationModule],
  controllers: [BiController, DashboardController],
})
export class BiPresentationModule {}
