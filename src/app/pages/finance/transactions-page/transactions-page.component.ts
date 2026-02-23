import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../../core/services/finance/transaction.service';
import { Transaction, TransactionSummary } from '../../../models/finance/transaction.model';
import { TransactionListComponent } from '../../../components/finance/transaction-list/transaction-list.component';
import { TotalsCardComponent } from '../../../components/finance/totals-card/totals-card.component';
import { FilterBarComponent } from '../../../components/finance/filter-bar/filter-bar.component';
import { catchError, of, tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TransactionStateService } from '../../../core/services/finance/transaction-state.service';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
//import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-transactions-page',
  imports: [TransactionListComponent, TotalsCardComponent, FilterBarComponent],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
})
export class TransactionsPageComponent implements OnInit {
  private transactionService = inject(TransactionService);
  private transactionStateService = inject(TransactionStateService);
  private destroyRef = inject(DestroyRef);
  private dialogRef: MatDialogRef<TransactionDetailComponent> | null = null;
  private dialog = inject(MatDialog);

  transactions = signal<Transaction[]>([]);
  transactionSummary = signal<TransactionSummary>({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });

  constructor() {
    // Create an effect that watches for changes to the selected transaction
    effect(() => {
      const selectedTransaction = this.transactionStateService.selectedTransaction();
      console.log('Page effect:', selectedTransaction, this.dialogRef);
      if (selectedTransaction) {
        // Close any existing dialog first
        if (this.dialogRef) {
          this.dialogRef.close();
        }

        // Open the dialog with the selected transaction
        this.dialogRef = this.dialog.open(TransactionDetailComponent, {
          width: '800px',
          height: '500px',
          data: { transaction: selectedTransaction },
        });

        // When the dialog closes, clear the selected transaction
        this.dialogRef?.afterClosed().subscribe(() => {
          this.transactionStateService.clearSelectedTransaction();
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService
      .getAll()
      .pipe(
        //takeUntilDestroyed(),
        tap((transactions: Transaction[]) => {
          this.transactions.set(transactions);
        }),
        catchError((err: Error) => {
          console.error('Failed to load transactions', err);
          return of([]);
        }),
      )
      .subscribe();
  }

  onFilterChanged(filter: { key: string; value: string }[]): void {
    console.log('onFilerChanged: ', filter);
    this.transactionService
      .searchByParam(filter)
      .pipe(
        //takeUntilDestroyed(),
        tap((transactions) => this.transactions.set(transactions)),
        catchError((err: Error) => {
          console.error('Failed to search transactions', err);
          return of([]);
        }),
      )
      .subscribe({
        next: (data) => console.log('onFilterChanged-Result - ', data),
      });
  }
}
