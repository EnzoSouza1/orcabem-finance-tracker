
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function MonthlyChart() {
  // Dados simulados dos últimos 6 meses
  const monthlyData = [
    { month: 'Ago', receitas: 4800, despesas: 3200 },
    { month: 'Set', receitas: 5200, despesas: 3500 },
    { month: 'Out', receitas: 4900, despesas: 3100 },
    { month: 'Nov', receitas: 5500, despesas: 3400 },
    { month: 'Dez', receitas: 6200, despesas: 4100 },
    { month: 'Jan', receitas: 5500, despesas: 3200 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="gradient-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Receitas vs Despesas</CardTitle>
        <p className="text-sm text-gray-500">Últimos 6 meses</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelStyle={{ color: '#1e293b' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar 
                dataKey="receitas" 
                fill="#10b981" 
                name="Receitas"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="despesas" 
                fill="#ef4444" 
                name="Despesas"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
