import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virtex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';
import { GetDashboardStatsHandler, GetDashboardStatsQuery } from '@virtex/domain-bi-application';

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
