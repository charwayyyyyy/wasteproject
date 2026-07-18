"use client";

import { useDemoStore } from "@/store/demo-store";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ArrowLeft, MapPin, Package, Calendar, Navigation, Phone, User, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PickupStatus } from "@/types";

export default function CollectorRequestDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { currentUser, pickups, profiles, updatePickupStatus } = useDemoStore();
  const [isUpdating, setIsUpdating] = useState(false);

  const pickup = pickups.find(p => p.id === id);
  
  if (!pickup || !currentUser) {
    return (
      <div className="text-center py-20 animate-in fade-in">
        <h2 className="text-2xl font-bold mb-2 text-text-primary">Request Not Found</h2>
        <p className="text-text-secondary mb-6">The requested pickup could not be found.</p>
        <Link href="/collector/requests" className="text-primary font-medium hover:underline">Return to Requests</Link>
      </div>
    );
  }

  const resident = profiles.find(p => p.id === pickup.user_id);

  const handleStatusChange = (newStatus: PickupStatus, successMessage: string) => {
    setIsUpdating(true);
    setTimeout(() => {
      updatePickupStatus(pickup.id, newStatus, currentUser.id);
      toast.success(successMessage);
      setIsUpdating(false);
      
      if (newStatus === 'Collected' || newStatus === 'Could Not Collect') {
        router.push('/collector/history');
      }
    }, 600);
  };

  const getStatusColor = (status: PickupStatus) => {
    if (status === 'Collected') return 'bg-success text-white';
    if (status === 'Cancelled' || status === 'Could Not Collect') return 'bg-destructive text-white';
    if (status === 'Collector En Route') return 'bg-primary text-primary-foreground';
    return 'bg-amber-500 text-white';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <Link href="/collector/requests" className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Link>
        <span className="text-xs font-mono text-text-secondary opacity-70">ID: {pickup.id}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-information-background text-[11px] font-semibold text-information mb-2 uppercase tracking-wider">
            {pickup.waste_type.replace('_', ' ')} • {pickup.quantity_category}
          </div>
          <h1 className="text-2xl font-bold mb-2 text-text-primary tracking-tight">{pickup.address || pickup.community}</h1>
          <div className="flex items-center text-sm text-text-secondary gap-4">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> 2.4 km away</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {format(parseISO(pickup.preferred_date), 'MMM d')}</span>
          </div>
        </div>
        <Badge className={`text-sm px-3 py-1 ${getStatusColor(pickup.status)} hover:${getStatusColor(pickup.status)}`}>
          {pickup.status}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-border-subtle">
          <CardHeader>
            <CardTitle className="text-lg">Resident Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-text-primary">{resident?.full_name || 'Anonymous Resident'}</p>
                <p className="text-sm text-text-secondary">Resident</p>
              </div>
            </div>
            {resident?.phone && (
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <Phone className="h-4 w-4" />
                {resident.phone}
              </div>
            )}
            <div className="flex items-center gap-3 text-text-secondary text-sm">
              <MapPin className="h-4 w-4" />
              {pickup.address || pickup.community}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border-subtle">
          <CardHeader>
            <CardTitle className="text-lg">Collection Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(pickup.status === 'Submitted' || pickup.status === 'Awaiting Assignment') && (
              <Button 
                onClick={() => handleStatusChange('Collector Assigned', 'Job accepted successfully')}
                disabled={isUpdating}
                className="w-full bg-success hover:bg-success/90 h-12 rounded-xl text-md"
              >
                Accept Job
              </Button>
            )}

            {pickup.status === 'Collector Assigned' && pickup.collector_id === currentUser.id && (
              <>
                <Button 
                  onClick={() => handleStatusChange('Collector En Route', 'Status updated to En Route')}
                  disabled={isUpdating}
                  className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl text-md"
                >
                  <Navigation className="mr-2 h-4 w-4" /> Start Trip
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleStatusChange('Could Not Collect', 'Marked as unable to collect')}
                  disabled={isUpdating}
                  className="w-full h-12 rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" /> Unable to Collect
                </Button>
              </>
            )}

            {pickup.status === 'Collector En Route' && pickup.collector_id === currentUser.id && (
              <>
                <Button 
                  onClick={() => handleStatusChange('Collected', 'Pickup marked as collected!')}
                  disabled={isUpdating}
                  className="w-full bg-success hover:bg-success/90 h-12 rounded-xl text-md"
                >
                  <Package className="mr-2 h-4 w-4" /> Mark Collected
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleStatusChange('Could Not Collect', 'Marked as unable to collect')}
                  disabled={isUpdating}
                  className="w-full h-12 rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" /> Unable to Collect
                </Button>
              </>
            )}

            {(pickup.status === 'Collected' || pickup.status === 'Cancelled' || pickup.status === 'Could Not Collect') && (
              <div className="bg-muted/50 p-4 rounded-xl text-center text-sm text-text-secondary">
                This request has been closed and requires no further action.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
