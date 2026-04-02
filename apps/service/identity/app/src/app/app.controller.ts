import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    if (!this.appService) {
        return { service: 'virtex-identity-service', status: 'ok', timestamp: new Date().toISOString() };
    }
    return this.appService.getData();
  }

  @GrpcMethod('IdentityService', 'GetMe')
  getMe(data: { access_token: string }) {
    // In a real implementation, we would validate the token and fetch the user from DB
    if (!data.access_token || data.access_token === 'invalid-token') {
      return {
        sub: '',
        email: '',
        name: '',
      };
    }

    return {
      sub: '123',
      email: 'user@example.com',
      name: 'Test User',
    };
  }

  @GrpcMethod('IdentityService', 'Login')
  login(data: any) {
    // In a real implementation, we would validate credentials against DB
    if (data.email === 'error@example.com') {
        throw new Error('Invalid credentials');
    }

    return {
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      expiresIn: 3600,
    };
  }
}
