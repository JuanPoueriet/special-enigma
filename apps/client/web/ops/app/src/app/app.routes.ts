import { Route } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout.component';
import { authGuard } from '@virtex/shared-ui';
import { entitlementGuard } from './core/auth/entitlement.guard';
import { LoginComponent } from './auth/login.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'tenants',
        canActivate: [entitlementGuard],
        data: { entitlement: 'tenants:read' },
        loadComponent: () => import('./tenants/tenants.component').then(m => m.TenantsComponent),
      },
      {
        path: 'tenants/create',
        canActivate: [entitlementGuard],
        data: { entitlement: 'tenants:write' },
        loadComponent: () => import('./tenants/create-tenant.component').then(m => m.CreateTenantComponent),
      },
      {
        path: 'tenants/:id',
        canActivate: [entitlementGuard],
        data: { entitlement: 'tenants:read' },
        loadComponent: () => import('./tenants/tenant-detail.component').then(m => m.TenantDetailComponent),
      },
      {
        path: 'billing',
        canActivate: [entitlementGuard],
        data: { entitlement: 'invoices' },
        loadComponent: () => import('./billing/billing.component').then(m => m.BillingComponent),
      },
      {
        path: 'feature-flags',
        canActivate: [entitlementGuard],
        data: { entitlement: 'feature-flags:read' },
        loadComponent: () => import('./feature-flags/feature-flags.component').then(m => m.FeatureFlagsComponent),
      },
      {
        path: 'finops',
        canActivate: [entitlementGuard],
        data: { entitlement: 'treasury:read' },
        loadComponent: () => import('./finops/finops.component').then(m => m.FinopsComponent),
      },
      {
        path: 'monitoring',
        canActivate: [entitlementGuard],
        data: { entitlement: 'monitoring:read' },
        loadComponent: () => import('./monitoring/monitoring.component').then(m => m.MonitoringComponent),
      },
      {
        path: 'plugins',
        canActivate: [entitlementGuard],
        data: { entitlement: 'plugins:read' },
        loadComponent: () => import('./plugins/plugins.component').then(m => m.PluginsComponent),
      },
      {
        path: 'security',
        canActivate: [entitlementGuard],
        data: { entitlement: 'security:read' },
        loadComponent: () => import('./security/security.component').then(m => m.SecurityComponent),
      },
      {
        path: 'support',
        canActivate: [entitlementGuard],
        data: { entitlement: 'support:read' },
        loadComponent: () => import('./support/support.component').then(m => m.SupportComponent),
      },
      {
        path: 'automation',
        canActivate: [entitlementGuard],
        data: { entitlement: 'automation:read' },
        loadComponent: () => import('./automation/automation.component').then(m => m.AutomationComponent),
      },
      {
        path: 'config',
        canActivate: [entitlementGuard],
        data: { entitlement: 'config:read' },
        loadComponent: () => import('./config/config.component').then(m => m.ConfigComponent),
      },
      {
        path: 'reports',
        canActivate: [entitlementGuard],
        data: { entitlement: 'advanced-reports:read' },
        loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent),
      },
      {
        path: 'databases',
        canActivate: [entitlementGuard],
        data: { entitlement: 'databases:read' },
        loadComponent: () => import('./databases/databases.component').then(m => m.DatabasesComponent),
      },
      {
        path: 'queues',
        canActivate: [entitlementGuard],
        data: { entitlement: 'queues:read' },
        loadComponent: () => import('./queues/queues.component').then(m => m.QueuesComponent),
      },
      {
        path: 'storage',
        canActivate: [entitlementGuard],
        data: { entitlement: 'storage:read' },
        loadComponent: () => import('./storage/storage.component').then(m => m.StorageComponent),
      },
      {
        path: 'backups',
        canActivate: [entitlementGuard],
        data: { entitlement: 'backups:read' },
        loadComponent: () => import('./backups/backups.component').then(m => m.BackupsComponent),
      },
      {
        path: 'releases',
        canActivate: [entitlementGuard],
        data: { entitlement: 'releases:read' },
        loadComponent: () => import('./releases/releases.component').then(m => m.ReleasesComponent),
      },
      {
        path: 'docs',
        loadComponent: () => import('./docs/docs.component').then(m => m.DocsComponent),
      },
      {
        path: 'notifications',
        loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent),
      },
      {
        path: 'console-config',
        loadComponent: () => import('./console-config/console-config.component').then(m => m.ConsoleConfigComponent),
      },
      {
        path: 'import-export',
        loadComponent: () => import('./import-export/import-export.component').then(m => m.ImportExportComponent),
      },
      {
        path: 'testing',
        loadComponent: () => import('./testing/testing.component').then(m => m.TestingComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
