import { AppConfig } from '@virtex/shared-config';

export const environment: AppConfig = {
  production: false,
  apiUrl: (window as any)['env']?.['apiUrl'] || '/api',
  recaptcha: {
    siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Public Site Key
  },
  vapidPublicKey: (window as any)['env']?.['vapidPublicKey'] || ''
};
