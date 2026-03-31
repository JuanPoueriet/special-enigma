import { type JournalEntryRepository, type AccountRepository, JournalEntry, JournalEntryLine, JournalEntryType } from '@virteex/domain-accounting-domain';
import { Decimal } from 'decimal.js';

export class ConsolidateAccountsUseCase {
  constructor(
    private journalEntryRepository: JournalEntryRepository,
    private accountRepository: AccountRepository
  ) {}

  /**
   * Consolidates balances from multiple source tenants into a target consolidation tenant.
   * @param targetTenantId The tenant where consolidated entries will be recorded.
   * @param sourceTenantIds List of tenants to consolidate.
   * @param asOfDate Date up to which balances should be consolidated.
   */
  async execute(targetTenantId: string, sourceTenantIds: string[], asOfDate: Date): Promise<void> {
    const startTime = Date.now();
    console.log(`[SLO] Starting consolidation for target tenant ${targetTenantId} at ${new Date().toISOString()}`);

    // Fetch target accounts once to optimize lookups
    const targetAccounts = await this.accountRepository.findAll(targetTenantId);
    const targetAccountsByCode = new Map(targetAccounts.map(a => [a.code, a]));

    for (const sourceTenantId of sourceTenantIds) {
      const balances = await this.journalEntryRepository.getBalancesByAccount(sourceTenantId, undefined, asOfDate);
      const sourceAccounts = await this.accountRepository.findAll(sourceTenantId);
      const sourceAccountsById = new Map(sourceAccounts.map(a => [a.id, a]));

      const entry = new JournalEntry(
        targetTenantId,
        `Consolidation from ${sourceTenantId} as of ${asOfDate.toISOString().split('T')[0]}`,
        asOfDate
      );
      entry.type = JournalEntryType.CONSOLIDATION;

      let totalDebit = new Decimal(0);
      let totalCredit = new Decimal(0);

      for (const [accountId, balance] of balances.entries()) {
        const account = sourceAccountsById.get(accountId);
        if (!account) continue;

        // In a real scenario, we would map source accounts to consolidation accounts.
        // For this implementation, we assume a 1:1 mapping or use the same code if it exists in target.
        let targetAccount = targetAccountsByCode.get(account.code);

        if (!targetAccount) {
            // Log missing account mapping
            continue;
        }

        if (new Decimal(balance.debit).gt(0) || new Decimal(balance.credit).gt(0)) {
            entry.addLine(new JournalEntryLine(targetAccount, balance.debit, balance.credit));
            totalDebit = totalDebit.plus(new Decimal(balance.debit));
            totalCredit = totalCredit.plus(new Decimal(balance.credit));
        }
      }

      if (entry.lines.length > 0) {
        // Ensure balance (in a real scenario, eliminations might be needed)
        const diff = totalDebit.minus(totalCredit);
        if (!diff.isZero()) {
            // Handle consolidation difference (e.g., to a specific adjustment account)
            // For now, we skip if unbalanced to avoid errors, or assume input is balanced.
        }

        entry.validateBalance();
        await this.journalEntryRepository.create(entry);
      }
    }

    const duration = Date.now() - startTime;
    console.log(`[SLO] Consolidation for target tenant ${targetTenantId} completed in ${duration}ms`);
  }
}
