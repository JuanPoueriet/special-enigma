import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    if (!this.appService) {
        return { service: 'virteex-identity-service', status: 'ok', timestamp: new Date().toISOString() };
    }
    return this.appService.getData();
  }

  @GrpcMethod('IdentityService', 'GetMe')
  getMe(data: { access_token: string }) {
    // Mock implementation for gRPC POC
    return {
      sub: '123',
      email: 'user@example.com',
      name: 'Test User',
    };
  }

  @GrpcMethod('IdentityService', 'Login')
  login(data: any) {
    // Mock implementation for gRPC POC
    return {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600,
    };
  }
}
