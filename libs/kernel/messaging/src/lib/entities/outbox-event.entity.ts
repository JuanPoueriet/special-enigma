import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'outbox_events' })
export class OutboxEvent {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  aggregateType!: string;

  @Property()
  aggregateId!: string;

  @Property()
  eventType!: string;

  @Property({ type: 'json' })
  payload!: Record<string, any>;

  @Property()
  createdAt: Date = new Date();

  @Property({ nullable: true })
  publishedAt?: Date;
}
