
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface Goal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  category: string;
}

export function Goals() {
  // Dados simulados - em uma aplicação real, viriam de uma API
  const goals: Goal[] = [
    {
      id: '1',
      title: 'Viagem de férias',
      currentAmount: 1500.00,
      targetAmount: 5000.00,
      category: 'Lazer',
    },
    {
      id: '2',
      title: 'Reserva de emergência',
      currentAmount: 8000.00,
      targetAmount: 15000.00,
      category: 'Emergência',
    },
    {
      id: '3',
      title: 'Novo notebook',
      currentAmount: 800.00,
      targetAmount: 3000.00,
      category: 'Tecnologia',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <Card className="gradient-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Metas Financeiras</CardTitle>
        <Button variant="outline" size="sm">
          Nova meta
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            
            return (
              <div key={goal.id} className="p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-colors duration-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{goal.title}</h3>
                    <p className="text-sm text-gray-500">{goal.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{progress.toFixed(1)}%</p>
                  </div>
                </div>
                
                <Progress value={progress} className="mb-2" />
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {formatCurrency(goal.currentAmount)}
                  </span>
                  <span className="text-gray-600">
                    {formatCurrency(goal.targetAmount)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
