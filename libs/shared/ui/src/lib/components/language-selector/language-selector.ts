import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language';

@Component({
  selector: 'virtex-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.html',
  styleUrls: ['./language-selector.scss']
})
export class LanguageSelector {
  languageService = inject(LanguageService);
}