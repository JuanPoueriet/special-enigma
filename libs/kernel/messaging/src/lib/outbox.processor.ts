import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EntityManager } from '@mikro-orm/core';
import { OutboxEvent } from '@virteex/messaging/lib/entities/outbox-event.entity';
import Redis from 'ioredis';

@Injectable()
export class OutboxProcessor {
  private readonly logger = new Logger(OutboxProcessor.name);

  constructor(
    private readonly em: EntityManager,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis
  ) {}

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
    const channel = 'events';
    const message = JSON.stringify({
      id: event.id,
      aggregateType: event.aggregateType,
      aggregateId: event.aggregateId,
      eventType: event.eventType,
      payload: event.payload,
      occurredAt: event.createdAt
    });

    await this.redisClient.publish(channel, message);
    this.logger.log(`[MessageBroker] Published: ${event.eventType} (ID: ${event.id}) to channel ${channel}`);
  }
}
