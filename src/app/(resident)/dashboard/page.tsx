"use client";

import { useDemoStore } from "@/store/demo-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, PlusCircle, AlertTriangle, Gift, Calendar, ArrowRight, Lightbulb, Clock } from "lucide-react";
import Link from "next/link";
import { format, isAfter, parseISO } from "date-fns";

export default function ResidentDashboard() {
  const { currentUser, pickups, reports, transactions } = useDemoStore();

  if (!currentUser) return null;

  const userPickups = pickups.filter(p => p.user_id === currentUser.id);
  const activePickups = userPickups.filter(p => p.status !== 'Collected' && p.status !== 'Cancelled' && p.status !== 'Could Not Collect');
  const nextPickup = activePickups.sort((a, b) => new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime())[0];
  
  const userReports = reports.filter(r => r.reporter_id === currentUser.id);
  const recentReport = userReports.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

  const totalPoints = transactions.filter(t => t.user_id === currentUser.id).reduce((sum, tx) => sum + tx.points, 0);

  return (
    <div className="space-y-6">
      {/* Greeting Section */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold mb-1">Hello, {currentUser.full_name.split(' ')[0]}</h1>
          <p className="text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {currentUser.area}, {currentUser.community}
          </p>
        </div>
        
        {nextPickup ? (
          <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Next Expected Pickup</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-medium">{format(parseISO(nextPickup.preferred_date), 'EEEE, MMM do')}</span>
            </div>
          </div>
        ) : (
          <div className="bg-muted/50 p-4 rounded-md border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Next Expected Pickup</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">Not scheduled</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Link href="/pickups/new">
            <Button className="w-full h-auto flex flex-col items-center justify-center gap-2 py-4 shadow-sm" variant="outline">
              <PlusCircle className="h-6 w-6 text-primary" />
              <span className="text-sm">Request Pickup</span>
            </Button>
          </Link>
          <Link href="/reports/new">
            <Button className="w-full h-auto flex flex-col items-center justify-center gap-2 py-4 shadow-sm" variant="outline">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <span className="text-sm">Report Waste</span>
            </Button>
          </Link>
          <Link href="/disposal-points">
            <Button className="w-full h-auto flex flex-col items-center justify-center gap-2 py-4 shadow-sm" variant="outline">
              <MapPin className="h-6 w-6 text-blue-500" />
              <span className="text-sm">Disposal Points</span>
            </Button>
          </Link>
          <Link href="/rewards">
            <Button className="w-full h-auto flex flex-col items-center justify-center gap-2 py-4 shadow-sm" variant="outline">
              <Gift className="h-6 w-6 text-green-500" />
              <span className="text-sm">View Rewards</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Active Pickup Card */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              Active Request
              {activePickups.length > 1 && (
                <span className="text-xs bg-muted px-2 py-1 rounded-full font-normal">
                  {activePickups.length} active
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextPickup ? (
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{nextPickup.waste_type}</p>
                    <p className="text-sm text-muted-foreground">{nextPickup.quantity_category}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {nextPickup.status}
                  </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <Clock className="h-4 w-4" /> Requested for {format(parseISO(nextPickup.preferred_date), 'MMM d, yyyy')}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground text-sm mb-3">No active pickup requests.</p>
                <Link href="/pickups/new">
                  <Button variant="link" className="p-0 h-auto text-primary">Schedule a pickup</Button>
                </Link>
              </div>
            )}
          </CardContent>
          {nextPickup && (
            <CardFooter className="pt-0 pb-4">
              <Link href={`/pickups/${nextPickup.id}`} className="w-full">
                <Button variant="ghost" className="w-full justify-between text-sm h-9">
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          )}
        </Card>

        {/* EcoPoints Card */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" /> EcoPoints Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-2">
              <span className="text-4xl font-bold text-primary">{totalPoints}</span>
              <span className="text-sm text-muted-foreground mt-1">points earned</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0 pb-4">
            <Link href="/rewards" className="w-full">
              <Button variant="ghost" className="w-full justify-between text-sm h-9">
                View History <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Recent Report */}
        {recentReport && (
          <Card className="border-0 shadow-sm md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Report Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-muted/30 p-4 rounded-lg border">
                <div>
                  <p className="font-medium text-sm flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" /> {recentReport.location}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Reported {format(parseISO(recentReport.created_at), 'MMM d')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {recentReport.status}
                  </span>
                  <Link href={`/reports/${recentReport.id}`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Education Tip */}
        <Card className="border-0 shadow-sm bg-primary/5 border-primary/10 md:col-span-2">
          <CardContent className="p-4 flex gap-4 items-start">
            <div className="bg-white p-2 rounded-full text-primary shrink-0">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1 text-primary">Waste Separation Tip</h4>
              <p className="text-sm text-muted-foreground">Keep your plastics separate from organic waste. Dry, clean plastics are easily recycled and can earn you more EcoPoints when collected by our partners.</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
