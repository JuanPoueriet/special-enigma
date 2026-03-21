# Tenant Enforcement Inventory

## API `app.module.ts`

- apps/service/accounting/app/src/app/app.module.ts
- apps/service/admin/app/src/app/app.module.ts
- apps/service/bi/app/src/app/app.module.ts
- apps/service/billing/app/src/app/app.module.ts
- apps/service/catalog/app/src/app/app.module.ts
- apps/service/crm/app/src/app/app.module.ts
- apps/service/fiscal/app/src/app/app.module.ts
- apps/service/fixed-assets/app/src/app/app.module.ts
- apps/service/gateway/app/src/app/app.module.ts
- apps/service/gateway-legacy/app/src/app/app.module.ts
- apps/service/identity/app/src/app/app.module.ts
- apps/service/inventory/app/src/app/app.module.ts
- apps/service/manufacturing/app/src/app/app.module.ts
- apps/service/payroll/app/src/app/app.module.ts
- apps/service/projects/app/src/app/app.module.ts
- apps/service/purchasing/app/src/app/app.module.ts
- apps/service/subscription/app/src/app/app.module.ts
- apps/service/treasury/app/src/app/app.module.ts

## Worker services

- apps/worker/notification
- apps/worker/scheduler

## Enforcement baseline applied

- `TenantModule` imported in all listed `AppModule` roots.
- `CanonicalTenantMiddleware` configured for all `AppModule` roots.
- Notification Kafka consumer enforces tenant context on every payload.
- Scheduler jobs already enforce tenant context through `runWithRequiredTenantContext` and payload mismatch detection.
