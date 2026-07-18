"use client";

import { useDemoStore } from "@/store/demo-store";
import { Recycle, Navigation, MapPin, CheckCircle2, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EmptyState } from "@/components/ui/empty-state";

export default function RecyclerDashboard() {
  const { currentUser, pickups, updatePickupStatus } = useDemoStore();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  if (!currentUser) return null;

  // Recyclers see completed pickups as "Marketplace Inventory"
  const availableMaterials = pickups.filter(p => p.status === 'Collected');

  const handleClaim = (pickupId: string) => {
    setIsUpdating(pickupId);
    setTimeout(() => {
      // In a real system, we'd transfer ownership to the recycler and trigger payment.
      // For the demo, we'll mark it as 'claimed' or similar, but since we don't have a 'claimed' status 
      // in our simple demo state machine, we can just remove it from 'completed' view by marking it 'archived'.
      // To not break other views, let's just pretend for the demo interaction.
      updatePickupStatus(pickupId, 'archived' as any);
      setIsUpdating(null);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary mb-1">Material Marketplace</h1>
          <p className="text-text-secondary text-[15px]">Buy pre-sorted, collected waste directly from community disposal points.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-surface p-3 pr-5 rounded-2xl border border-border-subtle shadow-sm w-fit">
          <div className="w-10 h-10 rounded-xl bg-success-background flex items-center justify-center text-success">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Account Balance</p>
            <p className="font-bold text-lg text-text-primary leading-tight">₵4,250.00</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableMaterials.length > 0 ? (
          availableMaterials.map((material) => (
            <div key={material.id} className="bg-surface border border-border-subtle rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="p-5 border-b border-border-subtle">
                <div className="flex justify-between items-start mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-success-background text-[11px] font-semibold text-success uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Sort
                  </div>
                  <span className="font-bold text-text-primary">₵{material.quantity_category === 'large' ? '120' : material.quantity_category === 'medium' ? '45' : '15'}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary tracking-tight capitalize mb-1">
                  {material.waste_type.replace('_', ' ')} • {material.quantity_category}
                </h3>
                <p className="text-[14px] text-text-secondary flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-text-tertiary" /> Available at {(material.address || material.community).split(',')[0]} Hub
                </p>
              </div>
              <div className="p-5 bg-background-secondary mt-auto">
                <Button 
                  onClick={() => handleClaim(material.id)}
                  disabled={isUpdating === material.id}
                  className="w-full h-12 rounded-xl bg-text-primary hover:bg-black text-white font-medium shadow-sm"
                >
                  {isUpdating === material.id ? 'Processing...' : 'Purchase & Claim'}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState 
              icon={Recycle}
              title="No materials available"
              description="There is currently no processed inventory at the disposal hubs. Check back soon."
            />
          </div>
        )}
      </div>

    </div>
  );
}
