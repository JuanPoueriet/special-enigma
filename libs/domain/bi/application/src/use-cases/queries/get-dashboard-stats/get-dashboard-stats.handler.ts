import { Injectable } from '@nestjs/common';
import { DashboardGateway, type DashboardStats } from '@virteex/domain-bi-domain';
import { GetDashboardStatsQuery } from './get-dashboard-stats.query';

@Injectable()
export class GetDashboardStatsHandler {
  constructor(private readonly dashboardGateway: DashboardGateway) {}

  async handle(query: GetDashboardStatsQuery): Promise<DashboardStats> {
    return this.dashboardGateway.getStats(query.tenantId);
  }
}
