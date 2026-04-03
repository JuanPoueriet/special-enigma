import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';
import { LanguageService } from '../services/language';
import { AuthService } from '../services/auth';

export const languageRedirectGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const languageService = inject(LanguageService);

  // 1. Check if user is logged in
  if (authService.isAuthenticated()) {
    const lang = languageService.getInitialLanguage();
    // Use a configurable default route or landing page logic
    const DEFAULT_AUTH_ROUTE = 'accounting'; // This could be moved to a config service
    return router.createUrlTree(['/', lang, DEFAULT_AUTH_ROUTE]);
  }

  // 2. If not logged in, determine the best language for the public landing page
  const bestLang = languageService.getInitialLanguage();

  // 3. Redirect to the language-prefixed public route (e.g. /es/auth/login)
  return router.createUrlTree(['/', bestLang, 'auth', 'login']);
};
