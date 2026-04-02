import { Module } from '@nestjs/common';
import { PosController } from './pos.controller';
import { ProcessSaleUseCase } from '@virtex/domain-pos-application';
import { OpenShiftUseCase } from '@virtex/domain-pos-application';
import { PosInfrastructureModule } from '@virtex/domain-pos-infrastructure';
import { HealthModule } from '@virtex/shared-util-server-health';
import { ServerConfigModule } from '@virtex/shared-util-server-server-config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  BILLING_PACKAGE, BILLING_PROTO_PATH,
  INVENTORY_PACKAGE, INVENTORY_PROTO_PATH
} from '@virtex/shared-proto';

@Module({
  imports: [
    HealthModule,
    ServerConfigModule,
    PosInfrastructureModule,
    ClientsModule.register([
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
  controllers: [PosController],
  providers: [
    ProcessSaleUseCase,
    OpenShiftUseCase,
  ],
})
export class PosApiModule {}
