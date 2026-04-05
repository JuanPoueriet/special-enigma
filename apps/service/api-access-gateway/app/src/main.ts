
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { API_ACCESS_GATEWAY_PACKAGE, API_ACCESS_GATEWAY_PROTO_PATH } from '@virtex/shared-proto';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: API_ACCESS_GATEWAY_PACKAGE,
      protoPath: API_ACCESS_GATEWAY_PROTO_PATH,
      url: `0.0.0.0:50051`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  Logger.log('🧬 API Access Gateway is running on http://localhost:3000 and gRPC on port 50051');
}
bootstrap();
