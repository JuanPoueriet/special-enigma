import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ScheduleModule } from '@nestjs/schedule';
import { OutboxEvent } from './entities/outbox-event.entity';
import { OutboxService } from './outbox.service';
import { OutboxProcessor } from './outbox.processor';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([OutboxEvent]),
    ScheduleModule.forRoot(),
  ],
  providers: [OutboxService, OutboxProcessor],
  exports: [OutboxService, MikroOrmModule],
})
export class MessagingModule {}
