import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'kiosk',
  },
  {
    path: 'kiosk',
    loadComponent: () => import('@virtex/manufacturing-ui-shopfloor').then((m) => m.KioskComponent),
  },
];
