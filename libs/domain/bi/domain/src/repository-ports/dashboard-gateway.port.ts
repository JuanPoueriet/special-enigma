export interface DashboardStats {
  pendingApprovals: number;
  openDeals: number;
  inventoryAlerts: number;
  salesToday: number;
  ebitda: number;
  netMargin: number;
  cashFlow: number;
}

export abstract class DashboardGateway {
  abstract getStats(tenantId: string): Promise<DashboardStats>;
}
