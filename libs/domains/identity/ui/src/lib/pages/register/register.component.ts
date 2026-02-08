import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent, InputComponent } from '@virteex-erp/shared-ui';
import { CountrySelectorComponent } from '../../components/country-selector/country-selector.component';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent, CountrySelectorComponent],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Registro Empresarial - {{ getCountryName() }}</h2>
        <lib-country-selector (countrySelected)="onCountrySelected($event)"></lib-country-selector>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <!-- Personal Info -->
          <h3>Información Personal</h3>
          <lib-input label="Nombre" formControlName="firstName"></lib-input>
          <lib-input label="Apellido" formControlName="lastName"></lib-input>
          <lib-input label="Email Corporativo" formControlName="email" type="email"></lib-input>

          <!-- Company Info -->
          <h3>Información de la Empresa</h3>
          <lib-input label="Nombre de la Empresa" formControlName="companyName"></lib-input>

          <lib-input
            [label]="getTaxIdLabel()"
            formControlName="taxId"
            [placeholder]="getTaxIdPlaceholder()"
          ></lib-input>

          <!-- Security -->
          <h3>Seguridad</h3>
          <lib-input label="Contraseña" type="password" formControlName="password"></lib-input>
          <div class="password-hint">Mínimo 12 caracteres, mayúscula, número y símbolo.</div>

          <lib-button type="submit" [disabled]="registerForm.invalid || loading" class="full-width">
            {{ loading ? 'Registrando...' : 'Crear Cuenta' }}
          </lib-button>
        </form>

        <div *ngIf="errorMsg" class="error-banner">
          {{ errorMsg }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      padding: 40px 20px;
      background-color: #f4f5f7;
      min-height: 100vh;
    }
    .register-card {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 600px;
    }
    h2, h3 {
      color: #172B4D;
      margin-bottom: 16px;
    }
    h3 {
      margin-top: 24px;
      font-size: 1.1rem;
      border-bottom: 1px solid #DFE1E6;
      padding-bottom: 8px;
    }
    .password-hint {
      font-size: 0.75rem;
      color: #6B778C;
      margin-bottom: 16px;
    }
    .error-banner {
      margin-top: 16px;
      padding: 10px;
      background-color: #FFEBE6;
      color: #DE350B;
      border-radius: 4px;
      text-align: center;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMsg = '';
  country = 'CO';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      taxId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(12)]], // Simplified validation for UI
      country: ['CO']
    });
  }

  onCountrySelected(country: string) {
    this.country = country;
    this.registerForm.patchValue({ country });
    // Reset tax ID validation/placeholder based on country logic if needed
  }

  getCountryName(): string {
    const names: any = { 'CO': 'Colombia', 'MX': 'México', 'US': 'USA', 'BR': 'Brasil' };
    return names[this.country] || this.country;
  }

  getTaxIdLabel(): string {
    switch (this.country) {
      case 'CO': return 'NIT';
      case 'MX': return 'RFC';
      case 'US': return 'EIN';
      case 'BR': return 'CNPJ';
      default: return 'Tax ID';
    }
  }

  getTaxIdPlaceholder(): string {
    switch (this.country) {
      case 'CO': return '900.123.456-7';
      case 'MX': return 'ABC123456...';
      default: return '';
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('Register success', res);
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = 'Error en el registro. Verifique los datos.';
        }
      });
    }
  }
}
