import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IDENTITY_PACKAGE, IDENTITY_PROTO_PATH } from '@virteex/shared-proto';
import { HealthModule } from '@virteex/shared-util-server-health';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityProxyController } from './identity-proxy.controller';
import { IdentityProxyService } from './identity-proxy.service';

@Module({
  imports: [
    HttpModule,
    HealthModule,
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
    ]),
  ],
  controllers: [AppController, IdentityProxyController],
  providers: [AppService, IdentityProxyService],
})
export class AppModule {}
