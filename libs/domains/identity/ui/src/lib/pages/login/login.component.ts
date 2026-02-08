import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent, InputComponent } from '@virteex-erp/shared-ui';
import { CountrySelectorComponent } from '../../components/country-selector/country-selector.component';
import { IntentDetectionService, ContextAnalysis } from '../../services/intent-detection.service';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent, CountrySelectorComponent],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>{{ mfaRequired ? 'Verificación de Seguridad' : 'Iniciar Sesión' }}</h2>

        <!-- Context Warning (Only on initial login) -->
        <div *ngIf="!mfaRequired && contextAnalysis?.discrepancyLevel !== 'none'" class="context-banner" [class.warning]="contextAnalysis?.discrepancyLevel === 'low'" [class.danger]="contextAnalysis?.discrepancyLevel === 'high'">
          ⚠️ Accediendo desde {{ getCountryName(contextAnalysis?.detectedCountry) }} a cuenta {{ getCountryName(country) }}.
        </div>

        <div *ngIf="!mfaRequired">
            <lib-country-selector (countrySelected)="onCountrySelected($event)"></lib-country-selector>

            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <lib-input
                label="Correo electrónico"
                formControlName="email"
                placeholder="nombre@empresa.com"
            ></lib-input>

            <lib-input
                label="Contraseña"
                type="password"
                formControlName="password"
                placeholder="******"
            ></lib-input>

            <lib-button type="submit" [disabled]="loginForm.invalid || loading" class="full-width">
                {{ loading ? 'Verificando...' : 'Iniciar Sesión' }}
            </lib-button>
            </form>
        </div>

        <div *ngIf="mfaRequired">
            <p class="mfa-instruction">Hemos detectado un intento de acceso inusual o su cuenta requiere verificación adicional. Ingrese el código enviado a su dispositivo.</p>
            <form [formGroup]="mfaForm" (ngSubmit)="onMfaSubmit()">
                <lib-input
                    label="Código de Verificación"
                    formControlName="code"
                    placeholder="123456"
                ></lib-input>

                <lib-button type="submit" [disabled]="mfaForm.invalid || loading" class="full-width">
                    {{ loading ? 'Verificando...' : 'Confirmar Código' }}
                </lib-button>
            </form>
        </div>

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
    .context-banner {
      padding: 10px;
      margin-bottom: 15px;
      border-radius: 4px;
      font-size: 0.9rem;
      background-color: #FFFAE6;
      color: #FF8B00;
    }
    .context-banner.danger {
      background-color: #FFEBE6;
      color: #DE350B;
    }
    .mfa-instruction {
        font-size: 0.9rem;
        color: #42526E;
        margin-bottom: 20px;
        text-align: center;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  mfaForm: FormGroup;
  loading = false;
  errorMsg = '';
  country = 'CO';

  mfaRequired = false;
  tempToken = '';
  contextAnalysis: ContextAnalysis | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private intentService: IntentDetectionService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.mfaForm = this.fb.group({
        code: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onCountrySelected(country: string) {
    this.country = country;
    this.contextAnalysis = this.intentService.analyzeContext(country);
  }

  getCountryName(code: string = this.country): string {
    if (!code) return '';
    const names: any = { 'CO': 'Colombia', 'MX': 'México', 'US': 'USA', 'BR': 'Brasil' };
    return names[code] || code;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.mfaRequired && res.tempToken) {
              this.mfaRequired = true;
              this.tempToken = res.tempToken;
              this.loading = false;
          } else if (res.accessToken) {
            localStorage.setItem('access_token', res.accessToken);
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          this.loading = false;
          // Handle specific error codes if available (e.g. Account Locked)
          if (err.status === 403) {
             this.errorMsg = 'Cuenta bloqueada o acceso denegado.';
          } else {
             this.errorMsg = 'Credenciales inválidas o error de conexión.';
          }
        }
      });
    }
  }

  onMfaSubmit() {
      if (this.mfaForm.valid) {
          this.loading = true;
          this.errorMsg = '';
          this.authService.verifyMfa({
              tempToken: this.tempToken,
              code: this.mfaForm.value.code
          }).subscribe({
              next: (res) => {
                  if (res.accessToken) {
                      localStorage.setItem('access_token', res.accessToken);
                      this.router.navigate(['/']);
                  }
              },
              error: (err) => {
                  this.loading = false;
                  this.errorMsg = 'Código inválido.';
              }
          });
      }
  }
}
