"use client";

import { useDemoStore } from "@/store/demo-store";
import { format, parseISO } from "date-fns";
import { BarChart3, AlertTriangle, Users, CalendarClock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { pickups, reports, users } = useDemoStore();

  const totalPickups = pickups.length;
  const completedPickups = pickups.filter(p => p.status === 'completed').length;
  
  const activeReports = reports.filter(r => r.status !== 'cleared');
  const criticalReports = reports.filter(r => r.severity === 'high' && r.status !== 'cleared');

  const totalUsers = users.filter(u => u.role !== 'admin').length;
  const activeCollectors = users.filter(u => u.role === 'collector').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-1">System Overview</h1>
        <p className="text-text-secondary text-[15px]">Monitor the real-time status of your community waste network.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-surface border border-border-subtle rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CalendarClock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[15px] text-text-secondary">Total Pickups</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-text-primary">{totalPickups}</p>
            <p className="text-[13px] font-medium text-success flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12%
            </p>
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-warning-background flex items-center justify-center text-warning">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[15px] text-text-secondary">Active Reports</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-text-primary">{activeReports.length}</p>
            {criticalReports.length > 0 && (
              <p className="text-[13px] font-medium text-danger bg-danger-background px-2 py-0.5 rounded-full">
                {criticalReports.length} Critical
              </p>
            )}
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-information-background flex items-center justify-center text-information">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[15px] text-text-secondary">Network Size</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-text-primary">{totalUsers}</p>
            <p className="text-[13px] font-medium text-text-secondary">
              {activeCollectors} active collectors
            </p>
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-success-background flex items-center justify-center text-success">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[15px] text-text-secondary">Resolution Rate</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-text-primary">
              {totalPickups > 0 ? Math.round((completedPickups / totalPickups) * 100) : 0}%
            </p>
          </div>
        </div>
        
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Pickups Table/List */}
        <section className="bg-surface border border-border-subtle rounded-[24px] overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border-subtle flex items-center justify-between">
            <h2 className="font-bold text-lg text-text-primary">Recent Pickups</h2>
            <Button variant="ghost" size="sm" asChild className="h-8 text-primary">
              <Link href="/admin/pickups">View All</Link>
            </Button>
          </div>
          <div className="divide-y divide-border-subtle">
            {pickups.slice(0, 4).map(pickup => (
              <div key={pickup.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[15px] text-text-primary capitalize">{pickup.waste_type.replace('_', ' ')}</p>
                  <p className="text-[13px] text-text-secondary">{pickup.location}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                  pickup.status === 'completed' ? 'bg-success-background text-success' : 
                  pickup.status === 'in_progress' ? 'bg-information-background text-information' : 
                  'bg-warning-background text-warning'
                }`}>
                  {pickup.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Needed */}
        <section className="bg-surface border border-border-subtle rounded-[24px] overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border-subtle flex items-center justify-between">
            <h2 className="font-bold text-lg text-text-primary">Reports Needing Triage</h2>
            <Button variant="ghost" size="sm" asChild className="h-8 text-primary">
              <Link href="/admin/reports">View All</Link>
            </Button>
          </div>
          <div className="divide-y divide-border-subtle">
            {activeReports.slice(0, 4).map(report => (
              <div key={report.id} className="p-4 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[15px] text-text-primary truncate">{report.location}</p>
                  <p className="text-[13px] text-text-secondary truncate">{report.description}</p>
                </div>
                <Button size="sm" variant="outline" asChild className="rounded-xl shrink-0">
                  <Link href={`/admin/reports/${report.id}`}>Review</Link>
                </Button>
              </div>
            ))}
            {activeReports.length === 0 && (
              <div className="p-8 text-center text-text-secondary text-[15px]">
                No active reports.
              </div>
            )}
          </div>
        </section>
      </div>

    </div>
  );
}
