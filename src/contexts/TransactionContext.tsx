
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getBalance: () => number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      description: 'Salário mensal',
      amount: 5500.00,
      type: 'income',
      category: 'salário',
      date: '2024-01-01',
    },
    {
      id: '2',
      description: 'Compra no supermercado',
      amount: 250.00,
      type: 'expense',
      category: 'alimentação',
      date: '2024-01-02',
    },
    {
      id: '3',
      description: 'Pagamento de aluguel',
      amount: 1200.00,
      type: 'expense',
      category: 'moradia',
      date: '2024-01-03',
    },
    {
      id: '4',
      description: 'Freelance projeto',
      amount: 800.00,
      type: 'income',
      category: 'freelance',
      date: '2024-01-04',
    },
    {
      id: '5',
      description: 'Conta de luz',
      amount: 150.00,
      type: 'expense',
      category: 'moradia',
      date: '2024-01-05',
    },
    {
      id: '6',
      description: 'Jantar no restaurante',
      amount: 85.00,
      type: 'expense',
      category: 'alimentação',
      date: '2024-01-06',
    },
    {
      id: '7',
      description: 'Venda de produtos',
      amount: 320.00,
      type: 'income',
      category: 'vendas',
      date: '2024-01-07',
    },
    {
      id: '8',
      description: 'Gasolina',
      amount: 120.00,
      type: 'expense',
      category: 'transporte',
      date: '2024-01-08',
    },
  ]);

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getBalance = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      addTransaction,
      getTotalIncome,
      getTotalExpenses,
      getBalance,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
