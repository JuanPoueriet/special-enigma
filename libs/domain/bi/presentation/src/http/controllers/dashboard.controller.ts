import { Controller, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard, getTenantContext } from '@virteex/kernel-auth';
import { GetDashboardStatsHandler, GetDashboardStatsQuery } from '@virteex/domain-bi-application';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly getDashboardStatsHandler: GetDashboardStatsHandler) {}

  @Get('stats')
  async getStats() {
    const context = getTenantContext();
    if (!context?.tenantId) {
        throw new UnauthorizedException('Tenant context missing');
    }
    return this.getDashboardStatsHandler.handle(new GetDashboardStatsQuery(context.tenantId));
  }
}
