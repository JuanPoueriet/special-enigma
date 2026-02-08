import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { IdentityInfrastructureModule } from '@virteex/identity-infrastructure';

@Module({
  imports: [IdentityInfrastructureModule],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class IdentityPresentationModule {}
