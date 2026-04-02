import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { IMessageBroker } from '@virtex/domain-accounting-application';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaMessageBroker implements IMessageBroker, OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaMessageBroker.name);
  private kafkaProducer: Producer | null = null;
  private isHealthy = false;

  async onModuleInit() {
    await this.connectWithRetry();
  }

  private async connectWithRetry(retries = 5, delay = 1000) {
    const brokers = process.env['KAFKA_BROKERS'] ? process.env['KAFKA_BROKERS'].split(',') : [];
    if (brokers.length === 0) {
      this.logger.warn('KAFKA_BROKERS not set. Kafka disabled.');
      return;
    }

    const kafka = new Kafka({
      clientId: process.env['KAFKA_CLIENT_ID'] || 'accounting-service',
      brokers: brokers,
      retry: {
        initialRetryTime: 300,
        retries: 8
      }
    });
    this.kafkaProducer = kafka.producer();

    for (let i = 0; i < retries; i++) {
      try {
        await this.kafkaProducer.connect();
        this.isHealthy = true;
        this.logger.log('Connected to Kafka successfully.');
        return;
      } catch (err) {
        this.logger.error(`Failed to connect to Kafka (attempt ${i + 1}/${retries})`, err);
        if (i < retries - 1) {
          await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
        }
      }
    }
    this.isHealthy = false;
    this.logger.error('Could not establish connection to Kafka after multiple retries.');
  }

  async onModuleDestroy() {
    if (this.kafkaProducer) {
      await this.kafkaProducer.disconnect();
    }
  }

  async publish(topic: string, payload: unknown): Promise<void> {
    if (!this.kafkaProducer || !this.isHealthy) {
      const errorMsg = `Kafka producer not healthy or not available. Cannot publish message to topic: ${topic}`;
      this.logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    try {
      await this.kafkaProducer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(payload) }],
      });
    } catch (err) {
      this.logger.error(`Failed to publish message to Kafka topic ${topic}`, err);
      throw err;
    }
  }
}
