import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { IAccountingReportingPort } from '@virtex/domain-accounting-contracts';
import { SecretManagerService } from '@virtex/kernel-auth';
import { buildSignedContextClaims, encodeContextClaims, signEncodedContext } from '@virtex/kernel-auth';
import { TELEMETRY_SERVICE, ITelemetryService } from '@virtex/kernel-telemetry';
import { IntegrationError } from '@virtex/domain-accounting-contracts';

@Injectable()
export class AccountingReportingAdapter implements IAccountingReportingPort, OnModuleInit {
  private hmacSecret!: string;

  constructor(
    private readonly secretManager: SecretManagerService,
    @Inject(TELEMETRY_SERVICE) private readonly telemetry: ITelemetryService
  ) {}

  onModuleInit() {
    this.hmacSecret = this.secretManager.getSecret('virtex_HMAC_SECRET');
  }

  async countJournalEntries(tenantId: string): Promise<number> {
    const baseUrl = process.env['ACCOUNTING_SERVICE_URL'] || 'http://accounting-service:3000';

    const claims = buildSignedContextClaims({
      tenantId,
      userId: 'system-bi',
      provenance: 'bi-service'
    });
    const encodedContext = encodeContextClaims(claims);
    const signature = signEncodedContext(encodedContext, this.hmacSecret);

    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const response = await fetch(`${baseUrl}/internal/accounting/journal-entries/count`, {
            headers: {
              'x-virtex-tenant-id': tenantId,
              'x-virtex-context': encodedContext,
              'x-virtex-signature': signature
            },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          return data.count;
        }
        lastError = new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      } catch (error) {
        lastError = error;
      }

      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 100;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    this.telemetry.recordBusinessMetric('accounting_reporting_integration_failure', 1, {
      tenantId,
      error: lastError?.message,
      errorType: lastError?.name === 'AbortError' ? 'timeout' : 'network_or_api'
    });

    // Fallback strategy: return 0 if BI cannot reach accounting, assuming no data yet or degradation
    this.telemetry.recordBusinessMetric('accounting_reporting_fallback_applied', 1, { tenantId });
    throw new IntegrationError(`Failed to count journal entries for tenant ${tenantId} after ${maxRetries} attempts. Last error: ${lastError?.message}`);
  }

  async getMonthlyOpex(tenantId: string): Promise<number> {
    const baseUrl = process.env['ACCOUNTING_SERVICE_URL'] || 'http://accounting-service:3000';

    const claims = buildSignedContextClaims({
      tenantId,
      userId: 'system-bi',
      provenance: 'bi-service'
    });
    const encodedContext = encodeContextClaims(claims);
    const signature = signEncodedContext(encodedContext, this.hmacSecret);

    try {
      const response = await fetch(`${baseUrl}/internal/accounting/metrics/monthly-opex`, {
          headers: {
            'x-virtex-tenant-id': tenantId,
            'x-virtex-context': encodedContext,
            'x-virtex-signature': signature
          }
      });

      if (response.ok) {
        const data = await response.json();
        return data.amount;
      }
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    } catch (error) {
      this.telemetry.recordBusinessMetric('accounting_opex_integration_failure', 1, { tenantId, error: (error as Error).message });
      return 0; // Return 0 as fallback for BI report
    }
  }
}
