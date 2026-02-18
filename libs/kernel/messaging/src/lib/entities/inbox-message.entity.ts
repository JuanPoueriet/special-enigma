import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class InboxMessage {
  @PrimaryKey()
  messageId!: string;

  @PrimaryKey()
  consumerId!: string;

  @Property()
  processedAt: Date = new Date();

  @Property({ type: 'json', nullable: true })
  result?: any;

  constructor(messageId: string, consumerId: string, result?: any) {
    this.messageId = messageId;
    this.consumerId = consumerId;
    this.result = result;
  }
}
