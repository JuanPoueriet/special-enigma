import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TreasuryService } from '../../services/treasury.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'virteex-treasury-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private treasuryService = inject(TreasuryService);

  accountCount$: Observable<number> = this.treasuryService.getBankAccounts().pipe(
    map(accounts => accounts.length)
  );
}
