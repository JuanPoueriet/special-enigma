import { setupGlobalConfig, bootstrapTracing } from '@virtex/shared-util-server-server-config';
const otelSDK = bootstrapTracing('virtex-support-edge');
otelSDK.start();


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalConfig(app, 'virtex-support-edge');

  const port = process.env.PORT || 3104;
  await app.listen(port);
  Logger.log(`🚀 BFF is running on: http://localhost:${port}/api/support`);
}
bootstrap();
