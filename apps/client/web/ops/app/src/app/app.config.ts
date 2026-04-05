import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { API_URL } from '@virtex/shared-config';
import { environment } from '../environments/environment';

const normalizedApiBaseUrl = (environment.apiUrl || '').replace(/\/$/, '');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    { provide: API_URL, useValue: normalizedApiBaseUrl },
  ],
};
