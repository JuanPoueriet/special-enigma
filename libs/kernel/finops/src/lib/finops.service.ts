import { Injectable } from '@nestjs/common';

@Injectable()
export class FinOpsService {
  async calculateTenantCost(tenantId: string) {
    return {
      tenantId,
      total: 100
    };
  }
}
