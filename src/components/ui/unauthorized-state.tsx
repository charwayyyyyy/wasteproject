import { AlertOctagon, ArrowLeft, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemoStore } from "@/store/demo-store";

interface UnauthorizedStateProps {
  requiredRole: string;
}

export function UnauthorizedState({ requiredRole }: UnauthorizedStateProps) {
  const router = useRouter();
  const { currentUser, logout } = useDemoStore();

  const handleSwitchRole = () => {
    logout();
    router.push('/login');
  };

  const getDashboardPath = (role: string) => {
    switch(role) {
      case 'resident': return '/dashboard';
      case 'collector': return '/collector';
      case 'admin': return '/admin';
      case 'recycler': return '/recycler';
      default: return '/';
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary flex flex-col items-center justify-center p-6 text-center animate-in fade-in pb-[env(safe-area-inset-bottom)]">
      <div className="bg-surface border border-border-subtle rounded-3xl p-8 max-w-md w-full shadow-sm flex flex-col items-center">
        <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
          <AlertOctagon className="h-8 w-8" />
        </div>
        
        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2">Access Denied</h1>
        <p className="text-text-secondary text-[15px] mb-6 leading-relaxed">
          You are currently logged in as a <strong className="capitalize">{currentUser?.role || 'Guest'}</strong>, but this area requires <strong className="capitalize">{requiredRole}</strong> access.
        </p>

        <div className="flex flex-col w-full gap-3">
          {currentUser && (
            <Link href={getDashboardPath(currentUser.role)} className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl text-md shadow-sm">
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to My Dashboard
              </Button>
            </Link>
          )}
          
          <Button 
            variant="outline" 
            onClick={handleSwitchRole}
            className="w-full h-12 rounded-xl text-md"
          >
            <ArrowRightLeft className="mr-2 h-4 w-4" /> Switch Demo Role
          </Button>
        </div>
      </div>
    </div>
  );
}
