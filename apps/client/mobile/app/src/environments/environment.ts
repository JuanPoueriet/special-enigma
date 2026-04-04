export const environment = {
  production: false,
  apiUrl: (window as any)?.['env']?.['apiUrl'] || '/api',
  authUrl: (window as any)?.['env']?.['authUrl'] || '/api/auth',
};
