import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/fixed-assets-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/fixed-assets-ui/lib/pages/list/list.component';

export const fixedassetsRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
