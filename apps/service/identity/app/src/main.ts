import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { IDENTITY_PACKAGE, IDENTITY_PROTO_PATH } from '@virtex/shared-proto';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';
import { AddressInfo, createServer } from 'net';
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

async function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const probe = createServer();

    probe.once('error', (error: NodeJS.ErrnoException) => {
      if (isAddressInUseError(error)) {
        resolve(true);
        return;
      }
      reject(error);
    });

    probe.once('listening', () => {
      probe.close(() => resolve(false));
    });

    probe.listen(port, '0.0.0.0');
  });
}

async function resolveHttpPort(requestedPort: number): Promise<number> {
  const exactPortRequired =
    process.env.NODE_ENV === 'production' ||
    process.env.REQUIRE_EXACT_PORT === 'true';

  if (!(await isPortInUse(requestedPort))) {
    return requestedPort;
  }

  if (exactPortRequired) {
    throw new Error(
      `❌ Port ${requestedPort} is already in use. Local topology requires this exact port. ` +
        `Please check for other running processes or update your .env.identity file.`,
    );
  }

  const fallbackPort = requestedPort + 1;
  logger.warn(
    `⚠️ Port ${requestedPort} is in use. Falling back to ${fallbackPort} for local development. ` +
      `Set REQUIRE_EXACT_PORT=true to enforce strict binding.`,
  );
  return fallbackPort;
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
  try {
    validateEnv();
    const app = await NestFactory.create(AppModule);

    const grpcPort = process.env['GRPC_PORT'] || 50051;
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        package: IDENTITY_PACKAGE,
        protoPath: IDENTITY_PROTO_PATH,
        url: `0.0.0.0:${grpcPort}`,
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

    const requestedPort = Number(process.env['IDENTITY_HTTP_PORT'] || process.env['PORT'] || 3001);
    const port = await resolveHttpPort(requestedPort);

    await app.listen(port, '0.0.0.0');
    logger.log(`🚀 Identity Service is running on: http://localhost:${port}`);
    if (port !== requestedPort) {
      logger.warn(
        `Identity Service requested port ${requestedPort} but is listening on fallback port ${port}.`,
      );
    }
    logger.log(`🧬 gRPC Identity Service is running on: 0.0.0.0:${grpcPort}`);
  } catch (error) {
    logger.error(
      `Failed to start Identity Service: ${(error as Error).message}`,
      (error as Error).stack,
    );
    process.exit(1);
  }
}

bootstrap();
