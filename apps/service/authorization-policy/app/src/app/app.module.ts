
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainAuthorizationPolicyPresentationModule } from '@virtex/domain-authorization-policy-presentation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DomainAuthorizationPolicyPresentationModule,
  ],
})
export class AppModule {}
