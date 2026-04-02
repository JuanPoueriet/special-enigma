export const environment = {
  production: false,
  apiUrl: (window as any)?.['env']?.['apiUrl'] || 'https://api.virtex.local/api',
  authUrl: (window as any)?.['env']?.['authUrl'] || 'https://api.virtex.local/api/auth',
};
