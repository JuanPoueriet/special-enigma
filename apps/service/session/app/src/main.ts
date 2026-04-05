
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SESSION_PACKAGE, SESSION_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: SESSION_PACKAGE,
      protoPath: SESSION_PROTO_PATH,
      url: `0.0.0.0:50051`,
    },
  });

  await app.listen();
  Logger.log('🧬 Session Service is running on gRPC port 50051');
}
bootstrap();
