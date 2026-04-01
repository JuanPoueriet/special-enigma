import { AuditLog } from '../entities/audit-log.entity';

export interface AuditLogRepository {
    create(log: AuditLog): Promise<AuditLog>;
    findByEntity(tenantId: string, entityType: string, entityId: string): Promise<AuditLog[]>;
    findByTenant(tenantId: string): Promise<AuditLog[]>;
}

export const AUDIT_LOG_REPOSITORY = 'AUDIT_LOG_REPOSITORY';
