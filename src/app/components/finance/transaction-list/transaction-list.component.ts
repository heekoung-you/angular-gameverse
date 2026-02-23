import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../models/finance/transaction.model';
import { formatDate } from '../../../core/utils/date-utils';
import { MatIconModule } from '@angular/material/icon';
import { TransactionStateService } from '../../../core/services/finance/transaction-state.service';

@Component({
  selector: 'app-transaction-list',
  imports: [MatIconModule, CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent implements OnInit, OnChanges {
  private transactionStateService = inject(TransactionStateService);
  @Input() transactions: Transaction[] = [];
  @Input() locale = 'de-DE';
  sortedTransactions: Transaction[] = [];
  currentSort: { key: keyof Transaction; asc: boolean } | null = null;

  expandedRows: Set<number> = new Set<number>();

  ngOnInit(): void {
    this.sortedTransactions = [...this.transactions];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] && !changes['transactions'].firstChange) {
      this.sortedTransactions = [...this.transactions];
      if (this.currentSort) {
        this.sortBy(this.currentSort.key, this.currentSort.asc);
      }
    }
  }

  // Format date with long style
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

  // Format for mobile view - short date
  formattedShortDate(transaction: Transaction): string {
    if (transaction?.date) {
      return formatDate(transaction?.date, { style: 'short', locale: this.locale });
    }
    return 'NaN';
  }

  toggleRowExpand(transactionId: number): void {
    if (this.expandedRows.has(transactionId)) {
      this.expandedRows.delete(transactionId);
    } else {
      this.expandedRows.add(transactionId);
    }
  }

  isRowExpanded(transactionId: number): boolean {
    return this.expandedRows.has(transactionId);
  }

  getAmountClass(type: string): string {
    return type === 'income' ? 'amount-positive' : 'amount-negative';
  }

  /**
   * Selects a transaction when clicked
   * Updates the selected transaction in the TransactionStateService
   */
  selectTransaction(transaction: Transaction, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent other click events from firing
    }
    this.transactionStateService.selectTransaction(transaction);
  }
}
