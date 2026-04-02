import { NotificationConsumer } from './notification.consumer';
import { EmailService, SmsService, PushNotificationService } from '@virteex/domain-notification-infrastructure';
import { buildSignedContextClaims, encodeContextClaims, signEncodedContext } from '@virteex/kernel-auth';

describe('NotificationConsumer tenant enforcement', () => {
  let consumer: NotificationConsumer;
  const emailService = { sendEmail: jest.fn() } as unknown as EmailService;
  const smsService = { sendSms: jest.fn() } as unknown as SmsService;
  const pushService = { sendPushNotification: jest.fn() } as unknown as PushNotificationService;

  beforeEach(() => {
    jest.clearAllMocks();
    consumer = new NotificationConsumer(emailService, smsService, pushService);
  });

  it('rejects Kafka payloads without tenantId', async () => {
    process.env['VIRTEEX_HMAC_SECRET'] = 'test-secret';
    await expect(
      consumer.handleNotification({ to: 'user@virteex.com', subject: 'hello', body: 'body' } as any)
    ).rejects.toThrow('Rejected event without valid signed tenant context.');

    expect((emailService.sendEmail as jest.Mock)).not.toHaveBeenCalled();
  });

  it('processes Kafka payloads scoped to tenantId', async () => {
    const secret = 'test-secret';
    process.env['VIRTEEX_HMAC_SECRET'] = secret;
    const claims = buildSignedContextClaims({ tenantId: 'tenant-a' });
    const encoded = encodeContextClaims(claims);
    const signature = signEncodedContext(encoded, secret);

    await consumer.handleNotification({
      context: encoded,
      signature: signature,
      payload: { to: 'user@virteex.com', subject: 'hello', body: 'body' }
    });

    expect((emailService.sendEmail as jest.Mock)).toHaveBeenCalledTimes(1);
  });
});
