import { Component, inject } from '@angular/core';
import { Transaction } from '../../../../models/finance/transaction.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-transaction-detail',
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
})
export class TransactionDetailComponent {
  private fb = inject(FormBuilder);
  transaction: Transaction;
  dialogRef = inject(MatDialogRef<TransactionDetailComponent>);
  data = inject(MAT_DIALOG_DATA) as { transaction: Transaction };

  typeOptions = [
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ];
  paymentMethodOptions = [
    { value: 'card', label: 'Card' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'cash', label: 'Cash' },
  ];

  detailFrom!: FormGroup;

  constructor() {
    this.transaction = this.data.transaction;

    this.setForm();
  }

  setForm() {
    const t = this.data.transaction;
    console.log('setForm', t);
    this.detailFrom = this.fb.group({
      desc: [t.desc, Validators.required],
      amount: [t.amount, Validators.required],
      type: [t.type, Validators.required],
      category: [t.category],
      date: [this.toDateInputValue(t.date)],
      paymentMethod: [t.payment.method, Validators.required],
    });

    console.log('detailForm-', this.detailFrom.controls['date']);
  }

  // Move To Helper
  toDateInputValue(date: Date | string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // "YYYY-MM-DD"
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
