
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainAuthnCredentialPresentationModule } from '@virtex/domain-authn-credential-presentation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DomainAuthnCredentialPresentationModule,
  ],
})
export class AppModule {}
