import { Injectable } from '@nestjs/common';
import { TaxDeclarationRepository, TaxDeclaration } from '@virteex/domain-fiscal-domain';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { TaxDeclarationRecord } from '../entities/tax-declaration.record';

@Injectable()
export class MikroOrmTaxDeclarationRepository implements TaxDeclarationRepository {
  constructor(
    @InjectRepository(TaxDeclarationRecord)
    private readonly repository: EntityRepository<TaxDeclarationRecord>
  ) {}

  async save(declaration: TaxDeclaration): Promise<void> {
    const record = new TaxDeclarationRecord(declaration.tenantId, declaration.period, declaration.amount);
    record.id = declaration.id;
    record.status = declaration.status;
    await this.repository.getEntityManager().persistAndFlush(record);
  }

  async findAll(): Promise<TaxDeclaration[]> {
    return this.repository.findAll();
  }
}
