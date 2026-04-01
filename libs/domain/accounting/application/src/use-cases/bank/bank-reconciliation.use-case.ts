import {
  type JournalEntryRepository,
  type BankReconciliationRepository,
  BankReconciliation,
  BankStatementLine,
  BankReconciliationStatus
} from '@virteex/domain-accounting-domain';
import { Decimal } from 'decimal.js';

export interface BankStatementLineInput {
  date: string | Date;
  description: string;
  amount: string;
  reference: string;
}

export interface MatchingRules {
  dateToleranceDays: number;
  fuzzyAmountMatch: boolean;
}

export class BankReconciliationUseCase {
  constructor(
    private journalEntryRepository: JournalEntryRepository,
    private bankReconciliationRepository: BankReconciliationRepository
  ) {}

  async execute(
    tenantId: string,
    accountId: string,
    statementLines: BankStatementLineInput[],
    rules: MatchingRules = { dateToleranceDays: 3, fuzzyAmountMatch: false }
  ): Promise<BankReconciliation> {
    console.log(`[BANK] Starting robust reconciliation for account ${accountId} in tenant ${tenantId}`);

    const reconciliation = new BankReconciliation(tenantId, accountId, new Date());
    const entries = await this.journalEntryRepository.findAll(tenantId);
    const matchedEntryIds = new Set<string>();

    let matchedCount = 0;
    let unmatchedCount = 0;

    for (const lineInput of statementLines) {
      const lineAmount = new Decimal(lineInput.amount);
      const statementLineDate = new Date(lineInput.date);
      const statementLine = new BankStatementLine(
        statementLineDate,
        lineInput.description,
        lineInput.amount,
        lineInput.reference
      );

      const match = entries.find(e => {
        if (matchedEntryIds.has(e.id)) return false;

        const entryDate = new Date(e.date);
        const diffInDays = Math.abs((entryDate.getTime() - statementLineDate.getTime()) / (1000 * 60 * 60 * 24));
        const isDateWithinTolerance = diffInDays <= (rules?.dateToleranceDays ?? 3);

        const hasSameAmount = e.lines.some(l => {
          const accountMatch = l.account.id === accountId;
          const entryAmount = new Decimal(l.debit).minus(new Decimal(l.credit));
          const amountMatch = rules?.fuzzyAmountMatch
            ? entryAmount.minus(lineAmount).abs().lessThanOrEqualTo(0.01)
            : entryAmount.equals(lineAmount);
          return accountMatch && amountMatch;
        });

        return isDateWithinTolerance && hasSameAmount;
      });

      if (match) {
        matchedEntryIds.add(match.id);
        statementLine.match(match.id);
        matchedCount++;
        console.log(`[BANK] Matched statement line ${lineInput.reference} with entry ${match.id}`);
      } else {
        unmatchedCount++;
        console.warn(`[BANK] No match found for statement line ${lineInput.reference}`);
      }

      reconciliation.addLine(statementLine);
    }

    reconciliation.matchedEntriesCount = matchedCount;
    reconciliation.unmatchedEntriesCount = unmatchedCount;

    if (unmatchedCount === 0 && statementLines.length > 0) {
      reconciliation.complete('system');
    } else {
      reconciliation.status = BankReconciliationStatus.IN_PROGRESS;
    }

    return this.bankReconciliationRepository.save(reconciliation);
  }
}
