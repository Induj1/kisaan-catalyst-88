
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Info, 
  PenSquare, 
  Landmark, 
  LogIn, 
  LogOut, 
  UserCircle,
  Menu,
  X
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const { translate } = useLanguage();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link 
        to={to} 
        onClick={() => setIsOpen(false)}
        className={cn(
          "flex items-center gap-2 py-2 px-3 rounded-md transition-colors",
          isActive 
            ? "bg-primary/10 text-primary font-medium" 
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
      >
        <Icon size={18} />
        <span>{label}</span>
      </Link>
    );
  };

  const navItems = [
    { to: "/", icon: Home, label: translate('home') },
    { to: "/features", icon: Info, label: translate('features') },
    { to: "/demo", icon: PenSquare, label: translate('demo') },
    { to: "/government", icon: Landmark, label: translate('government') },
  ];

  return (
    <div className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            KisaanMitra
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
          
          {user ? (
            <>
              <NavItem to="/dashboard" icon={UserCircle} label={translate('dashboard')} />
              <Button 
                variant="outline" 
                className="ml-2" 
                onClick={handleSignOut}
              >
                <LogOut size={18} className="mr-2" />
                {translate('signOut')}
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              className="ml-2" 
              onClick={() => navigate('/sign-in')}
            >
              <LogIn size={18} className="mr-2" />
              {translate('signIn')}
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-sm">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Navigation</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X size={20} />
                  </Button>
                </div>
                
                <div className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <NavItem key={item.to} {...item} />
                  ))}
                  
                  {user ? (
                    <>
                      <NavItem to="/dashboard" icon={UserCircle} label={translate('dashboard')} />
                      <Button 
                        variant="outline" 
                        className="mt-4 w-full justify-start" 
                        onClick={handleSignOut}
                      >
                        <LogOut size={18} className="mr-2" />
                        {translate('signOut')}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="default" 
                      className="mt-4 w-full justify-start" 
                      onClick={() => {
                        navigate('/sign-in');
                        setIsOpen(false);
                      }}
                    >
                      <LogIn size={18} className="mr-2" />
                      {translate('signIn')}
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
