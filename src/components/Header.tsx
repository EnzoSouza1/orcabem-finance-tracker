
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Menu, User, Home, PieChart, FileText, Settings, LogOut, UserCircle, Bell } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AddTransactionDialog } from './AddTransactionDialog';
import { useNavigate, useLocation } from 'react-router-dom';

export function Header() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: PieChart, label: 'Categorias', path: '/categories' },
    { icon: FileText, label: 'Relatórios', path: '/reports' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <img src="/lovable-uploads/b49573e5-35a9-4bd3-bde0-41750762c234.png" alt="OrçaBem" className="w-8 h-8" />
                    <h3 className="font-semibold text-lg">OrçaBem</h3>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.path}
                          variant={isActivePath(item.path) ? "default" : "ghost"}
                          className="justify-start"
                          onClick={() => navigate(item.path)}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Button>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <img src="/lovable-uploads/b49573e5-35a9-4bd3-bde0-41750762c234.png" alt="OrçaBem" className="w-8 h-8" />
              <h1 className="text-xl font-bold text-gray-900">OrçaBem</h1>
            </div>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActivePath(item.path) ? "default" : "ghost"}
                  className="flex items-center gap-2"
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64" align="end">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">João Silva</p>
                      <p className="text-sm text-gray-500">joao@email.com</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Perfil
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      <Bell className="mr-2 h-4 w-4" />
                      Notificações
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" size="sm" onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </Button>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" size="sm">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <AddTransactionDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
    </>
  );
}
