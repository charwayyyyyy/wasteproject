"use client";

import { useDemoStore } from "@/store/demo-store";
import { useState } from "react";
import { MapPin, Phone, CheckCircle2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";

export default function CollectorDashboard() {
  const { currentUser, pickups, updatePickupStatus, addEcoPoints } = useDemoStore();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  if (!currentUser) return null;

  const activeRoute = pickups.filter(p => p.collector_id === currentUser.id && (p.status === 'Collector Assigned' || p.status === 'Collector En Route'));

  const handleStatusUpdate = (pickupId: string, newStatus: "Collector Assigned" | "Collector En Route" | "Collected", residentId: string) => {
    setIsUpdating(pickupId);
    setTimeout(() => {
      updatePickupStatus(pickupId, newStatus);
      
      if (newStatus === 'Collected') {
        const pointsAwarded = 50;
        addEcoPoints(residentId, pointsAwarded, 'Successful waste pickup');
        addEcoPoints(currentUser.id, 10, 'Pickup completed');
      }
      setIsUpdating(null);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0">
      
      {/* Header */}
      <div className="bg-success-background border border-success/20 rounded-[20px] p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-success mb-1 tracking-tight">Active Route</h1>
            <p className="text-success/70 text-[15px]">{currentUser.area} Sector</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center text-success">
            <Truck className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-success/10 flex gap-6">
          <div>
            <p className="text-xs font-semibold text-success/60 uppercase tracking-wider mb-0.5">Assigned Stops</p>
            <p className="font-bold text-xl text-success">{activeRoute.length}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-success/60 uppercase tracking-wider mb-0.5">Est. Time</p>
            <p className="font-bold text-xl text-success">{activeRoute.length * 15} min</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between ml-1 mr-1">
        <h2 className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider">Your Stops Today</h2>
        <Link href="/collector/requests" className="text-sm font-medium text-success hover:underline">Find More Jobs</Link>
      </div>

      {/* Stop List */}
      <div className="space-y-4">
        {activeRoute.length > 0 ? (
          activeRoute.map((pickup, index) => (
            <div key={pickup.id} className="bg-surface border border-border-subtle rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-1 mt-1 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center font-bold text-text-secondary text-sm border border-border-strong">
                      {index + 1}
                    </div>
                    {index !== activeRoute.length - 1 && (
                      <div className="w-0.5 h-10 bg-border-subtle rounded-full hidden sm:block"></div>
                    )}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface-muted text-[11px] font-semibold text-text-secondary mb-2 uppercase tracking-wider">
                      {pickup.waste_type.replace('_', ' ')} • {pickup.quantity_category}
                    </div>
                    <h3 className="text-lg font-bold text-text-primary tracking-tight mb-1">{pickup.address || pickup.community}</h3>
                    <p className="text-[15px] text-text-secondary flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> Drop-off Point Alpha
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-border-subtle">
                  {pickup.status === 'Collector Assigned' ? (
                    <Button 
                      onClick={() => handleStatusUpdate(pickup.id, 'Collector En Route', pickup.user_id)}
                      disabled={isUpdating === pickup.id}
                      className="w-full sm:w-40 rounded-xl bg-text-primary hover:bg-black text-white font-medium shadow-sm h-12"
                    >
                      {isUpdating === pickup.id ? 'Updating...' : 'Start Navigation'}
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleStatusUpdate(pickup.id, 'Collected', pickup.user_id)}
                      disabled={isUpdating === pickup.id}
                      className="w-full sm:w-40 rounded-xl bg-success hover:bg-success/90 text-white font-medium shadow-sm h-12"
                    >
                      {isUpdating === pickup.id ? 'Marking...' : 'Mark Collected'}
                    </Button>
                  )}
                  <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl shrink-0 sm:hidden">
                    <Phone className="w-5 h-5 text-text-secondary" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyState 
            icon={CheckCircle2}
            title="Route complete"
            description="You have no assigned pickups right now. Check the requests board to claim nearby jobs."
            actionLabel="View Nearby Requests"
            onAction={() => window.location.href = '/collector/requests'}
          />
        )}
      </div>

    </div>
  );
}
