import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { status: string; domain: string } {
    return { status: 'UP', domain: 'token' };
  }
}
