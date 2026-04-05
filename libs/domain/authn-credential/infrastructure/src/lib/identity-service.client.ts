
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IdentityServiceClient implements OnModuleInit {
  private identityService: any;

  constructor(@Inject('IDENTITY_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.identityService = this.client.getService<any>('IdentityProfileService');
  }

  async getUserProfile(userId: string) {
    return firstValueFrom(this.identityService.getUserProfile({ userId }));
  }
}
