import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@virtex/pos-ui').then((m) => m.posRoutes),
  },
];
