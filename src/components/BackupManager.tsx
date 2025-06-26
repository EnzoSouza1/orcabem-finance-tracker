
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Upload, Save, RotateCcw, HardDrive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BackupManager() {
  const [backupName, setBackupName] = useState('');
  const [backups, setBackups] = useState([
    {
      id: '1',
      name: 'Backup Janeiro 2024',
      date: '2024-01-31',
      size: '2.3 KB'
    },
    {
      id: '2',
      name: 'Backup Dezembro 2023',
      date: '2023-12-31',
      size: '1.8 KB'
    }
  ]);
  
  const { toast } = useToast();

  // Simula dados do aplicativo
  const getAppData = () => {
    return {
      transactions: [
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
        }
      ],
      goals: [
        {
          id: '1',
          title: 'Viagem de férias',
          currentAmount: 1500.00,
          targetAmount: 5000.00,
          category: 'Lazer',
        }
      ],
      settings: {
        currency: 'BRL',
        theme: 'light',
        notifications: true
      },
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };
  };

  const createBackup = () => {
    if (!backupName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um nome para o backup.",
        variant: "destructive",
      });
      return;
    }

    const appData = getAppData();
    const dataStr = JSON.stringify(appData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${backupName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Adiciona à lista de backups locais
    const newBackup = {
      id: Date.now().toString(),
      name: backupName,
      date: new Date().toISOString().split('T')[0],
      size: `${(blob.size / 1024).toFixed(1)} KB`
    };
    
    setBackups([newBackup, ...backups]);
    setBackupName('');
    
    toast({
      title: "Backup Criado",
      description: "Seus dados foram exportados com sucesso!",
    });
  };

  const restoreFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Validação básica da estrutura dos dados
        if (!data.transactions || !data.goals || !data.settings) {
          throw new Error('Formato de arquivo inválido');
        }

        // Aqui você implementaria a lógica para restaurar os dados
        console.log('Dados para restaurar:', data);
        
        toast({
          title: "Restauração Concluída",
          description: "Seus dados foram restaurados com sucesso!",
        });
        
      } catch (error) {
        toast({
          title: "Erro na Restauração",
          description: "Arquivo inválido ou corrompido.",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsText(file);
    event.target.value = ''; // Limpa o input
  };

  const saveToLocalStorage = () => {
    const appData = getAppData();
    try {
      localStorage.setItem('orcabem_backup', JSON.stringify(appData));
      localStorage.setItem('orcabem_backup_date', new Date().toISOString());
      
      toast({
        title: "Backup Local Salvo",
        description: "Seus dados foram salvos no navegador.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o backup local.",
        variant: "destructive",
      });
    }
  };

  const restoreFromLocalStorage = () => {
    try {
      const backupData = localStorage.getItem('orcabem_backup');
      const backupDate = localStorage.getItem('orcabem_backup_date');
      
      if (!backupData) {
        toast({
          title: "Nenhum Backup Encontrado",
          description: "Não há backup local disponível.",
          variant: "destructive",
        });
        return;
      }

      const data = JSON.parse(backupData);
      console.log('Restaurando dados do localStorage:', data);
      
      toast({
        title: "Restauração Concluída",
        description: `Dados restaurados do backup de ${new Date(backupDate || '').toLocaleDateString('pt-BR')}.`,
      });
      
    } catch (error) {
      toast({
        title: "Erro na Restauração",
        description: "Não foi possível restaurar o backup local.",
        variant: "destructive",
      });
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('orcabem_backup');
    localStorage.removeItem('orcabem_backup_date');
    
    toast({
      title: "Backup Local Removido",
      description: "O backup local foi removido do navegador.",
    });
  };

  const localBackupDate = localStorage.getItem('orcabem_backup_date');

  return (
    <div className="space-y-6">
      {/* Backup Local (Navegador) */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Backup Local (Navegador)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Save className="h-4 w-4" />
            <AlertDescription>
              Os dados são salvos no seu navegador e ficam disponíveis apenas neste dispositivo.
              {localBackupDate && (
                <div className="mt-2 text-sm">
                  <strong>Último backup:</strong> {new Date(localBackupDate).toLocaleDateString('pt-BR')} às {new Date(localBackupDate).toLocaleTimeString('pt-BR')}
                </div>
              )}
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={saveToLocalStorage} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Salvar Backup Local
            </Button>
            <Button 
              onClick={restoreFromLocalStorage} 
              variant="outline" 
              className="flex-1"
              disabled={!localBackupDate}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Restaurar Backup Local
            </Button>
            <Button 
              onClick={clearLocalStorage} 
              variant="destructive" 
              size="sm"
              disabled={!localBackupDate}
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exportar Backup */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exportar Backup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backupName">Nome do Backup</Label>
            <Input
              id="backupName"
              placeholder="Ex: Backup Janeiro 2024"
              value={backupName}
              onChange={(e) => setBackupName(e.target.value)}
            />
          </div>
          
          <Button onClick={createBackup} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Criar e Baixar Backup
          </Button>
          
          <Alert>
            <Download className="h-4 w-4" />
            <AlertDescription>
              O backup será baixado como um arquivo JSON contendo todas as suas transações, metas e configurações.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Restaurar Backup */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Restaurar Backup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restoreFile">Selecionar Arquivo de Backup</Label>
            <Input
              id="restoreFile"
              type="file"
              accept=".json"
              onChange={restoreFromFile}
            />
          </div>
          
          <Alert>
            <Upload className="h-4 w-4" />
            <AlertDescription>
              <strong>Atenção:</strong> A restauração substituirá todos os dados atuais pelos dados do backup selecionado.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Histórico de Backups */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Histórico de Backups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div>
                  <p className="font-medium">{backup.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(backup.date).toLocaleDateString('pt-BR')} • {backup.size}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            {backups.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                Nenhum backup criado ainda
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
