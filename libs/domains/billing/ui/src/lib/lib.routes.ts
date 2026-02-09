import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/billing-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/billing-ui/lib/pages/list/list.component';

export const billingRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
