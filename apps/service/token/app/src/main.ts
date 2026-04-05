
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { TOKEN_PACKAGE, TOKEN_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app.module';
import { startOtel } from '@virtex/kernel-telemetry';

async function bootstrap() {
  startOtel('token-service');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: TOKEN_PACKAGE,
      protoPath: TOKEN_PROTO_PATH,
      url: `0.0.0.0:50051`,
    },
  });

  await app.listen();
  Logger.log('🧬 Token Service with OpenTelemetry is running on gRPC port 50051');
}
bootstrap();
