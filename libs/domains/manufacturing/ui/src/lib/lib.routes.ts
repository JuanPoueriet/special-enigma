import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/manufacturing-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/manufacturing-ui/lib/pages/list/list.component';

export const manufacturingRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
