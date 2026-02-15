import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, PlusCircle, MoreHorizontal, FileDown, CheckCircle, CheckSquare } from 'lucide-angular';
import { CrmService } from '../../../core/services/crm.service';
import { Sale } from '../../../core/models/sale.model';

@Component({
  selector: 'virteex-history-page',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPage implements OnInit {
  protected readonly PlusCircleIcon = PlusCircle;
  protected readonly MoreHorizontalIcon = MoreHorizontal;
  protected readonly FileDownIcon = FileDown;
  protected readonly CheckCircleIcon = CheckCircle;
  protected readonly CheckSquareIcon = CheckSquare;

  private readonly crmService = inject(CrmService);

  sales = signal<Sale[]>([]);

  ngOnInit() {
    this.loadSales();
  }

  loadSales() {
    this.crmService.getSales().subscribe({
      next: (sales) => this.sales.set(sales),
      error: (err) => console.error('Error loading sales', err)
    });
  }

  approveSale(id: string) {
    this.crmService.approveSale(id).subscribe({
      next: () => this.loadSales(),
      error: (err) => console.error('Error approving sale', err)
    });
  }

  completeSale(id: string) {
    this.crmService.completeSale(id).subscribe({
      next: () => this.loadSales(),
      error: (err) => console.error('Error completing sale', err)
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'status-completed';
      case 'APPROVED': return 'status-approved';
      case 'DRAFT': return 'status-draft';
      case 'NEGOTIATION': return 'status-pending';
      case 'CANCELLED': return 'status-cancelled';
      default: return 'status-pending';
    }
  }
}
