import { setupGlobalConfig, bootstrapTracing } from '@virtex/shared-util-server-server-config';
const otelSDK = bootstrapTracing('virtex-portal-edge');
otelSDK.start();


import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AddressInfo } from 'net';

const logger = new Logger('Bootstrap');

function isAddressInUseError(error: unknown): error is NodeJS.ErrnoException {
  return Boolean(
    error &&
      typeof error === 'object' &&
      (error as NodeJS.ErrnoException).code === 'EADDRINUSE',
  );
}

async function listenWithPortFallback(app: INestApplication) {
  const isProduction = process.env.NODE_ENV === 'production';
  const preferredPort = Number(process.env.PORT || 3100);
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
      logger.log(`🚀 BFF is running on: http://localhost:${boundPort}/api/portal`);
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
    const app = await NestFactory.create(AppModule);
  setupGlobalConfig(app, 'virtex-portal-edge');

    // Apply Global Configuration (Security, Pipes, Filters, Throttling, Global Prefix)


    await listenWithPortFallback(app);
  } catch (error) {
    logger.error(`Failed to start BFF: ${(error as Error).message}`, (error as Error).stack);
    process.exit(1);
  }
}

bootstrap();
