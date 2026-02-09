import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/bi-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/bi-ui/lib/pages/list/list.component';

export const biRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
