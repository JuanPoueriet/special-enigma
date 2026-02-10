import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalOptions } from '@virteex/shared-ui/src/lib/services/modal.interface';
import { UiModalComponent } from '@virteex/shared-ui/src/lib/components/ui/modal';

@Component({
  selector: 'virteex-modal',
  standalone: true,
  imports: [CommonModule, UiModalComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() options!: ModalOptions;
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onCloseModal = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }

  close() {
    this.onCloseModal.emit();
  }
}
