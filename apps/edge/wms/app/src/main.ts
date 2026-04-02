import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { setupGlobalConfig, validate } from '@virtex/shared-util-server-server-config';

function validateEnv() {
  validate(process.env, ['INVENTORY_GRPC_URL']);
}

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule);

  // Apply Global Configuration (Security, Pipes, Filters, Throttling)
  setupGlobalConfig(app, 'wms');

  const port = process.env.PORT || 3102;

  await app.listen(port);
  Logger.log(`🚀 BFF is running on: http://localhost:${port}/api/wms`);
}

bootstrap();
