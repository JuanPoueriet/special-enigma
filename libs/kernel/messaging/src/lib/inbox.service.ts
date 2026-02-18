import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { InboxMessage } from './entities/inbox-message.entity';

@Injectable()
export class InboxService {
  private readonly logger = new Logger(InboxService.name);

  constructor(private readonly em: EntityManager) {}

  /**
   * Processes a message idempotently.
   * If the message has already been processed by this consumer, it returns the stored result.
   * Otherwise, it executes the handler and stores the result.
   */
  async process<T>(
    messageId: string,
    consumerId: string,
    handler: () => Promise<T>
  ): Promise<T> {
    return await this.em.transactional(async (em) => {
      const existing = await em.findOne(InboxMessage, {
        messageId,
        consumerId,
      });

      if (existing) {
        this.logger.debug(`Message ${messageId} already processed by ${consumerId}`);
        return existing.result;
      }

      this.logger.debug(`Processing message ${messageId} for ${consumerId}`);
      const result = await handler();

      const inboxMessage = new InboxMessage(messageId, consumerId, result);
      em.persist(inboxMessage);

      return result;
    });
  }
}
