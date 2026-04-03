import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  IDENTITY_PACKAGE, IDENTITY_PROTO_PATH,
  BILLING_PACKAGE, BILLING_PROTO_PATH,
  INVENTORY_PACKAGE, INVENTORY_PROTO_PATH,
  CATALOG_PACKAGE, CATALOG_PROTO_PATH
} from '@virtex/shared-proto';
import { HealthModule } from '@virtex/shared-util-server-health';
import { TelemetryModule } from '@virtex/kernel-telemetry';
import { ServerConfigModule } from '@virtex/shared-util-server-server-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityProxyController } from './identity-proxy.controller';
import { IdentityProxyService } from './identity-proxy.service';
import { CookiePolicyService } from '@virtex/domain-identity-presentation';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { MicrosoftStrategy } from './strategies/microsoft.strategy';
import { OktaStrategy } from './strategies/okta.strategy';
import { SessionSerializer } from './strategies/session.serializer';

@Module({
  imports: [
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
          url: process.env['IDENTITY_GRPC_URL'] || '0.0.0.0:50051',
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
