
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, DollarSign } from 'lucide-react';

export function FinancialSummary() {
  // Dados simulados - em uma aplicação real, viriam de uma API ou estado global
  const summaryData = {
    totalIncome: 5500.00,
    totalExpenses: 3200.00,
    balance: 2300.00,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="gradient-card border-green-100 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Receitas
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <Plus className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(summaryData.totalIncome)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            +12% em relação ao mês passado
          </p>
        </CardContent>
      </Card>

      <Card className="gradient-card border-red-100 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Despesas
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
            <Minus className="h-4 w-4 text-red-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(summaryData.totalExpenses)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            -5% em relação ao mês passado
          </p>
        </CardContent>
      </Card>

      <Card className="gradient-card border-blue-100 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Saldo
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${summaryData.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {formatCurrency(summaryData.balance)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Saldo atual disponível
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
