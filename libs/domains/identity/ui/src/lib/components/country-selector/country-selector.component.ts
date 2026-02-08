import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'virteex-country-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
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
