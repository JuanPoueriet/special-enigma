import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { IDENTITY_PACKAGE, IDENTITY_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app/app.module';
import { startOtel, validate } from '@virtex/shared-util-server-server-config';

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

    const app = await NestFactory.create(AppModule);

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
