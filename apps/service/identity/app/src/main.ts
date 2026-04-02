import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { IDENTITY_PACKAGE, IDENTITY_PROTO_PATH } from '@virtex/shared-proto';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';
import { AddressInfo } from 'net';
import passport from 'passport';
import { otelSDK } from './tracing';
// Start SDK before importing other modules
otelSDK.start();

import { AppModule } from './app/app.module';
import { setupGlobalConfig, validate } from '@virtex/shared-util-server-server-config';

const logger = new Logger('Bootstrap');

function isAddressInUseError(error: unknown): error is NodeJS.ErrnoException {
  return Boolean(
    error &&
      typeof error === 'object' &&
      (error as NodeJS.ErrnoException).code === 'EADDRINUSE',
  );
}

function validateEnv() {
  validate(process.env, ['SESSION_SECRET', 'REDIS_URL', 'DATABASE_URL']);
}

async function buildSessionStore(): Promise<session.Store> {
  const isProduction = process.env.NODE_ENV === 'production';
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  const redisClient = new Redis(redisUrl, {
    lazyConnect: true,
    enableReadyCheck: true,
    maxRetriesPerRequest: 1,
    retryStrategy: (attempt) =>
      attempt <= 3 ? Math.min(attempt * 100, 1000) : null,
  });

  redisClient.on('error', (error) => {
    logger.warn(`Redis session client error: ${error.message}`);
  });

  try {
    await Promise.race([
      redisClient.connect(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Redis connection timeout')), 1500),
      ),
    ]);

    logger.log(`Session store: Redis (${redisUrl})`);
    return new RedisStore({
      client: redisClient,
      prefix: 'virtex_sess:',
    });
  } catch (error) {
    redisClient.disconnect();

    if (isProduction) {
      throw new Error(
        `Redis is required in production for session storage: ${(error as Error).message}`,
      );
    }

    logger.warn(
      `Redis unavailable in non-production; falling back to in-memory session store. Reason: ${(error as Error).message}`,
    );
    return new session.MemoryStore();
  }
}

async function listenWithPortFallback(app: INestApplication) {
  const isProduction = process.env.NODE_ENV === 'production';
  const preferredPort = Number(process.env.PORT || 3000);
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
      logger.log(`🚀 Application is running on: http://localhost:${boundPort}`);
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
  validateEnv();
  const app = await NestFactory.create(AppModule);


  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: IDENTITY_PACKAGE,
      protoPath: IDENTITY_PROTO_PATH,
      url: `0.0.0.0:${process.env.GRPC_PORT || 50051}`,
    },
  });

  await app.startAllMicroservices();

  setupGlobalConfig(app, 'identity-service');

  app.use(cookieParser());

  const isProduction = process.env.NODE_ENV === 'production';
  const resolvedSessionSecret = process.env.SESSION_SECRET;

  if (!resolvedSessionSecret) {
    if (isProduction) {
      throw new Error('SESSION_SECRET is required in production');
    }
    logger.warn('SESSION_SECRET is missing; using an insecure development fallback.');
  }

  const redisStore = await buildSessionStore();

  app.use(
    session({
      store: redisStore,
      secret: resolvedSessionSecret || 'virtex-dev-secret-session',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await listenWithPortFallback(app);
}

bootstrap();
