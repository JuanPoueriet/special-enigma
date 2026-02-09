import { Component, inject } from '@angular/core';

import { LanguageService } from '../../../core/services/language';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [],
  templateUrl: './language-selector.html',
  styleUrls: ['./language-selector.scss']
})
export class LanguageSelector {
  languageService = inject(LanguageService);
}