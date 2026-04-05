
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { IDENTITY_AUDIT_LEDGER_PACKAGE, IDENTITY_AUDIT_LEDGER_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: IDENTITY_AUDIT_LEDGER_PACKAGE,
      protoPath: IDENTITY_AUDIT_LEDGER_PROTO_PATH,
      url: `0.0.0.0:50051`,
    },
  });

  await app.listen();
  Logger.log('🧬 Identity Audit Ledger Service is running on gRPC port 50051');
}
bootstrap();
