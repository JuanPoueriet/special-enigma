import { Module, Global, OnModuleInit } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { DataAuditLog } from './entities/data-audit-log.entity';
import { DataAuditSubscriber } from './subscribers/data-audit.subscriber';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([DataAuditLog]),
  ],
  providers: [
    DataAuditSubscriber,
  ],
  exports: [
    MikroOrmModule,
    DataAuditSubscriber,
  ],
})
export class AuditModule implements OnModuleInit {
  constructor(
    private readonly em: EntityManager,
    private readonly subscriber: DataAuditSubscriber
  ) {}

  onModuleInit() {
    this.em.getEventManager().registerSubscriber(this.subscriber);
  }
}
