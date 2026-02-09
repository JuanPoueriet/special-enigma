import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/treasury-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/treasury-ui/lib/pages/list/list.component';

export const treasuryRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
