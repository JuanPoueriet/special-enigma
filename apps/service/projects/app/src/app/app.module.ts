import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ProjectsInfrastructureModule } from '@virtex/domain-projects-infrastructure';
import { ProjectsPresentationModule } from '@virtex/domain-projects-presentation';
import { GraphQLModule } from '@nestjs/graphql';
import depthLimit from 'graphql-depth-limit';
import { createComplexityRule, simpleEstimator } from 'graphql-query-complexity';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import { FederationSupportModule } from '@virtex/kernel-federation';
import { TenantModule } from '@virtex/kernel-tenant';
import { CanonicalTenantMiddleware } from '@virtex/kernel-auth';

@Module({
  imports: [
    TenantModule,
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
      autoSchemaFile: true,
      validationRules: [
        depthLimit(10),
        createComplexityRule({ maximumComplexity: 1000, estimators: [simpleEstimator({ defaultComplexity: 1 })] })
      ],
    }),
    FederationSupportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot({
      driver: PostgreSqlDriver,
      host: process.env.PROJECTS_DB_HOST,
      port: Number(process.env.PROJECTS_DB_PORT),
      user: process.env.PROJECTS_DB_USER,
      password: process.env.PROJECTS_DB_PASSWORD,
      dbName: process.env.PROJECTS_DB_NAME,
      autoLoadEntities: true,
    }),
    ProjectsInfrastructureModule,
    ProjectsPresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CanonicalTenantMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
