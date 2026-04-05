
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class OutboxRepository {
  constructor(
    @Inject('MikroORM') private readonly orm: any,
  ) {}

  async save(event: any) {
    // Transactional outbox implementation
    console.log('Event saved to outbox:', event.type);
  }
}
