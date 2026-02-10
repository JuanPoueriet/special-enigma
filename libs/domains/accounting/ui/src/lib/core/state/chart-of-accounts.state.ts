import { Injectable, inject, signal } from '@angular/core';
import { ChartOfAccountsApiService } from '../api/chart-of-accounts.service';
import { Account } from '../models/account.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChartOfAccountsStateService {
  private api = inject(ChartOfAccountsApiService);

  accounts = signal<Account[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.refreshAccounts();
  }

  refreshAccounts(): void {
    this.isLoading.set(true);
    this.api
      .getAccounts()
      .pipe(tap(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => this.accounts.set(data),
        error: (err) => {
          this.error.set(err.message);
          this.isLoading.set(false);
        },
      });
  }
}
