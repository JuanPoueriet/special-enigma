# Informe de Análisis de Microservicios y Aplicaciones

## Resumen Ejecutivo
Se analizó un total de 33 proyectos mediante la ejecución individual de `npx nx serve` durante 30 segundos tras realizar `npm install`.

### Estadísticas
- Total de servicios/apps analizados: 33
- Sin errores detectados: 5
- Con errores detectados: 28

## Servicios sin Errores Críticos Detectados
- api-pos
- web-cms-app
- web-ops-app
- web-support-app
- worker-notification-app

## Detalle de Servicios con Errores
### api-accounting-app
```
WARNING in ./libs/domain/accounting/application/src/lib/listeners/accounting.listener.ts 109:305-322
WARNING in ./libs/domain/accounting/application/src/lib/listeners/accounting.listener.ts 109:342-359
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/create-account.use-case.ts 35:57-74
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/create-account.use-case.ts 35:94-111
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/get-accounts.use-case.ts 19:57-74
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/get-accounts.use-case.ts 19:94-111
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/get-journal-entries.use-case.ts 19:57-79
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/get-journal-entries.use-case.ts 19:99-121
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/record-journal-entry.use-case.ts 49:57-79
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/record-journal-entry.use-case.ts 49:99-121
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/record-journal-entry.use-case.ts 49:173-190
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/record-journal-entry.use-case.ts 49:210-227
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/setup-chart-of-accounts.use-case.ts 37:57-74
WARNING in ./libs/domain/accounting/application/src/lib/use-cases/setup-chart-of-accounts.use-case.ts 37:94-111
WARNING in ./libs
... (truncado por brevedad)
```

### api-admin-app
```
WARNING in ./libs/domain/admin/application/src/lib/services/admin-dashboard.service.ts 17:57-73
WARNING in ./libs/domain/admin/application/src/lib/services/admin-dashboard.service.ts 17:93-109
WARNING in ./libs/domain/admin/application/src/lib/services/data-import.service.ts 96:57-75
WARNING in ./libs/domain/admin/application/src/lib/services/data-import.service.ts 96:95-113
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
ERROR in ./libs/domain/admin/application/src/lib/services/data-import.service.ts:[32m[1m18:34[22m[39m
   [90m 20 |[39m         [36mthis[39m[33m.[39mlogger[33m.[39merror([32m'Failed to parse file'[39m[33m,[39m e)[33m;[39m
   [90m 21 |[39m         [36mthrow[39m [36mnew[39m [33mError[39m([32m'Invalid file format'[39m)[33m;[39m[0m
ERROR in ./libs/domain/admin/application/src/lib/use-cases/provisioning.service.ts:[32m[1m28:28[22m[39m
  Overload 1 of 8, '(options: RedisOptions): Redis', gave the following error.
  Overload 2 of 8, '(port: number): Redis', gave the following error.
  Overload 3 of 8, '(path: string): Redis', gave the following error.
ERROR in ./libs/domain/admin/application/src/lib/use-cases/provisioning.service.ts:[32m[1m62:45[22m[39m
ERROR in ./libs/domain/admin/application/src/lib/use-cases/provisioning.service.ts:[32m[1m63:24[22m[39m
ERROR in ./libs/domain/admin/application/src/lib/use-c
... (truncado por brevedad)
```

### api-bi-app
```
WARNING in ./libs/domain/bi/application/src/lib/use-cases/generate-report.use-case.ts 36:57-75
WARNING in ./libs/domain/bi/application/src/lib/use-cases/generate-report.use-case.ts 36:95-113
WARNING in ./libs/domain/bi/application/src/lib/use-cases/generate-report.use-case.ts 36:165-187
WARNING in ./libs/domain/bi/application/src/lib/use-cases/generate-report.use-case.ts 36:207-229
WARNING in ./libs/domain/bi/application/src/lib/use-cases/get-ar-aging.use-case.ts 17:57-68
WARNING in ./libs/domain/bi/application/src/lib/use-cases/get-ar-aging.use-case.ts 17:88-99
WARNING in ./libs/domain/bi/application/src/lib/use-cases/get-expenses.use-case.ts 17:57-69
WARNING in ./libs/domain/bi/application/src/lib/use-cases/get-expenses.use-case.ts 17:89-101
WARNING in ./libs/domain/bi/application/src/lib/use-cases/get-invoice-status.use-case.ts 17:57-68
WARNING in ./libs/domain/bi/application/src/lib/use-cases/get-invoice-status.use-case.ts 17:88-99
WARNING in ./libs/domain/bi/application/src/lib/use-cases/get-top-products.use-case.ts 17:57-66
WARNING in ./libs/domain/bi/application/src/lib/use-cases/get-top-products.use-case.ts 17:86-95
WARNING in ./libs/domain/bi/infrastructure/src/lib/adapters/bi-expenses.adapter.ts 26:57-74
WARNING in ./libs/domain/bi/infrastructure/src/lib/adapters/bi-expenses.adapter.ts 26:94-111
WARNING in ./libs/domain/bi/infrastructure/src/lib/adapters/bi-invoice.adapter.ts 58:57-74
WARNING in ./libs/domain/bi/infrastructure/src/lib/adapters/bi-invoice.adapter.ts
... (truncado por brevedad)
```

### api-billing-app
```
[1m[31m[96mlibs/platform/xslt/src/lib/xslt.service.ts[0m:[93m4[0m:[93m33[0m - [91merror[0m[90m TS2307: [0mCannot find module 'xslt-processor' or its corresponding type declarations.
[1m[31m[96mlibs/domain/billing/domain/src/lib/services/fiscal-stamping.service.ts[0m:[93m30[0m:[93m55[0m - [91merror[0m[90m TS2554: [0mExpected 1 arguments, but got 2.
[96mlibs/domain/billing/domain/src/lib/services/fiscal-stamping.service.ts[0m:[93m33[0m:[93m49[0m - [91merror[0m[90m TS2339: [0mProperty 'getBuilder' does not exist on type 'FiscalDocumentBuilderFactory'.
[1m[31m[96mnode_modules/@types/request/index.d.ts[0m:[93m389[0m:[93m84[0m - [91merror[0m[90m TS2724: [0m'"/app/node_modules/tough-cookie/dist/index"' has no exported member named 'CookieJar'. Did you mean 'Cookie'?
 NX   Running target serve for project api-billing-app and 22 tasks it depends on failed
Failed tasks:
```

### api-catalog-app
```
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/catalog/application/src/lib/use-cases/create-product.use-case.ts[39m[22m [1m[32m30:57-78[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/catalog/application/src/lib/use-cases/create-product.use-case.ts[39m[22m [1m[32m30:98-119[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/catalog/application/src/lib/use-cases/create-product.use-case.ts[39m[22m [1m[32m30:171-193[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/catalog/application/src/lib/use-cases/create-product.use-case.ts[39m[22m [1m[32m30:213-235[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/catalog/application/src/lib/use-cases/delete-product.use-case.ts[39m[22m [1m[32m25:57-78[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/catalog/application/src/lib/use-cases/delete-product.use-case.ts[39m[22m [1m[32m25:98-119[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/catalog/application/src/lib/use-cases/delete-product.use-case.ts[39m[22m [1m[32m25:171-193[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/catalog/application/src/lib/use-cases/delete-product.use-case.ts[39m[22m [1m[32m25:213-235[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/catalog/application/src/lib/use-cases/get-product-by-id.use-case.ts[39m[22m [1m[32m17:57-78[39m[22m
[1m[33mWARNING[39m[22m in [1m../.
... (truncado por brevedad)
```

### api-crm-app
```
[1m[31m[96mlibs/domain/crm/application/src/lib/use-cases/approve-sale.use-case.ts[0m:[93m17[0m:[93m72[0m - [91merror[0m[90m TS2339: [0mProperty 'NEGOTIATION' does not exist on type 'typeof SaleStatus'.
[96mlibs/domain/crm/application/src/lib/use-cases/approve-sale.use-case.ts[0m:[93m20[0m:[93m30[0m - [91merror[0m[90m TS2339: [0mProperty 'APPROVED' does not exist on type 'typeof SaleStatus'.
[96mlibs/domain/crm/application/src/lib/use-cases/cancel-sale.use-case.ts[0m:[93m17[0m:[93m36[0m - [91merror[0m[90m TS2339: [0mProperty 'COMPLETED' does not exist on type 'typeof SaleStatus'.
[96mlibs/domain/crm/application/src/lib/use-cases/complete-sale.use-case.ts[0m:[93m17[0m:[93m36[0m - [91merror[0m[90m TS2339: [0mProperty 'APPROVED' does not exist on type 'typeof SaleStatus'.
[96mlibs/domain/crm/application/src/lib/use-cases/complete-sale.use-case.ts[0m:[93m20[0m:[93m30[0m - [91merror[0m[90m TS2339: [0mProperty 'COMPLETED' does not exist on type 'typeof SaleStatus'.
[96mlibs/domain/crm/application/src/lib/use-cases/create-sale.use-case.ts[0m:[93m4[0m:[93m38[0m - [91merror[0m[90m TS2307: [0mCannot find module '@virteex/domain-crm-domain/ports/inventory.service' or its corresponding type declarations.
[96mlibs/domain/crm/application/src/lib/use-cases/create-sale.use-case.ts[0m:[93m86[0m:[93m18[0m - [91merror[0m[90m TS2339: [0mProperty 'add' does not exist on type 'any[]'.
[96mlibs/domain/crm/application/src/lib/us
... (truncado por brevedad)
```

### api-fiscal-app
```
[1m[31m[96mlibs/domain/billing/domain/src/lib/services/fiscal-stamping.service.ts[0m:[93m30[0m:[93m55[0m - [91merror[0m[90m TS2554: [0mExpected 1 arguments, but got 2.
[96mlibs/domain/billing/domain/src/lib/services/fiscal-stamping.service.ts[0m:[93m33[0m:[93m49[0m - [91merror[0m[90m TS2339: [0mProperty 'getBuilder' does not exist on type 'FiscalDocumentBuilderFactory'.
[1m[31m[96mlibs/platform/xslt/src/lib/xslt.service.ts[0m:[93m4[0m:[93m33[0m - [91merror[0m[90m TS2307: [0mCannot find module 'xslt-processor' or its corresponding type declarations.
[1m[31m[96mlibs/domain/fiscal/application/src/lib/use-cases/create-declaration.use-case.ts[0m:[93m17[0m:[93m44[0m - [91merror[0m[90m TS2554: [0mExpected 0 arguments, but got 3.
[96mlibs/domain/fiscal/application/src/lib/use-cases/create-tax-rule.use-case.ts[0m:[93m19[0m:[93m36[0m - [91merror[0m[90m TS2554: [0mExpected 0 arguments, but got 5.
[96mlibs/domain/fiscal/application/src/lib/use-cases/get-fiscal-stats.use-case.ts[0m:[93m12[0m:[93m36[0m - [91merror[0m[90m TS2339: [0mProperty 'getFiscalStats' does not exist on type 'FiscalDataProvider'.
[96mlibs/domain/fiscal/application/src/lib/use-cases/get-tax-rate.use-case.ts[0m:[93m12[0m:[93m48[0m - [91merror[0m[90m TS2339: [0mProperty 'getFiscalConfig' does not exist on type 'TenantConfigRepository'.
[96mlibs/domain/fiscal/application/src/lib/use-cases/get-tax-rules.use-case.ts[0m:[93m12[0m:[93m48[0m - [
... (truncado por brevedad)
```

### api-fixed-assets-app
```
WARNING in ./libs/domain/fixed-assets/application/src/lib/use-cases/create-fixed-asset.use-case.ts 25:57-77
WARNING in ./libs/domain/fixed-assets/application/src/lib/use-cases/create-fixed-asset.use-case.ts 25:97-117
WARNING in ./libs/domain/fixed-assets/application/src/lib/use-cases/get-fixed-assets.use-case.ts 17:57-77
WARNING in ./libs/domain/fixed-assets/application/src/lib/use-cases/get-fixed-assets.use-case.ts 17:97-117
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
ERROR in ./apps/api/fixed-assets/app/src/app/app.module.ts:[32m[1m9:53[22m[39m
ERROR in ./apps/api/fixed-assets/app/src/main.ts:[32m[1m8:26[22m[39m
ERROR in ./libs/domain/fixed-assets/infrastructure/src/lib/persistence/fixed-assets.schemas.ts:[32m[1m23:5[22m[39m
ERROR in ./libs/domain/fixed-assets/infrastructure/src/lib/persistence/fixed-assets.schemas.ts:[32m[1m33:5[22m[39m
webpack 5.104.1 compiled with 4 errors and 6 warnings in 7956 ms
[1m[31mBuild failed, waiting for changes to restart...[39m[22m
    throw new Error(`Could not find ${fileToRun}. Make sure your build succeeded.`);
Error: Could not find /app/dist/apps/api-fixed-assets-app/main.js. Make sure your build succeeded.
 NX   Running target serve for project api-fixed-assets-app failed
Failed tasks:
```

### api-gateway-app
```
[1m[31m[96mlibs/platform/xslt/src/lib/xslt.service.ts[0m:[93m4[0m:[93m33[0m - [91merror[0m[90m TS2307: [0mCannot find module 'xslt-processor' or its corresponding type declarations.
 NX   Running target serve for project api-gateway-app and 25 tasks it depends on failed
Failed tasks:
```

### api-gateway-legacy-app
```
[1m[33mWARNING[39m[22m in [1m../../../../libs/kernel/auth/src/lib/services/secret-manager.service.ts[39m[22m [1m[32m86:57-71[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/kernel/auth/src/lib/services/secret-manager.service.ts[39m[22m [1m[32m86:91-105[39m[22m
[1m[31mERROR[39m[22m in [1m./src/app/app.module.ts[39m[22m [1m[32m11:0-112[39m[22m
[1mModule [1m[31mnot found[39m[22m[1m: [1m[31mError[39m[22m[1m: Can't resolve '@virteex/platform-contract-governance' in '/app/apps/api/gateway-legacy/app/src/app'[39m[22m
[1m[31mERROR[39m[22m in [1m./src/app/app.module.ts:[32m[1m14:73[22m[39m[1m[39m[22m
   [90m 15 |[39m [36mimport[39m { [33mGraphQLError[39m } [36mfrom[39m [32m'graphql'[39m[33m;[39m
webpack compiled with [1m[31m2 errors[39m[22m and [1m[33m2 warnings[39m[22m (daaabe5e704b2802)
 NX   Running target serve for project api-gateway-legacy-app and 6 tasks it depends on failed
Failed tasks:
```

### api-identity-app
```
[1m[31m[96mlibs/domain/identity/application/src/lib/use-cases/complete-onboarding.use-case.ts[0m:[93m27[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'EntityManager'.
[96mlibs/domain/identity/application/src/lib/use-cases/complete-onboarding.use-case.ts[0m:[93m83[0m:[93m16[0m - [91merror[0m[90m TS2339: [0mProperty 'plan' does not exist on type 'Tenant'.
[96mlibs/domain/identity/application/src/lib/use-cases/confirm-mfa.use-case.ts[0m:[93m31[0m:[93m31[0m - [91merror[0m[90m TS2339: [0mProperty 'update' does not exist on type 'UserRepository'.
[96mlibs/domain/identity/application/src/lib/use-cases/get-subscription-status.use-case.ts[0m:[93m7[0m:[93m36[0m - [91merror[0m[90m TS2304: [0mCannot find name 'EntityManager'.
[96mlibs/domain/identity/application/src/lib/use-cases/setup-mfa.use-case.ts[0m:[93m33[0m:[93m31[0m - [91merror[0m[90m TS2339: [0mProperty 'update' does not exist on type 'UserRepository'.
[96mlibs/domain/identity/application/src/lib/use-cases/update-subscription.use-case.ts[0m:[93m12[0m:[93m36[0m - [91merror[0m[90m TS2304: [0mCannot find name 'EntityManager'.
 NX   Running target serve for project api-identity-app and 17 tasks it depends on failed
Failed tasks:
```

### api-inventory-app
```
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/inventory/application/src/index.ts[39m[22m [1m[32m15:0-83[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/inventory/application/src/lib/use-cases/check-stock.use-case.ts[39m[22m [1m[32m24:57-76[39m[22m
[1mexport 'InventoryRepository' (imported as 'InventoryRepository') was [1m[31mnot found[39m[22m[1m in '@virteex/domain-inventory-domain' (possible exports: [1m[32mDomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException[39m[22m[1m)[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/inventory/application/src/lib/use-cases/check-stock.use-case.ts[39m[22m [1m[32m24:96-115[39m[22m
[1mexport 'InventoryRepository' (imported as 'InventoryRepository') was [1m[31mnot found[39m[22m[1m in '@virteex/domain-inventory-domain' (possible exports: [1m[32mDomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException[39m[22m[1m)[39m[22m
[1m[33mWARNING[39m[22m in [1m../../../../libs/domain/inventory
... (truncado por brevedad)
```

### api-manufacturing-app
```
WARNING in ./libs/domain/manufacturing/application/src/index.ts 3:0-94
WARNING in ./libs/domain/manufacturing/application/src/lib/use-cases/create-production-order.use-case.ts 64:57-82
WARNING in ./libs/domain/manufacturing/application/src/lib/use-cases/create-production-order.use-case.ts 64:102-127
WARNING in ./libs/domain/manufacturing/application/src/lib/use-cases/create-production-order.use-case.ts 64:179-195
WARNING in ./libs/domain/manufacturing/application/src/lib/use-cases/create-production-order.use-case.ts 64:215-231
WARNING in ./libs/domain/manufacturing/application/src/lib/use-cases/create-production-order.use-case.ts 64:283-308
WARNING in ./libs/domain/manufacturing/application/src/lib/use-cases/create-production-order.use-case.ts 64:328-353
WARNING in ./libs/domain/manufacturing/application/src/lib/use-cases/get-production-orders.use-case.ts 17:57-82
WARNING in ./libs/domain/manufacturing/application/src/lib/use-cases/get-production-orders.use-case.ts 17:102-127
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
ERROR in ./apps/api/manufacturing/app/src/app/app.module.ts:[32m[1m9:53[22m[39m
ERROR in ./apps/api/manufacturing/app/src/main.ts:[32m[1m8:26[22m[39m
ERROR in ./libs/domain/manufacturing/application/src/lib/use-cases/create-production-order.use-case.ts:[32m[1m38:60[22m[39m
ERROR in ./libs/domain/manufacturing/infrastructure/src/li
... (truncado por brevedad)
```

### api-payroll-app
```
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 57:23-42
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 58:25-44
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 60:84-109
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 85:90-117
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 104:57-75
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 104:95-113
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 104:165-182
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 104:202-219
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 104:271-289
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 104:309-327
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 104:379-401
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 104:421-443
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 104:495-515
WARNING in ./libs/domain/payroll/application/src/lib/use-cases/calculate-payroll.use-case.ts 104:535-555
WARNING in ./libs/domain/payroll/applicatio
... (truncado por brevedad)
```

### api-plugin-host-app
```
[4m[34mapps/api/plugin-host/app/src/sandbox.service.ts:2:1[39m[24m - [31m[1merror[22m[39m [90mTS1202[39m: Import assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from "mod"', 'import {a} from "mod"', 'import d from "mod"', or another module format instead.
[4m[34mapps/api/plugin-host/app/src/test/mocks/isolated-vm.mock.ts:22:14[39m[24m - [31m[1merror[22m[39m [90mTS2304[39m: Cannot find name 'vi'.
[4m[34mapps/api/plugin-host/app/src/test/mocks/isolated-vm.mock.ts:23:16[39m[24m - [31m[1merror[22m[39m [90mTS2304[39m: Cannot find name 'vi'.
Found 3 errors.
 NX   Running target serve for project api-plugin-host-app and 8 tasks it depends on failed
Failed tasks:
```

### api-projects-app
```
WARNING in ./libs/domain/projects/application/src/lib/use-cases/create-project.use-case.ts 27:57-74
WARNING in ./libs/domain/projects/application/src/lib/use-cases/create-project.use-case.ts 27:94-111
WARNING in ./libs/domain/projects/application/src/lib/use-cases/get-my-work.use-case.ts 17:57-74
WARNING in ./libs/domain/projects/application/src/lib/use-cases/get-my-work.use-case.ts 17:94-111
WARNING in ./libs/domain/projects/application/src/lib/use-cases/get-projects.use-case.ts 17:57-74
WARNING in ./libs/domain/projects/application/src/lib/use-cases/get-projects.use-case.ts 17:94-111
WARNING in ./libs/domain/projects/domain/src/index.ts 2:0-43
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
ERROR in ./apps/api/projects/app/src/app/app.module.ts:[32m[1m9:53[22m[39m
ERROR in ./apps/api/projects/app/src/main.ts:[32m[1m8:26[22m[39m
ERROR in ./libs/domain/projects/application/src/lib/use-cases/create-project.use-case.ts:[32m[1m18:33[22m[39m
ERROR in ./libs/domain/projects/application/src/lib/use-cases/create-project.use-case.ts:[32m[1m19:34[22m[39m
ERROR in ./libs/domain/projects/domain/src/index.ts:[32m[1m2:1[22m[39m
ERROR in ./libs/domain/projects/infrastructure/src/lib/persistence/projects.schemas.ts:[32m[1m14:5[22m[39m
ERROR in ./libs/domain/projects/infrastructure/src/lib/persistence/projects.schemas.ts:[32m[1m22:5[22m[39m
webpack
... (truncado por brevedad)
```

### api-purchasing-app
```
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/approve-requisition.use-case.ts 27:57-78
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/approve-requisition.use-case.ts 27:98-119
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/create-purchase-order.use-case.ts 34:57-81
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/create-purchase-order.use-case.ts 34:101-125
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/create-purchase-order.use-case.ts 34:177-196
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/create-purchase-order.use-case.ts 34:216-235
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/create-requisition.use-case.ts 20:57-78
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/create-requisition.use-case.ts 20:98-119
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/create-supplier.use-case.ts 28:57-76
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/create-supplier.use-case.ts 28:96-115
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/create-vendor-bill.use-case.ts 21:57-77
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/create-vendor-bill.use-case.ts 21:97-117
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/get-requisitions.use-case.ts 17:57-78
WARNING in ./libs/domain/purchasing/application/src/lib/use-cases/get-requisitions.use-case.ts 17:98-119
W
... (truncado por brevedad)
```

### api-subscription-app
```
[1m[31m[96mnode_modules/@types/request/index.d.ts[0m:[93m389[0m:[93m84[0m - [91merror[0m[90m TS2724: [0m'"/app/node_modules/tough-cookie/dist/index"' has no exported member named 'CookieJar'. Did you mean 'Cookie'?
 NX   Running target serve for project api-subscription-app and 11 tasks it depends on failed
Failed tasks:
```

### api-treasury-app
```
WARNING in ./libs/domain/treasury/application/src/lib/use-cases/create-bank-account.use-case.ts 32:57-78
WARNING in ./libs/domain/treasury/application/src/lib/use-cases/create-bank-account.use-case.ts 32:98-119
WARNING in ./libs/domain/treasury/application/src/lib/use-cases/get-bank-accounts.use-case.ts 31:57-78
WARNING in ./libs/domain/treasury/application/src/lib/use-cases/get-bank-accounts.use-case.ts 31:98-119
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
ERROR in ./libs/domain/treasury/application/src/lib/services/reconciliation.service.ts 5:0-108
Module not found: Error: Can't resolve '@virteex/domain-treasury-domain/repositories/transaction.repository' in '/app/libs/domain/treasury/application/src/lib/services'
ERROR in ./libs/domain/treasury/application/src/lib/use-cases/get-cash-flow.use-case.ts 4:0-108
Module not found: Error: Can't resolve '@virteex/domain-treasury-domain/repositories/transaction.repository' in '/app/libs/domain/treasury/application/src/lib/use-cases'
ERROR in ./libs/domain/treasury/application/src/lib/use-cases/register-transaction.use-case.ts 5:0-90
Module not found: Error: Can't resolve '@virteex/domain-treasury-domain/entities/transaction.entity' in '/app/libs/domain/treasury/application/src/lib/use-cases'
ERROR in ./libs/domain/treasury/application/src/lib/use-cases/register-transaction.use-case.ts 6:0-108
Module not found: Er
... (truncado por brevedad)
```

### desktop-app
```
[1m[31m[23902:0313/164149.666826:ERROR:ozone_platform_x11.cc(246)] Missing X server or $DISPLAY
[23902:0313/164149.666915:ERROR:env.cc(257)] The platform failed to initialize.  Exiting.
[32mNo typescript errors found.[39m
```

### mobile-app
```
[37mApplication bundle generation failed. [4.088 seconds] - 2026-03-13T16:44:37.716Z
[1m[31m[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2305: Module '"@virteex/shared-util-auth"' has no exported member 'SecureStorageService'.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS18046: 'secureStorage' is of type 'unknown'.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2305: Module '"@virteex/shared-util-auth"' has no exported member 'SecureStorageService'.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2571: Object is of type 'unknown'.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2571: Object is of type 'unknown'.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2305: Module '"@virteex/shared-util-auth"' has no exported member 'SecureStorageService'.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2571: Object is of type 'unknown'.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2571: Object is of type 'unknown'.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2571: Object is of type 'unknown'.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2571: Object is of type 'unknown'.[0m
... (truncado por brevedad)
```

### web-portal-app
```
[37mApplication bundle generation failed. [5.637 seconds] - 2026-03-13T16:39:01.001Z
[1m[31m[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2307: Cannot find module '@virteex/shared-util-http' or its corresponding type declarations.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2307: Cannot find module '@virteex/identity-ui' or its corresponding type declarations.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2307: Cannot find module '@virteex/identity-ui' or its corresponding type declarations.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2307: Cannot find module '@virteex/identity-ui' or its corresponding type declarations.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2307: Cannot find module '@virteex/accounting-ui' or its corresponding type declarations.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2307: Cannot find module '@virteex/inventory-ui' or its corresponding type declarations.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2307: Cannot find module '@virteex/payroll-ui' or its corresponding type declarations.[0m [1m[35m[plugin angular-compiler][0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS2307: Cannot find module '@virteex/crm-ui' or its corresponding type declarations.[0m [
... (truncado por brevedad)
```

### web-pos-app
```
[37mApplication bundle generation failed. [2.305 seconds] - 2026-03-13T16:43:21.469Z
[1m[33m[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mCannot find base config file "../../../tsconfig.base.json"[0m [tsconfig.json]
[1m[31m[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS5012: Cannot read file '/app/apps/tsconfig.base.json': ENOENT: no such file or directory, open '/app/apps/tsconfig.base.json'.[0m [1m[35m[plugin angular-compiler][0m
```

### web-shopfloor-app
```
[37mApplication bundle generation failed. [0.834 seconds] - 2026-03-13T16:36:31.788Z
[1m[33m[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI.[0m [1m[35m[plugin angular-compiler][0m
[1m[31m[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mCannot find tsconfig file "apps/web-shopfloor-app/tsconfig.app.json"[0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS500: Error: ENOENT: no such file or directory, lstat '/app/apps/web-shopfloor-app/tsconfig.app.json'
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mCould not resolve "/app/apps/web-shopfloor-app/src/main.ts"[0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mCould not resolve "apps/web-shopfloor-app/src/styles.scss"[0m
  You can mark the path "apps/web-shopfloor-app/src/styles.scss" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.
```

### web-site-app
```
[37mApplication bundle generation failed. [1.056 seconds] - 2026-03-13T16:40:06.596Z
[1m[33m[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI.[0m [1m[35m[plugin angular-compiler][0m
[1m[31m[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mCannot find tsconfig file "apps/web-site-app/tsconfig.app.json"[0m
[31m✘ [41;31m[[41;97mERROR
... (truncado por brevedad)
```

### web-store-app
```
[37mApplication bundle generation failed. [0.828 seconds] - 2026-03-13T16:39:36.364Z
[1m[33m[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI.[0m [1m[35m[plugin angular-compiler][0m
[1m[31m[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mCannot find tsconfig file "apps/web-store-app/tsconfig.app.json"[0m
[31m✘ [41;31m[[41;97mERROR
... (truncado por brevedad)
```

### web-wms-app
```
[37mApplication bundle generation failed. [0.852 seconds] - 2026-03-13T16:43:50.375Z
[1m[33m[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported.[0m [1m[35m[plugin angular-compiler][0m
[33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mTypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI.[0m [1m[35m[plugin angular-compiler][0m
[1m[31m[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mCannot find tsconfig file "apps/web-wms-app/tsconfig.app.json"[0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mTS500: Error: ENOENT: no such file or directory, lstat '/app/apps/web-wms-app/tsconfig.app.json'
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mCould not resolve "/app/apps/web-wms-app/src/main.ts"[0m
[31m✘ [41;31m[[41;97mERROR[41;31m][0m [1mCould not resolve "apps/web-wms-app/src/styles.scss"[0m
  You can mark the path "apps/web-wms-app/src/styles.scss" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.
```

### worker-scheduler-app
```
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
ERROR in ./libs/domain/notification/domain/src/lib/entities/notification.entity.ts:[32m[1m26:54[22m[39m
webpack 5.104.1 compiled with 1 error and 2 warnings in 5882 ms
 NX   Running target serve for project worker-scheduler-app and 1 task it depends on failed
Failed tasks:
```

