import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'scan',
  },
  {
    path: 'scan',
    loadComponent: () => import('@virtex/inventory-ui-wms').then((m) => m.ScanComponent),
  },
];
