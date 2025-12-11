import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../../core/services/finace/transaction.service';
import { Transaction, TransactionSummary } from '../../../models/finance/transaction.model';

@Component({
  selector: 'app-transactions-page',
  imports: [],
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
    this.transactions.set(this.transactionService.getAll());
    this.transactionSummary.set(this.transactionService.getSummary());
  }
}
