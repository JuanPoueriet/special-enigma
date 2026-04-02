import { setupGlobalConfig, bootstrapTracing } from '@virtex/shared-util-server-server-config';
const otelSDK = bootstrapTracing('virtex-pos-edge');
otelSDK.start();


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalConfig(app, 'virtex-pos-edge');

  // Apply Global Configuration (Security, Pipes, Filters, Throttling)


  const port = process.env.PORT || 3101;

  await app.listen(port);
  Logger.log(`🚀 BFF is running on: http://localhost:${port}/api/pos`);
}

bootstrap();
