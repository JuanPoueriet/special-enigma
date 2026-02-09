import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/purchasing-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/purchasing-ui/lib/pages/list/list.component';

export const purchasingRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
