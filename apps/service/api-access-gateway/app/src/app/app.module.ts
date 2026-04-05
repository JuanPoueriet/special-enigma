
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from '@virtex/kernel-auth';
import { DomainApiAccessGatewayPresentationModule } from '@virtex/domain-api-access-gateway-presentation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    AuthModule,
    DomainApiAccessGatewayPresentationModule,
  ],
})
export class AppModule {}
