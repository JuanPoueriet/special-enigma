import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OutboxEvent } from './entities/outbox-event.entity';
import { OutboxService } from './outbox.service';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([OutboxEvent])],
  providers: [OutboxService],
  exports: [OutboxService, MikroOrmModule],
})
export class MessagingModule {}
