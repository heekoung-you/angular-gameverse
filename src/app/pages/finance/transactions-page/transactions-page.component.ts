import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../../core/services/finance/transaction.service';
import { Transaction, TransactionSummary } from '../../../models/finance/transaction.model';
import { TransactionListComponent } from '../../../components/finance/transaction-list/transaction-list.component';
import { TotalsCardComponent } from '../../../components/finance/totals-card/totals-card.component';
import { FilterBarComponent } from '../../../components/finance/filter-bar/filter-bar.component';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-transactions-page',
  imports: [TransactionListComponent, TotalsCardComponent, FilterBarComponent],
  templateUrl: './transactions-page.component.html',
  styleUrl: './transactions-page.component.scss',
})
export class TransactionsPageComponent implements OnInit {
  private transactionService = inject(TransactionService);
  transactions = signal<Transaction[]>([]);
  transactionSummary = signal<TransactionSummary>({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService
      .getAll()
      .pipe(
        tap((transactions: Transaction[]) => {
          this.transactions.set(transactions);
        }),
        catchError((err: Error) => {
          console.error('Failed to load transactions', err);
          return of([]);
        }),
      )
      .subscribe();

    //this.transactions.set(this.transactionService.getAll());
    //this.transactionSummary.set(this.transactionService.getSummary());
  }
}
