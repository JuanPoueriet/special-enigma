import { startOtel, setupGlobalConfig, validate } from '@virtex/shared-util-server-server-config';
startOtel('virtex-billing-service');

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { BILLING_PACKAGE, BILLING_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app/app.module';
import { InitialSeederService } from './app/seeds/initial-seeder.service';
import { MikroORM } from '@mikro-orm/core';

function validateEnv() {
  validate(process.env, ['KAFKA_BROKERS', 'DATABASE_URL']);
}

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule);

  setupGlobalConfig(app, 'billing-service');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: process.env.KAFKA_BROKERS!.split(','),
      },
      consumer: {
        groupId: 'billing-service-consumer',
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: BILLING_PACKAGE,
      protoPath: BILLING_PROTO_PATH,
      url: `0.0.0.0:${process.env.BILLING_GRPC_PORT || 50052}`,
    },
  });

  await app.startAllMicroservices();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3004;

  // Schema & Seeding (similar to gateway)
  if (process.env.NODE_ENV !== 'production') {
      const orm = app.get(MikroORM);
      const generator = orm.getSchemaGenerator();
      await generator.ensureDatabase();
      await generator.updateSchema();
  }

  const seeder = app.get(InitialSeederService);
  await seeder.seed();

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/api/billing-service`);
}

bootstrap();
