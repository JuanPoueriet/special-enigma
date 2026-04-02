import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import {
  setupGlobalConfig,
  startOtel,
  validate,
} from '@virtex/shared-util-server-server-config';
import { AddressInfo } from 'net';

const logger = new Logger('Bootstrap');

startOtel('edge-portal-app');

function validateEnv() {
  validate(process.env, [
    'IDENTITY_GRPC_URL',
    'BILLING_GRPC_URL',
    'INVENTORY_GRPC_URL',
    'CATALOG_GRPC_URL',
    'IDENTITY_SERVICE_URL',
  ]);
}

function isAddressInUseError(error: unknown): error is NodeJS.ErrnoException {
  return Boolean(
    error &&
      typeof error === 'object' &&
      (error as NodeJS.ErrnoException).code === 'EADDRINUSE',
  );
}

async function bootstrap() {
  try {
    validateEnv();
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    // Apply Global Configuration (Security, Pipes, Filters, Throttling, Global Prefix)
    setupGlobalConfig(app, 'portal');

    const port = Number(process.env.EDGE_PORTAL_PORT || 3100);
    try {
      await app.listen(port);
      logger.log(`🚀 BFF is running on: http://localhost:${port}/api/portal`);
    } catch (error) {
      if (isAddressInUseError(error)) {
        logger.error(`Port ${port} is already in use. BFF failed to start.`);
      } else {
        logger.error(`Failed to start BFF: ${(error as Error).message}`);
      }
      process.exit(1);
    }
  } catch (error) {
    logger.error(
      `Failed to start BFF: ${(error as Error).message}`,
      (error as Error).stack,
    );
    process.exit(1);
  }
}

bootstrap();
