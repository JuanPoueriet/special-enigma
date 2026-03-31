import { Injectable, Inject, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { type PayrollRepository, PAYROLL_REPOSITORY, type TenantConfigRepository, TENANT_CONFIG_REPOSITORY, PayrollStampedEvent, type Payroll, PayrollStatus } from '@virteex/domain-payroll-domain';
import { ACCOUNTING_INTEGRATION_EVENTS, PayrollStampedV1EventDto } from '@virteex/shared-contracts';
import { EntityNotFoundException } from '@virteex/kernel-exceptions';
import { FISCAL_STAMPING_PORT, FiscalStampingPort } from '../../ports/fiscal-stamping.port';

@Injectable()
export class StampPayrollUseCase {
  private readonly logger = new Logger(StampPayrollUseCase.name);

  constructor(
    @Inject(PAYROLL_REPOSITORY) private readonly payrollRepository: PayrollRepository,
    @Inject(FISCAL_STAMPING_PORT) private readonly fiscalStampingPort: FiscalStampingPort,
    @Inject(TENANT_CONFIG_REPOSITORY) private readonly tenantConfigRepo: TenantConfigRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async execute(payrollId: string): Promise<Payroll> {
    const payroll = await this.payrollRepository.findById(payrollId);
    if (!payroll) {
      throw new EntityNotFoundException('Payroll', payrollId);
    }

    if (payroll.status === PayrollStatus.PAID) {
        this.logger.warn(`Payroll ${payrollId} already stamped/paid`);
        return payroll;
    }

    const tenantConfig = await this.tenantConfigRepo.getFiscalConfig(payroll.tenantId);
    if (!tenantConfig.csdKey || !tenantConfig.csdCertificate) {
        throw new Error('Tenant fiscal configuration missing CSD credentials');
    }

    // Stamp via Fiscal Port
    const stamp = await this.fiscalStampingPort.stamp(payroll, tenantConfig);

    // Update Payroll
    payroll.fiscalUuid = stamp.uuid;
    payroll.xmlContent = stamp.xml;
    payroll.stampedAt = stamp.stampedAt;
    payroll.status = PayrollStatus.PAID;

    await this.payrollRepository.save(payroll);

    // 1. Emit internal domain event
    this.eventEmitter.emit(
        'payroll.stamped',
        new PayrollStampedEvent(
            payroll.id,
            payroll.tenantId,
            Number(payroll.netPay),
            Number(payroll.totalDeductions),
            new Date()
        )
    );

    // 2. Emit versioned integration event for other domains (e.g., Accounting)
    const integrationPayload: PayrollStampedV1EventDto = {
        payrollId: payroll.id,
        tenantId: payroll.tenantId,
        netAmount: Number(payroll.netPay),
        taxAmount: Number(payroll.totalDeductions), // Standardizing taxes/deductions for integration
        stampedAt: payroll.stampedAt?.toISOString() || new Date().toISOString()
    };

    this.eventEmitter.emit(
        ACCOUNTING_INTEGRATION_EVENTS.PAYROLL_STAMPED_V1,
        integrationPayload
    );

    return payroll;
  }
}
