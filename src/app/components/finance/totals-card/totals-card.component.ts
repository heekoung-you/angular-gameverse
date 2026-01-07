import { Component, inject, Input, OnInit } from '@angular/core';
import { Transaction } from '../../../models/finance/transaction.model';
import { TransactionService } from '../../../core/services/finance/transaction.service';
import { tap } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-totals-card',
  imports: [CurrencyPipe],
  templateUrl: './totals-card.component.html',
  styleUrl: './totals-card.component.scss',
})
export class TotalsCardComponent implements OnInit {
  @Input() transactions: Transaction[] = [];
  transactionService = inject(TransactionService);
  transactionSummary = {
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  };
  ngOnInit(): void {
    this.transactionService
      .getSummary()
      .pipe(
        tap((summary) => {
          this.transactionSummary = summary;
        }),
      )
      .subscribe();
  }
}
