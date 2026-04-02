import { setupGlobalConfig, bootstrapTracing } from '@virtex/shared-util-server-server-config';
const otelSDK = bootstrapTracing('virtex-catalog-service');
otelSDK.start();


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { CATALOG_PACKAGE, CATALOG_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalConfig(app, 'virtex-catalog-service');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: CATALOG_PACKAGE,
      protoPath: CATALOG_PROTO_PATH,
      url: `0.0.0.0:${process.env['CATALOG_GRPC_PORT'] || 50054}`,
    },
  });

  await app.startAllMicroservices();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
