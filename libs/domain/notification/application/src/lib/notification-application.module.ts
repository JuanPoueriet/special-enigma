import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationOrchestrator } from './notification-orchestrator';

@Module({
  providers: [NotificationService, NotificationOrchestrator],
  exports: [NotificationService, NotificationOrchestrator],
})
export class NotificationApplicationModule {}
