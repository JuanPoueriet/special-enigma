import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent, InputComponent } from '@virteex-erp/shared-ui';
import { CountrySelectorComponent } from '../../components/country-selector/country-selector.component';
import { IntentDetectionService, ContextAnalysis } from '../../services/intent-detection.service';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent, CountrySelectorComponent],
  template: `
    <div class="register-container">
      <div class="register-card">
        <!-- Progress Steps -->
        <div class="progress-steps">
          <div class="step" [class.active]="currentStep >= 1">1. País</div>
          <div class="step" [class.active]="currentStep >= 2">2. Personal</div>
          <div class="step" [class.active]="currentStep >= 3">3. Empresa</div>
          <div class="step" [class.active]="currentStep >= 4">4. Seguridad</div>
        </div>

        <h2>Registro Empresarial - {{ getCountryName() }}</h2>

        <!-- Context Warning Banner -->
        <div *ngIf="contextAnalysis?.discrepancyLevel !== 'none'" class="context-banner" [class.warning]="contextAnalysis?.discrepancyLevel === 'low'" [class.danger]="contextAnalysis?.discrepancyLevel === 'high'">
          ⚠️ Detectamos que estás en {{ getCountryName(contextAnalysis?.detectedCountry) }}. ¿Estás seguro de registrarte en {{ getCountryName(country) }}?
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">

          <!-- STEP 1: Country Selection -->
          <div *ngIf="currentStep === 1">
            <lib-country-selector (countrySelected)="onCountrySelected($event)"></lib-country-selector>
            <div class="step-actions">
              <lib-button (click)="nextStep()" [disabled]="!country">Continuar</lib-button>
            </div>
          </div>

          <!-- STEP 2: Personal Info -->
          <div *ngIf="currentStep === 2">
            <h3>Información Personal</h3>
            <lib-input label="Nombre" formControlName="firstName"></lib-input>
            <lib-input label="Apellido" formControlName="lastName"></lib-input>
            <lib-input label="Email Corporativo" formControlName="email" type="email"></lib-input>

            <div class="step-actions">
              <lib-button type="button" (click)="prevStep()" variant="secondary">Atrás</lib-button>
              <lib-button type="button" (click)="nextStep()" [disabled]="isStepInvalid(2)">Siguiente</lib-button>
            </div>
          </div>

          <!-- STEP 3: Company Info -->
          <div *ngIf="currentStep === 3">
            <h3>Información de la Empresa</h3>
            <lib-input label="Nombre de la Empresa" formControlName="companyName"></lib-input>

            <lib-input
              [label]="getTaxIdLabel()"
              formControlName="taxId"
              [placeholder]="getTaxIdPlaceholder()"
            ></lib-input>
            <div class="hint">{{ getTaxIdHint() }}</div>

            <div class="step-actions">
              <lib-button type="button" (click)="prevStep()" variant="secondary">Atrás</lib-button>
              <lib-button type="button" (click)="nextStep()" [disabled]="isStepInvalid(3)">Siguiente</lib-button>
            </div>
          </div>

          <!-- STEP 4: Security -->
          <div *ngIf="currentStep === 4">
            <h3>Seguridad</h3>
            <lib-input label="Contraseña" type="password" formControlName="password"></lib-input>
            <div class="password-hint">Mínimo 12 caracteres, mayúscula, número y símbolo.</div>

            <div class="step-actions">
              <lib-button type="button" (click)="prevStep()" variant="secondary">Atrás</lib-button>
              <lib-button type="submit" [disabled]="registerForm.invalid || loading" class="full-width">
                {{ loading ? 'Registrando...' : 'Crear Cuenta' }}
              </lib-button>
            </div>
          </div>

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
    .progress-steps {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    .step {
      font-size: 0.9rem;
      color: #ccc;
      font-weight: 500;
    }
    .step.active {
      color: #0052cc;
      font-weight: bold;
    }
    .step-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
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
    .password-hint, .hint {
      font-size: 0.75rem;
      color: #6B778C;
      margin-bottom: 16px;
      margin-top: -10px;
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
    }
    .context-banner.warning {
      background-color: #FFFAE6;
      color: #FF8B00;
    }
    .context-banner.danger {
      background-color: #FFEBE6;
      color: #DE350B;
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMsg = '';
  country = 'CO';
  currentStep = 1;
  contextAnalysis: ContextAnalysis | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private intentService: IntentDetectionService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      taxId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(12)]],
      country: ['CO']
    });
  }

  ngOnInit() {
    // Detect context from URL/IP
    // Assume URL param has country for demo logic or just default
    // this.route.paramMap.subscribe(...)

    this.contextAnalysis = this.intentService.analyzeContext(this.country);
    if (this.contextAnalysis.action === 'suggest') {
        // We could auto-switch or just show banner. Banner is shown in template.
    }
  }

  onCountrySelected(country: string) {
    this.country = country;
    this.registerForm.patchValue({ country });
    this.contextAnalysis = this.intentService.analyzeContext(country);
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  isStepInvalid(step: number): boolean {
    if (step === 2) {
      return this.registerForm.get('firstName')!.invalid ||
             this.registerForm.get('lastName')!.invalid ||
             this.registerForm.get('email')!.invalid;
    }
    if (step === 3) {
      return this.registerForm.get('companyName')!.invalid ||
             this.registerForm.get('taxId')!.invalid;
    }
    return false;
  }

  getCountryName(code: string = this.country): string {
    const names: any = { 'CO': 'Colombia', 'MX': 'México', 'US': 'USA', 'BR': 'Brasil' };
    return names[code] || code;
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
      case 'US': return '12-3456789';
      case 'BR': return '00.000.000/0001-91';
      default: return '';
    }
  }

  getTaxIdHint(): string {
      switch (this.country) {
          case 'CO': return 'Sin dígito de verificación si no lo conoce.';
          case 'MX': return '12 caracteres (Moral) o 13 (Física).';
          case 'US': return '9 dígitos.';
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
          this.errorMsg = 'Error en el registro. Verifique los datos o intente más tarde.';
        }
      });
    }
  }
}
