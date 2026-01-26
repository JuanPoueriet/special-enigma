import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EntityManager } from '@mikro-orm/core';
import { OutboxEvent } from './entities/outbox-event.entity';

@Injectable()
export class OutboxProcessor {
  private readonly logger = new Logger(OutboxProcessor.name);

  constructor(private readonly em: EntityManager) {}

  @Cron(CronExpression.EVERY_SECOND)
  async handleOutboxEvents() {
    // Note: In a real distributed scenario, use FOR UPDATE SKIP LOCKED to avoid race conditions
    // or use a leader election / dedicated single instance for the poller.
    const events = await this.em.find(
      OutboxEvent,
      { publishedAt: null },
      { limit: 100 }
    );

    if (events.length === 0) {
      return;
    }

    this.logger.debug(`Found ${events.length} unpublished events`);

    for (const event of events) {
      try {
        await this.publishEvent(event);
        event.publishedAt = new Date();
      } catch (err) {
        this.logger.error(`Failed to publish event ${event.id}`, err);
      }
    }

    await this.em.flush();
  }

  private async publishEvent(event: OutboxEvent) {
    this.logger.log(`[MessageBroker] Publishing: ${event.eventType} (ID: ${event.id})`);
  }
}
