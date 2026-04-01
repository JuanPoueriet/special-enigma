export class AuditLog {
  id!: string;
  tenantId!: string;
  userId!: string;
  action!: string;
  entityType!: string;
  entityId!: string;
  details!: Record<string, unknown>;
  createdAt!: Date;

  constructor(tenantId: string, userId: string, action: string, entityType: string, entityId: string, details: Record<string, unknown> = {}) {
    this.tenantId = tenantId;
    this.userId = userId;
    this.action = action;
    this.entityType = entityType;
    this.entityId = entityId;
    this.details = details;
    this.createdAt = new Date();
  }
}
