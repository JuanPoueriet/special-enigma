import { setupGlobalConfig, bootstrapTracing } from '@virtex/shared-util-server-server-config';
const otelSDK = bootstrapTracing('virtex-pos-service');
otelSDK.start();


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PosApiModule } from './app/pos-api.module';

async function bootstrap() {
  const app = await NestFactory.create(PosApiModule);
  setupGlobalConfig(app, 'virtex-pos-service');
    const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Apply shared global config (pipes, filters, security headers)

  const port = process.env.PORT || 3008;
  await app.listen(port);
  Logger.log(
    `🚀 POS API is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
