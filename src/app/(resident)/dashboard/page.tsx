"use client";

import { useDemoStore } from "@/store/demo-store";
import { Leaf, CalendarClock, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { EmptyState } from "@/components/ui/empty-state";

export default function ResidentDashboard() {
  const { currentUser, pickups, reports } = useDemoStore();

  const userPickups = pickups.filter(p => p.resident_id === currentUser?.id);
  const activePickups = userPickups.filter(p => p.status === 'pending' || p.status === 'scheduled');
  
  const userReports = reports.filter(r => r.reporter_id === currentUser?.id);
  const activeReports = userReports.filter(r => r.status !== 'cleared');

  const nextPickup = activePickups.sort((a, b) => new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime())[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      
      {/* Welcome & Stats Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-1">
            Hello, {currentUser?.full_name.split(' ')[0]} 👋
          </h1>
          <p className="text-text-secondary text-[15px]">
            Here is what's happening with your waste collection.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-surface p-3 pr-5 rounded-2xl border border-border-subtle shadow-sm w-fit">
          <div className="w-10 h-10 rounded-xl bg-success-background flex items-center justify-center text-success">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">EcoPoints</p>
            <p className="font-bold text-lg text-text-primary leading-tight">{currentUser?.points}</p>
          </div>
        </div>
      </div>

      {/* Hero Status Card (Primary Focus) */}
      <section>
        <h2 className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider mb-3 ml-1">Up Next</h2>
        
        {nextPickup ? (
          <div className="relative overflow-hidden rounded-[24px] bg-primary text-primary-foreground p-6 md:p-8 shadow-md">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <CalendarClock className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium mb-4">
                <Clock className="w-3.5 h-3.5" /> Scheduled for {format(parseISO(nextPickup.scheduled_date), "MMM d")}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">Pickup Requested</h3>
              <p className="text-primary-foreground/80 text-[15px] mb-8 max-w-md capitalize">
                We'll collect your {nextPickup.waste_type.replace('_', ' ')} waste. A collector will be assigned to your route shortly.
              </p>
              
              <div className="flex items-center gap-3">
                <Button className="rounded-xl bg-white text-primary hover:bg-surface-muted font-medium" asChild>
                  <Link href={`/pickups/${nextPickup.id}`}>View Details</Link>
                </Button>
                {nextPickup.status === 'scheduled' && (
                  <span className="text-sm font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-white" /> Collector assigned
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <EmptyState 
            icon={CalendarClock}
            title="No upcoming pickups"
            description="You don't have any waste collection scheduled right now."
            actionLabel="Request a Pickup"
            onAction={() => window.location.href = '/pickups/new'}
          />
        )}
      </section>

      {/* Secondary Actions / Information */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Quick Actions */}
        <section className="space-y-3">
          <h2 className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider ml-1">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              href="/pickups/new" 
              className="flex flex-col gap-3 p-4 bg-surface border border-border-subtle rounded-2xl hover:border-primary/30 hover:shadow-sm transition-all active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CalendarClock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-text-primary text-[15px]">Schedule</p>
                <p className="text-xs text-text-secondary">Request pickup</p>
              </div>
            </Link>
            
            <Link 
              href="/reports/new" 
              className="flex flex-col gap-3 p-4 bg-surface border border-border-subtle rounded-2xl hover:border-danger/30 hover:shadow-sm transition-all active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-danger-background flex items-center justify-center text-danger">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-text-primary text-[15px]">Report Issue</p>
                <p className="text-xs text-text-secondary">Illegal dumping</p>
              </div>
            </Link>
          </div>
        </section>
        
        {/* Active Reports Summary */}
        <section className="space-y-3">
          <div className="flex items-center justify-between ml-1 mr-1">
            <h2 className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider">Active Reports</h2>
            {activeReports.length > 0 && (
              <Link href="/reports" className="text-xs font-medium text-primary hover:underline">View All</Link>
            )}
          </div>
          
          <div className="bg-surface border border-border-subtle rounded-[20px] p-1 shadow-sm">
            {activeReports.length > 0 ? (
              <div className="divide-y divide-border-subtle">
                {activeReports.slice(0, 2).map(report => (
                  <Link key={report.id} href={`/reports/${report.id}`} className="flex items-start gap-4 p-4 hover:bg-surface-muted transition-colors rounded-[16px]">
                    <div className="w-10 h-10 rounded-full bg-warning-background flex items-center justify-center text-warning shrink-0 mt-0.5">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary text-[15px]">{report.location}</p>
                      <p className="text-[13px] text-text-secondary mt-0.5 line-clamp-1">{report.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-[15px] text-text-secondary font-medium">No active reports. Good job!</p>
              </div>
            )}
          </div>
        </section>
        
      </div>
    </div>
  );
}
