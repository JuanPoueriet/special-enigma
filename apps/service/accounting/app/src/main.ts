import { otelSDK } from './tracing';
// Start SDK before importing other modules
otelSDK.start();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { setupGlobalConfig, validate } from '@virtex/shared-util-server-server-config';

function validateEnv() {
  validate(process.env, ['KAFKA_BROKERS', 'DATABASE_URL']);
}

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule);
  setupGlobalConfig(app, 'accounting-service');
  app.use(cookieParser());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
      },
      consumer: {
        groupId: 'accounting-service-consumer',
      },
    },
  });

  await app.startAllMicroservices();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/api/accounting-service`);
}

bootstrap();
