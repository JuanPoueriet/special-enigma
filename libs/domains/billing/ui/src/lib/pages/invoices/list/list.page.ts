import { Component, ChangeDetectionStrategy, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, PlusCircle, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-angular';
import { InvoicesService, Invoice } from '../../../core/services/invoices';
import { NotificationService } from '../../../core/services/notification';

@Component({
  selector: 'virteex-invoices-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicesListPage implements OnInit {
  protected readonly PlusCircleIcon = PlusCircle;
  protected readonly FilterIcon = Filter;
  protected readonly MoreHorizontalIcon = MoreHorizontal;
  protected readonly ChevronLeftIcon = ChevronLeft;
  protected readonly ChevronRightIcon = ChevronRight;

  private invoicesService = inject(InvoicesService);
  private notificationService = inject(NotificationService);

  invoices = signal<Invoice[]>([]);
  totalItems = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  isLoading = signal(true);
  error = signal<string | null>(null);

  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.invoicesService.getInvoices(this.currentPage(), this.pageSize()).subscribe({
      next: (data) => {
        this.invoices.set(data.items);
        this.totalItems.set(data.total);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Could not load invoices. Please try again later.');
        this.notificationService.showError(this.error()!);
        this.isLoading.set(false);
      },
    });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      this.loadInvoices();
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.loadInvoices();
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Paid': return 'status-paid';
      case 'Pending': return 'status-pending';
      case 'Void': return 'status-overdue';
      default: return 'status-pending';
    }
  }
}
