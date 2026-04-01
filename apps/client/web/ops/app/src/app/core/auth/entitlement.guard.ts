import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const entitlementGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredEntitlement = route.data['entitlement'] as string;

  if (!requiredEntitlement) {
    return true;
  }

  if (authService.hasPermission(requiredEntitlement)) {
    return true;
  } else {
    // Redirect to upgrade or dashboard if not entitled
    console.warn(`Access denied to ${route.url}. Required entitlement: ${requiredEntitlement}`);
    return router.parseUrl('/dashboard');
  }
};
