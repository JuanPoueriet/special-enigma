# Informe Detallado de Análisis de Microservicios y Aplicaciones
Generado el: Fri Mar 13 23:47:56 UTC 2026

## Resumen
| Proyecto | Estado | Tipo de Error |
| mobile-app | FAILED | Console Error |
| api-bi-app | FAILED | Build/Find Error |
| web-wms-app | FAILED | Console Error |
| web-pos-app | FAILED | Console Error |
| web-ops-app | WAITING/SUCCESS | None |
| web-cms-app | WAITING/SUCCESS | None |
| desktop-app | FAILED | Console Error |
| api-pos | FAILED | Exception |
| api-crm-app | FAILED | Console Error |
| web-site-app | FAILED | Console Error |
| web-store-app | FAILED | Console Error |
| api-admin-app | FAILED | Build/Find Error |
| web-portal-app | FAILED | Console Error |
| api-fiscal-app | FAILED | Exception |
| web-support-app | WAITING/SUCCESS | None |
| api-payroll-app | FAILED | Build/Find Error |
| api-gateway-app | FAILED | Exception |
| api-catalog-app | FAILED | Console Error |
| --- | --- | --- |
| worker-notification-app | FAILED | Build/Find Error |
| api-gateway-legacy-app | FAILED | Exception |
| api-manufacturing-app | FAILED | Build/Find Error |
| api-fixed-assets-app | FAILED | Build/Find Error |
| api-subscription-app | FAILED | Console Error |
| worker-scheduler-app | FAILED | Console Error |
| api-plugin-host-app | FAILED | Syntax Error |
| api-accounting-app | FAILED | Build/Find Error |
| api-purchasing-app | FAILED | Build/Find Error |
| api-inventory-app | FAILED | Exception |
| web-shopfloor-app | FAILED | Console Error |
| api-identity-app | FAILED | Exception |
| api-projects-app | FAILED | Build/Find Error |
| api-treasury-app | FAILED | Build/Find Error |
| api-billing-app | FAILED | Exception |

## api-catalog-app
**Estado:** FAILED
**Tipo de Error:** Console Error

### Extracto de Consola (Limpio)
```
export 'ProductReadRepository' (imported as 'ProductReadRepository') was not found in '@virteex/domain-catalog-domain' (possible exports: MeteringRecord, PRODUCT_READ_REPOSITORY, PRODUCT_WRITE_REPOSITORY, Plugin, PluginChannel, PluginStatus, PluginVersion, Product, ProductCreatedEvent, ProductUpdatedEvent, SAT_CATALOG_REPOSITORY, SatCfdiUsage, SatPaymentForm, SatPaymentMethod, TenantConsent)
WARNING in ../../../../libs/domain/catalog/application/src/lib/use-cases/get-products.use-case.ts 17:57-78
export 'ProductReadRepository' (imported as 'ProductReadRepository') was not found in '@virteex/domain-catalog-domain' (possible exports: MeteringRecord, PRODUCT_READ_REPOSITORY, PRODUCT_WRITE_REPOSITORY, Plugin, PluginChannel, PluginStatus, PluginVersion, Product, ProductCreatedEvent, ProductUpdatedEvent, SAT_CATALOG_REPOSITORY, SatCfdiUsage, SatPaymentForm, SatPaymentMethod, TenantConsent)
WARNING in ../../../../libs/domain/catalog/application/src/lib/use-cases/get-products.use-case.ts 17:98-119
export 'ProductReadRepository' (imported as 'ProductReadRepository') was not found in '@virteex/domain-catalog-domain' (possible exports: MeteringRecord, PRODUCT_READ_REPOSITORY, PRODUCT_WRITE_REPOSITORY, Plugin, PluginChannel, PluginStatus, PluginVersion, Product, ProductCreatedEvent, ProductUpdatedEvent, SAT_CATALOG_REPOSITORY, SatCfdiUsage, SatPaymentForm, SatPaymentMethod, TenantConsent)
WARNING in ../../../../libs/domain/catalog/application/src/lib/use-cases/get-sat-catalogs.use-case.ts 23:57-77
export 'SatCatalogRepository' (imported as 'SatCatalogRepository') was not found in '@virteex/domain-catalog-domain' (possible exports: MeteringRecord, PRODUCT_READ_REPOSITORY, PRODUCT_WRITE_REPOSITORY, Plugin, PluginChannel, PluginStatus, PluginVersion, Product, ProductCreatedEvent, ProductUpdatedEvent, SAT_CATALOG_REPOSITORY, SatCfdiUsage, SatPaymentForm, SatPaymentMethod, TenantConsent)
WARNING in ../../../../libs/domain/catalog/application/src/lib/use-cases/get-sat-catalogs.use-case.ts 23:97-117
export 'SatCatalogRepository' (imported as 'SatCatalogRepository') was not found in '@virteex/domain-catalog-domain' (possible exports: MeteringRecord, PRODUCT_READ_REPOSITORY, PRODUCT_WRITE_REPOSITORY, Plugin, PluginChannel, PluginStatus, PluginVersion, Product, ProductCreatedEvent, ProductUpdatedEvent, SAT_CATALOG_REPOSITORY, SatCfdiUsage, SatPaymentForm, SatPaymentMethod, TenantConsent)
WARNING in ../../../../libs/domain/catalog/application/src/lib/use-cases/update-product.use-case.ts 42:57-78
export 'ProductReadRepository' (imported as 'ProductReadRepository') was not found in '@virteex/domain-catalog-domain' (possible exports: MeteringRecord, PRODUCT_READ_REPOSITORY, PRODUCT_WRITE_REPOSITORY, Plugin, PluginChannel, PluginStatus, PluginVersion, Product, ProductCreatedEvent, ProductUpdatedEvent, SAT_CATALOG_REPOSITORY, SatCfdiUsage, SatPaymentForm, SatPaymentMethod, TenantConsent)
WARNING in ../../../../libs/domain/catalog/application/src/lib/use-cases/update-product.use-case.ts 42:98-119
export 'ProductReadRepository' (imported as 'ProductReadRepository') was not found in '@virteex/domain-catalog-domain' (possible exports: MeteringRecord, PRODUCT_READ_REPOSITORY, PRODUCT_WRITE_REPOSITORY, Plugin, PluginChannel, PluginStatus, PluginVersion, Product, ProductCreatedEvent, ProductUpdatedEvent, SAT_CATALOG_REPOSITORY, SatCfdiUsage, SatPaymentForm, SatPaymentMethod, TenantConsent)
WARNING in ../../../../libs/domain/catalog/application/src/lib/use-cases/update-product.use-case.ts 42:171-193
export 'ProductWriteRepository' (imported as 'ProductWriteRepository') was not found in '@virteex/domain-catalog-domain' (possible exports: MeteringRecord, PRODUCT_READ_REPOSITORY, PRODUCT_WRITE_REPOSITORY, Plugin, PluginChannel, PluginStatus, PluginVersion, Product, ProductCreatedEvent, ProductUpdatedEvent, SAT_CATALOG_REPOSITORY, SatCfdiUsage, SatPaymentForm, SatPaymentMethod, TenantConsent)
WARNING in ../../../../libs/domain/catalog/application/src/lib/use-cases/update-product.use-case.ts 42:213-235
export 'ProductWriteRepository' (imported as 'ProductWriteRepository') was not found in '@virteex/domain-catalog-domain' (possible exports: MeteringRecord, PRODUCT_READ_REPOSITORY, PRODUCT_WRITE_REPOSITORY, Plugin, PluginChannel, PluginStatus, PluginVersion, Product, ProductCreatedEvent, ProductUpdatedEvent, SAT_CATALOG_REPOSITORY, SatCfdiUsage, SatPaymentForm, SatPaymentMethod, TenantConsent)
WARNING in ../../../../libs/domain/catalog/presentation/src/lib/controllers/catalog.controller.ts 84:57-73
export 'CreateProductDto' (imported as 'CreateProductDto') was not found in '@virteex/domain-catalog-application' (possible exports: CatalogApplicationModule, CreateProductUseCase, DeleteProductUseCase, GetProductByIdUseCase, GetProductBySkuUseCase, GetProductsUseCase, GetSatCatalogsUseCase, UpdateProductUseCase)
WARNING in ../../../../libs/domain/catalog/presentation/src/lib/controllers/catalog.controller.ts 84:93-109
export 'CreateProductDto' (imported as 'CreateProductDto') was not found in '@virteex/domain-catalog-application' (possible exports: CatalogApplicationModule, CreateProductUseCase, DeleteProductUseCase, GetProductByIdUseCase, GetProductBySkuUseCase, GetProductsUseCase, GetSatCatalogsUseCase, UpdateProductUseCase)
WARNING in ../../../../libs/domain/catalog/presentation/src/lib/controllers/catalog.controller.ts 93:65-81
export 'UpdateProductDto' (imported as 'UpdateProductDto') was not found in '@virteex/domain-catalog-application' (possible exports: CatalogApplicationModule, CreateProductUseCase, DeleteProductUseCase, GetProductByIdUseCase, GetProductBySkuUseCase, GetProductsUseCase, GetSatCatalogsUseCase, UpdateProductUseCase)
WARNING in ../../../../libs/domain/catalog/presentation/src/lib/controllers/catalog.controller.ts 93:101-117
export 'UpdateProductDto' (imported as 'UpdateProductDto') was not found in '@virteex/domain-catalog-application' (possible exports: CatalogApplicationModule, CreateProductUseCase, DeleteProductUseCase, GetProductByIdUseCase, GetProductBySkuUseCase, GetProductsUseCase, GetSatCatalogsUseCase, UpdateProductUseCase)
WARNING in ../../../../libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
export 'SecretProvider' (imported as 'SecretProvider') was not found in '../interfaces/secret-provider.interface' (module has no exports)
WARNING in ../../../../libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
export 'SecretProvider' (imported as 'SecretProvider') was not found in '../interfaces/secret-provider.interface' (module has no exports)
webpack compiled with 26 warnings (3c945ac92ca60c0c)

 NX   Successfully ran target build for project api-catalog-app and 10 tasks it depends on
Nx read the output from the cache instead of running the command for 11 out of 11 tasks.
Debugger listening on ws://localhost:9229/a3ed6152-5456-4fa9-9cfa-a3d8439596f1
Debugger listening on ws://localhost:9229/a3ed6152-5456-4fa9-9cfa-a3d8439596f1
For help, see: https://nodejs.org/en/docs/inspector

ESM loader error: ReferenceError: Cannot access 'Plugin' before initialization
    at /app/apps/dist/apps/virteex-catalog-service/main.js:4170:39
    at /app/apps/dist/apps/virteex-catalog-service/main.js:6181:3
    at Object.<anonymous> (/app/apps/dist/apps/virteex-catalog-service/main.js:6183:12)
    at Module._compile (node:internal/modules/cjs/loader:1705:14)
    at Object..js (node:internal/modules/cjs/loader:1838:10)
    at Module.load (node:internal/modules/cjs/loader:1441:32)
    at Function._load (node:internal/modules/cjs/loader:1263:12)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:237:24)
    at cjsLoader (node:internal/modules/esm/translators:309:5)

 NX  Process exited with code 1, waiting for changes to restart...
```

## api-gateway-app
**Estado:** FAILED
**Tipo de Error:** Exception

### Extracto de Consola (Limpio)
```
export 'UserPayload' (imported as 'UserPayload') was not found in '@virteex/kernel-auth' (possible exports: AuthModule, CanonicalTenantMiddleware, CsrfMiddleware, CurrentTenant, CurrentUser, IS_PUBLIC_KEY, JwtAuthGuard, JwtTokenService, Public, SECRET_PROVIDER, STEP_UP_KEY, SecretManagerService, StepUp, StepUpGuard, TENANT_CONTEXT_VERSION, TenantContextValidationError, TenantGuard, buildAccessCookieOptions, buildCsrfCookieOptions, buildRefreshCookieOptions, buildSignedContextClaims, claimsFromJwtPayload, encodeContextClaims, getTenantContext, parseAndValidateSignedContext, requireTenantContext, runWithRequiredTenantContext, runWithTenantContext, signEncodedContext, validateClaims, verifySignature)
WARNING in ../../../../libs/domain/inventory/presentation/src/lib/controllers/stock.controller.ts 36:190-201
export 'UserPayload' (imported as 'UserPayload') was not found in '@virteex/kernel-auth' (possible exports: AuthModule, CanonicalTenantMiddleware, CsrfMiddleware, CurrentTenant, CurrentUser, IS_PUBLIC_KEY, JwtAuthGuard, JwtTokenService, Public, SECRET_PROVIDER, STEP_UP_KEY, SecretManagerService, StepUp, StepUpGuard, TENANT_CONTEXT_VERSION, TenantContextValidationError, TenantGuard, buildAccessCookieOptions, buildCsrfCookieOptions, buildRefreshCookieOptions, buildSignedContextClaims, claimsFromJwtPayload, encodeContextClaims, getTenantContext, parseAndValidateSignedContext, requireTenantContext, runWithRequiredTenantContext, runWithTenantContext, signEncodedContext, validateClaims, verifySignature)
WARNING in ../../../../libs/domain/inventory/presentation/src/lib/controllers/warehouses.controller.ts 46:165-176
export 'UserPayload' (imported as 'UserPayload') was not found in '@virteex/kernel-auth' (possible exports: AuthModule, CanonicalTenantMiddleware, CsrfMiddleware, CurrentTenant, CurrentUser, IS_PUBLIC_KEY, JwtAuthGuard, JwtTokenService, Public, SECRET_PROVIDER, STEP_UP_KEY, SecretManagerService, StepUp, StepUpGuard, TENANT_CONTEXT_VERSION, TenantContextValidationError, TenantGuard, buildAccessCookieOptions, buildCsrfCookieOptions, buildRefreshCookieOptions, buildSignedContextClaims, claimsFromJwtPayload, encodeContextClaims, getTenantContext, parseAndValidateSignedContext, requireTenantContext, runWithRequiredTenantContext, runWithTenantContext, signEncodedContext, validateClaims, verifySignature)
WARNING in ../../../../libs/domain/inventory/presentation/src/lib/controllers/warehouses.controller.ts 46:196-207
export 'UserPayload' (imported as 'UserPayload') was not found in '@virteex/kernel-auth' (possible exports: AuthModule, CanonicalTenantMiddleware, CsrfMiddleware, CurrentTenant, CurrentUser, IS_PUBLIC_KEY, JwtAuthGuard, JwtTokenService, Public, SECRET_PROVIDER, STEP_UP_KEY, SecretManagerService, StepUp, StepUpGuard, TENANT_CONTEXT_VERSION, TenantContextValidationError, TenantGuard, buildAccessCookieOptions, buildCsrfCookieOptions, buildRefreshCookieOptions, buildSignedContextClaims, claimsFromJwtPayload, encodeContextClaims, getTenantContext, parseAndValidateSignedContext, requireTenantContext, runWithRequiredTenantContext, runWithTenantContext, signEncodedContext, validateClaims, verifySignature)
WARNING in ../../../../libs/domain/inventory/presentation/src/lib/controllers/warehouses.controller.ts 54:57-68
export 'UserPayload' (imported as 'UserPayload') was not found in '@virteex/kernel-auth' (possible exports: AuthModule, CanonicalTenantMiddleware, CsrfMiddleware, CurrentTenant, CurrentUser, IS_PUBLIC_KEY, JwtAuthGuard, JwtTokenService, Public, SECRET_PROVIDER, STEP_UP_KEY, SecretManagerService, StepUp, StepUpGuard, TENANT_CONTEXT_VERSION, TenantContextValidationError, TenantGuard, buildAccessCookieOptions, buildCsrfCookieOptions, buildRefreshCookieOptions, buildSignedContextClaims, claimsFromJwtPayload, encodeContextClaims, getTenantContext, parseAndValidateSignedContext, requireTenantContext, runWithRequiredTenantContext, runWithTenantContext, signEncodedContext, validateClaims, verifySignature)
WARNING in ../../../../libs/domain/inventory/presentation/src/lib/controllers/warehouses.controller.ts 54:88-99
export 'UserPayload' (imported as 'UserPayload') was not found in '@virteex/kernel-auth' (possible exports: AuthModule, CanonicalTenantMiddleware, CsrfMiddleware, CurrentTenant, CurrentUser, IS_PUBLIC_KEY, JwtAuthGuard, JwtTokenService, Public, SECRET_PROVIDER, STEP_UP_KEY, SecretManagerService, StepUp, StepUpGuard, TENANT_CONTEXT_VERSION, TenantContextValidationError, TenantGuard, buildAccessCookieOptions, buildCsrfCookieOptions, buildRefreshCookieOptions, buildSignedContextClaims, claimsFromJwtPayload, encodeContextClaims, getTenantContext, parseAndValidateSignedContext, requireTenantContext, runWithRequiredTenantContext, runWithTenantContext, signEncodedContext, validateClaims, verifySignature)
WARNING in ../../../../libs/domain/inventory/presentation/src/lib/loaders/warehouse.loader.ts 20:57-76
export 'WarehouseRepository' (imported as 'WarehouseRepository') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)
WARNING in ../../../../libs/domain/inventory/presentation/src/lib/loaders/warehouse.loader.ts 20:96-115
export 'WarehouseRepository' (imported as 'WarehouseRepository') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)
WARNING in ../../../../libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
export 'SecretProvider' (imported as 'SecretProvider') was not found in '../interfaces/secret-provider.interface' (module has no exports)
WARNING in ../../../../libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
export 'SecretProvider' (imported as 'SecretProvider') was not found in '../interfaces/secret-provider.interface' (module has no exports)
webpack compiled with 59 warnings (c5b3bce3dba546dd)

 NX   Successfully ran target build for project api-gateway-app and 24 tasks it depends on
Nx read the output from the cache instead of running the command for 25 out of 25 tasks.
Debugger listening on ws://localhost:9229/215829b7-5409-4730-aac8-7d750eace452
Debugger listening on ws://localhost:9229/215829b7-5409-4730-aac8-7d750eace452
For help, see: https://nodejs.org/en/docs/inspector

Support for driver specific imports in modules defined with `useFactory` and `inject` requires an explicit `driver` option. See https://github.com/mikro-orm/nestjs/pull/204

[Nest] 21554  - 03/13/2026, 11:55:41 PM     LOG [NestFactory] Starting Nest application...
[Nest] 21554  - 03/13/2026, 11:55:41 PM   ERROR [ExceptionHandler] Error: An instance of EnvironmentVariables has failed the validation:
 - property SMTP_HOST has failed the following constraints: minLength, isString
,An instance of EnvironmentVariables has failed the validation:
 - property SMTP_USER has failed the following constraints: minLength, isString
,An instance of EnvironmentVariables has failed the validation:
 - property SMTP_PASSWORD has failed the following constraints: minLength, isString
,An instance of EnvironmentVariables has failed the validation:
 - property SMTP_FROM has failed the following constraints: minLength, isString
    at Object.validate (/app/libs/shared/util/server/server-config/src/lib/env.validation.ts:89:11)
    at Function.forRoot (/app/node_modules/@nestjs/config/dist/config.module.js:88:45)
    at /app/libs/shared/util/server/server-config/src/lib/server-config.module.ts:13:18
    at /app/apps/api/dist/apps/gateways/virteex-api-gateway/main.js:8946:3
    at Object.<anonymous> (/app/apps/api/dist/apps/gateways/virteex-api-gateway/main.js:8948:12)
    at Module._compile (node:internal/modules/cjs/loader:1705:14)
    at Object..js (node:internal/modules/cjs/loader:1838:10)
    at Module.load (node:internal/modules/cjs/loader:1441:32)
    at Function._load (node:internal/modules/cjs/loader:1263:12)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14)

 NX  Process exited with code 1, waiting for changes to restart...
```

## api-payroll-app
**Estado:** FAILED
**Tipo de Error:** Build/Find Error

### Extracto de Consola (Limpio)
```
    1 | import { Injectable, Inject, Logger } from '@nestjs/common';
    2 | import { EventEmitter2 } from '@nestjs/event-emitter';
  > 3 | import { PayrollStatus, PayrollDetailType } from '@virteex/domain-payroll-contracts';
      |          ^^^^^^^^^^^^^
    4 | import {
    5 |   PayrollRepository,
    6 |   PAYROLL_REPOSITORY,
ERROR in ./libs/domain/payroll/application/src/lib/use-cases/stamp-payroll.use-case.ts:3:25
TS2305: Module '"@virteex/domain-payroll-contracts"' has no exported member 'PayrollDetailType'.
    1 | import { Injectable, Inject, Logger } from '@nestjs/common';
    2 | import { EventEmitter2 } from '@nestjs/event-emitter';
  > 3 | import { PayrollStatus, PayrollDetailType } from '@virteex/domain-payroll-contracts';
      |                         ^^^^^^^^^^^^^^^^^
    4 | import {
    5 |   PayrollRepository,
    6 |   PAYROLL_REPOSITORY,
ERROR in ./libs/domain/payroll/presentation/src/lib/resolvers/payroll.resolver.ts:31:48
TS2345: Argument of type '{ tenantId: string; employeeId: string; periodStart: string; periodEnd: string; }' is not assignable to parameter of type 'CalculatePayrollDto'.
  Type '{ tenantId: string; employeeId: string; periodStart: string; periodEnd: string; }' is missing the following properties from type 'CalculatePayrollDto': month, year
    29 |     @CurrentTenant() tenantId: string
    30 |   ) {
  > 31 |     await this.calculatePayrollUseCase.execute({ ...input, tenantId });
       |                                                ^^^^^^^^^^^^^^^^^^^^^^
    32 |     return true;
    33 |   }
    34 | }
webpack 5.104.1 compiled with 9 errors and 34 warnings in 8888 ms
Build failed, waiting for changes to restart...
/app/node_modules/@nx/js/src/executors/node/node.impl.js:359
    throw new Error(`Could not find ${fileToRun}. Make sure your build succeeded.`);
          ^
Error: Could not find /app/dist/apps/api-payroll-app/main.js. Make sure your build succeeded.
    at fileToRunCorrectPath (/app/node_modules/@nx/js/src/executors/node/node.impl.js:359:11)
    at /app/node_modules/@nx/js/src/executors/node/node.impl.js:122:49
    at new Promise (<anonymous>)
    at Object.start (/app/node_modules/@nx/js/src/executors/node/node.impl.js:113:36)
    at async processQueue (/app/node_modules/@nx/js/src/executors/node/node.impl.js:78:13)
    at async Timeout.<anonymous> (/app/node_modules/@nx/js/src/executors/node/lib/coalescing-debounce.js:24:40)
Node.js v22.22.1



 NX   Running target serve for project api-payroll-app failed

Failed tasks:

- api-payroll-app:serve:development

Hint: run the command with --verbose for more details.

```

## web-support-app
**Estado:** WAITING/SUCCESS
**Tipo de Error:** None

### Extracto de Consola (Limpio)
```

> nx run web-support-app:serve:development

❯ Building...
✔ Building...
Initial chunk files | Names         |  Raw size
main.js             | main          |   5.32 kB |
styles.css          | styles        | 117 bytes |
                    | Initial total |   5.43 kB
Application bundle generation complete. [2.601 seconds] - 2026-03-13T23:56:42.618Z

Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4203/
```

## api-fiscal-app
**Estado:** FAILED
**Tipo de Error:** Exception

### Extracto de Consola (Limpio)
```
For help, see: https://nodejs.org/en/docs/inspector

[Nest] 22348  - 03/13/2026, 11:57:27 PM     LOG [NestFactory] Starting Nest application...
Support for driver specific imports in modules defined with `useFactory` and `inject` requires an explicit `driver` option. See https://github.com/mikro-orm/nestjs/pull/204

[Nest] 22348  - 03/13/2026, 11:57:27 PM     LOG [InstanceLoader] KafkaModule dependencies initialized +43ms
[Nest] 22348  - 03/13/2026, 11:57:27 PM     LOG [InstanceLoader] ClientsModule dependencies initialized +1ms
[Nest] 22348  - 03/13/2026, 11:57:27 PM   ERROR [SefazFiscalAdapter] SEFAZ XSD Schema not found at /app/apps/dist/apps/schemas/nfe-4.00.xsd. Blocking fiscal transmission.

[Nest] 22348  - 03/13/2026, 11:57:27 PM   ERROR [DianFiscalAdapter] DIAN XSD Schema not found at /app/apps/dist/apps/schemas/dian-ubl-2.1.xsd. Blocking fiscal transmission.

[Nest] 22348  - 03/13/2026, 11:57:27 PM   ERROR [ExceptionHandler] UnknownDependenciesException [Error]: Nest can't resolve dependencies of the TenantOperationService (EntityManager, ?). Please make sure that the argument TelemetryService at index [1] is available in the TenantModule context.
Potential solutions:
- Is TenantModule a valid NestJS module?
- If TelemetryService is a provider, is it part of the current TenantModule?
- If TelemetryService is exported from a separate @Module, is that module imported within TenantModule?
  @Module({
    imports: [ /* the Module containing TelemetryService */ ]
  })
For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
    at Injector.lookupComponentInParentModules (/app/node_modules/@nestjs/core/injector/injector.js:290:19)
    at resolveParam (/app/node_modules/@nestjs/core/injector/injector.js:140:38)
    at async Promise.all (index 1)
    at Injector.resolveConstructorParams (/app/node_modules/@nestjs/core/injector/injector.js:169:27)
    at Injector.loadInstance (/app/node_modules/@nestjs/core/injector/injector.js:75:13)
    at Injector.loadProvider (/app/node_modules/@nestjs/core/injector/injector.js:103:9)
    at /app/node_modules/@nestjs/core/injector/instance-loader.js:56:13
    at async Promise.all (index 4)
    at InstanceLoader.createInstancesOfProviders (/app/node_modules/@nestjs/core/injector/instance-loader.js:55:9)
    at /app/node_modules/@nestjs/core/injector/instance-loader.js:40:13 {
  type: 'TenantOperationService',
  context: {
    index: 1,
    dependencies: [
      [class EntityManager] {
        counter: 1
      },
      [class TelemetryService]
    ],
    name: [class TelemetryService]
  },
  metadata: {
    id: 'cdb45a14e2b6f3475dc1a'
  },
  moduleRef: {
    id: '6aae86e56170153fa4bf3'
  }
}

 NX  Process exited with code 1, waiting for changes to restart...
```

## web-portal-app
**Estado:** FAILED
**Tipo de Error:** Console Error

### Extracto de Consola (Limpio)
```
✘ [ERROR] TS2307: Cannot find module '@virteex/treasury-ui' or its corresponding type declarations. [plugin angular-compiler]
    apps/web/portal/app/src/app/app.routes.ts:32:53:
      32 │ ...ildren: () => import('@virteex/treasury-ui').then(m => m.treasu...
         ╵                         ~~~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2307: Cannot find module '@virteex/fixed-assets-ui' or its corresponding type declarations. [plugin angular-compiler]
    apps/web/portal/app/src/app/app.routes.ts:33:57:
      33 │ ...dren: () => import('@virteex/fixed-assets-ui').then(m => m.fixe...
         ╵                       ~~~~~~~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2307: Cannot find module '@virteex/projects-ui' or its corresponding type declarations. [plugin angular-compiler]
    apps/web/portal/app/src/app/app.routes.ts:34:53:
      34 │ ...ildren: () => import('@virteex/projects-ui').then(m => m.projec...
         ╵                         ~~~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2307: Cannot find module '@virteex/manufacturing-ui' or its corresponding type declarations. [plugin angular-compiler]
    apps/web/portal/app/src/app/app.routes.ts:35:58:
      35 │ ...ren: () => import('@virteex/manufacturing-ui').then(m => m.manu...
         ╵                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2307: Cannot find module '@virteex/pos-ui' or its corresponding type declarations. [plugin angular-compiler]
    apps/web/portal/app/src/app/app.routes.ts:36:48:
      36 │ ...Children: () => import('@virteex/pos-ui').then(m => m.posRoutes...
         ╵                           ~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2307: Cannot find module '@virteex/billing-ui' or its corresponding type declarations. [plugin angular-compiler]
    apps/web/portal/app/src/app/app.routes.ts:37:52:
      37 │ ...ildren: () => import('@virteex/billing-ui').then(m => m.billing...
         ╵                         ~~~~~~~~~~~~~~~~~~~~~
[31m✘ [ERROR] TS2307: Cannot find module '@virteex/catalog-ui' or its corresponding type declarations. [plugin angular-compiler]
    apps/web/portal/app/src/app/app.routes.ts:38:52:
      38 │ ...ildren: () => import('@virteex/catalog-ui').then(m => m.catalog...
         ╵                         ~~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2307: Cannot find module '@virteex/bi-ui' or its corresponding type declarations. [plugin angular-compiler]
    apps/web/portal/app/src/app/app.routes.ts:39:47:
      39 │ ...dChildren: () => import('@virteex/bi-ui').then(m => m.biRoutes) },
         ╵                            ~~~~~~~~~~~~~~~~
✘ [ERROR] TS2307: Cannot find module '@virteex/admin-ui' or its corresponding type declarations. [plugin angular-compiler]
    apps/web/portal/app/src/app/app.routes.ts:40:50:
      40 │ ...hildren: () => import('@virteex/admin-ui').then(m => m.adminRou...
         ╵                          ~~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2307: Cannot find module '@virteex/fiscal-ui' or its corresponding type declarations. [plugin angular-compiler]
    apps/web/portal/app/src/app/app.routes.ts:41:51:
      41 │ ...hildren: () => import('@virteex/fiscal-ui').then(m => m.fiscalR...
         ╵                          ~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2353: Object literal may only specify known properties, and 'recaptcha' does not exist in type 'AppConfig'. [plugin angular-compiler]
    apps/web/portal/app/src/environments/environment.prod.ts:6:2:
      6 │   recaptcha: {
        ╵   ~~~~~~~~~
✘ [ERROR] TS2353: Object literal may only specify known properties, and 'recaptcha' does not exist in type 'AppConfig'. [plugin angular-compiler]
    apps/web/portal/app/src/environments/environment.ts:6:2:
      6 │   recaptcha: {
        ╵   ~~~~~~~~~

Watch mode enabled. Watching for file changes...
```

## api-admin-app
**Estado:** FAILED
**Tipo de Error:** Build/Find Error

### Extracto de Consola (Limpio)
```
 @ ./libs/domain/admin/presentation/src/index.ts 1:0-48 1:0-48
 @ ./apps/api/admin/app/src/app/app.module.ts 3:0-77 14:26-49
 @ ./apps/api/admin/app/src/main.ts 3:0-45 6:41-50
WARNING in ./libs/domain/admin/application/src/lib/services/data-import.service.ts 96:57-75
export 'IntegrationGateway' (imported as 'IntegrationGateway') was not found in '@virteex/domain-admin-domain' (possible exports: DASHBOARD_GATEWAY, INTEGRATION_GATEWAY, TENANT_CONFIG_REPOSITORY, TenantConfig)
 @ ./libs/domain/admin/application/src/index.ts 2:0-51 2:0-51
 @ ./libs/domain/admin/presentation/src/lib/admin-presentation.module.ts 6:0-75 12:18-40
 @ ./libs/domain/admin/presentation/src/index.ts 1:0-48 1:0-48
 @ ./apps/api/admin/app/src/app/app.module.ts 3:0-77 14:26-49
 @ ./apps/api/admin/app/src/main.ts 3:0-45 6:41-50
WARNING in ./libs/domain/admin/application/src/lib/services/data-import.service.ts 96:95-113
export 'IntegrationGateway' (imported as 'IntegrationGateway') was not found in '@virteex/domain-admin-domain' (possible exports: DASHBOARD_GATEWAY, INTEGRATION_GATEWAY, TENANT_CONFIG_REPOSITORY, TenantConfig)
 @ ./libs/domain/admin/application/src/index.ts 2:0-51 2:0-51
 @ ./libs/domain/admin/presentation/src/lib/admin-presentation.module.ts 6:0-75 12:18-40
 @ ./libs/domain/admin/presentation/src/index.ts 1:0-48 1:0-48
 @ ./apps/api/admin/app/src/app/app.module.ts 3:0-77 14:26-49
 @ ./apps/api/admin/app/src/main.ts 3:0-45 6:41-50
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
export 'SecretProvider' (imported as 'SecretProvider') was not found in '../interfaces/secret-provider.interface' (module has no exports)
 @ ./libs/kernel/auth/src/index.ts 9:0-54 9:0-54
 @ ./apps/api/admin/app/src/app/app.module.ts 5:0-65 8:23-48
 @ ./apps/api/admin/app/src/main.ts 3:0-45 6:41-50
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
export 'SecretProvider' (imported as 'SecretProvider') was not found in '../interfaces/secret-provider.interface' (module has no exports)
 @ ./libs/kernel/auth/src/index.ts 9:0-54 9:0-54
 @ ./apps/api/admin/app/src/app/app.module.ts 5:0-65 8:23-48
 @ ./apps/api/admin/app/src/main.ts 3:0-45 6:41-50
webpack 5.104.1 compiled with 6 warnings in 6934 ms
/app/node_modules/@nx/js/src/executors/node/node.impl.js:359
    throw new Error(`Could not find ${fileToRun}. Make sure your build succeeded.`);
          ^
Error: Could not find /app/dist/apps/api-admin-app/main.js. Make sure your build succeeded.
    at fileToRunCorrectPath (/app/node_modules/@nx/js/src/executors/node/node.impl.js:359:11)
    at /app/node_modules/@nx/js/src/executors/node/node.impl.js:122:49
    at new Promise (<anonymous>)
    at Object.start (/app/node_modules/@nx/js/src/executors/node/node.impl.js:113:36)
    at async processQueue (/app/node_modules/@nx/js/src/executors/node/node.impl.js:78:13)
    at async Timeout.<anonymous> (/app/node_modules/@nx/js/src/executors/node/lib/coalescing-debounce.js:24:40)
Node.js v22.22.1



 NX   Running target serve for project api-admin-app failed

Failed tasks:

- api-admin-app:serve:development

Hint: run the command with --verbose for more details.

```

## web-store-app
**Estado:** FAILED
**Tipo de Error:** Console Error

### Extracto de Consola (Limpio)
```
▲ [WARNING] TypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI. [plugin angular-compiler]
    apps/web-store-app/tsconfig.app.json:0:0:
      0 │
        ╵ ^
  To control ECMA version and features use the Browserslist configuration. For more information, see https://angular.dev/tools/cli/build#configuring-browser-compatibility
▲ [WARNING] TypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported. [plugin angular-compiler]
  The 'module' option will be set to 'ES2022' instead.
▲ [WARNING] TypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI. [plugin angular-compiler]
    apps/web-store-app/tsconfig.app.json:0:0:
      0 │
        ╵ ^
  To control ECMA version and features use the Browserslist configuration. For more information, see https://angular.dev/tools/cli/build#configuring-browser-compatibility

✘ [ERROR] Cannot find tsconfig file "apps/web-store-app/tsconfig.app.json"
✘ [ERROR] Angular compilation emit failed. [plugin angular-compiler]
  AssertionError [ERR_ASSERTION]: compilerOptions.basePath should be a string.
      at lazyRoutesTransformer (/app/node_modules/@angular/build/src/tools/angular/transformers/lazy-routes-transformer.js:49:31)
      at AotCompilation.emitAffectedFiles (/app/node_modules/@angular/build/src/tools/angular/compilation/aot-compilation.js:238:90)
      at emit (/app/node_modules/@angular/build/src/tools/angular/compilation/parallel-worker.js:96:37)
      at onMessage (/app/node_modules/piscina/dist/worker.js:180:28)
✘ [ERROR] TS500: Error: ENOENT: no such file or directory, lstat '/app/apps/web-store-app/tsconfig.app.json'
    at Object.lstatSync (node:fs:1722:25)
    at NodeJSFileSystem.lstat (file:///app/node_modules/@angular/compiler-cli/bundles/chunk-XYYEESKY.js:73:15)
    at calcProjectFileAndBasePath (file:///app/node_modules/@angular/compiler-cli/bundles/chunk-3LTGCVHM.js:448:29)
    at readConfiguration (file:///app/node_modules/@angular/compiler-cli/bundles/chunk-3LTGCVHM.js:474:39)
    at /app/node_modules/@angular/build/src/tools/angular/compilation/angular-compilation.js:67:69
    at profileSync (/app/node_modules/@angular/build/src/tools/esbuild/profiling.js:68:16)
    at AotCompilation.loadConfiguration (/app/node_modules/@angular/build/src/tools/angular/compilation/angular-compilation.js:67:44)
    at async AotCompilation.initialize (/app/node_modules/@angular/build/src/tools/angular/compilation/aot-compilation.js:62:100)
    at async initialize (/app/node_modules/@angular/build/src/tools/angular/compilation/parallel-worker.js:38:121)
    at async onMessage (/app/node_modules/piscina/dist/worker.js:180:22) [plugin angular-compiler]
✘ [ERROR[41;31m] Could not resolve "/app/apps/web-store-app/src/main.ts"
✘ [ERROR] Cannot find tsconfig file "apps/web-store-app/tsconfig.app.json"
✘ [ERROR] Could not resolve "./apps/web-store-app/src/main.server"
    angular:main-server:angular:main-server:8:24:
      8 │ export { default } from './apps/web-store-app/src/main.server';
        ╵                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] Cannot find tsconfig file "apps/web-store-app/tsconfig.app.json"
✘ [ERROR] Could not resolve "./apps/web-store-app/src/server"
    angular:ssr-entry:angular:ssr-entry:2:24:
      2 │ import * as server from './apps/web-store-app/src/server';
        ╵                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] Could not resolve "apps/web-store-app/src/styles.scss"
    angular:styles/global:styles:1:8:
      1 │ @import 'apps/web-store-app/src/styles.scss';
        ╵         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  You can mark the path "apps/web-store-app/src/styles.scss" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.
✘ [ERROR] Cannot find tsconfig file "apps/web-store-app/tsconfig.app.json"

Watch mode enabled. Watching for file changes...
```

## web-site-app
**Estado:** FAILED
**Tipo de Error:** Console Error

### Extracto de Consola (Limpio)
```
▲ [WARNING] TypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI. [plugin angular-compiler]
    apps/web-site-app/tsconfig.app.json:0:0:
      0 │
        ╵ ^
  To control ECMA version and features use the Browserslist configuration. For more information, see https://angular.dev/tools/cli/build#configuring-browser-compatibility
▲ [WARNING] TypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported. [plugin angular-compiler]
  The 'module' option will be set to 'ES2022' instead.
▲ [WARNING] TypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI. [plugin angular-compiler]
    apps/web-site-app/tsconfig.app.json:0:0:
      0 │
        ╵ ^
  To control ECMA version and features use the Browserslist configuration. For more information, see https://angular.dev/tools/cli/build#configuring-browser-compatibility

✘ [ERROR] Cannot find tsconfig file "apps/web-site-app/tsconfig.app.json"
✘ [ERROR] Angular compilation emit failed. [plugin angular-compiler]
  AssertionError [ERR_ASSERTION]: compilerOptions.basePath should be a string.
      at lazyRoutesTransformer (/app/node_modules/@angular/build/src/tools/angular/transformers/lazy-routes-transformer.js:49:31)
      at AotCompilation.emitAffectedFiles (/app/node_modules/@angular/build/src/tools/angular/compilation/aot-compilation.js:238:90)
      at emit (/app/node_modules/@angular/build/src/tools/angular/compilation/parallel-worker.js:96:37)
      at onMessage (/app/node_modules/piscina/dist/worker.js:180:28)
✘ [ERROR] TS500: Error: ENOENT: no such file or directory, lstat '/app/apps/web-site-app/tsconfig.app.json'
    at Object.lstatSync (node:fs:1722:25)
    at NodeJSFileSystem.lstat (file:///app/node_modules/@angular/compiler-cli/bundles/chunk-XYYEESKY.js:73:15)
    at calcProjectFileAndBasePath (file:///app/node_modules/@angular/compiler-cli/bundles/chunk-3LTGCVHM.js:448:29)
    at readConfiguration (file:///app/node_modules/@angular/compiler-cli/bundles/chunk-3LTGCVHM.js:474:39)
    at /app/node_modules/@angular/build/src/tools/angular/compilation/angular-compilation.js:67:69
    at profileSync (/app/node_modules/@angular/build/src/tools/esbuild/profiling.js:68:16)
    at AotCompilation.loadConfiguration (/app/node_modules/@angular/build/src/tools/angular/compilation/angular-compilation.js:67:44)
    at async AotCompilation.initialize (/app/node_modules/@angular/build/src/tools/angular/compilation/aot-compilation.js:62:100)
    at async initialize (/app/node_modules/@angular/build/src/tools/angular/compilation/parallel-worker.js:38:121)
    at async onMessage (/app/node_modules/piscina/dist/worker.js:180:22) [plugin angular-compiler]
✘ [ERROR[41;31m] Could not resolve "/app/apps/web-site-app/src/main.ts"
✘ [ERROR] Cannot find tsconfig file "apps/web-site-app/tsconfig.app.json"
✘ [ERROR] Could not resolve "./apps/web-site-app/src/main.server"
    angular:main-server:angular:main-server:8:24:
      8 │ export { default } from './apps/web-site-app/src/main.server';
        ╵                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] Cannot find tsconfig file "apps/web-site-app/tsconfig.app.json"
✘ [ERROR] Could not resolve "./apps/web-site-app/src/server"
    angular:ssr-entry:angular:ssr-entry:2:24:
      2 │ import * as server from './apps/web-site-app/src/server';
        ╵                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] Could not resolve "apps/web-site-app/src/styles.scss"
    angular:styles/global:styles:1:8:
      1 │ @import 'apps/web-site-app/src/styles.scss';
        ╵         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  You can mark the path "apps/web-site-app/src/styles.scss" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.
✘ [ERROR] Cannot find tsconfig file "apps/web-site-app/tsconfig.app.json"

Watch mode enabled. Watching for file changes...
```

## api-crm-app
**Estado:** FAILED
**Tipo de Error:** Console Error

### Extracto de Consola (Limpio)
```


> nx run domain-crm-application:build

Compiling TypeScript files for project "domain-crm-application"...
libs/domain/crm/application/src/lib/use-cases/approve-sale.use-case.ts:17:72 - error TS2339: Property 'NEGOTIATION' does not exist on type 'typeof SaleStatus'.

17     if (sale.status !== SaleStatus.DRAFT && sale.status !== SaleStatus.NEGOTIATION) {
                                                                          ~~~~~~~~~~~
libs/domain/crm/application/src/lib/use-cases/approve-sale.use-case.ts:20:30 - error TS2339: Property 'APPROVED' does not exist on type 'typeof SaleStatus'.

20     sale.status = SaleStatus.APPROVED;
                                ~~~~~~~~
libs/domain/crm/application/src/lib/use-cases/cancel-sale.use-case.ts:17:36 - error TS2339: Property 'COMPLETED' does not exist on type 'typeof SaleStatus'.

17     if (sale.status === SaleStatus.COMPLETED) {
                                      ~~~~~~~~~
libs/domain/crm/application/src/lib/use-cases/complete-sale.use-case.ts:17:36 - error TS2339: Property 'APPROVED' does not exist on type 'typeof SaleStatus'.

17     if (sale.status !== SaleStatus.APPROVED) {
                                      ~~~~~~~~
libs/domain/crm/application/src/lib/use-cases/complete-sale.use-case.ts:20:30 - error TS2339: Property 'COMPLETED' does not exist on type 'typeof SaleStatus'.

20     sale.status = SaleStatus.COMPLETED;
                                ~~~~~~~~~
libs/domain/crm/application/src/lib/use-cases/create-sale.use-case.ts:4:38 - error TS2307: Cannot find module '@virteex/domain-crm-domain/ports/inventory.service' or its corresponding type declarations.

4 import { StockReservationItem } from '@virteex/domain-crm-domain/ports/inventory.service';
                                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
libs/domain/crm/application/src/lib/use-cases/create-sale.use-case.ts:86:18 - error TS2339: Property 'add' does not exist on type 'any[]'.

86       sale.items.add(saleItem);
                    ~~~
libs/domain/crm/application/src/lib/use-cases/create-sale.use-case.ts:117:34 - error TS2339: Property 'APPROVED' does not exist on type 'typeof SaleStatus'.

117         sale.status = SaleStatus.APPROVED;
                                     ~~~~~~~~

Package type is set to "commonjs" but "esm" format is included. Going to use "cjs" format instead. You can change the package type to "module" or remove type in the package.json file.



 NX   Running target serve for project api-crm-app and 13 tasks it depends on failed

Failed tasks:

- domain-crm-application:build

Hint: run the command with --verbose for more details.

```

## api-pos
**Estado:** FAILED
**Tipo de Error:** Exception

### Extracto de Consola (Limpio)
```
WARNING in ../../../../libs/domain/inventory/application/src/lib/use-cases/register-movement.use-case.ts 83:206-225
export 'WarehouseRepository' (imported as 'WarehouseRepository') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)

WARNING in ../../../../libs/domain/inventory/application/src/lib/use-cases/register-movement.use-case.ts 83:277-291
export 'ProductGateway' (imported as 'ProductGateway') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)

WARNING in ../../../../libs/domain/inventory/application/src/lib/use-cases/register-movement.use-case.ts 83:311-325
export 'ProductGateway' (imported as 'ProductGateway') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)

WARNING in ../../../../libs/domain/inventory/application/src/lib/use-cases/reserve-batch-stock.use-case.ts 43:57-76
export 'InventoryRepository' (imported as 'InventoryRepository') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)

WARNING in ../../../../libs/domain/inventory/application/src/lib/use-cases/reserve-batch-stock.use-case.ts 43:96-115
export 'InventoryRepository' (imported as 'InventoryRepository') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)

WARNING in ../../../../libs/domain/inventory/application/src/lib/use-cases/reserve-stock.use-case.ts 22:57-76
export 'InventoryRepository' (imported as 'InventoryRepository') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)

WARNING in ../../../../libs/domain/inventory/application/src/lib/use-cases/reserve-stock.use-case.ts 22:96-115
export 'InventoryRepository' (imported as 'InventoryRepository') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)

WARNING in ../../../../libs/domain/inventory/application/src/lib/use-cases/update-warehouse.use-case.ts 38:57-76
export 'WarehouseRepository' (imported as 'WarehouseRepository') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)

WARNING in ../../../../libs/domain/inventory/application/src/lib/use-cases/update-warehouse.use-case.ts 38:96-115
export 'WarehouseRepository' (imported as 'WarehouseRepository') was not found in '@virteex/domain-inventory-domain' (possible exports: DomainValidationError, INVENTORY_REPOSITORY, InsufficientStockException, InventoryMovement, InventoryMovementType, Location, PRODUCT_GATEWAY, Stock, StockBatch, StockDataInconsistencyError, StockNotFoundError, WAREHOUSE_REPOSITORY, Warehouse, WarehouseNotFoundError, WarehouseNotFoundException)

WARNING in ../../../../libs/domain/pos/application/src/lib/use-cases/process-sale.use-case.ts 78:155-173
export 'HardwareBridgePort' (imported as 'HardwareBridgePort') was not found in '@virteex/domain-pos-domain' (possible exports: HARDWARE_BRIDGE_PORT, PosRepository, PosSale, PosSaleItem, PosSaleStatus, PosShift, ShiftStatus)

WARNING in ../../../../libs/domain/pos/application/src/lib/use-cases/process-sale.use-case.ts 78:193-211
export 'HardwareBridgePort' (imported as 'HardwareBridgePort') was not found in '@virteex/domain-pos-domain' (possible exports: HARDWARE_BRIDGE_PORT, PosRepository, PosSale, PosSaleItem, PosSaleStatus, PosShift, ShiftStatus)

WARNING in ../../../../libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
export 'SecretProvider' (imported as 'SecretProvider') was not found in '../interfaces/secret-provider.interface' (module has no exports)

WARNING in ../../../../libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
export 'SecretProvider' (imported as 'SecretProvider') was not found in '../interfaces/secret-provider.interface' (module has no exports)

webpack compiled with 51 warnings (f4909765b446e14f)
Type-checking in progress...
No errors found.
<i> [webpack-dev-server] Gracefully shutting down. To force exit, press ^C again. Please wait...
Warning: command "webpack-cli serve --node-env=development" exited with non-zero status codeTask "api-pos:serve" is continuous but exited with code null



 NX   Successfully ran target serve for project api-pos


```

## desktop-app
**Estado:** FAILED
**Tipo de Error:** Console Error

### Extracto de Consola (Limpio)
```

> nx run desktop-app:serve

asset main.js 19.7 KiB [compared for emit] (name: main) 1 related asset
asset main.preload.js 3.82 KiB [compared for emit] (name: main.preload) 1 related asset
asset assets/gitkeep_tmpl_ 13 bytes [compared for emit] [from: apps/desktop/app/src/assets/gitkeep_tmpl_] [copied]
runtime modules 1.83 KiB 8 modules
built modules 9.82 KiB [built]
  cacheable modules 9.61 KiB
    modules by path ./apps/desktop/app/src/app/ 8.59 KiB
      modules by path ./apps/desktop/app/src/app/api/*.ts 1.03 KiB 2 modules
      modules by path ./apps/desktop/app/src/app/events/*.ts 2.54 KiB 2 modules
      modules by path ./apps/desktop/app/src/app/*.ts 5.01 KiB 2 modules
    ./apps/desktop/app/src/main.ts 959 bytes [built] [code generated]
    ./apps/desktop/app/src/environments/environment.ts 87 bytes [built] [code generated]
  external "electron" 42 bytes [built] [code generated]
  external "child_process" 42 bytes [built] [code generated]
  external "path" 42 bytes [built] [code generated]
  external "url" 42 bytes [built] [code generated]
  external "fs/promises" 42 bytes [built] [code generated]
webpack 5.104.1 compiled successfully in 562 ms
Type-checking in progress...
Debugger listening on ws://127.0.0.1:5858/06809754-db3c-4591-9017-b39ab4207e31
For help, see: https://nodejs.org/en/docs/inspector

[24365:0314/000147.351275:ERROR:ozone_platform_x11.cc(246)] Missing X server or $DISPLAY
[24365:0314/000147.351340:ERROR:env.cc(257)] The platform failed to initialize.  Exiting.

No typescript errors found.



 NX   Running target serve for project desktop-app failed

Failed tasks:

- desktop-app:serve

Hint: run the command with --verbose for more details.

```

## web-cms-app
**Estado:** WAITING/SUCCESS
**Tipo de Error:** None

### Extracto de Consola (Limpio)
```

> nx run web-cms-app:serve:development

❯ Building...
✔ Building...
Initial chunk files | Names         |  Raw size
main.js             | main          |   5.27 kB |
styles.css          | styles        | 113 bytes |
                    | Initial total |   5.38 kB
Application bundle generation complete. [2.571 seconds] - 2026-03-14T00:02:36.293Z

Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4201/
```

## web-ops-app
**Estado:** WAITING/SUCCESS
**Tipo de Error:** None

### Extracto de Consola (Limpio)
```

> nx run web-ops-app:serve:development

❯ Building...
✔ Building...
Initial chunk files | Names                    |  Raw size
main.js             | main                     |  40.88 kB |
chunk-WAB2FOVT.js   | -                        | 236 bytes |
styles.css          | styles                   | 113 bytes |
                    | Initial total            |  41.23 kB
Lazy chunk files    | Names                    |  Raw size
chunk-ZLCQMW7W.js   | create-tenant-component  |  17.44 kB |
chunk-F7RASMBZ.js   | tenants-component        |  12.48 kB |
chunk-FYPNO3MY.js   | dashboard-component      |  11.66 kB |
chunk-4SOFMUF6.js   | billing-component        |   8.28 kB |
chunk-LLEMN4YS.js   | console-config-component |   3.68 kB |
chunk-QM55HVRA.js   | notifications-component  |   3.67 kB |
chunk-Q2OB2KX7.js   | import-export-component  |   3.65 kB |
chunk-4IEDYSS5.js   | feature-flags-component  |   3.65 kB |
chunk-LRSPUDKT.js   | automation-component     |   3.57 kB |
chunk-B6PQKI32.js   | monitoring-component     |   3.57 kB |
chunk-W3HY7F3T.js   | databases-component      |   3.54 kB |
chunk-WM7KPXBY.js   | releases-component       |   3.51 kB |
chunk-KH4S46GB.js   | security-component       |   3.51 kB |
chunk-QUUUCD3C.js   | storage-component        |   3.48 kB |
chunk-W3BPYUVU.js   | backups-component        |   3.48 kB |
...and 9 more lazy chunks files. Use "--verbose" to show all the files.
Application bundle generation complete. [4.694 seconds] - 2026-03-14T00:03:25.219Z

Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4202/
```

## web-pos-app
**Estado:** FAILED
**Tipo de Error:** Console Error

### Extracto de Consola (Limpio)
```

> nx run web-pos-app:serve:development

❯ Building...
✔ Building...
Application bundle generation failed. [2.333 seconds] - 2026-03-14T00:04:06.258Z

▲ [WARNING] TypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported. [plugin angular-compiler]
  The 'module' option will be set to 'ES2022' instead.
▲ [WARNING] TypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI. [plugin angular-compiler]
    apps/web/pos/app/tsconfig.app.json:0:0:
      0 │
        ╵ ^
  To control ECMA version and features use the Browserslist configuration. For more information, see https://angular.dev/tools/cli/build#configuring-browser-compatibility
▲ [WARNING] Cannot find base config file "../../../tsconfig.base.json" [tsconfig.json]
    apps/web/pos/app/tsconfig.app.json:2:13:
      2 │   "extends": "../../../tsconfig.base.json",
        ╵              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

✘ [ERROR] TS5012: Cannot read file '/app/apps/tsconfig.base.json': ENOENT: no such file or directory, open '/app/apps/tsconfig.base.json'. [plugin angular-compiler]

Watch mode enabled. Watching for file changes...
```

## web-wms-app
**Estado:** FAILED
**Tipo de Error:** Console Error

### Extracto de Consola (Limpio)
```

> nx run web-wms-app:serve:development

❯ Building...
✔ Building...
Application bundle generation failed. [0.903 seconds] - 2026-03-14T00:04:49.775Z

▲ [WARNING] TypeScript compiler options 'module' values 'CommonJS', 'UMD', 'System' and 'AMD' are not supported. [plugin angular-compiler]
  The 'module' option will be set to 'ES2022' instead.
▲ [WARNING] TypeScript compiler options 'target' and 'useDefineForClassFields' are set to 'ES2022' and 'false' respectively by the Angular CLI. [plugin angular-compiler]
    apps/web-wms-app/tsconfig.app.json:0:0:
      0 │
        ╵ ^
  To control ECMA version and features use the Browserslist configuration. For more information, see https://angular.dev/tools/cli/build#configuring-browser-compatibility

✘ [ERROR] Cannot find tsconfig file "apps/web-wms-app/tsconfig.app.json"
✘ [ERROR] TS500: Error: ENOENT: no such file or directory, lstat '/app/apps/web-wms-app/tsconfig.app.json'
    at Object.lstatSync (node:fs:1722:25)
    at NodeJSFileSystem.lstat (file:///app/node_modules/@angular/compiler-cli/bundles/chunk-XYYEESKY.js:73:15)
    at calcProjectFileAndBasePath (file:///app/node_modules/@angular/compiler-cli/bundles/chunk-3LTGCVHM.js:448:29)
    at readConfiguration (file:///app/node_modules/@angular/compiler-cli/bundles/chunk-3LTGCVHM.js:474:39)
    at /app/node_modules/@angular/build/src/tools/angular/compilation/angular-compilation.js:67:69
    at profileSync (/app/node_modules/@angular/build/src/tools/esbuild/profiling.js:68:16)
    at AotCompilation.loadConfiguration (/app/node_modules/@angular/build/src/tools/angular/compilation/angular-compilation.js:67:44)
    at async AotCompilation.initialize (/app/node_modules/@angular/build/src/tools/angular/compilation/aot-compilation.js:62:100)
    at async initialize (/app/node_modules/@angular/build/src/tools/angular/compilation/parallel-worker.js:38:121)
    at async onMessage (/app/node_modules/piscina/dist/worker.js:180:22) [plugin angular-compiler]
✘ [ERROR] Could not resolve "/app/apps/web-wms-app/src/main.ts"
✘ [ERROR] Could not resolve "apps/web-wms-app/src/styles.scss"
    angular:styles/global:styles:1:8:
      1 │ @import 'apps/web-wms-app/src/styles.scss';
        ╵         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  You can mark the path "apps/web-wms-app/src/styles.scss" as external to exclude it from the bundle, which will remove this error and leave the unresolved path in the bundle.

Watch mode enabled. Watching for file changes...
```

## api-bi-app
**Estado:** FAILED
**Tipo de Error:** Build/Find Error

### Extracto de Consola (Limpio)
```
 @ ./apps/api/bi/app/src/main.ts 3:0-45 6:41-50
WARNING in ./libs/domain/payroll/infrastructure/src/lib/strategies/us-payroll.strategy.ts 140:57-75
export 'TaxTableRepository' (imported as 'TaxTableRepository') was not found in '@virteex/domain-payroll-domain' (possible exports: ATTENDANCE_REPOSITORY, Attendance, EMPLOYEE_REPOSITORY, Employee, MissingTaxTableException, PAC_PROVIDER, PAYROLL_REPOSITORY, Payroll, PayrollCalculationService, PayrollDetail, PayrollStampedEvent, TAX_SERVICE, TAX_STRATEGY_FACTORY, TAX_TABLE_REPOSITORY, TENANT_CONFIG_REPOSITORY, TaxTable)
 @ ./libs/domain/payroll/infrastructure/src/lib/payroll-infrastructure.module.ts 12:0-69 40:12-29 53:12-29
 @ ./libs/domain/payroll/infrastructure/src/index.ts 1:0-52 1:0-52
 @ ./libs/domain/bi/infrastructure/src/lib/bi-infrastructure.ts 11:0-85 23:12-39
 @ ./libs/domain/bi/infrastructure/src/index.ts 1:0-40 1:0-40
 @ ./apps/api/bi/app/src/app/app.module.ts 6:0-75 46:12-34
 @ ./apps/api/bi/app/src/main.ts 3:0-45 6:41-50
WARNING in ./libs/domain/payroll/infrastructure/src/lib/strategies/us-payroll.strategy.ts 140:95-113
export 'TaxTableRepository' (imported as 'TaxTableRepository') was not found in '@virteex/domain-payroll-domain' (possible exports: ATTENDANCE_REPOSITORY, Attendance, EMPLOYEE_REPOSITORY, Employee, MissingTaxTableException, PAC_PROVIDER, PAYROLL_REPOSITORY, Payroll, PayrollCalculationService, PayrollDetail, PayrollStampedEvent, TAX_SERVICE, TAX_STRATEGY_FACTORY, TAX_TABLE_REPOSITORY, TENANT_CONFIG_REPOSITORY, TaxTable)
 @ ./libs/domain/payroll/infrastructure/src/lib/payroll-infrastructure.module.ts 12:0-69 40:12-29 53:12-29
 @ ./libs/domain/payroll/infrastructure/src/index.ts 1:0-52 1:0-52
 @ ./libs/domain/bi/infrastructure/src/lib/bi-infrastructure.ts 11:0-85 23:12-39
 @ ./libs/domain/bi/infrastructure/src/index.ts 1:0-40 1:0-40
 @ ./apps/api/bi/app/src/app/app.module.ts 6:0-75 46:12-34
 @ ./apps/api/bi/app/src/main.ts 3:0-45 6:41-50
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:57-71
export 'SecretProvider' (imported as 'SecretProvider') was not found in '../interfaces/secret-provider.interface' (module has no exports)
 @ ./libs/kernel/auth/src/index.ts 9:0-54 9:0-54
 @ ./apps/api/bi/app/src/app/app.module.ts 14:0-65 17:23-48
 @ ./apps/api/bi/app/src/main.ts 3:0-45 6:41-50
WARNING in ./libs/kernel/auth/src/lib/services/secret-manager.service.ts 86:91-105
export 'SecretProvider' (imported as 'SecretProvider') was not found in '../interfaces/secret-provider.interface' (module has no exports)
 @ ./libs/kernel/auth/src/index.ts 9:0-54 9:0-54
 @ ./apps/api/bi/app/src/app/app.module.ts 14:0-65 17:23-48
 @ ./apps/api/bi/app/src/main.ts 3:0-45 6:41-50
webpack 5.104.1 compiled with 52 warnings in 10037 ms
/app/node_modules/@nx/js/src/executors/node/node.impl.js:359
    throw new Error(`Could not find ${fileToRun}. Make sure your build succeeded.`);
          ^
Error: Could not find /app/dist/apps/api-bi-app/main.js. Make sure your build succeeded.
    at fileToRunCorrectPath (/app/node_modules/@nx/js/src/executors/node/node.impl.js:359:11)
    at /app/node_modules/@nx/js/src/executors/node/node.impl.js:122:49
    at new Promise (<anonymous>)
    at Object.start (/app/node_modules/@nx/js/src/executors/node/node.impl.js:113:36)
    at async processQueue (/app/node_modules/@nx/js/src/executors/node/node.impl.js:78:13)
    at async Timeout.<anonymous> (/app/node_modules/@nx/js/src/executors/node/lib/coalescing-debounce.js:24:40)
Node.js v22.22.1



 NX   Running target serve for project api-bi-app failed

Failed tasks:

- api-bi-app:serve:development

Hint: run the command with --verbose for more details.

```

## mobile-app
**Estado:** FAILED
**Tipo de Error:** Console Error

### Extracto de Consola (Limpio)
```
❯ Building...
✔ Building...
Application bundle generation failed. [4.425 seconds] - 2026-03-14T00:05:53.476Z

✘ [ERROR] TS2305: Module '"@virteex/shared-util-auth"' has no exported member 'SecureStorageService'. [plugin angular-compiler]
    apps/mobile/app/src/app/core/interceptors/auth.interceptor.ts:4:9:
      4 │ import { SecureStorageService } from '@virteex/shared-util-auth';
        ╵          ~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS18046: 'secureStorage' is of type 'unknown'. [plugin angular-compiler]
    apps/mobile/app/src/app/core/interceptors/auth.interceptor.ts:18:14:
      18 │   return from(secureStorage.get('access_token')).pipe(
         ╵               ~~~~~~~~~~~~~
✘ [ERROR] TS2305: Module '"@virteex/shared-util-auth"' has no exported member 'SecureStorageService'. [plugin angular-compiler]
    apps/mobile/app/src/app/core/services/database.service.ts:6:9:
      6 │ import { SecureStorageService } from '@virteex/shared-util-auth';
        ╵          ~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2571: Object is of type 'unknown'. [plugin angular-compiler]
    apps/mobile/app/src/app/core/services/database.service.ts:80:23:
      80 │     let secret = await this.secureStorage.get(secretKeyName);
         ╵                        ~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2571: Object is of type 'unknown'. [plugin angular-compiler]
    apps/mobile/app/src/app/core/services/database.service.ts:91:12:
      91 │       await this.secureStorage.set(secretKeyName, secret);
         ╵             ~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2305: Module '"@virteex/shared-util-auth"' has no exported member 'SecureStorageService'. [plugin angular-compiler]
    apps/mobile/app/src/app/pages/login/login.page.ts:9:9:
      9 │ import { SecureStorageService } from '@virteex/shared-util-auth';
        ╵          ~~~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2571: Object is of type 'unknown'. [plugin angular-compiler]
    apps/mobile/app/src/app/pages/login/login.page.ts:37:28:
      37 │         const token = await this.secureStorage.get('access_token');
         ╵                             ~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2571: Object is of type 'unknown'. [plugin angular-compiler]
    apps/mobile/app/src/app/pages/login/login.page.ts:50:22:
      50 │                 await this.secureStorage.remove('access_token');
         ╵                       ~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2571: Object is of type 'unknown'. [plugin angular-compiler]
    apps/mobile/app/src/app/pages/login/login.page.ts:71:22:
      71 │                 await this.secureStorage.set('access_token', res.a...
         ╵                       ~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2571: Object is of type 'unknown'. [plugin angular-compiler]
    apps/mobile/app/src/app/pages/login/login.page.ts:74:22:
      74 │                 await this.secureStorage.set('refresh_token', res....
         ╵                       ~~~~~~~~~~~~~~~~~~
✘ [ERROR] TS2571: Object is of type 'unknown'. [plugin angular-compiler]
    apps/mobile/app/src/app/pages/login/login.page.ts:82:33:
      82 │ ...       const token = await this.secureStorage.get('access_token');
         ╵                               ~~~~~~~~~~~~~~~~~~

Watch mode enabled. Watching for file changes...
```
