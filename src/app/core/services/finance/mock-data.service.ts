import { Injectable } from '@angular/core';
import { transactions } from '../../../data/mock-transactions';
import { Transaction } from '../../../models/finance/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  seedTransactions(): Transaction[] {
    try {
      const validatedTransactions = transactions.map((rowT) => {
        return {
          ...rowT,
          date: new Date(rowT.date),
        } as Transaction;
      });

      return validatedTransactions;
    } catch (error) {
      console.error('Error seeding transactions:', error);
    }
    return [];
  }
}
