import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AccountingService } from '../services/accounting.service';
import { accountsState, entriesState, reportsState } from '../state/accounting.state';

export function useAccounting() {
  const service = inject(AccountingService);

  async function loadAccounts() {
    accountsState.update(s => ({ ...s, isLoading: true, error: null }));
    try {
      const accounts = await firstValueFrom(service.getAccounts());
      accountsState.update(s => ({ ...s, items: accounts || [], isLoading: false }));
    } catch (e) {
      accountsState.update(s => ({ ...s, error: (e as Error).message, isLoading: false }));
    }
  }

  async function loadJournalEntries() {
    entriesState.update(s => ({ ...s, isLoading: true, error: null }));
    try {
      const entries = await firstValueFrom(service.getJournalEntries());
      entriesState.update(s => ({ ...s, items: entries || [], isLoading: false }));
    } catch (e) {
      accountsState.update(s => ({ ...s, error: (e as Error).message, isLoading: false }));
    }
  }

  async function generateReport(type: string, endDate: string, dimensions?: Record<string, string>) {
    reportsState.update(s => ({ ...s, isLoading: true, error: null }));
    try {
      const report = await firstValueFrom(service.getFinancialReport(type, endDate, dimensions));
      reportsState.update(s => ({ ...s, data: report, isLoading: false }));
    } catch (e) {
      reportsState.update(s => ({ ...s, error: (e as Error).message, isLoading: false }));
    }
  }

  return {
    loadAccounts,
    loadJournalEntries,
    generateReport,
  };
}
