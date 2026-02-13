import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { IdentityInfrastructureModule } from '@virteex/identity-infrastructure';

@Module({
  imports: [IdentityInfrastructureModule],
  controllers: [AuthController, UsersController],
  providers: [],
  exports: [],
})
export class IdentityPresentationModule {}
