import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/payroll-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/payroll-ui/lib/pages/list/list.component';

export const payrollRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
