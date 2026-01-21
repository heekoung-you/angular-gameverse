import { Injectable, signal } from '@angular/core';
import { Transaction } from '../../../models/finance/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionStateService {
  // Signal for the selected transaction
  private selectedTransactionSignal = signal<Transaction | null>(null);

  // Public readonly access to the signal
  public selectedTransaction = this.selectedTransactionSignal.asReadonly();

  // Method to select a transaction
  selectTransaction(transaction: Transaction): void {
    console.log('selectTransaction:', transaction);
    this.selectedTransactionSignal.set(transaction);
  }

  // Method to clear the selected transaction
  clearSelectedTransaction(): void {
    this.selectedTransactionSignal.set(null);
  }
}
