import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [type]="type" [disabled]="disabled" (click)="onClick.emit($event)" [ngClass]="['btn', variant]">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-md);
      border: none;
      cursor: pointer;
      font-weight: 500;
    }
    .primary {
      background-color: var(--color-primary);
      color: white;
    }
    .secondary {
      background-color: var(--color-surface);
      color: var(--color-text-primary);
    }
    .full-width {
      width: 100%;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Output() onClick = new EventEmitter<Event>();
}
