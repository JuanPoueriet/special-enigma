import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { OutboxEvent } from './entities/outbox-event.entity';

@Injectable()
export class OutboxService {
  constructor(private readonly em: EntityManager) {}

  async add(event: {
    aggregateType: string;
    aggregateId: string;
    eventType: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: Record<string, any>;
  }): Promise<void> {
    const outboxEvent = new OutboxEvent();
    outboxEvent.aggregateType = event.aggregateType;
    outboxEvent.aggregateId = event.aggregateId;
    outboxEvent.eventType = event.eventType;
    outboxEvent.payload = event.payload;

    this.em.persist(outboxEvent);
  }
}
