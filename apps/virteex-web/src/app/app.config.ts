import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { authInterceptor } from '@virteex/shared-util-auth';
import { APP_CONFIG, AppConfig } from '@virteex/shared-config';
import { environment } from '../environments/environment';
import { API_URL } from '@virteex/shared-ui';

export const appConfig: ApplicationConfig = {
  providers: [
      provideBrowserGlobalErrorListeners(),
      provideRouter(appRoutes),
      provideHttpClient(withInterceptors([authInterceptor])),
      { provide: APP_CONFIG, useValue: environment },
      {
        provide: API_URL,
        useFactory: (config: AppConfig) => config.apiUrl,
        deps: [APP_CONFIG]
      }
  ],
};
