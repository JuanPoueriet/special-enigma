import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, ArrowLeft, PlusCircle, Trash2, CheckCircle, AlertTriangle, Loader2, XCircle } from 'lucide-angular';
import { useAccounting } from '../../hooks/use-accounting';
import { RecordJournalEntryDto } from '@virteex/domain-accounting-contracts';
import { Decimal } from 'decimal.js';

interface JournalEntryLineForm {
  accountId: FormControl<string>;
  description: FormControl<string | null>;
  debit: FormControl<string>;
  credit: FormControl<string>;
}

@Component({
  selector: 'app-record-journal-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TranslateModule, LucideAngularModule],
  templateUrl: './record-journal-entry.component.html',
  styleUrl: './record-journal-entry.component.scss',
})
export class RecordJournalEntryComponent implements OnInit {
  accounting = useAccounting();
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  entryForm = new FormGroup({
    date: new FormControl<string>(new Date().toISOString().split('T')[0], { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    lines: new FormArray<FormGroup<JournalEntryLineForm>>([])
  });

  loading = false;
  error = '';
  totalDebit = new Decimal(0);
  totalCredit = new Decimal(0);

  readonly icons = {
    ArrowLeft,
    PlusCircle,
    Trash2,
    CheckCircle,
    AlertTriangle,
    Loader2,
    XCircle
  };

  get f() { return this.entryForm.controls; }
  get lines() { return this.entryForm.get('lines') as FormArray<FormGroup<JournalEntryLineForm>>; }

  ngOnInit() {
    this.accounting.loadAccounts();

    // Add initial 2 lines
    this.addLine();
    this.addLine();
  }

  addLine() {
    const line = new FormGroup<JournalEntryLineForm>({
      accountId: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl<string | null>(null),
      debit: new FormControl<string>('0.00', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)] }),
      credit: new FormControl<string>('0.00', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)] })
    });
    this.lines.push(line);
  }

  removeLine(index: number) {
    if (this.lines.length > 2) {
      this.lines.removeAt(index);
      this.calculateTotals();
    }
  }

  calculateTotals() {
    this.totalDebit = new Decimal(0);
    this.totalCredit = new Decimal(0);

    this.lines.controls.forEach(control => {
      const debit = new Decimal(control.get('debit')?.value || 0);
      const credit = new Decimal(control.get('credit')?.value || 0);
      this.totalDebit = this.totalDebit.plus(debit);
      this.totalCredit = this.totalCredit.plus(credit);
    });
  }

  isBalanced(): boolean {
    return this.totalDebit.equals(this.totalCredit) && this.totalDebit.gt(0);
  }

  onSubmit() {
    if (this.entryForm.invalid || !this.isBalanced()) return;

    this.loading = true;
    this.error = '';

    const formValue = this.entryForm.getRawValue();

    const dto: RecordJournalEntryDto = {
        date: formValue.date,
        description: formValue.description,
        lines: formValue.lines.map((l) => ({
            accountId: l.accountId,
            description: l.description || undefined,
            debit: l.debit,
            credit: l.credit
        }))
    };

    this.accounting.recordJournalEntry(dto).then(() => {
        this.router.navigate(['../'], { relativeTo: this.route });
    }).catch(err => {
        this.error = this.mapApiError(err);
        this.loading = false;
    });
  }

  private mapApiError(err: any): string {
    const baseMessage = 'Failed to record journal entry.';
    if (!err.error) return baseMessage;

    // Structured error mapping
    if (err.status === 400 && err.error.errors) {
      const firstError = Object.values(err.error.errors)[0];
      return `${baseMessage} ${firstError}`;
    }

    if (err.error.message) {
      return `${baseMessage} ${err.error.message}`;
    }

    return baseMessage;
  }
}
