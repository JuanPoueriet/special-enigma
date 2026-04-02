import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'catalog',
  },
  {
    path: 'catalog',
    loadComponent: () => import('@virtex/domain-catalog-ui-store').then((m) => m.ProductListComponent),
  },
];
