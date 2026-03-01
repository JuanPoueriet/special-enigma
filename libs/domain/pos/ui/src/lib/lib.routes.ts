import { Route } from '@angular/router';

export const posRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/pos-terminal/pos-terminal.component').then(
        (m) => m.PosTerminalComponent
      ),
  },
];
