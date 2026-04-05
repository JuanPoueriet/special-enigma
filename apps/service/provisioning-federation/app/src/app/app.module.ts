
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DomainProvisioningFederationPresentationModule } from '@virtex/domain-provisioning-federation-presentation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DomainProvisioningFederationPresentationModule,
  ],
})
export class AppModule {}
