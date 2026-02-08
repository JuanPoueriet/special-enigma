import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent, InputComponent } from '@virteex/shared-ui';
import { CountrySelectorComponent, CountryInfo } from '../../components/country-selector/country-selector.component';
import { IntentDetectionService, ContextAnalysis } from '../../services/intent-detection.service';

@Component({
  selector: 'virteex-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent, CountrySelectorComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private intentService = inject(IntentDetectionService);

  registerForm: FormGroup;
  loading = false;
  errorMsg = '';
  country = 'CO';
  lang = 'es';
  currentStep = 1;
  contextAnalysis: ContextAnalysis | null = null;
  showDiscrepancyModal = false;

  constructor() {
    this.registerForm = this.fb.group({
      // Step 1: Personal Info
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['admin', Validators.required],

      // Step 2: Company Info
      companyName: ['', Validators.required],
      industry: ['', Validators.required],

      // Step 3: Tax Details
      country: ['CO', Validators.required],
      taxId: ['', Validators.required],
      regime: ['', Validators.required],

      // Step 4: Security
      password: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.lang = params.get('lang') || 'es';
        const countryParam = params.get('country');

        if (countryParam) {
            this.country = countryParam.toUpperCase();
            this.registerForm.patchValue({ country: this.country });
            this.checkContext(this.country);
            this.updateValidators(this.country);
        } else {
            // Auto detect if no param
             this.intentService.analyzeContext('').subscribe(analysis => {
                if (analysis.detectedCountry) {
                    this.onCountrySelected(analysis.detectedCountry);
                }
             });
        }
    });
  }

  checkContext(country: string) {
      this.intentService.analyzeContext(country).subscribe(analysis => {
          this.contextAnalysis = analysis;
          if (analysis.discrepancyLevel === 'medium' || analysis.discrepancyLevel === 'high') {
              this.showDiscrepancyModal = true;
          }
      });
  }

  onCountrySelected(country: string) {
    this.country = country;
    this.registerForm.patchValue({ country });
    this.updateValidators(country);
    // User manual selection overrides auto-detection for the form, but we might still warn if mismatch persists
    // However, if they manually select, we assume Intent > Location.
  }

  updateValidators(country: string) {
      const taxIdControl = this.registerForm.get('taxId');
      taxIdControl?.clearValidators();
      taxIdControl?.setValidators(Validators.required);

      if (country === 'CO') {
          // NIT: 9-10 digits
          taxIdControl?.addValidators(Validators.pattern(/^\d{9,10}$/));
      } else if (country === 'MX') {
          // RFC
          taxIdControl?.addValidators(Validators.pattern(/^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z\d]{2}$/));
      } else if (country === 'US') {
          // EIN or SSN
          taxIdControl?.addValidators(Validators.pattern(/^\d{2}-\d{7}$|^\d{3}-\d{2}-\d{4}$/));
      }

      taxIdControl?.updateValueAndValidity();
  }

  passwordMatchValidator(g: AbstractControl): ValidationErrors | null {
      return g.get('password')?.value === g.get('confirmPassword')?.value
         ? null : { mismatch: true };
  }

  nextStep() {
      if (this.currentStep < 5) {
          if (this.isStepValid(this.currentStep)) {
            this.currentStep++;
          } else {
              this.registerForm.markAllAsTouched();
          }
      }
  }

  prevStep() {
      if (this.currentStep > 1) {
          this.currentStep--;
      }
  }

  isStepValid(step: number): boolean {
      const controls = this.registerForm.controls;
      switch(step) {
          case 1: return !controls['firstName'].invalid && !controls['lastName'].invalid && !controls['email'].invalid && !controls['phone'].invalid;
          case 2: return !controls['companyName'].invalid && !controls['industry'].invalid;
          case 3: return !controls['taxId'].invalid && !controls['regime'].invalid;
          case 4: return !controls['password'].invalid && !controls['confirmPassword'].invalid && !controls['terms'].invalid;
          default: return true;
      }
  }

  getTaxIdLabel(): string {
    const labels: Record<string, string> = { 'CO': 'NIT', 'MX': 'RFC', 'US': 'EIN/SSN', 'BR': 'CNPJ/CPF' };
    return labels[this.country] || 'Tax ID';
  }

  getTaxIdPlaceholder(): string {
     const placeholders: Record<string, string> = { 'CO': '900123456', 'MX': 'ABC123456...', 'US': '12-3456789' };
     return placeholders[this.country] || '';
  }

  handleDiscrepancy(choice: 'continue' | 'switch') {
      this.showDiscrepancyModal = false;
      if (choice === 'switch' && this.contextAnalysis?.detectedCountry) {
          this.onCountrySelected(this.contextAnalysis.detectedCountry);
          this.router.navigate(['/', this.lang, this.contextAnalysis.detectedCountry.toLowerCase(), 'auth', 'register']);
      }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMsg = '';
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.currentStep = 5;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.errorMsg = 'Error en el registro. Verifique los datos o intente más tarde.';
        }
      });
    }
  }
}
