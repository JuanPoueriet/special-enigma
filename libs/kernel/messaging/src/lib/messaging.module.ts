import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScheduleModule } from '@nestjs/schedule';
import { OutboxEvent } from '@virteex/messaging/lib/entities/outbox-event.entity';
import { OutboxService } from '@virteex/messaging/lib/outbox.service';
import { OutboxProcessor } from '@virteex/messaging/lib/outbox.processor';
import Redis from 'ioredis';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([OutboxEvent]),
    ScheduleModule.forRoot(),
  ],
  providers: [
    OutboxService,
    OutboxProcessor,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const url = process.env['REDIS_URL'];
        if (!url) {
          throw new Error('REDIS_URL environment variable is missing');
        }
        return new Redis(url);
      }
    }
  ],
  exports: [OutboxService, MikroOrmModule, 'REDIS_CLIENT'],
})
export class MessagingModule {}
