import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class AuditLog {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  userId?: string; // Optional because failed login might not have user

  @Property()
  event!: string; // 'LOGIN_SUCCESS', 'LOGIN_FAILED', 'REGISTER', 'LOGOUT', 'LOCKOUT'

  @Property({ type: 'json', nullable: true })
  metadata?: Record<string, any>; // IP, Device, Reason

  @Property()
  timestamp: Date = new Date();

  constructor(event: string, userId?: string, metadata?: Record<string, any>) {
    this.event = event;
    this.userId = userId;
    this.metadata = metadata;
  }
}
