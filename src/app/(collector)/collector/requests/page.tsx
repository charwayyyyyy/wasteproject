"use client";

import { toast } from "sonner";
import { useDemoStore } from "@/store/demo-store";
import { useState } from "react";
import { MapPin, Navigation, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";

export default function CollectorRequests() {
  const { currentUser, pickups, updatePickupStatus } = useDemoStore();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  if (!currentUser) return null;

  // Find pickups that are pending in the collector's area
  const availableRequests = pickups.filter(p => p.status === 'Submitted');

  const handleClaim = (id: string) => {
    setIsUpdating(id);
    setTimeout(() => {
      updatePickupStatus(id, 'Collector Assigned', currentUser.id);
      toast.success("Pickup claimed successfully! Added to your active route.");
      setIsUpdating(null);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0">
      
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2">Available Jobs</h1>
        <p className="text-text-secondary text-[15px]">Pickups requested in your immediate area ({currentUser.area}).</p>
      </div>

      <div className="space-y-4">
        {availableRequests.length > 0 ? (
          availableRequests.map((pickup) => (
            <div key={pickup.id} className="bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-information-background text-[11px] font-semibold text-information mb-2 uppercase tracking-wider">
                    {pickup.waste_type.replace('_', ' ')} • {pickup.quantity_category}
                  </div>
                  <h3 className="font-bold text-lg text-text-primary tracking-tight mb-1">{pickup.address || pickup.community}</h3>
                  <div className="flex items-center text-[15px] text-text-secondary gap-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> 2.4 km away</span>
                    <span className="flex items-center gap-1.5"><Navigation className="w-4 h-4" /> Drop at Alpha Point</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center justify-center gap-2 border-t sm:border-0 border-border-subtle pt-4 sm:pt-0 mt-2 sm:mt-0">
                  <Link href={`/collector/requests/${pickup.id}`} className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-32 rounded-xl h-12 font-medium">Details</Button>
                  </Link>
                  <Button 
                    onClick={() => handleClaim(pickup.id)}
                    disabled={isUpdating === pickup.id}
                    className="w-full sm:w-32 rounded-xl bg-success hover:bg-success/90 text-white font-medium shadow-sm h-12"
                  >
                    {isUpdating === pickup.id ? 'Accepting...' : 'Accept Job'}
                  </Button>
                </div>
              </div>
              
            </div>
          ))
        ) : (
          <EmptyState 
            icon={ListTodo}
            title="No nearby requests"
            description="There are currently no pending waste pickups in your designated sector. Check back later."
          />
        )}
      </div>

    </div>
  );
}
