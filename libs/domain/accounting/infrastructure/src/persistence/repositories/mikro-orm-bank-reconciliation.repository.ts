import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { BankReconciliation, type BankReconciliationRepository } from '@virteex/domain-accounting-domain';

@Injectable()
export class MikroOrmBankReconciliationRepository implements BankReconciliationRepository {
  constructor(private readonly em: EntityManager) {}

  async findAll(tenantId: string): Promise<BankReconciliation[]> {
    return this.em.find(BankReconciliation, { tenantId });
  }

  async findById(tenantId: string, id: string): Promise<BankReconciliation | null> {
    return this.em.findOne(BankReconciliation, { tenantId, id });
  }

  async save(reconciliation: BankReconciliation): Promise<BankReconciliation> {
    await this.em.persistAndFlush(reconciliation);
    return reconciliation;
  }
}
