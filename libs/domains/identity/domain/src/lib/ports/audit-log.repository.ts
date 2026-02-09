import { AuditLog } from '@virteex/identity-domain/lib/entities/audit-log.entity';

export abstract class AuditLogRepository {
  abstract save(log: AuditLog): Promise<void>;
  abstract findByUserId(userId: string): Promise<AuditLog[]>;
}
