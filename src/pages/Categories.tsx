
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Categories = () => {
  // Dados simulados de gastos por categoria
  const categoryData = [
    { name: 'Alimentação', value: 1200, color: '#ef4444', percentage: 35 },
    { name: 'Transporte', value: 800, color: '#f59e0b', percentage: 23 },
    { name: 'Moradia', value: 600, color: '#3b82f6', percentage: 18 },
    { name: 'Lazer', value: 450, color: '#8b5cf6', percentage: 13 },
    { name: 'Saúde', value: 250, color: '#10b981', percentage: 7 },
    { name: 'Educação', value: 150, color: '#f97316', percentage: 4 },
  ];

  const monthlyTrend = [
    { month: 'Set', alimentacao: 1100, transporte: 750, moradia: 600, lazer: 400 },
    { month: 'Out', alimentacao: 1050, transporte: 780, moradia: 600, lazer: 350 },
    { month: 'Nov', alimentacao: 1300, transporte: 820, moradia: 600, lazer: 500 },
    { month: 'Dez', alimentacao: 1200, transporte: 800, moradia: 600, lazer: 450 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const totalSpent = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Análise por Categorias</h1>
          <p className="text-gray-600">Visualize seus gastos organizados por categoria</p>
        </div>

        {/* Resumo Total */}
        <Card className="gradient-card mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Resumo do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {formatCurrency(totalSpent)}
            </div>
            <p className="text-gray-600">Total gasto este mês</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gráfico de Pizza */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Distribuição por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Categorias */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Gastos por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(category.value)}
                      </span>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                    <div className="text-sm text-gray-500">
                      {category.percentage}% do total gasto
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tendência Mensal */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Tendência dos Últimos 4 Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="alimentacao" stackId="a" fill="#ef4444" name="Alimentação" />
                  <Bar dataKey="transporte" stackId="a" fill="#f59e0b" name="Transporte" />
                  <Bar dataKey="moradia" stackId="a" fill="#3b82f6" name="Moradia" />
                  <Bar dataKey="lazer" stackId="a" fill="#8b5cf6" name="Lazer" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Categories;
