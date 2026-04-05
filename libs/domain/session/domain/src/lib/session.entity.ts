
import { v4 as uuidv4 } from 'uuid';

export class Session {
  id: string = uuidv4();
  userId!: string;
  tenantId!: string;

  // Session details
  ipAddress?: string;
  userAgent?: string;
  deviceFingerprint?: string;

  // Lifecycle
  lastActivityAt: Date = new Date();
  expiresAt!: Date;
  isRevoked = false;

  // Refresh Token Binding
  refreshTokenFamily?: string;

  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(userId: string, tenantId: string, expiresAt: Date) {
    this.userId = userId;
    this.tenantId = tenantId;
    this.expiresAt = expiresAt;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  revoke(): void {
    this.isRevoked = true;
  }
}
