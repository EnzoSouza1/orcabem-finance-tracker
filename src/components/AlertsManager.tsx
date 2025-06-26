
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, AlertTriangle, TrendingUp, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AlertRule {
  id: string;
  type: 'spending_limit' | 'goal_progress' | 'budget_warning';
  category?: string;
  limit: number;
  enabled: boolean;
  message: string;
}

export function AlertsManager() {
  const [alerts, setAlerts] = useState<AlertRule[]>([
    {
      id: '1',
      type: 'spending_limit',
      category: 'Alimentação',
      limit: 1000,
      enabled: true,
      message: 'Limite de gastos com alimentação atingido!'
    },
    {
      id: '2',
      type: 'budget_warning',
      limit: 3000,
      enabled: true,
      message: 'Você já gastou 80% do seu orçamento mensal'
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    type: 'spending_limit' as const,
    category: '',
    limit: 0,
    message: ''
  });

  const { toast } = useToast();

  // Simulação de verificação de alertas
  useEffect(() => {
    const checkAlerts = () => {
      // Simulação de dados de gastos atuais
      const currentSpending = {
        alimentacao: 1200,
        total: 2800
      };

      alerts.forEach(alert => {
        if (!alert.enabled) return;

        let shouldAlert = false;

        switch (alert.type) {
          case 'spending_limit':
            if (alert.category === 'Alimentação' && currentSpending.alimentacao >= alert.limit) {
              shouldAlert = true;
            }
            break;
          case 'budget_warning':
            if (currentSpending.total >= alert.limit * 0.8) {
              shouldAlert = true;
            }
            break;
        }

        if (shouldAlert) {
          toast({
            title: "Alerta Financeiro",
            description: alert.message,
            variant: "destructive",
          });
        }
      });
    };

    const interval = setInterval(checkAlerts, 30000); // Verifica a cada 30 segundos
    return () => clearInterval(interval);
  }, [alerts, toast]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const addAlert = () => {
    if (!newAlert.limit || !newAlert.message) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const alert: AlertRule = {
      id: Date.now().toString(),
      type: newAlert.type,
      category: newAlert.category || undefined,
      limit: newAlert.limit,
      enabled: true,
      message: newAlert.message
    };

    setAlerts([...alerts, alert]);
    setNewAlert({ type: 'spending_limit', category: '', limit: 0, message: '' });
    
    toast({
      title: "Sucesso",
      description: "Alerta criado com sucesso!",
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, enabled: !alert.enabled } : alert
    ));
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alerta removido",
      description: "O alerta foi removido com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Alertas Ativos */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alertas Ativos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={alert.enabled ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-gray-50'}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-gray-600">
                        Limite: {formatCurrency(alert.limit)}
                        {alert.category && ` - Categoria: ${alert.category}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={alert.enabled}
                        onCheckedChange={() => toggleAlert(alert.id)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAlert(alert.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
            
            {alerts.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                Nenhum alerta configurado
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Criar Novo Alerta */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Criar Novo Alerta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="alertType">Tipo de Alerta</Label>
            <select
              id="alertType"
              className="w-full p-2 border rounded-md"
              value={newAlert.type}
              onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value as any })}
            >
              <option value="spending_limit">Limite de Gastos</option>
              <option value="budget_warning">Aviso de Orçamento</option>
              <option value="goal_progress">Progresso de Meta</option>
            </select>
          </div>

          {newAlert.type === 'spending_limit' && (
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                placeholder="Ex: Alimentação, Transporte..."
                value={newAlert.category}
                onChange={(e) => setNewAlert({ ...newAlert, category: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="limit">Valor Limite (R$)</Label>
            <Input
              id="limit"
              type="number"
              placeholder="0,00"
              value={newAlert.limit || ''}
              onChange={(e) => setNewAlert({ ...newAlert, limit: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem do Alerta</Label>
            <Input
              id="message"
              placeholder="Ex: Limite de gastos atingido!"
              value={newAlert.message}
              onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
            />
          </div>

          <Button onClick={addAlert} className="w-full">
            Criar Alerta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
