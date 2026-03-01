import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@virteex/pos-ui').then((m) => m.posRoutes),
  },
];
