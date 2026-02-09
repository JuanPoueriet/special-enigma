import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'virteex-phone-verification-modal',
  standalone: true,
  imports: [CommonModule],
  template: '<div>Phone Verification Modal</div>'
})
export class PhoneVerificationModalComponent {
  @Input() isOpen = false;
}
