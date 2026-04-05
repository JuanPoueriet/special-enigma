
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { IDENTITY_PROFILE_PACKAGE, IDENTITY_PROFILE_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: IDENTITY_PROFILE_PACKAGE,
      protoPath: IDENTITY_PROFILE_PROTO_PATH,
      url: `0.0.0.0:50051`,
    },
  });

  await app.listen();
  Logger.log('🧬 Identity Profile Service is running on gRPC port 50051');
}
bootstrap();
