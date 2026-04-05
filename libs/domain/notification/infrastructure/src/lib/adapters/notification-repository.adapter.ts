import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Notification, NotificationRepositoryPort } from '@virtex/domain-notification-domain';

@Injectable()
export class NotificationRepositoryAdapter implements NotificationRepositoryPort {
  constructor(private readonly em: EntityManager) {}

  async save(notification: Notification): Promise<void> {
    await this.em.persistAndFlush(notification);
  }
}
