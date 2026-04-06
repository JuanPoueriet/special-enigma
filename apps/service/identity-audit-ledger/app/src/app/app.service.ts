import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { status: 'UP', message: 'Ready' };
  }
}
