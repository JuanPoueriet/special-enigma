export enum AccountType {
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY',
  EQUITY = 'EQUITY',
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE',
}

export enum AccountCategory {
  CURRENT = 'CURRENT',
  NON_CURRENT = 'NON_CURRENT',
}

export enum AccountNature {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum CashFlowCategory {
  OPERATING = 'OPERATING',
  INVESTING = 'INVESTING',
  FINANCING = 'FINANCING',
  NONE = 'NONE',
}

export type RequiredDimension = 'COST_CENTER' | 'PROJECT' | 'SEGMENT';

export interface Account {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  nature: AccountNature;
  category: AccountCategory;
  isPostable: boolean;
  isActive: boolean;
  parentId?: string;
  statementMapping?: {
    balanceSheetCategory?: string;
    incomeStatementCategory?: string;
    cashFlowCategory?: CashFlowCategory;
  };
  rules?: {
    requiresReconciliation?: boolean;
    isCashOrBank?: boolean;
    allowsIntercompany?: boolean;
    isFxRevaluation?: boolean;
    requiredDimensions?: RequiredDimension[];
  };
  advanced?: {
    version?: number;
    hierarchyType?: string;
    effectiveFrom?: string;
    effectiveTo?: string;
  };
}
