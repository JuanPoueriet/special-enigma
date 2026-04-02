import { AppConfig } from '@virtex/shared-config';
export const environment: AppConfig = {
  production: false,
  apiUrl: (window as any)['env']?.['apiUrl'] || '/api',
};
