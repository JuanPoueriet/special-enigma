import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, ArrowLeft, AlertCircle, Loader2, XCircle } from 'lucide-angular';
import { AccountType } from '@virtex/domain-accounting-contracts';
import { createAccountForm } from '../../forms/account.form';
import { accountingFacade } from '../../facades/accounting.facade';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TranslateModule, LucideAngularModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent implements OnInit {
  accounting = accountingFacade();
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  accountForm = createAccountForm();

  accountTypes = Object.values(AccountType);
  loading = false;
  error = '';

  readonly icons = {
    ArrowLeft,
    AlertCircle,
    Loader2,
    XCircle
  };

  get f() { return this.accountForm.controls; }

  ngOnInit() {
    this.accounting.loadAccounts();
  }

  async onSubmit() {
    if (this.accountForm.invalid) return;

    this.loading = true;
    this.error = '';

    const { code, name, type, parentId } = this.accountForm.getRawValue();

    if (!code || !name || !type) {
      this.error = 'Missing required fields';
      this.loading = false;
      return;
    }

    const dto = {
        code,
        name,
        type: type as AccountType,
        parentId: parentId || undefined
    };

    try {
      await this.accounting.createAccount(dto);
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (err: unknown) {
      const errorResponse = err as { error?: { message?: string }; message?: string };
      this.error = 'Failed to create account. ' + (errorResponse.error?.message || errorResponse.message || '');
      this.loading = false;
    }
  }
}
