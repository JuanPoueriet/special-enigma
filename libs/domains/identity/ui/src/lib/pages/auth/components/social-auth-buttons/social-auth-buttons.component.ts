import { Component, EventEmitter, Output } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-social-auth-buttons',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './social-auth-buttons.component.html',
  styleUrls: ['./social-auth-buttons.component.scss']
})
export class SocialAuthButtonsComponent {
  @Output() onLogin = new EventEmitter<string>();

  loginWith(provider: string) {
    this.onLogin.emit(provider);
  }
}
