import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { LoggerModule } from 'nestjs-pino';
import { TerminusModule } from '@nestjs/terminus';
import { ServerConfigModule } from '@virtex/shared-util-server-server-config';
import { GraphQLModule } from '@nestjs/graphql';
import depthLimit from 'graphql-depth-limit';
import { createComplexityRule, simpleEstimator } from 'graphql-query-complexity';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { SubscriptionPresentationModule } from '@virtex/domain-subscription-presentation';
import { SubscriptionInfrastructureModule } from '@virtex/domain-subscription-infrastructure';
import { SubscriptionApplicationModule } from '@virtex/domain-subscription-application';
import { TenantModule } from '@virtex/kernel-tenant';
import { CanonicalTenantMiddleware } from '@virtex/kernel-auth';

@Module({
  imports: [
    TenantModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL || 'info',
        transport: process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty' }
          : undefined,
      },
    }),
    TerminusModule,
    ServerConfigModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({
              embed: true,
              graphRef: 'my-graph@current'
            })
          : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
      autoSchemaFile: {
        federation: 2,
      },
      validationRules: [
        depthLimit(10),
        createComplexityRule({ maximumComplexity: 1000, estimators: [simpleEstimator({ defaultComplexity: 1 })] })
      ],
    }),
    MikroOrmModule.forRootAsync({
      driver: PostgreSqlDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isPostgres = configService.get('DB_DRIVER') === 'postgres';
        return {
          driver: isPostgres ? PostgreSqlDriver : SqliteDriver,
          host: isPostgres ? (configService.get<string>('SUBSCRIPTION_DB_HOST') || configService.get<string>('DB_HOST')) : undefined,
          port: isPostgres ? (configService.get<number>('SUBSCRIPTION_DB_PORT') || configService.get<number>('DB_PORT')) : undefined,
          user: isPostgres ? (configService.get<string>('SUBSCRIPTION_DB_USER') || configService.get<string>('DB_USER')) : undefined,
          password: isPostgres ? (configService.get<string>('SUBSCRIPTION_DB_PASSWORD') || configService.get<string>('DB_PASSWORD')) : undefined,
          dbName: (() => {
            const dbName = configService.get<string>('SUBSCRIPTION_DB_NAME') || 'virtex_subscription';
            return dbName;
          })(),
          autoLoadEntities: true,
          driverOptions: (isPostgres && configService.get<boolean>('DB_SSL_ENABLED'))
            ? {
                connection: { ssl: { rejectUnauthorized: (configService.get("NODE_ENV") === "production" || process.env.RELEASE_STAGE === "production") ? true : configService.get("DB_SSL_REJECT_UNAUTHORIZED") !== "false" } },
              }
            : undefined,
        };
      },
    }),
    SubscriptionInfrastructureModule,
    SubscriptionPresentationModule,
    SubscriptionApplicationModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CanonicalTenantMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
