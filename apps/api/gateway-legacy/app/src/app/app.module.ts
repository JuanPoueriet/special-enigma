import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import depthLimit from 'graphql-depth-limit';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

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
                url: configService.get('CATALOG_SERVICE_URL') || 'http://api-catalog:3000/graphql',
              },
              {
                name: 'identity',
                url: configService.get('IDENTITY_SERVICE_URL') || 'http://api-identity:3000/graphql',
              },
              {
                name: 'inventory',
                url: configService.get('INVENTORY_SERVICE_URL') || 'http://api-inventory:3000/graphql',
              },
              {
                name: 'billing',
                url: configService.get('BILLING_SERVICE_URL') || 'http://api-billing:3000/graphql',
              },
              {
                name: 'accounting',
                url: configService.get('ACCOUNTING_SERVICE_URL') || 'http://api-accounting:3000/graphql',
              },
              {
                name: 'payroll',
                url: configService.get('PAYROLL_SERVICE_URL') || 'http://api-payroll:3000/graphql',
              },
              {
                name: 'treasury',
                url: configService.get('TREASURY_SERVICE_URL') || 'http://api-treasury:3000/graphql',
              },
              {
                name: 'crm',
                url: configService.get('CRM_SERVICE_URL') || 'http://api-crm:3000/graphql',
              },
              {
                name: 'projects',
                url: configService.get('PROJECTS_SERVICE_URL') || 'http://api-projects:3000/graphql',
              },
              {
                name: 'manufacturing',
                url: configService.get('MANUFACTURING_SERVICE_URL') || 'http://api-manufacturing:3000/graphql',
              },
              {
                name: 'purchasing',
                url: configService.get('PURCHASING_SERVICE_URL') || 'http://api-purchasing:3000/graphql',
              },
              {
                name: 'bi',
                url: configService.get('BI_SERVICE_URL') || 'http://api-bi:3000/graphql',
              },
              {
                name: 'admin',
                url: configService.get('ADMIN_SERVICE_URL') || 'http://api-admin:3000/graphql',
              },
              {
                name: 'fixed-assets',
                url: configService.get('FIXED_ASSETS_SERVICE_URL') || 'http://api-fixed-assets:3000/graphql',
              },
            ],
          }),
        },
        validationRules: [depthLimit(10)],
        context: ({ req }) => ({ req }),
        plugins: [
          {
            async requestDidStart() {
              return {
                async validationDidStart({ source, schema }) {
                  return async (errors) => {
                    if (errors.length > 0) return;
                    const complexity = getComplexity({
                      schema,
                      query: source as any,
                      variables: {},
                      estimators: [
                        fieldExtensionsEstimator(),
                        simpleEstimator({ defaultComplexity: 1 }),
                      ],
                    });
                    if (complexity > 100) {
                      throw new Error(
                        `Query is too complex: ${complexity}. Maximum allowed complexity: 100`,
                      );
                    }
                  };
                },
              };
            },
          },
        ],
      }),
    }),
  ],
})
export class AppModule {}
