import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListComponent } from './pages/list/list.component';

export const crmRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.routes').then(m => m.SALES_ROUTES)
  }
];
