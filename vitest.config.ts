import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.spec.ts'],
    setupFiles: [
      path.resolve(__dirname, './libs/domain/accounting/application/vitest.setup.ts'),
      path.resolve(__dirname, './libs/domain/accounting/ui/src/test-setup.ts')
    ],
    alias: {
      '@virtex/domain-fiscal-domain': path.resolve(__dirname, './libs/domain/fiscal/domain/src/index.ts'),
      '@virtex/domain-fiscal-infrastructure': path.resolve(__dirname, './libs/domain/fiscal/infrastructure/src/index.ts'),
      '@virtex/domain-payroll-domain': path.resolve(__dirname, './libs/domain/payroll/domain/src/index.ts'),
      '@virtex/kernel-auth': path.resolve(__dirname, './libs/kernel/auth/src/index.ts'),
      '@virtex/kernel-tenant': path.resolve(__dirname, './libs/kernel/tenant/src/index.ts'),
      '@virtex/kernel-telemetry': path.resolve(__dirname, './libs/kernel/telemetry/src/index.ts'),
      '@virtex/platform-kafka': path.resolve(__dirname, './libs/platform/kafka/src/index.ts'),
      '@virtex/platform-data-quality': path.resolve(__dirname, './libs/platform/data-quality/src/index.ts'),
      '@virtex/platform-audit': path.resolve(__dirname, './libs/platform/audit/src/index.ts'),
      '@virtex/domain-pos-domain': path.resolve(__dirname, './libs/domain/pos/domain/src/index.ts'),
      '@virtex/domain-notification-application': path.resolve(__dirname, './libs/domain/notification/application/src/index.ts'),
      '@virtex/domain-notification-domain': path.resolve(__dirname, './libs/domain/notification/domain/src/index.ts'),
      '@virtex/domain-accounting-domain': path.resolve(__dirname, './libs/domain/accounting/domain/src/index.ts'),
      '@virtex/domain-accounting-application': path.resolve(__dirname, './libs/domain/accounting/application/src/index.ts'),
      '@virtex/domain-accounting-contracts': path.resolve(__dirname, './libs/domain/accounting/contracts/src/index.ts'),
      '@virtex/domain-accounting-infrastructure': path.resolve(__dirname, './libs/domain/accounting/infrastructure/src/index.ts'),
      '@virtex/domain-accounting-presentation': path.resolve(__dirname, './libs/domain/accounting/presentation/src/index.ts'),
      '@virtex/kernel-tenant-context': path.resolve(__dirname, './libs/kernel/tenant-context/src/index.ts'),
      '@virtex/kernel-telemetry-interfaces': path.resolve(__dirname, './libs/kernel/telemetry-interfaces/src/index.ts'),
      '@virtex/shared-util-server-server-config': path.resolve(__dirname, './libs/shared/util/server/server-config/src/index.ts'),
      '@virtex/domain-identity-domain': path.resolve(__dirname, './libs/domain/identity/domain/src/index.ts'),
      '@virtex/domain-identity-contracts': path.resolve(__dirname, './libs/domain/identity/contracts/src/index.ts'),
      '@virtex/kernel-entitlements': path.resolve(__dirname, './libs/kernel/entitlements/src/index.ts'),
      '@virtex/domain-subscription-domain': path.resolve(__dirname, './libs/domain/subscription/domain/src/index.ts'),
      '@virtex/domain-inventory-domain': path.resolve(__dirname, './libs/domain/inventory/domain/src/index.ts'),
      '@virtex/domain-inventory-contracts': path.resolve(__dirname, './libs/domain/inventory/contracts/src/index.ts'),
      '@virtex/domain-subscription-contracts': path.resolve(__dirname, './libs/domain/subscription/contracts/src/index.ts'),
    }
  },
});
