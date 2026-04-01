import { FinancialReportSnapshot } from '../entities/financial-report-snapshot.entity';

export interface FinancialReportSnapshotRepository {
    create(snapshot: FinancialReportSnapshot): Promise<FinancialReportSnapshot>;
    findLatest(tenantId: string, type: string, endDate: Date): Promise<FinancialReportSnapshot | null>;
    findByTenant(tenantId: string): Promise<FinancialReportSnapshot[]>;
}

export const FINANCIAL_REPORT_SNAPSHOT_REPOSITORY = 'FINANCIAL_REPORT_SNAPSHOT_REPOSITORY';
