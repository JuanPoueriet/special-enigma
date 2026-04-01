import { BankReconciliation } from '../entities/bank-reconciliation.entity';

export interface BankReconciliationRepository {
    findAll(tenantId: string): Promise<BankReconciliation[]>;
    findById(tenantId: string, id: string): Promise<BankReconciliation | null>;
    save(reconciliation: BankReconciliation): Promise<BankReconciliation>;
}

export const BANK_RECONCILIATION_REPOSITORY = 'BANK_RECONCILIATION_REPOSITORY';
