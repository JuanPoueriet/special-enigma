
import { Injectable } from '@nestjs/common';
import { Credential } from '@virtex/domain-authn-credential-domain';

export interface OutboxMessage {
  id: string;
  topic: string;
  payload: any;
  createdAt: Date;
  processedAt?: Date;
}

@Injectable()
export class OutboxRepository {
  private messages: OutboxMessage[] = [];

  async save(message: OutboxMessage): Promise<void> {
    this.messages.push(message);
    // In a real implementation, this would save to the same DB as the domain entity
    console.log(`[Outbox] Saved message: ${message.topic}`);
  }

  async getPending(): Promise<OutboxMessage[]> {
    return this.messages.filter(m => !m.processedAt);
  }

  async markProcessed(id: string): Promise<void> {
    const message = this.messages.find(m => m.id === id);
    if (message) {
      message.processedAt = new Date();
    }
  }
}
