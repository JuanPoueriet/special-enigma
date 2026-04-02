import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Kafka Microservice for processing event patterns
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: process.env['KAFKA_BROKERS']?.split(',') || ['localhost:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
      },
    },
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  await app.startAllMicroservices();

  const port = process.env.PORT || 3002;
  await app.listen(port);

  Logger.log(
    `🚀 Application with Kafka microservice is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
