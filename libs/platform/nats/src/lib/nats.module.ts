import { Module, DynamicModule, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

export interface NatsModuleOptions {
  name: string;
  url?: string;
}

@Global()
@Module({})
export class NatsModule {
  static forRoot(options: NatsModuleOptions): DynamicModule {
    return {
      module: NatsModule,
      imports: [
        ClientsModule.register([
          {
            name: options.name,
            transport: Transport.NATS,
            options: {
              servers: [options.url || process.env['NATS_URL'] || 'nats://localhost:4222'],
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
