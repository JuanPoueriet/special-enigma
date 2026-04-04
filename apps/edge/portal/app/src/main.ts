import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';
import passport from 'passport';
import {
  setupGlobalConfig,
  startOtel,
  validate,
} from '@virtex/shared-util-server-server-config';
import { Reflector } from '@nestjs/core';
import { BffAuthGuard } from '@virtex/kernel-bff-core';

const logger = new Logger('Bootstrap');

startOtel('edge-portal-app');

function validateEnv() {
  validate(process.env, [
    'IDENTITY_GRPC_URL',
    'BILLING_GRPC_URL',
    'INVENTORY_GRPC_URL',
    'CATALOG_GRPC_URL',
    'SESSION_SECRET',
    'REDIS_URL',
  ]);
}

async function bootstrap() {
  try {
    validateEnv();
    const app = await NestFactory.create(AppModule);

    // Apply Global Configuration (Security, Pipes, Filters, Throttling, Global Prefix)
    setupGlobalConfig(app, 'portal');

    app.useGlobalGuards(new BffAuthGuard(app.get(Reflector)));

    app.use(cookieParser());

    const redisClient = new Redis(process.env['REDIS_URL'] as string);
    const redisStore = new RedisStore({
      client: redisClient,
      prefix: 'edge_session:',
    });

    app.use(
      session({
        store: redisStore,
        secret: process.env['SESSION_SECRET'] as string,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        name: 'edge_sid',
        cookie: {
          secure: process.env['NODE_ENV'] === 'production',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60 * 24, // 24 hours
        },
      }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    const port = Number(process.env['EDGE_PORTAL_PORT'] || process.env['PORT'] || 3000);
    const server = app.getHttpServer();

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(
          `❌ Port ${port} is already in use. Local topology requires this exact port. ` +
            `Please check for other running processes or update your .env.edge-portal file.`,
        );
        process.exit(1);
      }
    });

    await app.listen(port, '0.0.0.0');
    logger.log(`🚀 Edge Portal BFF is running on: http://localhost:${port}/api/portal`);
  } catch (error) {
    logger.error(
      `Failed to start BFF: ${(error as Error).message}`,
      (error as Error).stack,
    );
    process.exit(1);
  }
}

bootstrap();
