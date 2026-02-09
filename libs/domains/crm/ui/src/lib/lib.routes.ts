import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/crm-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/crm-ui/lib/pages/list/list.component';

export const crmRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
