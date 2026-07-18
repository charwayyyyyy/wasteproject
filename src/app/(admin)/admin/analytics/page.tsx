"use client";

import { useDemoStore } from "@/store/demo-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Package, AlertTriangle, Gift } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

const COLORS = ['#22c55e', '#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#64748b'];

export default function AdminAnalytics() {
  const { pickups, reports, transactions } = useDemoStore();

  const totalPickups = pickups.length;
  const completedPickups = pickups.filter(p => p.status === 'Collected').length;
  const totalReports = reports.length;
  const totalEcoPoints = transactions.reduce((sum, t) => sum + t.points, 0);

  // Group pickups by waste type
  const pickupsByType = pickups.reduce((acc, pickup) => {
    const type = pickup.waste_type.replace('_', ' ');
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.entries(pickupsByType).map(([name, value]) => ({ name, value }));

  // Group reports by severity
  const reportsBySeverity = reports.reduce((acc, report) => {
    acc[report.severity] = (acc[report.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(reportsBySeverity).map(([name, value]) => ({ name, value }));

  if (totalPickups === 0 && totalReports === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">System Analytics</h1>
        <EmptyState 
          icon={TrendingUp}
          title="No data available"
          description="Analytics will appear here once residents start submitting pickups and reports."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 md:pb-0 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2">System Analytics</h1>
        <p className="text-text-secondary text-[15px]">Prototype metrics derived from local demonstration data.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pickups</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPickups}</div>
            <p className="text-xs text-muted-foreground">
              {completedPickups} successfully collected
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPickups > 0 ? Math.round((completedPickups / totalPickups) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Of all requested pickups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-xs text-muted-foreground">
              Community site reports
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EcoPoints Issued</CardTitle>
            <Gift className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEcoPoints}</div>
            <p className="text-xs text-muted-foreground">
              Prototype rewards distributed
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Pickups by Waste Type</CardTitle>
            <CardDescription>Distribution of requested collection categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {barChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }} 
                    angle={-45} 
                    textAnchor="end"
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No data available</div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Reports by Severity</CardTitle>
            <CardDescription>Breakdown of reported illegal dumping sites</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col items-center">
            {pieChartData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex gap-4 text-xs mt-2 justify-center flex-wrap">
                  {pieChartData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span>{entry.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No data available</div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="sr-only">
        {/* Screen reader only text summaries for accessibility */}
        <h2>Analytics Summary</h2>
        <p>Total pickups requested: {totalPickups}, with {completedPickups} successfully collected.</p>
        <p>Total reports submitted: {totalReports}.</p>
        <p>Total EcoPoints distributed: {totalEcoPoints}.</p>
        <h3>Pickups by waste type:</h3>
        <ul>
          {barChartData.map(d => (
            <li key={`sr-bar-${d.name}`}>{d.name}: {d.value}</li>
          ))}
        </ul>
        <h3>Reports by severity:</h3>
        <ul>
          {pieChartData.map(d => (
            <li key={`sr-pie-${d.name}`}>{d.name}: {d.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
