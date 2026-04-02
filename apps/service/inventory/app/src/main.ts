import { setupGlobalConfig, bootstrapTracing } from '@virtex/shared-util-server-server-config';
const otelSDK = bootstrapTracing('virtex-inventory-service');
otelSDK.start();


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { INVENTORY_PACKAGE, INVENTORY_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app/app.module';

function validateEnv() {
  validate(process.env, ['DATABASE_URL']);
}

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule);
  setupGlobalConfig(app, 'virtex-inventory-service');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: INVENTORY_PACKAGE,
      protoPath: INVENTORY_PROTO_PATH,
      url: `0.0.0.0:${process.env.INVENTORY_GRPC_PORT || 50053}`,
    },
  });



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
