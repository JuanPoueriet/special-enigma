import { Injectable } from '@nestjs/common';

export interface ServiceStatusDto {
  service: string;
  status: 'ok';
  timestamp: string;
}

@Injectable()
export class AppService {
  getData(): ServiceStatusDto {
    return {
      service: 'virtex-notification-service',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
