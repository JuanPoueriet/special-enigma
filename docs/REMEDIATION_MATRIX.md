# Remediation Matrix: Virteex ERP Hardening

| Component | Findings (Prompt) | Code Confirmation | Status | Priority |
|-----------|-------------------|-------------------|--------|----------|
| **DianFiscalAdapter** | Hardcoded serials/certificates/policy hashes. | Confirmed in `libs/domain/fiscal/infrastructure/src/lib/adapters/dian-fiscal-provider.adapter.ts`. Uses `DEV-SERIAL-12345` and `DEV-POLICY-HASH` fallbacks. | **Confirmed** | P1 |
| **MexicanTaxStrategy** | Fallback tables ISR/UMA. Hardcoded values. | Confirmed in `libs/domain/payroll/infrastructure/src/lib/strategies/mexican-tax.strategy.ts`. `getFallbackTables` contains 2024 tables. UMA falls back to `108.57`. | **Confirmed** | P1 |
| **AwsSecretManagerAdapter** | `mockSecrets` active in dev/no-prod. | Confirmed in `libs/platform/storage/src/lib/adapters/aws-secret-manager.adapter.ts`. Contains `mockSecrets` map. | **Confirmed** | P1 |
| **SandboxService** | Simulated `_fetch` in sandbox. | Confirmed in `apps/api/plugin-host/app/src/sandbox.service.ts`. Returns `"Fetched from ${url} (Simulated in sandbox)"`. | **Confirmed** | P1 |
| **SBOM Generation** | Empty/placeholder JSON on failure. | Confirmed in `tools/scripts/generate-sbom.ts`. Writes placeholder on error instead of failing. | **Confirmed** | P1 |
| **Frontend UI (Billing)** | `of([])` patterns/silenced errors. | Confirmed in `libs/shared/ui/src/lib/core/services/billing.ts`. Extensive use of `catchError(() => of([]))`. | **Confirmed** | P2 |
| **Superficial Endpoints** | "status: ok" / "Hello API" evidence. | Confirmed in BI, Manufacturing, Fixed Assets, Projects, and Fiscal controllers. | **Confirmed** | P2 |
| **ReconciliationService** | Matching basic, persistence unclear. | Confirmed in `libs/domain/treasury/application/src/lib/services/reconciliation.service.ts`. Matching is simple, and it does not persist results. | **Confirmed** | P2 |
| **Noop Implementations** | `NoopProductGateway` presence. | Confirmed in `libs/domain/inventory/infrastructure/src/lib/adapters/noop-product.gateway.ts`. | **Confirmed** | P2 |
| **Gateway Resilience** | Proxy without timeouts/retries. | Confirmed in `apps/api/gateway/app/src/app/middleware/proxy.middleware.ts`. `http-proxy-middleware` used with default settings. | **Confirmed** | P3 |
