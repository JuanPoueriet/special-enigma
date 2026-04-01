import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { AuditLog, type AuditLogRepository } from '@virteex/domain-accounting-domain';

@Injectable()
export class MikroOrmAuditLogRepository implements AuditLogRepository {
  constructor(private readonly em: EntityManager) {}

  async create(log: AuditLog): Promise<AuditLog> {
    await this.em.persistAndFlush(log);
    return log;
  }

  async findByEntity(tenantId: string, entityType: string, entityId: string): Promise<AuditLog[]> {
    return this.em.find(AuditLog, { tenantId, entityType, entityId }, { orderBy: { createdAt: 'DESC' } });
  }

  async findByTenant(tenantId: string): Promise<AuditLog[]> {
    return this.em.find(AuditLog, { tenantId }, { orderBy: { createdAt: 'DESC' } });
  }
}
