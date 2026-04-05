
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainIdentityProfilePresentationModule } from '@virtex/domain-identity-profile-presentation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DomainIdentityProfilePresentationModule,
  ],
})
export class AppModule {}
