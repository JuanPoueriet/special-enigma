import { AppConfig } from '@virtex/shared-config';
export const environment: AppConfig = {
  production: true,
  apiUrl: (window as any)['env']?.['apiUrl'] || '',
};
