import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Invoice, type AccountsReceivableRepository, InvoiceStatus } from '@virtex/domain-accounting-domain';
import { Decimal } from 'decimal.js';

@Injectable()
export class MikroOrmAccountsReceivableRepository implements AccountsReceivableRepository {
  constructor(private readonly em: EntityManager) {}

  async findAll(tenantId: string): Promise<Invoice[]> {
    return this.em.find(Invoice, { tenantId, type: 'RECEIVABLE' });
  }

  async findByCustomer(tenantId: string, customerId: string): Promise<Invoice[]> {
    return this.em.find(Invoice, { tenantId, customerId, type: 'RECEIVABLE' });
  }

  async save(invoice: Invoice): Promise<Invoice> {
    await this.em.persistAndFlush(invoice);
    return invoice;
  }

  async getAgingReport(tenantId: string, asOfDate: Date): Promise<any> {
    const invoices = await this.em.find(Invoice, {
        tenantId,
        type: 'RECEIVABLE',
        status: { $in: [InvoiceStatus.SENT, InvoiceStatus.OVERDUE] },
        issueDate: { $lte: asOfDate }
    });

    const aging = {
        current: new Decimal(0),
        '1-30': new Decimal(0),
        '31-60': new Decimal(0),
        '61-90': new Decimal(0),
        '90+': new Decimal(0),
    };

    for (const inv of invoices) {
        const diffDays = Math.floor((asOfDate.getTime() - inv.dueDate.getTime()) / (1000 * 60 * 60 * 24));
        const amount = new Decimal(inv.amount);

        if (diffDays <= 0) aging.current = aging.current.plus(amount);
        else if (diffDays <= 30) aging['1-30'] = aging['1-30'].plus(amount);
        else if (diffDays <= 60) aging['31-60'] = aging['31-60'].plus(amount);
        else if (diffDays <= 90) aging['61-90'] = aging['61-90'].plus(amount);
        else aging['90+'] = aging['90+'].plus(amount);
    }

    return Object.fromEntries(Object.entries(aging).map(([k, v]) => [k, v.toFixed(2)]));
  }
}
