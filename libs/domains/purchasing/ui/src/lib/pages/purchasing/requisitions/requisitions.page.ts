import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, PlusCircle, Filter, MoreHorizontal } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RequisitionService, Requisition } from '../../../core/services/requisition.service';

@Component({
  selector: 'virteex-requisitions-page',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, TranslateModule],
  templateUrl: './requisitions.page.html',
  styleUrls: ['./requisitions.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequisitionsPage {
  protected readonly PlusCircleIcon = PlusCircle;
  protected readonly FilterIcon = Filter;
  protected readonly MoreHorizontalIcon = MoreHorizontal;

  private requisitionService = inject(RequisitionService);

  requisitions = toSignal(this.requisitionService.getRequisitions(), { initialValue: [] });

  getStatusClass(status: Requisition['status']): string {
    switch(status) {
      case 'Approved': return 'status-approved';
      case 'Pending Approval': return 'status-pending';
      case 'Rejected': return 'status-rejected';
      default: return 'status-draft';
    }
  }
}
