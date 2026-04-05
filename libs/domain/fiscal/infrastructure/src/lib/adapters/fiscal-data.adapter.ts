import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { FiscalDataProvider, FiscalStats, FiscalSalesSnapshot } from '@virtex/domain-fiscal-domain';

@Injectable()
export class FiscalDataAdapter implements FiscalDataProvider {
  constructor(private readonly em: EntityManager) {}

  async getFiscalStats(tenantId: string): Promise<FiscalStats> {
    // Logic: Sum of (Invoice Total * 0.16) for PAID invoices
    // Refactored to use a more generic query or a dedicated read model/view
    // For now, we simulate fetching from a table that matches our snapshot contract
    const sales = await this.em.find('Invoice', { tenantId, status: 'PAID' }) as unknown as FiscalSalesSnapshot[];

    let totalSales = 0;
    for (const sale of sales) {
      totalSales += Number(sale.totalAmount);
    }

    // 16% VAT assumption
    const taxesPayable = totalSales * 0.16;

    // Pending declarations logic could be improved, but for now fixed or based on date
    const pendingDeclarations = 1;

    return {
      total: totalSales,
      taxesPayable,
      pendingDeclarations,
      nextDueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 17),
      status: taxesPayable > 10000 ? 'WARNING' : 'OK'
    };
  }

  async getStats(tenantId: string): Promise<FiscalStats> {
    return this.getFiscalStats(tenantId);
  }
}
