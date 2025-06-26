
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date}>({
    from: new Date(2024, 0, 1),
    to: new Date()
  });
  const [reportType, setReportType] = useState('monthly');
  const { toast } = useToast();

  // Dados simulados para relatórios
  const monthlyData = [
    { month: 'Jan', receitas: 5500, despesas: 3200, saldo: 2300 },
    { month: 'Fev', receitas: 5200, despesas: 3500, saldo: 1700 },
    { month: 'Mar', receitas: 5800, despesas: 3100, saldo: 2700 },
    { month: 'Abr', receitas: 5500, despesas: 3400, saldo: 2100 },
    { month: 'Mai', receitas: 6000, despesas: 3300, saldo: 2700 },
    { month: 'Jun', receitas: 5700, despesas: 3600, saldo: 2100 },
  ];

  const categoryExpenses = [
    { category: 'Alimentação', amount: 1200, percentage: 35 },
    { category: 'Transporte', amount: 800, percentage: 23 },
    { category: 'Moradia', amount: 600, percentage: 18 },
    { category: 'Lazer', amount: 450, percentage: 13 },
    { category: 'Saúde', amount: 250, percentage: 7 },
    { category: 'Educação', amount: 150, percentage: 4 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const exportToPDF = () => {
    // Simulação de exportação para PDF
    toast({
      title: "Exportando Relatório",
      description: "Seu relatório em PDF está sendo gerado...",
    });
    
    setTimeout(() => {
      toast({
        title: "Relatório Exportado",
        description: "O relatório foi salvo com sucesso!",
      });
    }, 2000);
  };

  const exportToCSV = () => {
    // Simulação de exportação para CSV
    const csvData = monthlyData.map(item => 
      `${item.month},${item.receitas},${item.despesas},${item.saldo}`
    ).join('\n');
    
    const csvContent = `Mês,Receitas,Despesas,Saldo\n${csvData}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio-financeiro.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Relatório Exportado",
      description: "Arquivo CSV baixado com sucesso!",
    });
  };

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.receitas, 0);
  const totalExpenses = monthlyData.reduce((sum, item) => sum + item.despesas, 0);
  const currentBalance = totalIncome - totalExpenses;
  const avgMonthlyIncome = totalIncome / monthlyData.length;
  const avgMonthlyExpenses = totalExpenses / monthlyData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios Financeiros</h1>
          <p className="text-gray-600">Analise suas finanças e exporte relatórios detalhados</p>
        </div>

        {/* Controles de Filtro */}
        <Card className="gradient-card mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filtros do Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Período</label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? format(dateRange.from, 'dd/MM/yyyy', { locale: ptBR }) : 'Data inicial'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.to ? format(dateRange.to, 'dd/MM/yyyy', { locale: ptBR }) : 'Data final'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <label className="block text-sm font-medium mb-2">Tipo de Relatório</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensal</SelectItem>
                    <SelectItem value="category">Por Categoria</SelectItem>
                    <SelectItem value="detailed">Detalhado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button onClick={exportToPDF} variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button onClick={exportToCSV} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Executivo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Despesa Total</p>
                  <p className="text-xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Saldo Atual</p>
                  <p className={`text-xl font-bold ${currentBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {formatCurrency(currentBalance)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Média Mensal</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(avgMonthlyIncome - avgMonthlyExpenses)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Evolução Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Line type="monotone" dataKey="receitas" stroke="#10b981" name="Receitas" />
                    <Line type="monotone" dataKey="despesas" stroke="#ef4444" name="Despesas" />
                    <Line type="monotone" dataKey="saldo" stroke="#3b82f6" name="Saldo" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Gastos por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryExpenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis tickFormatter={formatCurrency} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Bar dataKey="amount" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela Detalhada */}
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="text-lg">Resumo Detalhado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-2">Período</th>
                    <th className="pb-2">Receitas</th>
                    <th className="pb-2">Despesas</th>
                    <th className="pb-2">Saldo</th>
                    <th className="pb-2">Variação</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((item, index) => {
                    const previousSaldo = index > 0 ? monthlyData[index - 1].saldo : item.saldo;
                    const variation = ((item.saldo - previousSaldo) / previousSaldo * 100);
                    
                    return (
                      <tr key={item.month} className="border-b">
                        <td className="py-2">{item.month}/2024</td>
                        <td className="py-2 text-green-600 font-medium">{formatCurrency(item.receitas)}</td>
                        <td className="py-2 text-red-600 font-medium">{formatCurrency(item.despesas)}</td>
                        <td className="py-2 text-blue-600 font-medium">{formatCurrency(item.saldo)}</td>
                        <td className={`py-2 font-medium ${variation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {index > 0 ? `${variation >= 0 ? '+' : ''}${variation.toFixed(1)}%` : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Reports;
