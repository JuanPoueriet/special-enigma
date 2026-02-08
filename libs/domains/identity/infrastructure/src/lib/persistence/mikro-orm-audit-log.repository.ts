import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AuditLog, AuditLogRepository } from '@virteex-erp/identity-domain';

@Injectable()
export class MikroOrmAuditLogRepository implements AuditLogRepository {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repository: EntityRepository<AuditLog>
  ) {}

  async save(log: AuditLog): Promise<void> {
    await this.repository.getEntityManager().persistAndFlush(log);
  }

  async findByUserId(userId: string): Promise<AuditLog[]> {
    return this.repository.find({ userId });
  }
}
