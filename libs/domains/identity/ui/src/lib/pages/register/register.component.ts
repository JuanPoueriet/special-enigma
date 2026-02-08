import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent, InputComponent } from '@virteex/shared-ui';
import { CountrySelectorComponent } from '../../components/country-selector/country-selector.component';
import { IntentDetectionService, ContextAnalysis } from '../../services/intent-detection.service';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent, CountrySelectorComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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
