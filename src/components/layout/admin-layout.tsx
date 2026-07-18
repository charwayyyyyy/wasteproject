"use client";

import { useDemoStore } from "@/store/demo-store";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { BarChart3, AlertTriangle, Users, LogOut, CalendarClock, LineChart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { HydrationGate } from "../providers/hydration-gate";
import { UnauthorizedState } from "@/components/ui/unauthorized-state";
import { Logo } from "@/components/ui/logo";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useDemoStore();
  const router = useRouter();
  const pathname = usePathname();

  if (!currentUser) return null;

  if (currentUser.role !== 'admin') {
    return <UnauthorizedState requiredRole="admin" />;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    { name: 'Overview', href: '/admin', icon: BarChart3 },
    { name: 'Pickups', href: '/admin/pickups', icon: CalendarClock },
    { name: 'Reports', href: '/admin/reports', icon: AlertTriangle },
    { name: 'Collectors', href: '/admin/collectors', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: LineChart },
    { name: 'Feedback', href: '/admin/feedback', icon: MessageSquare },
  ];

  return (
    <HydrationGate>
      <div className="min-h-screen bg-background-secondary flex flex-col md:flex-row pb-[env(safe-area-inset-bottom)]">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-[260px] border-r border-border-subtle bg-surface min-h-screen sticky top-0 shadow-[1px_0_10px_rgba(0,0,0,0.02)] z-30">
          <div className="p-6 border-b border-border-subtle flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <Logo size={32} />
            </Link>
          </div>
          
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
            <div className="px-3 pb-2 pt-1 text-xs font-semibold text-text-tertiary uppercase tracking-wider">Administration</div>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-text-tertiary")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-border-subtle bg-surface/50 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4 px-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shadow-sm">
                {currentUser.full_name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-text-primary text-sm truncate">{currentUser.full_name}</p>
                <p className="text-xs text-text-tertiary capitalize truncate">Admin Access</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium text-text-secondary hover:bg-danger-background hover:text-danger transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 pb-[88px] md:pb-0">
          {/* Mobile Header (Safe Area Aware) */}
          <header className="md:hidden bg-surface border-b border-border-subtle p-4 flex items-center justify-between sticky top-0 z-20 pt-[max(env(safe-area-inset-top),16px)] shadow-sm">
            <div className="flex items-center gap-2">
              <Logo size={26} />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleLogout} className="text-text-tertiary hover:text-danger transition-colors p-1">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </header>
          
          {/* Main Layout Padding */}
          <div className="flex-1 w-full max-w-[1200px] mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
            {children}
          </div>
        </main>

        {/* iOS-Style Bottom Navigation (Mobile Only) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/85 backdrop-blur-xl border-t border-border-subtle flex items-center justify-around px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="flex flex-col items-center justify-center p-1.5 min-w-[64px] gap-1 active:scale-95 transition-transform shrink-0"
              >
                <item.icon className={cn("h-6 w-6 transition-colors duration-200", isActive ? "text-primary" : "text-text-tertiary")} strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn("text-[10px] font-medium tracking-tight", isActive ? "text-primary" : "text-text-secondary")}>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </HydrationGate>
  );
}
