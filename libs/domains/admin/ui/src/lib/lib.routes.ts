import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/admin-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/admin-ui/lib/pages/list/list.component';

export const adminRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
