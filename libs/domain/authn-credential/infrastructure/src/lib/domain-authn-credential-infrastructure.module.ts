
import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  IDENTITY_PROFILE_PACKAGE, IDENTITY_PROFILE_PROTO_PATH,
  TOKEN_PACKAGE, TOKEN_PROTO_PATH,
  RISK_ADAPTIVE_AUTH_PACKAGE, RISK_ADAPTIVE_AUTH_PROTO_PATH
} from '@virtex/shared-proto';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'IDENTITY_PROFILE_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: IDENTITY_PROFILE_PACKAGE,
          protoPath: IDENTITY_PROFILE_PROTO_PATH,
          url: 'identity-profile-service:50051',
        },
      },
      {
        name: 'TOKEN_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: TOKEN_PACKAGE,
          protoPath: TOKEN_PROTO_PATH,
          url: 'token-service:50051',
        },
      },
      {
        name: 'RISK_ADAPTIVE_AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: RISK_ADAPTIVE_AUTH_PACKAGE,
          protoPath: RISK_ADAPTIVE_AUTH_PROTO_PATH,
          url: 'risk-adaptive-auth-service:50051',
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class AuthnInfrastructureModule {}
