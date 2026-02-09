import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/accounting-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/accounting-ui/lib/pages/list/list.component';

export const accountingRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
