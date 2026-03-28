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
      '@virteex/domain-fiscal-domain': path.resolve(__dirname, './libs/domain/fiscal/domain/src/index.ts'),
      '@virteex/domain-fiscal-infrastructure': path.resolve(__dirname, './libs/domain/fiscal/infrastructure/src/index.ts'),
      '@virteex/domain-payroll-domain': path.resolve(__dirname, './libs/domain/payroll/domain/src/index.ts'),
      '@virteex/kernel-auth': path.resolve(__dirname, './libs/kernel/auth/src/index.ts'),
      '@virteex/kernel-tenant': path.resolve(__dirname, './libs/kernel/tenant/src/index.ts'),
      '@virteex/kernel-telemetry': path.resolve(__dirname, './libs/kernel/telemetry/src/index.ts'),
      '@virteex/platform-kafka': path.resolve(__dirname, './libs/platform/kafka/src/index.ts'),
      '@virteex/platform-data-quality': path.resolve(__dirname, './libs/platform/data-quality/src/index.ts'),
      '@virteex/platform-audit': path.resolve(__dirname, './libs/platform/audit/src/index.ts'),
      '@virteex/domain-pos-domain': path.resolve(__dirname, './libs/domain/pos/domain/src/index.ts'),
      '@virteex/domain-notification-application': path.resolve(__dirname, './libs/domain/notification/application/src/index.ts'),
      '@virteex/domain-notification-domain': path.resolve(__dirname, './libs/domain/notification/domain/src/index.ts'),
      '@virteex/domain-accounting-domain': path.resolve(__dirname, './libs/domain/accounting/domain/src/index.ts'),
      '@virteex/domain-accounting-application': path.resolve(__dirname, './libs/domain/accounting/application/src/index.ts'),
      '@virteex/domain-accounting-contracts': path.resolve(__dirname, './libs/domain/accounting/contracts/src/index.ts'),
      '@virteex/domain-accounting-infrastructure': path.resolve(__dirname, './libs/domain/accounting/infrastructure/src/index.ts'),
      '@virteex/domain-accounting-presentation': path.resolve(__dirname, './libs/domain/accounting/presentation/src/index.ts'),
      '@virteex/kernel-tenant-context': path.resolve(__dirname, './libs/kernel/tenant-context/src/index.ts'),
      '@virteex/kernel-telemetry-interfaces': path.resolve(__dirname, './libs/kernel/telemetry-interfaces/src/index.ts'),
      '@virteex/shared-util-server-server-config': path.resolve(__dirname, './libs/shared/util/server/server-config/src/index.ts'),
    }
  },
});
