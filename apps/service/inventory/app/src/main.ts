
import { otelSDK } from './tracing';
// Start SDK before importing other modules
otelSDK.start();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { INVENTORY_PACKAGE, INVENTORY_PROTO_PATH } from '@virteex/shared-proto';
import { AppModule } from './app/app.module';
import { setupGlobalConfig, validate } from '@virteex/shared-util-server-server-config';

function validateEnv() {
  validate(process.env, ['DATABASE_URL', 'NATS_URL']);
}

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: INVENTORY_PACKAGE,
      protoPath: INVENTORY_PROTO_PATH,
      url: `0.0.0.0:${process.env.INVENTORY_GRPC_PORT || 50053}`,
    },
  });

  setupGlobalConfig(app, 'inventory-service');

  await app.startAllMicroservices();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
