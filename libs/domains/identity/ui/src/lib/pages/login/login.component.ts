import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent, InputComponent } from '@virteex/shared-ui';
import { CountrySelectorComponent } from '../../components/country-selector/country-selector.component';
import { IntentDetectionService, ContextAnalysis } from '../../services/intent-detection.service';

@Component({
  selector: 'virteex-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent, CountrySelectorComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private intentService = inject(IntentDetectionService);

  loginForm: FormGroup;
  mfaForm: FormGroup;
  loading = false;
  errorMsg = '';
  country = 'CO';

  mfaRequired = false;
  tempToken = '';
  contextAnalysis: ContextAnalysis | null = null;

  constructor() {
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
    const names: Record<string, string> = { 'CO': 'Colombia', 'MX': 'México', 'US': 'USA', 'BR': 'Brasil' };
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
              error: () => {
                  this.loading = false;
                  this.errorMsg = 'Código inválido.';
              }
          });
      }
  }
}
