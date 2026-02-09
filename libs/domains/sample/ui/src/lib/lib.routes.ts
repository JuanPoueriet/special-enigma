import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/sample-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/sample-ui/lib/pages/list/list.component';

export const sampleRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
