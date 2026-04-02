import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  setupGlobalConfig,
  startOtel,
  validate,
} from '@virtex/shared-util-server-server-config';
import { AddressInfo } from 'net';

const logger = new Logger('Bootstrap');

startOtel('edge-shopfloor-app');

function validateEnv() {
  validate(process.env, [
    'INVENTORY_GRPC_URL',
  ]);
}

function isAddressInUseError(error: unknown): error is NodeJS.ErrnoException {
  return Boolean(
    error &&
      typeof error === 'object' &&
      (error as NodeJS.ErrnoException).code === 'EADDRINUSE',
  );
}

async function listenWithPortFallback(app: INestApplication) {
  const isProduction = process.env.NODE_ENV === 'production';
  const preferredPort = Number(process.env.PORT || 3103);
  const maxAttempts = isProduction ? 1 : 10;

  for (let offset = 0; offset < maxAttempts; offset += 1) {
    const candidatePort = preferredPort + offset;
    try {
      await app.listen(candidatePort);
      const address = app.getHttpServer().address() as
        | AddressInfo
        | string
        | null;
      const boundPort =
        typeof address === 'object' && address ? address.port : candidatePort;
      logger.log(
        `🚀 BFF is running on: http://localhost:${boundPort}/api/shopfloor`,
      );
      return;
    } catch (error) {
      if (!isAddressInUseError(error) || offset === maxAttempts - 1) {
        throw error;
      }

      logger.warn(
        `Port ${candidatePort} is in use. Retrying with port ${candidatePort + 1}.`,
      );
    }
  }
}

async function bootstrap() {
  try {
    validateEnv();
    const app = await NestFactory.create(AppModule);

    setupGlobalConfig(app, 'shopfloor');

    await listenWithPortFallback(app);
  } catch (error) {
    logger.error(
      `Failed to start BFF: ${(error as Error).message}`,
      (error as Error).stack,
    );
    process.exit(1);
  }
}

bootstrap();
