
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainRiskAdaptiveAuthPresentationModule } from '@virtex/domain-risk-adaptive-auth-presentation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DomainRiskAdaptiveAuthPresentationModule,
  ],
})
export class AppModule {}
