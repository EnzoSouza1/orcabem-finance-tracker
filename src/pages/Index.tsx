
import { Header } from '@/components/Header';
import { FinancialSummary } from '@/components/FinancialSummary';
import { RecentTransactions } from '@/components/RecentTransactions';
import { Goals } from '@/components/Goals';
import { MonthlyChart } from '@/components/MonthlyChart';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Boas-vindas */}
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Olá! Bem-vindo ao OrçaBem 👋
          </h2>
          <p className="text-gray-600">
            Aqui está o resumo das suas finanças pessoais
          </p>
        </div>

        {/* Resumo financeiro */}
        <div className="animate-fade-in">
          <FinancialSummary />
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transações recentes */}
          <div className="animate-fade-in">
            <RecentTransactions />
          </div>

          {/* Metas */}
          <div className="animate-fade-in">
            <Goals />
          </div>
        </div>

        {/* Gráfico mensal */}
        <div className="animate-fade-in">
          <MonthlyChart />
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-gray-500 text-sm">
          <p>OrçaBem - Seu controle financeiro pessoal simplificado</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
