import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/fiscal-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/fiscal-ui/lib/pages/list/list.component';

export const fiscalRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
