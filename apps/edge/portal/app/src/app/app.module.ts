import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  IDENTITY_PACKAGE,
  IDENTITY_PROTO_PATH,
  BILLING_PACKAGE,
  BILLING_PROTO_PATH,
  INVENTORY_PACKAGE,
  INVENTORY_PROTO_PATH,
  CATALOG_PACKAGE,
  CATALOG_PROTO_PATH,
} from '@virtex/shared-proto';
import { HealthModule } from '@virtex/shared-util-server-health';
import { TelemetryModule } from '@virtex/kernel-telemetry';
import { ServerConfigModule } from '@virtex/shared-util-server-server-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityProxyController } from './identity-proxy.controller';
import { IdentityProxyService } from './identity-proxy.service';
import { CookiePolicyService } from '@virtex/kernel-auth';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { MicrosoftStrategy } from './strategies/microsoft.strategy';
import { OktaStrategy } from './strategies/okta.strategy';
import { SessionSerializer } from './strategies/session.serializer';
import { BffCoreModule } from '@virtex/kernel-bff-core';

@Module({
  imports: [
    BffCoreModule,
    HealthModule,
    TelemetryModule,
    ServerConfigModule,
    PassportModule.register({ session: true }),
    ClientsModule.register([
      {
        name: 'IDENTITY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: IDENTITY_PACKAGE,
          protoPath: IDENTITY_PROTO_PATH,
          url: process.env['IDENTITY_GRPC_URL'],
        },
      },
      {
        name: 'BILLING_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: BILLING_PACKAGE,
          protoPath: BILLING_PROTO_PATH,
          url: process.env['BILLING_GRPC_URL'],
        },
      },
      {
        name: 'INVENTORY_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: INVENTORY_PACKAGE,
          protoPath: INVENTORY_PROTO_PATH,
          url: process.env['INVENTORY_GRPC_URL'],
        },
      },
      {
        name: 'CATALOG_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: CATALOG_PACKAGE,
          protoPath: CATALOG_PROTO_PATH,
          url: process.env['CATALOG_GRPC_URL'],
        },
      },
    ]),
  ],
  controllers: [AppController, IdentityProxyController],
  providers: [
    AppService,
    IdentityProxyService,
    CookiePolicyService,
    GoogleStrategy,
    MicrosoftStrategy,
    OktaStrategy,
    SessionSerializer,
  ],
})
export class AppModule {}
