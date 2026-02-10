import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { PayrollRepository, Payroll } from '../../../../domain/src/index';

@Injectable()
export class MikroOrmPayrollRepository implements PayrollRepository {
  constructor(private readonly em: EntityManager) {}

  async save(payroll: Payroll): Promise<void> {
    await this.em.persistAndFlush(payroll);
  }

  async findById(id: string): Promise<Payroll | null> {
    return this.em.findOne(Payroll, { id });
  }

  async findAllByTenant(tenantId: string): Promise<Payroll[]> {
    return this.em.find(Payroll, { tenantId });
  }

  async findByEmployeeAndPeriod(employeeId: string, start: Date, end: Date): Promise<Payroll | null> {
    // MikroORM allows referencing entity by ID in query
    return this.em.findOne(Payroll, {
      employee: { id: employeeId },
      periodStart: start,
      periodEnd: end
    });
  }
}
