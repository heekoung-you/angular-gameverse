export interface Transaction {
  id: number;
  desc: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date; // ISO date string
  tags: string[];
  payment: Payment;
}

export interface Payment {
  method: 'card' | 'bank-transfer' | 'paypal' | 'crypto' | 'cash';
  cardNumber?: string;
  iban?: string;
  email?: string;
  wallet?: string;
  details?: string;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface RowTransaction {
  id: number;
  desc: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string; // ISO date string
  tags: string[];
  payment: Payment;
}
