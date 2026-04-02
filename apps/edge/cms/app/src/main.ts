import { setupGlobalConfig, bootstrapTracing } from '@virtex/shared-util-server-server-config';
const otelSDK = bootstrapTracing('virtex-cms-edge');
otelSDK.start();


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalConfig(app, 'virtex-cms-edge');

  const port = process.env.PORT || 3105;
  await app.listen(port);
  Logger.log(`🚀 BFF is running on: http://localhost:${port}/api/cms`);
}
bootstrap();
