import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LanguageSelector } from '@virtex/shared-ui';

@Component({
  selector: 'virtex-auth-footer',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    LucideAngularModule,
    LanguageSelector
  ],
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss']
})
export class AuthFooterComponent {
  readonly currentYear = new Date().getFullYear();
}
