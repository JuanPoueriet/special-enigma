import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { IDENTITY_PACKAGE, IDENTITY_PROTO_PATH } from '@virtex/shared-proto';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';
import { AddressInfo } from 'net';
import { inspect } from 'util';
import passport from 'passport';
import { AppModule } from './app/app.module';
import {
  setupGlobalConfig,
  startOtel,
  validate,
} from '@virtex/shared-util-server-server-config';

const logger = new Logger('Bootstrap');

startOtel('service-identity-app');

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

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message || inspect(error, { depth: 2 });
  }

  return inspect(error, { depth: 2 });
}

async function buildSessionStore(): Promise<session.Store> {
  const isProduction = process.env.NODE_ENV === 'production';
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  const redisClient = new Redis(redisUrl, {
    lazyConnect: true,
    enableReadyCheck: true,
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    retryStrategy: () => null,
  });

  redisClient.on('error', (error) => {
    logger.warn(`Redis session client error: ${formatError(error)}`);
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
        `Redis is required in production for session storage: ${formatError(error)}`,
      );
    }

    logger.warn(
      `Redis unavailable in non-production; falling back to in-memory session store. Reason: ${formatError(error)}`,
    );
    return new session.MemoryStore();
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
    logger.warn(
      'SESSION_SECRET is missing; using an insecure development fallback.',
    );
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

  const port = Number(process.env.IDENTITY_PORT || 3000);
  try {
    await app.listen(port);
    logger.log(`🚀 Identity Service is running on: http://localhost:${port}`);
  } catch (error) {
    if (isAddressInUseError(error)) {
      logger.error(`Port ${port} is already in use. Identity Service failed to start.`);
    } else {
      logger.error(`Failed to start Identity Service: ${formatError(error)}`);
    }
    process.exit(1);
  }
}

bootstrap();
