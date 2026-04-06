import { Controller, Get } from '@nestjs/common';

@Controller('session')
export class SessionController {
  @Get('health')
  health() {
    return { status: 'UP', domain: 'session' };
  }
}
