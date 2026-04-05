import { AuditLog } from '../user-profile/audit-log.entity';

export abstract class AuditLogRepository {
  abstract save(log: AuditLog): Promise<void>;
  abstract findByUserId(userId: string): Promise<AuditLog[]>;
  abstract findLast(): Promise<AuditLog | null>;
}
