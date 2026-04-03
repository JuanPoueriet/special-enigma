import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { IdentityProxyService } from './identity-proxy.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly identityProxy: IdentityProxyService,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('health')
  async checkHealth(@Req() req: any) {
    const metadata = this.identityProxy.getMetadata(req);
    const identityHealth = await this.identityProxy.checkConnectivity(metadata);
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        identity: identityHealth,
      },
    };
  }
}
