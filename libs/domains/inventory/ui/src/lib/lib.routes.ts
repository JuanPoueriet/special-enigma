import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/inventory-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/inventory-ui/lib/pages/list/list.component';

export const inventoryRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
