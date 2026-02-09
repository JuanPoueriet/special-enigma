import { Route } from '@angular/router';
import { DashboardComponent } from '@virteex/projects-ui/lib/pages/dashboard/dashboard.component';
import { ListComponent } from '@virteex/projects-ui/lib/pages/list/list.component';

export const projectsRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
