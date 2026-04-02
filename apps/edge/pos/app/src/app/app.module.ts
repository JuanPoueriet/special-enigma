import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BffCoreModule } from '@virtex/kernel-bff-core';
import {
  CATALOG_PACKAGE, CATALOG_PROTO_PATH,
  INVENTORY_PACKAGE, INVENTORY_PROTO_PATH
} from '@virtex/shared-proto';
import { HealthModule } from '@virtex/shared-util-server-health';
import { TelemetryModule } from '@virtex/kernel-telemetry';
import { ServerConfigModule } from '@virtex/shared-util-server-server-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    BffCoreModule,
    HealthModule,
    TelemetryModule,
    ServerConfigModule,
    ClientsModule.register([
      {
        name: 'CATALOG_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: CATALOG_PACKAGE,
          protoPath: CATALOG_PROTO_PATH,
          url: process.env['CATALOG_GRPC_URL'] || 'localhost:50051',
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
