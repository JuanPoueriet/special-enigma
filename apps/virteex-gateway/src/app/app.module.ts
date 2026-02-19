import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'catalog',
                url: configService.get('CATALOG_SERVICE_URL') || 'http://virteex-catalog-service:3000/graphql',
              },
              {
                name: 'identity',
                url: configService.get('IDENTITY_SERVICE_URL') || 'http://virteex-identity-service:3000/graphql',
              },
              {
                name: 'inventory',
                url: configService.get('INVENTORY_SERVICE_URL') || 'http://virteex-inventory-service:3000/graphql',
              },
              {
                name: 'billing',
                url: configService.get('BILLING_SERVICE_URL') || 'http://virteex-billing-service:3000/graphql',
              },
            ],
          }),
        },
      }),
    }),
  ],
})
export class AppModule {}
