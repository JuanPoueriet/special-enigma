import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  IDENTITY_PACKAGE, IDENTITY_PROTO_PATH,
  BILLING_PACKAGE, BILLING_PROTO_PATH,
  INVENTORY_PACKAGE, INVENTORY_PROTO_PATH
} from '@virtex/shared-proto';
import { HealthModule } from '@virtex/shared-util-server-health';
import { TelemetryModule } from '@virtex/kernel-telemetry';
import { ServerConfigModule } from '@virtex/shared-util-server-server-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityProxyController } from './identity-proxy.controller';
import { IdentityProxyService } from './identity-proxy.service';

@Module({
  imports: [
    HttpModule,
    HealthModule,
    TelemetryModule,
    ServerConfigModule,
    ClientsModule.register([
      {
        name: 'IDENTITY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: IDENTITY_PACKAGE,
          protoPath: IDENTITY_PROTO_PATH,
          url: process.env['IDENTITY_GRPC_URL'] || 'localhost:50051',
        },
      },
      {
        name: 'BILLING_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: BILLING_PACKAGE,
          protoPath: BILLING_PROTO_PATH,
          url: process.env['BILLING_GRPC_URL'] || 'localhost:50052',
        },
      },
      {
        name: 'INVENTORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: INVENTORY_PACKAGE,
          protoPath: INVENTORY_PROTO_PATH,
          url: process.env['INVENTORY_GRPC_URL'] || 'localhost:50053',
        },
      },
    ]),
  ],
  controllers: [AppController, IdentityProxyController],
  providers: [AppService, IdentityProxyService],
})
export class AppModule {}
