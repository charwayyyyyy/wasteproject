"use client";

import { useDemoStore } from "@/store/demo-store";
import { format, parseISO } from "date-fns";
import { PackageCheck, Clock, MapPin, SearchX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PickupStatus } from "@/types";

export default function CollectorHistory() {
  const { currentUser, pickups } = useDemoStore();

  if (!currentUser) return null;

  // Find completed, could not collect, or cancelled pickups for this collector
  const historyPickups = pickups.filter(
    p => p.collector_id === currentUser.id && 
    (p.status === 'Collected' || p.status === 'Could Not Collect' || p.status === 'Cancelled')
  ).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const getStatusColor = (status: PickupStatus) => {
    if (status === 'Collected') return 'bg-success text-white';
    if (status === 'Cancelled' || status === 'Could Not Collect') return 'bg-destructive text-white';
    return 'bg-secondary text-secondary-foreground';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2">History</h1>
        <p className="text-text-secondary text-[15px]">Past pickups and completion records.</p>
      </div>

      <div className="space-y-4">
        {historyPickups.length > 0 ? (
          historyPickups.map((pickup) => (
            <div key={pickup.id} className="bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider text-[10px] ${getStatusColor(pickup.status)} hover:${getStatusColor(pickup.status)}`}>
                      {pickup.status}
                    </Badge>
                    <span className="text-sm text-text-secondary flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {format(parseISO(pickup.updated_at), 'MMM d, h:mm a')}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-text-primary tracking-tight mb-1">
                    {pickup.address || pickup.community}
                  </h3>
                  <div className="flex items-center text-[15px] text-text-secondary gap-4 mt-2">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {pickup.community}</span>
                    <span className="flex items-center gap-1.5 text-primary"><PackageCheck className="w-4 h-4" /> {pickup.waste_type.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyState 
            icon={SearchX}
            title="No history found"
            description="You haven't completed any pickups yet. Accepted jobs that are collected or marked as unable to collect will appear here."
          />
        )}
      </div>
    </div>
  );
}
