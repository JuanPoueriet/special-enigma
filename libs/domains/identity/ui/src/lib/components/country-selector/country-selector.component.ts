import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-country-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="country-selector">
      <label>País de operación principal:</label>
      <select [(ngModel)]="selectedCountry" (change)="onCountryChange()">
        <option value="CO">🇨🇴 Colombia</option>
        <option value="MX">🇲🇽 México</option>
        <option value="US">🇺🇸 Estados Unidos</option>
        <option value="BR">🇧🇷 Brasil</option>
      </select>

      <div *ngIf="contextDetected" class="context-alert">
        Detectamos que estás en {{ detectedCountry }}. ¿Deseas cambiar?
      </div>
    </div>
  `,
  styles: [`
    .country-selector {
      margin-bottom: 20px;
      padding: 15px;
      background: #f4f5f7;
      border-radius: 4px;
    }
    select {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
    }
    .context-alert {
      margin-top: 10px;
      color: #0052cc;
      font-size: 0.9em;
    }
  `]
})
export class CountrySelectorComponent {
  @Output() countrySelected = new EventEmitter<string>();

  selectedCountry = 'CO';
  detectedCountry = 'CO';
  contextDetected = false;

  constructor() {
    // Mock context detection logic described in the prompt
    this.detectContext();
  }

  detectContext() {
    // In real app, this would check IP, URL, etc.
    // For now, mock it.
    this.contextDetected = false;
    this.countrySelected.emit(this.selectedCountry);
  }

  onCountryChange() {
    this.countrySelected.emit(this.selectedCountry);
  }
}
