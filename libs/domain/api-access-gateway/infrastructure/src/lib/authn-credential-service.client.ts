
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthnCredentialServiceClient implements OnModuleInit {
  private authnService: any;

  constructor(@Inject('AUTHN_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authnService = this.client.getService<any>('AuthnCredentialService');
  }

  async login(dto: any) {
    return firstValueFrom(this.authnService.login(dto));
  }
}
