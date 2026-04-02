import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationConsumer } from './notification.consumer';
import { NotificationInfrastructureModule } from '@virtex/domain-notification-infrastructure';
import { KafkaModule } from '@virtex/platform-kafka';
import { TenantModule } from '@virtex/kernel-tenant';
import { CanonicalTenantMiddleware } from '@virtex/kernel-auth';

@Module({
  imports: [
    TenantModule,
    KafkaModule.forRoot({
      clientId: 'notification-service',
      groupId: 'notification-consumer',
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    NotificationInfrastructureModule,
  ],
  controllers: [AppController, NotificationConsumer],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CanonicalTenantMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
