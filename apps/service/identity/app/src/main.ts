import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IDENTITY_PACKAGE, IDENTITY_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app/app.module';
import { startOtel, validate } from '@virtex/shared-util-server-server-config';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const logger = new Logger('Bootstrap');

startOtel('service-identity-app');

function validateEnv() {
  validate(process.env, ['REDIS_URL', 'DATABASE_URL']);
}

async function bootstrap() {
  try {
    validateEnv();

    const httpPort = process.env['PORT'] || 3000;
    const grpcPort =
      process.env['GRPC_PORT'] ?? process.env['IDENTITY_GRPC_PORT'] ?? '50051';

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // 1. Security Hardening
    app.use(helmet());
    app.use(cookieParser());

    // 2. Session Management (for Passkey challenges and state)
    const redisUrl = process.env['REDIS_URL'] || 'redis://localhost:6379';
    const redisClient = new Redis(redisUrl);
    const redisStore = new RedisStore({
      client: redisClient,
      prefix: 'identity-auth-session:',
    });

    app.use(
      session({
        store: redisStore,
        secret: process.env['SESSION_SECRET'] || 'virtex-default-session-secret',
        resave: false,
        saveUninitialized: false,
        name: 'identity.sid',
        cookie: {
          secure: process.env['NODE_ENV'] === 'production',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 1000 * 60 * 15, // 15 minutes for auth challenges
        },
      }),
    );

    // 3. CORS & Trust Proxy
    const frontendUrl = process.env['FRONTEND_URL'] || 'http://localhost:4200';
    app.enableCors({
      origin: [frontendUrl],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'x-virtex-tenant-id',
        'x-virtex-context',
        'x-virtex-signature',
        'x-xsrf-token',
      ],
    });

    app.set('trust proxy', 1);

    // Hybrid application: HTTP + gRPC
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        package: IDENTITY_PACKAGE,
        protoPath: IDENTITY_PROTO_PATH,
        url: `0.0.0.0:${grpcPort}`,
      },
    });

    await app.startAllMicroservices();
    await app.listen(httpPort);

    logger.log(`🧬 Identity Service (Hybrid) is running:`);
    logger.log(`   - HTTP: http://localhost:${httpPort}`);
    logger.log(`   - gRPC: 0.0.0.0:${grpcPort}`);
  } catch (error) {
    logger.error(
      `Failed to start Identity Service: ${(error as Error).message}`,
      (error as Error).stack,
    );
    process.exit(1);
  }
}

bootstrap();
