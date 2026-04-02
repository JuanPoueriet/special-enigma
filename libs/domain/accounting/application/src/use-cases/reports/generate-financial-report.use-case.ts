import {
  type JournalEntryRepository,
  type AccountRepository,
  type AccountsPayableRepository,
  type AccountsReceivableRepository,
  type FinancialReportSnapshotRepository,
  FinancialReportSnapshot,
  AccountType,
} from '@virtex/domain-accounting-domain';
import { Decimal } from 'decimal.js';

export interface FinancialReport {
  tenantId: string;
  type:
    | 'BALANCE_SHEET'
    | 'PROFIT_AND_LOSS'
    | 'TRIAL_BALANCE'
    | 'CASH_FLOW'
    | 'AP_AGING'
    | 'AR_AGING';
  generatedAt: Date;
  endDate: Date;
  previousEndDate?: Date;
  lines: FinancialReportLine[];
  dimensions?: Record<string, string>;
  totalBalance: string;
  version?: number;
}

export interface FinancialReportLine {
  accountId?: string;
  accountName: string;
  accountCode: string;
  balance: string;
  previousBalance?: string;
  percentageChange?: number;
  isHeader?: boolean;
  level?: number;
  transactionIds?: string[];
}

export class GenerateFinancialReportUseCase {
  constructor(
    private journalEntryRepository: JournalEntryRepository,
    private accountRepository: AccountRepository,
    private apRepository?: AccountsPayableRepository,
    private arRepository?: AccountsReceivableRepository,
    private snapshotRepository?: FinancialReportSnapshotRepository
  ) {}

  async execute(
    tenantId: string,
    type:
      | 'BALANCE_SHEET'
      | 'PROFIT_AND_LOSS'
      | 'TRIAL_BALANCE'
      | 'CASH_FLOW'
      | 'AP_AGING'
      | 'AR_AGING',
    endDate: Date,
    dimensions?: Record<string, string>,
    saveSnapshot: boolean = false,
    userId: string = 'system'
  ): Promise<FinancialReport> {
    const startTime = Date.now();
    console.log(
      `[SLO] Starting financial report generation for tenant ${tenantId}, type ${type} as of ${endDate.toISOString()}`,
    );

    let report: FinancialReport;

    if (type === 'AP_AGING' && this.apRepository) {
      const aging = await this.apRepository.getAgingReport(tenantId, endDate);
      report = this.formatAgingReport(tenantId, 'AP_AGING', endDate, aging);
    } else if (type === 'AR_AGING' && this.arRepository) {
      const aging = await this.arRepository.getAgingReport(tenantId, endDate);
      report = this.formatAgingReport(tenantId, 'AR_AGING', endDate, aging);
    } else if (type === 'CASH_FLOW') {
      report = await this.generateCashFlowReport(tenantId, endDate, dimensions);
    } else {
      report = await this.generateStandardReport(tenantId, type as any, endDate, dimensions);
    }

    if (saveSnapshot && this.snapshotRepository) {
      const latest = await this.snapshotRepository.findLatest(tenantId, type, endDate);
      const version = latest ? latest.version + 1 : 1;
      const snapshot = new FinancialReportSnapshot(tenantId, type, endDate, report, version, userId);
      await this.snapshotRepository.create(snapshot);
      report.version = version;
    }

    const duration = Date.now() - startTime;
    console.log(
      `[SLO] Financial report generation for tenant ${tenantId} completed in ${duration}ms`,
    );

    return report;
  }

  async exportToCsv(report: FinancialReport): Promise<string> {
    const headers = [
      'Account Code',
      'Account Name',
      'Balance',
      'Previous Balance',
      'Change %',
    ];

    const escapeCsv = (val: string) => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };

    const rows = report.lines.map((line) => [
      escapeCsv(line.accountCode),
      escapeCsv(line.accountName),
      escapeCsv(line.balance),
      escapeCsv(line.previousBalance || '0.00'),
      escapeCsv(
        line.percentageChange !== undefined ? `${line.percentageChange}%` : '0%',
      ),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    return csvContent;
  }

  private async generateCashFlowReport(
    tenantId: string,
    endDate: Date,
    dimensions?: Record<string, string>
  ): Promise<FinancialReport> {
    const reportLines: FinancialReportLine[] = [];
    const accounts = await this.accountRepository.findAll(tenantId);
    const cashAccounts = accounts.filter(a => a.type === AccountType.ASSET && (a.name.toLowerCase().includes('cash') || a.name.toLowerCase().includes('bank')));

    let totalCash = new Decimal(0);

    for (const account of cashAccounts) {
      const balances = await this.journalEntryRepository.getBalancesByAccount(tenantId, account.id, endDate, dimensions);
      const balance = balances.get(account.id) || { debit: '0', credit: '0' };
      const netBalance = new Decimal(balance.debit).minus(new Decimal(balance.credit));

      totalCash = totalCash.plus(netBalance);
      reportLines.push({
        accountId: account.id,
        accountName: account.name,
        accountCode: account.code,
        balance: netBalance.toFixed(2),
      });
    }

    return {
      tenantId,
      type: 'CASH_FLOW',
      generatedAt: new Date(),
      endDate,
      lines: reportLines,
      dimensions,
      totalBalance: totalCash.toFixed(2),
    };
  }

  private async generateStandardReport(
    tenantId: string,
    type: 'BALANCE_SHEET' | 'PROFIT_AND_LOSS' | 'TRIAL_BALANCE',
    endDate: Date,
    dimensions?: Record<string, string>
  ): Promise<FinancialReport> {
    const previousEndDate = new Date(endDate);
    previousEndDate.setFullYear(previousEndDate.getFullYear() - 1);

    const balances = await this.journalEntryRepository.getBalancesByAccount(
      tenantId,
      undefined,
      endDate,
      dimensions,
    );
    const previousBalances =
      await this.journalEntryRepository.getBalancesByAccount(
        tenantId,
        undefined,
        previousEndDate,
        dimensions,
      );

    const reportLines: FinancialReportLine[] = [];
    const accounts = await this.accountRepository.findAll(tenantId);
    let totalBalance = new Decimal(0);

    // Hierarchical sort by code
    const sortedAccounts = accounts.sort((a, b) =>
      a.code.localeCompare(b.code),
    );

    // Fetch relevant journal entries for drill-down (optimized query)
    const entries = await this.journalEntryRepository.findByAccountIdsAndDateRange(
      tenantId,
      sortedAccounts.map(a => a.id),
      undefined,
      endDate
    );

    for (const account of sortedAccounts) {
      const balance = balances.get(account.id) || { debit: '0', credit: '0' };
      const prevBalance = previousBalances.get(account.id) || {
        debit: '0',
        credit: '0',
      };

      const netBalance = new Decimal(balance.debit).minus(
        new Decimal(balance.credit),
      );
      const netPrevBalance = new Decimal(prevBalance.debit).minus(
        new Decimal(prevBalance.credit),
      );

      const isIncomeOrExpense =
        account.type === AccountType.REVENUE ||
        account.type === AccountType.EXPENSE;
      let include = false;

      if (type === 'PROFIT_AND_LOSS' && isIncomeOrExpense) include = true;
      else if (type === 'BALANCE_SHEET' && !isIncomeOrExpense) include = true;
      else if (type === 'TRIAL_BALANCE') include = true;

      if (include) {
        totalBalance = totalBalance.plus(netBalance);

        let percentageChange = 0;
        if (!netPrevBalance.isZero()) {
          percentageChange = netBalance
            .minus(netPrevBalance)
            .div(netPrevBalance.abs())
            .mul(100)
            .toNumber();
        }

        const accountEntries = entries.filter(e =>
          e.date <= endDate &&
          e.lines.some(l => l.account.id === account.id)
        );
        const transactionIds = accountEntries.map(e => e.id);

        reportLines.push({
          accountId: account.id,
          accountName: account.name,
          accountCode: account.code,
          balance: netBalance.toFixed(2),
          previousBalance: netPrevBalance.toFixed(2),
          percentageChange: Math.round(percentageChange * 100) / 100,
          level: account.code.split('.').length,
          transactionIds: transactionIds.length > 0 ? transactionIds : undefined
        });
      }
    }

    return {
      tenantId,
      type,
      generatedAt: new Date(),
      endDate,
      previousEndDate,
      lines: reportLines,
      dimensions,
      totalBalance: totalBalance.toFixed(2),
    };
  }

  private formatAgingReport(
    tenantId: string,
    type: 'AP_AGING' | 'AR_AGING',
    endDate: Date,
    aging: any,
  ): FinancialReport {
    const reportLines: FinancialReportLine[] = Object.entries(aging).map(
      ([bucket, balance]) => ({
        accountName: bucket,
        accountCode: bucket,
        balance: balance as string,
      }),
    );

    const total = reportLines.reduce(
      (acc, line) => acc.plus(new Decimal(line.balance)),
      new Decimal(0),
    );

    return {
      tenantId,
      type,
      generatedAt: new Date(),
      endDate,
      lines: reportLines,
      totalBalance: total.toFixed(2),
    };
  }
}
