import { Injectable, Logger, Inject } from '@nestjs/common';
import { Notification, NotificationStatus, NotificationDispatchPort, NOTIFICATION_DISPATCH_PORT, NotificationRepositoryPort, NOTIFICATION_REPOSITORY_PORT } from '@virtex/domain-notification-domain';
import { NotificationStateMachine } from '../domain/notification-state-machine';

@Injectable()
export class NotificationOrchestrator {
  private readonly logger = new Logger(NotificationOrchestrator.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY_PORT)
    private readonly repository: NotificationRepositoryPort,
    @Inject(NOTIFICATION_DISPATCH_PORT)
    private readonly dispatchPort: NotificationDispatchPort
  ) {}

  async send(notification: Notification): Promise<void> {
    this.logger.log(`Orchestrating notification ${notification.id} via ${notification.channel}`);

    try {
      // Step 1: Render Template
      NotificationStateMachine.transition(notification, NotificationStatus.RENDERED);
      await this.repository.save(notification);

      // Step 2: Policy & Preference Check
      // Check ConsentLedger, NotificationPreference, and Quiet Hours

      // Step 3: Dispatch to Provider
      NotificationStateMachine.transition(notification, NotificationStatus.QUEUED_PROVIDER);
      await this.repository.save(notification);

      await this.dispatchPort.dispatch(notification);

      NotificationStateMachine.transition(notification, NotificationStatus.SENT_PROVIDER);
      await this.repository.save(notification);
    } catch (err: any) {
      this.logger.error(`Failed to send notification ${notification.id}: ${err.message}`);
      NotificationStateMachine.transition(notification, NotificationStatus.FAILED_TERMINAL, err.message);
      await this.repository.save(notification);
    }
  }
}
