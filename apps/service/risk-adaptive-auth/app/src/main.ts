
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { RISK_ADAPTIVE_AUTH_PACKAGE, RISK_ADAPTIVE_AUTH_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: RISK_ADAPTIVE_AUTH_PACKAGE,
      protoPath: RISK_ADAPTIVE_AUTH_PROTO_PATH,
      url: `0.0.0.0:50051`,
    },
  });

  await app.listen();
  Logger.log('🧬 Risk Adaptive Auth Service is running on gRPC port 50051');
}
bootstrap();
