import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATALOG_PACKAGE, CATALOG_PROTO_PATH } from '@virtex/shared-proto';
import { CatalogProxyController } from './catalog-proxy.controller';

@Module({
  imports: [
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
    ]),
  ],
  controllers: [CatalogProxyController],
})
export class CmsApiModule {}
