import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../models/finance/transaction.model';
import { formatDate } from '../../../core/utils/date-utils';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-transaction-list',
  imports: [MatIconModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent implements OnInit, OnChanges {
  @Input() transactions: Transaction[] = [];
  @Input() locale = 'de-DE';
  sortedTransactions: Transaction[] = [];
  currentSort: { key: keyof Transaction; asc: boolean } | null = null;

  ngOnInit(): void {
    this.sortedTransactions = [...this.transactions];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.sortedTransactions = [...this.transactions];
      if (this.currentSort) {
        this.sortBy(this.currentSort.key, this.currentSort.asc);
      }
    }
  }

  // TODO:
  formattedDate(transaction: Transaction): string {
    if (transaction?.date) {
      return formatDate(transaction?.date, { style: 'long', locale: this.locale });
    }
    return 'NaN';
  }

  sortBy(field: keyof Transaction, asc?: boolean): void {
    const direction =
      asc !== undefined ? asc : this.currentSort?.key === field ? !this.currentSort.asc : true;
    this.currentSort = { key: field, asc: direction };

    this.sortedTransactions = [...this.sortedTransactions].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      if (valA instanceof Date && valB instanceof Date) {
        valA = valA.getTime();
        valB = valB.getTime();
        return direction ? valA - valB : valB - valA;
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return direction ? valA - valB : valB - valA;
      }

      return direction
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }

  getSortIcon(field: keyof Transaction): string {
    if (this.currentSort?.key === field) {
      return this.currentSort.asc ? 'arrow_upward' : 'arrow_downward';
    }
    return 'unfold_more';
  }
}
