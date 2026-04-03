import { Route } from '@angular/router';
import {
  MainLayoutComponent,
  authGuard,
  languageInitGuard,
  languageRedirectGuard,
} from '@virtex/shared-ui';

export const appRoutes: Route[] = [
  // Redirect root to language/country specific or default
  {
    path: '',
    pathMatch: 'full',
    canMatch: [languageRedirectGuard],
  },
  // Country specific auth (e.g., /es/co/auth/...)
  {
    path: ':lang/:country/auth',
    canActivate: [languageInitGuard],
    loadChildren: () => import('@virtex/identity-ui').then((m) => m.authRoutes),
  },
  // Language specific auth (e.g., /es/auth/...)
  {
    path: ':lang/auth',
    canActivate: [languageInitGuard],
    loadChildren: () => import('@virtex/identity-ui').then((m) => m.authRoutes),
  },
  // Fallback or default auth
  {
    path: 'auth',
    loadChildren: () => import('@virtex/identity-ui').then((m) => m.authRoutes),
  },
  {
    path: ':lang',
    component: MainLayoutComponent,
    canActivate: [authGuard, languageInitGuard],
    children: [
      { path: '', redirectTo: 'accounting', pathMatch: 'full' },
      {
        path: 'accounting',
        loadChildren: () =>
          import('@virtex/accounting-ui').then((m) => m.accountingRoutes),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('@virtex/inventory-ui').then((m) => m.inventoryRoutes),
      },
      {
        path: 'payroll',
        loadChildren: () =>
          import('@virtex/payroll-ui').then((m) => m.payrollRoutes),
      },
      {
        path: 'crm',
        loadChildren: () => import('@virtex/crm-ui').then((m) => m.crmRoutes),
      },
      {
        path: 'purchasing',
        loadChildren: () =>
          import('@virtex/purchasing-ui').then((m) => m.purchasingRoutes),
      },
      {
        path: 'treasury',
        loadChildren: () =>
          import('@virtex/treasury-ui').then((m) => m.treasuryRoutes),
      },
      {
        path: 'fixed-assets',
        loadChildren: () =>
          import('@virtex/fixed-assets-ui').then((m) => m.fixedassetsRoutes),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('@virtex/projects-ui').then((m) => m.projectsRoutes),
      },
      {
        path: 'manufacturing',
        loadChildren: () =>
          import('@virtex/manufacturing-ui').then((m) => m.manufacturingRoutes),
      },
      {
        path: 'pos',
        loadChildren: () => import('@virtex/pos-ui').then((m) => m.posRoutes),
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('@virtex/billing-ui').then((m) => m.billingRoutes),
      },
      {
        path: 'catalog',
        loadChildren: () =>
          import('@virtex/catalog-ui').then((m) => m.catalogRoutes),
      },
      {
        path: 'bi',
        loadChildren: () => import('@virtex/bi-ui').then((m) => m.biRoutes),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('@virtex/admin-ui').then((m) => m.adminRoutes),
      },
      {
        path: 'fiscal',
        loadChildren: () =>
          import('@virtex/fiscal-ui').then((m) => m.fiscalRoutes),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('@virtex/identity-ui').then((m) => m.identityManagementRoutes),
      },
    ],
  },
  {
    path: ':lang/:country',
    component: MainLayoutComponent,
    canActivate: [authGuard, languageInitGuard],
    children: [
      { path: '', redirectTo: 'accounting', pathMatch: 'full' }, // Redirect root to accounting or a dashboard
      {
        path: 'accounting',
        loadChildren: () =>
          import('@virtex/accounting-ui').then((m) => m.accountingRoutes),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('@virtex/inventory-ui').then((m) => m.inventoryRoutes),
      },
      {
        path: 'payroll',
        loadChildren: () =>
          import('@virtex/payroll-ui').then((m) => m.payrollRoutes),
      },
      {
        path: 'crm',
        loadChildren: () => import('@virtex/crm-ui').then((m) => m.crmRoutes),
      },
      {
        path: 'purchasing',
        loadChildren: () =>
          import('@virtex/purchasing-ui').then((m) => m.purchasingRoutes),
      },
      {
        path: 'treasury',
        loadChildren: () =>
          import('@virtex/treasury-ui').then((m) => m.treasuryRoutes),
      },
      {
        path: 'fixed-assets',
        loadChildren: () =>
          import('@virtex/fixed-assets-ui').then((m) => m.fixedassetsRoutes),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('@virtex/projects-ui').then((m) => m.projectsRoutes),
      },
      {
        path: 'manufacturing',
        loadChildren: () =>
          import('@virtex/manufacturing-ui').then((m) => m.manufacturingRoutes),
      },
      {
        path: 'pos',
        loadChildren: () => import('@virtex/pos-ui').then((m) => m.posRoutes),
      },
      {
        path: 'billing',
        loadChildren: () =>
          import('@virtex/billing-ui').then((m) => m.billingRoutes),
      },
      {
        path: 'catalog',
        loadChildren: () =>
          import('@virtex/catalog-ui').then((m) => m.catalogRoutes),
      },
      {
        path: 'bi',
        loadChildren: () => import('@virtex/bi-ui').then((m) => m.biRoutes),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('@virtex/admin-ui').then((m) => m.adminRoutes),
      },
      {
        path: 'fiscal',
        loadChildren: () =>
          import('@virtex/fiscal-ui').then((m) => m.fiscalRoutes),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('@virtex/identity-ui').then((m) => m.identityManagementRoutes),
      },
      // { path: 'sample', loadChildren: () => import('@virtex/sample-ui').then(m => m.sampleRoutes) },
    ],
  },
];
