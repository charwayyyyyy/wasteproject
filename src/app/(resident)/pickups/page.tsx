"use client";

import { useDemoStore } from "@/store/demo-store";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PickupsListPage() {
  const { currentUser, pickups } = useDemoStore();
  
  if (!currentUser) return null;

  const userPickups = pickups.filter(p => p.user_id === currentUser.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

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
      <div className="flex justify-between items-center bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Pickups</h1>
          <p className="text-muted-foreground text-sm">Manage your waste collection requests</p>
        </div>
        <Link href="/pickups/new">
          <Button className="hidden md:flex gap-2">
            <PlusCircle className="h-4 w-4" /> New Request
          </Button>
          <Button size="icon" className="md:hidden">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {userPickups.length === 0 ? (
        <div className="bg-white border rounded-lg p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-lg font-medium mb-2">No pickup requests yet</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            When your waste is ready for collection, you can submit a request and track it here.
          </p>
          <Link href="/pickups/new">
            <Button>Request a Pickup</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {userPickups.map((pickup) => (
            <Card key={pickup.id} className="border-0 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link href={`/pickups/${pickup.id}`}>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{pickup.waste_type}</h3>
                        <Badge variant={getStatusBadgeVariant(pickup.status)} className={
                          pickup.status !== 'Collected' && pickup.status !== 'Cancelled' && pickup.status !== 'Could Not Collect' 
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200' 
                            : ''
                        }>
                          {pickup.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 mt-3">
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                          <MapPin className="h-4 w-4 shrink-0" /> {pickup.address}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                          <Clock className="h-4 w-4 shrink-0" /> Requested for: {format(parseISO(pickup.preferred_date), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 md:w-32 flex items-center justify-center border-t md:border-t-0 md:border-l">
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:underline">
                        View <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
