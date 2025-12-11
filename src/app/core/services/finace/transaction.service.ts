import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionSummary } from '../../../models/finance/transaction.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private mockDataService = inject(MockDataService);
  private transactions: Transaction[] = this.mockDataService.seedTransactions();

  getAll(): Transaction[] {
    return this.transactions;
  }

  getById(id: number): Transaction | undefined {
    return this.transactions.find((t) => t.id === id);
  }

  filterByType(type: 'income' | 'expense'): Transaction[] {
    return this.transactions.filter((t) => t.type === type);
  }

  filterByCategory(category: string): Transaction[] {
    return this.transactions.filter((t) =>
      t.category.toLowerCase().includes(category.toLowerCase()),
    );
  }

  sortByDate(order: 'asc' | 'desc'): Transaction[] {
    const transactionsCopy = [...this.transactions];
    return transactionsCopy.sort((a, b) => {
      const diff = a.date.getTime() - b.date.getTime();
      // order에 따라 diff에 1 또는 -1을 곱하여 부호를 반전시킵니다.
      // ASC: diff * 1 (a - b)
      // DESC: diff * -1 (-(a - b) = b - a)
      return diff * (order === 'asc' ? 1 : -1);
    });
  }

  sortByAmount(order: 'asc' | 'desc'): Transaction[] {
    const transactionsCopy = [...this.transactions];
    return transactionsCopy.sort((a, b) => {
      const diff = a.amount - b.amount;
      return diff * (order === 'asc' ? 1 : -1);
    });
  }

  getSummary(): TransactionSummary {
    const transactionSum: TransactionSummary = this.transactions.reduce(
      (summaryResult, curry) => {
        if (curry.type === 'income') {
          summaryResult.totalIncome += curry.amount;
          summaryResult.netBalance += curry.amount;
        } else {
          summaryResult.totalExpense += curry.amount;
          summaryResult.netBalance -= curry.amount;
        }
        return summaryResult;
      },
      { totalIncome: 0, totalExpense: 0, netBalance: 0 } as TransactionSummary,
    );

    return transactionSum;
  }
}
