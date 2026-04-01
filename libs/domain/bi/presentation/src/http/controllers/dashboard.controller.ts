import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virteex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virteex/kernel-entitlements';
import { GetDashboardStatsHandler, GetDashboardStatsQuery } from '@virteex/domain-bi-application';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly getDashboardStatsHandler: GetDashboardStatsHandler) {}

  @Get('stats')
  @RequireEntitlement('bi:reports:read')
  async getStats(@CurrentTenant() tenantId: string) {
    return this.getDashboardStatsHandler.handle(new GetDashboardStatsQuery(tenantId));
  }
}
