import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent, InputComponent } from '@virteex/shared-ui';
import { CountrySelectorComponent } from '../../components/country-selector/country-selector.component';
import { IntentDetectionService } from '../../services/intent-detection.service';

@Component({
  selector: 'virteex-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, InputComponent, CountrySelectorComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private intentService = inject(IntentDetectionService);

  loginForm: FormGroup;
  mfaForm: FormGroup;
  loading = false;
  errorMsg = '';
  country = 'CO';
  lang = 'es';

  mfaRequired = false;
  tempToken = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.mfaForm = this.fb.group({
        code: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
          this.lang = params.get('lang') || 'es';
          const countryParam = params.get('country');

          if (countryParam) {
              this.country = countryParam.toUpperCase();
          } else {
              // Auto detect default
              this.intentService.analyzeContext('').subscribe(analysis => {
                  if (analysis.detectedCountry) {
                      this.country = analysis.detectedCountry;
                  }
              });
          }
      });
  }

  onCountrySelected(country: string) {
    this.country = country;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      const payload = { ...this.loginForm.value, country: this.country };

      this.authService.login(payload).subscribe({
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
