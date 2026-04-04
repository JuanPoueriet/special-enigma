import { startOtel, setupGlobalConfig, validate } from '@virtex/shared-util-server-server-config';
startOtel('virtex-admin-service');

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ADMIN_PACKAGE, ADMIN_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app/app.module';

function validateEnv() {
  validate(process.env, ['DATABASE_URL', 'ADMIN_GRPC_PORT']);
}

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule);

  setupGlobalConfig(app, 'admin-service');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ADMIN_PACKAGE,
      protoPath: ADMIN_PROTO_PATH,
      url: `0.0.0.0:${process.env['ADMIN_GRPC_PORT'] || 50051}`,
    },
  });

  await app.startAllMicroservices();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env['PORT'] || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/api/admin-service`,
  );
}

bootstrap();
