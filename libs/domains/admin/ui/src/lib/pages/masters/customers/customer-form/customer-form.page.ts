import { Component, ChangeDetectionStrategy, inject, OnInit, signal, Input, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Save, Building2, User, Mail, Phone, Hash, MapPin } from 'lucide-angular';
import { CustomerService } from '../../../../core/services/customer.service';
import { ToastService, AuthService } from '@virteex/shared-ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'virteex-customer-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './customer-form.page.html',
  styleUrls: ['./customer-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFormPage implements OnInit {
  @Input() id?: string; // Recibe el ID desde la ruta para modo edición

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  protected readonly SaveIcon = Save;

  customerForm!: FormGroup;
  isEditMode = signal(false);
  isLoading = signal(false);

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      companyName: ['', Validators.required],
      taxId: ['', Validators.required],
      contactPerson: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      city: [''],
      stateOrProvince: [''],
      postalCode: [''],
      country: ['DO', Validators.required],
    });

    if (this.id) {
      this.isEditMode.set(true);
      this.loadCustomer(this.id);
    }
  }

  loadCustomer(id: string): void {
    this.isLoading.set(true);
    this.customerService.getById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (customer) => {
          this.customerForm.patchValue(customer);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.toastService.showError('Error loading customer');
          this.isLoading.set(false);
        }
      });
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      this.isLoading.set(true);
      const user = this.authService.currentUser();
      const payload = {
        ...this.customerForm.value,
        tenantId: user?.tenantId || 'default',
      };

      const request$ = this.id
        ? this.customerService.update(this.id, payload)
        : this.customerService.create(payload);

      request$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.toastService.showSuccess(`Customer ${this.id ? 'updated' : 'saved'} successfully`);
            this.router.navigate(['/app/masters/customers']);
          },
          error: (err) => {
            console.error(err);
            this.toastService.showError('Error saving customer');
            this.isLoading.set(false);
          }
        });
    }
  }
}
