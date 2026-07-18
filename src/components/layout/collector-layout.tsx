"use client";

import { useDemoStore } from "@/store/demo-store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Map, ListTodo, History, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { HydrationGate } from "../providers/hydration-gate";

export function CollectorLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useDemoStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'collector') {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    { name: 'Dashboard', href: '/collector', icon: Map },
    { name: 'Requests', href: '/collector/requests', icon: ListTodo },
    { name: 'History', href: '/collector/history', icon: History },
  ];

  return (
    <HydrationGate>
      {/* High contrast theme for collectors (simulated dark/high-legibility mode) */}
      <div className="min-h-screen bg-surface-muted flex flex-col md:flex-row pb-[env(safe-area-inset-bottom)]">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-[260px] border-r border-border-strong bg-text-primary min-h-screen sticky top-0 shadow-[1px_0_10px_rgba(0,0,0,0.1)] z-30">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/collector" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-success flex items-center justify-center text-white shadow-sm">
                <span className="font-bold text-lg leading-none">E</span>
              </div>
              <span className="font-bold tracking-tight text-xl text-white">EcoLoop</span>
            </Link>
          </div>
          
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto no-scrollbar">
            <div className="px-3 pb-2 pt-1 text-xs font-semibold text-white/50 uppercase tracking-wider">Collector Portal</div>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/collector' && pathname.startsWith(item.href));
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium transition-all duration-200",
                    isActive 
                      ? "bg-success text-white shadow-sm" 
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-white/50")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4 px-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success font-semibold border border-success/30">
                {currentUser.full_name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-white text-sm truncate">{currentUser.full_name}</p>
                <p className="text-xs text-white/50 capitalize truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span> Active
                </p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium text-white/60 hover:bg-danger/20 hover:text-danger transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 pb-[88px] md:pb-0">
          {/* Mobile Header (Safe Area Aware) */}
          <header className="md:hidden bg-text-primary text-white border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-20 pt-[max(env(safe-area-inset-top),16px)]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-success flex items-center justify-center text-white shadow-sm">
                <span className="font-bold text-sm leading-none">E</span>
              </div>
              <span className="font-semibold text-[17px] tracking-tight text-white">EcoLoop</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium px-2 py-0.5 bg-success/20 text-success border border-success/30 rounded-full uppercase tracking-wider flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-success"></span> Live
              </span>
              <button onClick={handleLogout} className="text-white/60 hover:text-danger transition-colors p-1">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </header>
          
          {/* Main Layout Padding */}
          <div className="flex-1 w-full max-w-[1000px] mx-auto p-4 sm:p-6 md:p-8">
            {children}
          </div>
        </main>

        {/* Thick, high-contrast Bottom Navigation (Mobile Only) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-text-primary text-white border-t border-white/10 flex items-center justify-around px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] z-50 shadow-[0_-8px_24px_rgba(0,0,0,0.15)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/collector' && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="flex flex-col items-center justify-center p-1.5 min-w-[72px] gap-1 active:scale-95 transition-transform"
              >
                <div className={cn("p-1.5 rounded-full transition-colors duration-200", isActive ? "bg-success" : "bg-transparent")}>
                  <item.icon className={cn("h-6 w-6", isActive ? "text-white" : "text-white/60")} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={cn("text-[10px] font-medium tracking-tight mt-0.5", isActive ? "text-success" : "text-white/60")}>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </HydrationGate>
  );
}
