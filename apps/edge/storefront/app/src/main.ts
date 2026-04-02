import { setupGlobalConfig, bootstrapTracing } from '@virtex/shared-util-server-server-config';
const otelSDK = bootstrapTracing('virtex-storefront-edge');
otelSDK.start();


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalConfig(app, 'virtex-storefront-edge');

  const port = process.env.PORT || 3107;
  await app.listen(port);
  Logger.log(`🚀 BFF is running on: http://localhost:${port}/api/store`);
}
bootstrap();
