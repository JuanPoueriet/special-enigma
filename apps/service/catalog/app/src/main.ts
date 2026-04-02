import { startOtel, setupGlobalConfig } from '@virtex/shared-util-server-server-config';
startOtel('virtex-catalog-service');

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CATALOG_PACKAGE, CATALOG_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupGlobalConfig(app, 'catalog-service');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: CATALOG_PACKAGE,
      protoPath: CATALOG_PROTO_PATH,
      url: `0.0.0.0:${process.env.CATALOG_GRPC_PORT || 50051}`,
    },
  });

  await app.startAllMicroservices();

  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/api/catalog-service`,
  );
}

bootstrap();
