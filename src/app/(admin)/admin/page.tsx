"use client";

import { useDemoStore } from "@/store/demo-store";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, AlertTriangle, Users, MapPin, CheckCircle2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const { currentUser, pickups, reports, profiles } = useDemoStore();
  
  if (!currentUser) return null;

  const communityPickups = pickups.filter(p => p.community === currentUser.community);
  const communityReports = reports.filter(r => r.community === currentUser.community);
  const communityUsers = profiles.filter(p => p.community === currentUser.community);

  const activeReports = communityReports.filter(r => r.status !== 'Cleared');
  const completedPickupsToday = communityPickups.filter(p => 
    p.status === 'Collected' &&
    new Date(p.collected_at || p.updated_at).toDateString() === new Date().toDateString()
  ).length;

  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'Collected': return 'default';
      case 'Cancelled': 
      case 'Could Not Collect': return 'destructive';
      case 'Draft': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold mb-1">Community Overview</h1>
          <p className="text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {currentUser.community}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">System Status</p>
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            All Systems Operational
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pickups Today</p>
                <h3 className="text-3xl font-bold">{completedPickupsToday}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium mr-1">+12%</span> from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Reports</p>
                <h3 className="text-3xl font-bold">{activeReports.length}</h3>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              {activeReports.filter(r => r.severity === 'Urgent').length} urgent issues
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registered Users</p>
                <h3 className="text-3xl font-bold">{communityUsers.length}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              {communityUsers.filter(u => u.role === 'collector').length} active collectors
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Pickups Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Pickups Activity</CardTitle>
            <CardDescription>Latest collection requests across the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityPickups.slice(0, 5).map(pickup => (
                <div key={pickup.id} className="flex justify-between items-center pb-4 border-b last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{pickup.waste_type}</p>
                    <p className="text-sm text-muted-foreground">{pickup.area} • {format(parseISO(pickup.created_at), 'MMM d')}</p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(pickup.status)} className={
                    pickup.status !== 'Collected' && pickup.status !== 'Cancelled' && pickup.status !== 'Could Not Collect' 
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200' 
                      : ''
                  }>
                    {pickup.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hotspots Overview */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Dumping Hotspots</CardTitle>
            <CardDescription>Areas with multiple reports requiring attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeReports.slice(0, 5).map(report => (
                <div key={report.id} className="flex justify-between items-center pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertTriangle className={`h-4 w-4 ${report.severity === 'Urgent' ? 'text-red-500' : 'text-amber-500'}`} />
                    </div>
                    <div>
                      <p className="font-medium line-clamp-1">{report.location}</p>
                      <p className="text-sm text-muted-foreground">{report.waste_type}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{format(parseISO(report.created_at), 'MMM d')}</span>
                </div>
              ))}
              {activeReports.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No active reports. Community is clean!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
