import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { IDENTITY_PACKAGE, IDENTITY_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app/app.module';
import {
  startOtel,
  validate,
} from '@virtex/shared-util-server-server-config';

const logger = new Logger('Bootstrap');

startOtel('service-identity-app');

function validateEnv() {
  validate(process.env, ['REDIS_URL', 'DATABASE_URL']);
}

async function bootstrap() {
  try {
    validateEnv();

    const grpcPort = process.env['GRPC_PORT'] || 50051;

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        package: IDENTITY_PACKAGE,
        protoPath: IDENTITY_PROTO_PATH,
        url: `0.0.0.0:${grpcPort}`,
      },
    });

    await app.listen();
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
