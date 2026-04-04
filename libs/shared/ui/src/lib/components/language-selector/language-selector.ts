import { Component, inject, HostListener, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language';
import { LucideAngularModule, Globe, ChevronDown, Check } from 'lucide-angular';

@Component({
  selector: 'virtex-language-selector',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './language-selector.html',
  styleUrls: ['./language-selector.scss']
})
export class LanguageSelector {
  @Input() position: 'top' | 'bottom' = 'bottom';

  languageService = inject(LanguageService);
  private elementRef = inject(ElementRef);

  isLangDropdownOpen = false;

  readonly icons = {
    Globe,
    ChevronDown,
    Check
  };

  readonly availableLanguages = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' }
  ];

  get currentLang() {
    return this.languageService.currentLang();
  }

  get currentLangLabel() {
    return this.availableLanguages.find(l => l.code === this.currentLang)?.label || 'Español';
  }

  toggleLangDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
  }

  changeLang(langCode: string) {
    this.languageService.setLanguage(langCode);
    this.isLangDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isLangDropdownOpen = false;
    }
  }
}
