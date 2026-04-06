import { Module } from '@nestjs/common';
import { SessionController } from './controllers/session.controller';

@Module({
  controllers: [SessionController],
  providers: [],
  exports: [],
})
export class DomainSessionPresentationModule {}
