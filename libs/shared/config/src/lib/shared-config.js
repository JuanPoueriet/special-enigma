import { InjectionToken } from '@angular/core';
export const APP_CONFIG = new InjectionToken('APP_CONFIG');
export const API_URL = new InjectionToken('API_URL');
export function getBffUrl(service, apiUrl) {
  const normalizedApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
  const serviceSegment = `/${service}`;
  if (normalizedApiUrl.includes(serviceSegment)) {
    return `${normalizedApiUrl}/v1`;
  }
  return `${normalizedApiUrl}${serviceSegment}/v1`;
}
export const DEFAULT_APP_CONFIG = {
  apiUrl: '/api',
  production: false,
  vapidPublicKey: '',
};
//# sourceMappingURL=shared-config.js.map
