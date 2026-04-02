import { AppConfig } from '@virtex/shared-config';

export const environment: AppConfig = {
  production: true,
  apiUrl: (window as any)['env']?.['apiUrl'] || '/api',
  recaptcha: {
    siteKey: (window as any)['env']?.['recaptchaSiteKey'] || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  },
  vapidPublicKey: (window as any)['env']?.['vapidPublicKey'] || ''
};
