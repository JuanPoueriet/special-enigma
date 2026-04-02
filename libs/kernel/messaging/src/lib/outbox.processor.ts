import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClientProxy } from '@nestjs/microservices';
import { EntityManager, LockMode } from '@mikro-orm/core';
import { OutboxEvent } from './entities/outbox-event.entity';
import Redis from 'ioredis';
import { Kafka, Producer } from 'kafkajs';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OutboxProcessor implements OnModuleInit {
  private readonly logger = new Logger(OutboxProcessor.name);
  private kafkaProducer: Producer | null = null;
  private isKafkaConnected = false;

  constructor(
    private readonly em: EntityManager,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  async onModuleInit() {
    const brokers = process.env['KAFKA_BROKERS'] ? process.env['KAFKA_BROKERS'].split(',') : [];
    if (brokers.length > 0) {
      try {
        const kafka = new Kafka({
          clientId: process.env['KAFKA_CLIENT_ID'] || 'virtex-api-gateway',
          brokers: brokers,
          retry: {
            retries: 2
          }
        });
        this.kafkaProducer = kafka.producer();
        await this.kafkaProducer.connect();
        this.isKafkaConnected = true;
        this.logger.log('Connected to Kafka successfully.');
      } catch (err) {
        this.logger.warn('Failed to connect to Kafka. Application will continue using Redis/Logs only.', err);
      }
    } else {
        this.logger.warn('KAFKA_BROKERS environment variable not set. Kafka integration disabled.');
    }
  }

  @Cron(CronExpression.EVERY_SECOND)
  async handleOutboxEvents() {
    // Level 5: Atomic polling using FOR UPDATE SKIP LOCKED to prevent race conditions
    // across multiple instances of the worker.
    // Level 5: Use QueryBuilder for strict FOR UPDATE SKIP LOCKED
    const qb = (this.em as any).createQueryBuilder(OutboxEvent, 'e');
    const events = await qb
      .select('*')
      .where({ publishedAt: null })
      .limit(100)
      .setLockMode(LockMode.PESSIMISTIC_PARTIAL_WRITE) // SKIP LOCKED (MikroORM 6)
      .execute();

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
    const messagePayload = {
      id: event.id,
      aggregateType: event.aggregateType,
      aggregateId: event.aggregateId,
      eventType: event.eventType,
      payload: event.payload,
      occurredAt: event.createdAt
    };
    const messageString = JSON.stringify(messagePayload);

    // NATS Publishing (Primary backbone)
    try {
        const subject = event.aggregateType.toLowerCase().replace(/\./g, '.');
        await firstValueFrom(this.natsClient.emit(subject, messagePayload));
        this.logger.log(`[NATS] Published: ${event.eventType} to subject ${subject}`);
    } catch (natsErr) {
        this.logger.error(`[NATS] Error publishing event ${event.id}`, natsErr);
    }

    // Kafka Publishing (Secondary/Domain-specific backbone)
    if (this.isKafkaConnected && this.kafkaProducer) {
        try {
            // Normalize topic name: e.g., 'crm.sale' -> 'crm-sale'
            const topic = event.aggregateType.toLowerCase().replace(/\./g, '-');
            await this.kafkaProducer.send({
                topic: topic,
                messages: [{ key: event.aggregateId, value: messageString }],
            });
            this.logger.log(`[Kafka] Published: ${event.eventType} to topic ${topic}`);
        } catch (kafkaErr) {
            this.logger.error(`[Kafka] Error publishing event ${event.id}`, kafkaErr);
        }
    }

    // Redis Publishing (for Real-time UI updates via WebSockets, etc.)
    const channel = 'events';
    await this.redisClient.publish(channel, messageString);
    this.logger.log(`[Redis] Published: ${event.eventType} (ID: ${event.id}) to channel ${channel}`);
  }
}
