import { setupGlobalConfig, bootstrapTracing } from '@virtex/shared-util-server-server-config';
const otelSDK = bootstrapTracing('virtex-admin-service');
otelSDK.start();


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalConfig(app, 'virtex-admin-service');
          const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
