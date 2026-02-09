import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/catalog-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/catalog-ui/lib/pages/list/list.component';

export const catalogRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
