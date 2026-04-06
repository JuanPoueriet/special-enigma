import { Module } from '@nestjs/common';
import { TokenService } from '@virtex/domain-token-domain';

@Module({
  controllers: [],
  providers: [
    {
      provide: 'TokenService',
      useClass: TokenService,
    },
  ],
  exports: ['TokenService'],
})
export class DomainTokenInfrastructureModule {}
