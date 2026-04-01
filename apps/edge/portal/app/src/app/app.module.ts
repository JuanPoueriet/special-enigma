import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityProxyController } from './identity-proxy.controller';
import { IdentityProxyService } from './identity-proxy.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, IdentityProxyController],
  providers: [AppService, IdentityProxyService],
})
export class AppModule {}
