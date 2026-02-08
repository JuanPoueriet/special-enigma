import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent, InputComponent } from '@virteex-erp/shared-ui';
import { CountrySelectorComponent } from '../../components/country-selector/country-selector.component';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent, CountrySelectorComponent],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Iniciar Sesión</h2>
        <lib-country-selector (countrySelected)="onCountrySelected($event)"></lib-country-selector>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <lib-input
            label="Correo electrónico"
            formControlName="email"
            placeholder="nombre@empresa.com"
            [error]="getError('email')"
          ></lib-input>

          <lib-input
            label="Contraseña"
            type="password"
            formControlName="password"
            placeholder="******"
            [error]="getError('password')"
          ></lib-input>

          <lib-button type="submit" [disabled]="loginForm.invalid || loading" class="full-width">
            {{ loading ? 'Ingresando...' : 'Iniciar Sesión' }}
          </lib-button>
        </form>

        <div *ngIf="errorMsg" class="error-banner">
          {{ errorMsg }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f4f5f7;
    }
    .login-card {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    h2 {
      margin-bottom: 24px;
      text-align: center;
      color: #172B4D;
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
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';
  country = 'CO';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onCountrySelected(country: string) {
    this.country = country;
  }

  getError(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Este campo es requerido';
      if (control.errors['email']) return 'Email inválido';
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          // Handle success (store token, redirect)
          console.log('Login success', res);
          // Assuming token storage handled elsewhere or here
          localStorage.setItem('access_token', res.accessToken);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMsg = 'Credenciales inválidas o error de conexión.';
        }
      });
    }
  }
}
