export interface FinancialReportLineDto {
  accountName: string;
  accountCode: string;
  balance: string;
  previousBalance?: string;
  percentageChange?: number;
  isHeader?: boolean;
  level?: number;
  transactionIds?: string[];
}

export interface FinancialReportDto {
  tenantId: string;
  type: 'BALANCE_SHEET' | 'PROFIT_AND_LOSS' | 'TRIAL_BALANCE' | 'CASH_FLOW';
  generatedAt: string;
  endDate: string;
  previousEndDate?: string;
  lines: FinancialReportLineDto[];
  dimensions?: Record<string, string>;
  totalBalance: string;
}

