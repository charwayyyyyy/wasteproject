"use client";

import { useDemoStore } from "@/store/demo-store";
import { useParams } from "next/navigation";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ArrowLeft, MapPin, Package, Calendar, AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PickupStatus } from "@/types";

export default function PickupDetail() {
  const { id } = useParams();
  const { pickups, profiles } = useDemoStore();
  
  const pickup = pickups.find(p => p.id === id);
  
  if (!pickup) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Pickup Not Found</h2>
        <p className="text-muted-foreground mb-6">The requested pickup could not be found.</p>
        <Link href="/pickups" className="text-primary hover:underline">Return to Pickups</Link>
      </div>
    );
  }

  const collector = pickup.collector_id ? profiles.find(p => p.id === pickup.collector_id) : null;

  const STATUS_ORDER: PickupStatus[] = [
    'Submitted', 
    'Awaiting Assignment', 
    'Collector Assigned', 
    'Collector En Route', 
    'Collected'
  ];

  const currentStatusIndex = STATUS_ORDER.indexOf(pickup.status);
  const isCancelled = pickup.status === 'Cancelled' || pickup.status === 'Could Not Collect';

  const getStatusColor = (status: PickupStatus) => {
    if (status === 'Collected') return 'bg-green-500 text-white';
    if (status === 'Cancelled' || status === 'Could Not Collect') return 'bg-red-500 text-white';
    return 'bg-amber-500 text-white';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/pickups" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pickups
        </Link>
        <span className="text-xs font-mono text-muted-foreground">ID: {pickup.id}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold mb-2">{pickup.waste_type}</h1>
          <div className="flex items-center text-sm text-muted-foreground gap-4">
            <span className="flex items-center gap-1"><Package className="h-4 w-4" /> {pickup.quantity_category}</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {format(parseISO(pickup.preferred_date), 'MMM d, yyyy')}</span>
          </div>
        </div>
        <Badge className={`text-sm px-3 py-1 ${getStatusColor(pickup.status)} hover:${getStatusColor(pickup.status)}`}>
          {pickup.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Status Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              {isCancelled ? (
                <div className="bg-red-50 p-4 rounded-md border border-red-100 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Pickup {pickup.status}</h4>
                    <p className="text-sm text-red-700 mt-1">This request was cancelled. {pickup.notes && `Reason: ${pickup.notes}`}</p>
                  </div>
                </div>
              ) : (
                <div className="relative border-l-2 border-muted ml-3 space-y-8 py-2">
                  {STATUS_ORDER.map((status, index) => {
                    const isCompleted = currentStatusIndex >= index;
                    const isCurrent = currentStatusIndex === index;
                    
                    return (
                      <div key={status} className={`relative pl-6 ${isCompleted ? '' : 'opacity-50'}`}>
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                          isCompleted ? 'bg-primary border-primary' : 'bg-white border-muted-foreground'
                        }`}>
                          {isCompleted && <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>}
                        </div>
                        <h4 className={`font-semibold ${isCurrent ? 'text-primary' : ''}`}>{status}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {status === 'Submitted' && `Request received on ${format(parseISO(pickup.created_at), 'MMM d')}`}
                          {status === 'Awaiting Assignment' && 'Finding a collector in your area.'}
                          {status === 'Collector Assigned' && collector && `Assigned to ${collector.full_name}.`}
                          {status === 'Collector En Route' && 'The collector is on their way to your location.'}
                          {status === 'Collected' && pickup.collected_at && `Successfully collected on ${format(parseISO(pickup.collected_at), 'MMM d, p')}.`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-medium">{pickup.address}</p>
                  <p className="text-muted-foreground">{pickup.area}, {pickup.community}</p>
                  {pickup.landmark && <p className="text-muted-foreground italic mt-1">Near: {pickup.landmark}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {collector && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Collector Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
                    {collector.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{collector.full_name}</p>
                    <p className="text-xs text-muted-foreground">Local Collector</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {pickup.notes && (
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm bg-muted/50 p-3 rounded">{pickup.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
