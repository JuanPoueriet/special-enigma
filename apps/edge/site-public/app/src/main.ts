import { setupGlobalConfig, bootstrapTracing } from '@virtex/shared-util-server-server-config';
const otelSDK = bootstrapTracing('virtex-site-public-edge');
otelSDK.start();


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalConfig(app, 'virtex-site-public-edge');

  const port = process.env.PORT || 3106;
  await app.listen(port);
  Logger.log(`🚀 BFF is running on: http://localhost:${port}/api/site`);
}
bootstrap();
