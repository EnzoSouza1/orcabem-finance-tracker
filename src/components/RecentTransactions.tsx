
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export function RecentTransactions() {
  // Dados simulados - em uma aplicação real, viriam de uma API
  const transactions: Transaction[] = [
    {
      id: '1',
      description: 'Salário mensal',
      amount: 5500.00,
      type: 'income',
      category: 'Salário',
      date: '2024-01-01',
    },
    {
      id: '2',
      description: 'Compra no supermercado',
      amount: 250.00,
      type: 'expense',
      category: 'Alimentação',
      date: '2024-01-02',
    },
    {
      id: '3',
      description: 'Conta de luz',
      amount: 120.00,
      type: 'expense',
      category: 'Moradia',
      date: '2024-01-03',
    },
    {
      id: '4',
      description: 'Freelance design',
      amount: 800.00,
      type: 'income',
      category: 'Freelance',
      date: '2024-01-04',
    },
    {
      id: '5',
      description: 'Uber',
      amount: 35.00,
      type: 'expense',
      category: 'Transporte',
      date: '2024-01-05',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  return (
    <Card className="gradient-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Transações Recentes</CardTitle>
        <Button variant="outline" size="sm">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' 
                    ? 'bg-green-100' 
                    : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' ? (
                    <Plus className="h-4 w-4 text-green-600" />
                  ) : (
                    <Minus className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'income' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
