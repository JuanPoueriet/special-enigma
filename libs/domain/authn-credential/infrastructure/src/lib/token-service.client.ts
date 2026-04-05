
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TokenServiceClient implements OnModuleInit {
  private tokenService: any;

  constructor(@Inject('TOKEN_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.tokenService = this.client.getService<any>('TokenService');
  }

  async issueTokens(request: any) {
    return firstValueFrom(this.tokenService.issueTokens(request));
  }
}
