import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { TaxTable } from '@virteex/payroll-domain/lib/entities/tax-table.entity';
import { TaxTableRepository } from '@virteex/payroll-domain/lib/repositories/tax-table.repository';

@Injectable()
export class MikroOrmTaxTableRepository implements TaxTableRepository {
  constructor(
    @InjectRepository(TaxTable)
    private readonly repository: EntityRepository<TaxTable>,
  ) {}

  async findForYear(
    year: number,
    type: string = 'MONTHLY',
  ): Promise<TaxTable[]> {
    return this.repository.find(
      { year, type },
      { orderBy: { limit: 'DESC' } }, // Descending for easier calculation
    );
  }
}
