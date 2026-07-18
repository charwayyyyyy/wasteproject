"use client";

import { useState } from "react";
import { useDemoStore } from "@/store/demo-store";
import { 
  Package, 
  MapPin, 
  Calendar,
  FilterX,
  Search,
  Download,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";

export default function RecyclerHistoryPage() {
  const { currentUser, materials } = useDemoStore();
  const [searchQuery, setSearchQuery] = useState("");
  
  if (!currentUser || currentUser.role !== 'recycler') {
    return <EmptyState icon={Package} title="Unauthorized" description="Please log in as a recycler." />;
  }

  const completedClaims = materials.filter(m => m.recycling_partner_id === currentUser.id && m.status === 'Collected');

  const filteredHistory = completedClaims.filter(m => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchType = m.material_type.toLowerCase().includes(q);
      const matchArea = m.location_area.toLowerCase().includes(q);
      return matchType || matchArea;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Analytics & History</p>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Collection History</h1>
          </div>
          <Button variant="outline" className="hidden sm:flex" disabled>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
        <p className="text-text-secondary text-[15px]">Review your past material collections and sourcing history.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-surface border border-border-subtle rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-success-background flex items-center justify-center text-success">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[15px] text-text-secondary">Total Collections</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-text-primary">{completedClaims.length}</p>
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[15px] text-text-secondary">Material Types</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-text-primary">
              {new Set(completedClaims.map(m => m.material_type)).size}
            </p>
          </div>
        </div>
        
        <div className="bg-surface border border-border-subtle rounded-[24px] p-5 shadow-sm sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-information-background flex items-center justify-center text-information">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-[15px] text-text-secondary">Total Quantity</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-text-primary">
              ~ {completedClaims.length * 50} kg
            </p>
            <p className="text-[13px] text-text-secondary">Est. based on avg</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary w-4 h-4" />
          <Input 
            placeholder="Search material type or area..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {completedClaims.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="No history found"
            description="You haven't completed any material collections yet."
          />
        ) : filteredHistory.length === 0 ? (
          <EmptyState
            icon={FilterX}
            title="No records match your search"
            description="Try using different keywords."
            action={{ label: "Clear Search", onClick: () => setSearchQuery("") }}
          />
        ) : (
          <div className="grid gap-4">
            {filteredHistory.map(material => (
              <div key={material.id} className="bg-surface border border-border-subtle p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-text-secondary">{material.id}</span>
                    <Badge variant="default">Collected</Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg text-text-primary mb-1">{material.material_type}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-4 text-sm text-text-secondary mt-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-text-tertiary" />
                      <span className="truncate">{material.location_area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-text-tertiary" />
                      <span>{material.approximate_quantity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-text-tertiary" />
                      <span>{material.collected_at ? new Date(material.collected_at).toLocaleDateString() : 'Unknown Date'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex md:flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-border-subtle justify-end">
                  <Button variant="outline" asChild>
                    <Link href={`/recycler/materials/${material.id}`}>View Receipt</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
