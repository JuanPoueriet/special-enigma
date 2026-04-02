import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  production: boolean;
  vapidPublicKey?: string;
  recaptcha?: {
    siteKey: string;
  };
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
export const API_URL = new InjectionToken<string>('API_URL');

export function getBffUrl(service: string, apiUrl: string): string {
  const normalizedApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
  const serviceSegment = `/${service}`;

  // If the service path is already present, only append the API version.
  if (normalizedApiUrl.includes(serviceSegment)) {
    return `${normalizedApiUrl}/v1`;
  }

  return `${normalizedApiUrl}${serviceSegment}/v1`;
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  apiUrl: '/api',
  production: false,
  vapidPublicKey: '',
};
