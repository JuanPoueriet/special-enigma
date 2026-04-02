import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { INVENTORY_PACKAGE, INVENTORY_PROTO_PATH } from '@virtex/shared-proto';
import { WmsInventoryController } from './wms-inventory.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: INVENTORY_PACKAGE,
          protoPath: INVENTORY_PROTO_PATH,
          url: process.env['INVENTORY_GRPC_URL'],
        },
      },
    ]),
  ],
  controllers: [WmsInventoryController],
})
export class WmsApiModule {}
