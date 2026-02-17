import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { TenantController } from './controllers/tenant.controller';
import { IdentityInfrastructureModule } from '@virteex/identity-infrastructure';

@Module({
  imports: [IdentityInfrastructureModule],
  controllers: [AuthController, UsersController, TenantController],
  providers: [],
  exports: [],
})
export class IdentityPresentationModule {}
