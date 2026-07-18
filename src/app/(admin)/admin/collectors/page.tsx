"use client";

import { useState } from "react";
import { useDemoStore } from "@/store/demo-store";
import { 
  Users, 
  Truck, 
  AlertTriangle, 
  UserX,
  Search,
  MapPin,
  Phone,
  UserCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";

export default function AdminCollectorsPage() {
  const { profiles, pickups, updateCollectorAvailability, resetDemo } = useDemoStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  
  // Status update state
  const [selectedCollectorId, setSelectedCollectorId] = useState<string | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");

  const collectors = profiles.filter(p => p.role === 'collector');

  // Derived metrics
  const totalCollectors = collectors.length;
  const availableCount = collectors.filter(c => !c.status || c.status === 'Available').length;
  const onRouteCount = collectors.filter(c => c.status === 'On Route').length;
  const atCapacityCount = collectors.filter(c => c.status === 'At Capacity').length;
  const offlineCount = collectors.filter(c => c.status === 'Offline').length;

  // Filtered list
  const filteredCollectors = collectors.filter(c => {
    const cStatus = c.status || 'Available';
    if (statusFilter !== "All" && cStatus !== statusFilter) return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = c.full_name.toLowerCase().includes(q);
      const matchArea = c.area.toLowerCase().includes(q);
      
      return matchName || matchArea;
    }
    
    return true;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Available': return 'default';
      case 'On Route': return 'secondary';
      case 'At Capacity': return 'warning';
      case 'Offline': return 'outline';
      default: return 'default';
    }
  };

  const handleOpenStatusDialog = (collectorId: string, currentStatus: string) => {
    setSelectedCollectorId(collectorId);
    setNewStatus(currentStatus || 'Available');
    setStatusDialogOpen(true);
  };

  const handleStatusSubmit = () => {
    if (!selectedCollectorId || !newStatus) return;
    
    const collectorPickups = pickups.filter(p => p.collector_id === selectedCollectorId && (p.status === 'Collector Assigned' || p.status === 'Collector En Route'));
    
    if (newStatus === 'Offline' && collectorPickups.length > 0) {
      toast.warning(`Collector has ${collectorPickups.length} active assignments. Reassign them first to ensure pickups are completed.`);
    }
    const res = updateCollectorAvailability(selectedCollectorId, newStatus as 'Available' | 'On Route' | 'At Capacity' | 'Offline');
    if (res.success) {
      toast.success(res.message);
      setStatusDialogOpen(false);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Administration</p>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Collectors</h1>
          </div>
          <Button variant="outline" onClick={() => resetDemo()}>Restore Demo Data</Button>
        </div>
        <p className="text-text-secondary text-[15px]">View collector availability, active assignments, and recent collection activity.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
            <Users className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{totalCollectors}</p>
          <p className="text-[11px] text-text-secondary uppercase font-semibold">Total Collectors</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-success-background text-success flex items-center justify-center mb-2">
            <UserCheck className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{availableCount}</p>
          <p className="text-[11px] text-text-secondary uppercase font-semibold">Available</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-information-background text-information flex items-center justify-center mb-2">
            <Truck className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{onRouteCount}</p>
          <p className="text-[11px] text-text-secondary uppercase font-semibold">On Route</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-warning-background text-warning flex items-center justify-center mb-2">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{atCapacityCount}</p>
          <p className="text-[11px] text-text-secondary uppercase font-semibold">At Capacity</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-muted text-text-secondary flex items-center justify-center mb-2">
            <UserX className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{offlineCount}</p>
          <p className="text-[11px] text-text-secondary uppercase font-semibold">Offline</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary w-4 h-4" />
          <Input 
            placeholder="Search collector name or area..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {["All", "Available", "On Route", "At Capacity", "Offline"].map(status => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="whitespace-nowrap"
            >
              {status}
            </Button>
          ))}
          {(statusFilter !== "All" || searchQuery) && (
            <Button variant="ghost" size="sm" onClick={() => { setStatusFilter("All"); setSearchQuery(""); }} className="text-text-secondary">
              <FilterX className="w-4 h-4 mr-2" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {collectors.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No collectors available"
            description="Collector profiles will appear here when they are added to the prototype network."
            action={{ label: "Restore Demo Collectors", onClick: () => resetDemo() }}
          />
        ) : filteredCollectors.length === 0 ? (
          <EmptyState
            icon={FilterX}
            title="No collectors match these filters"
            description="Adjust or clear the filters to see more collectors."
            action={{ label: "Clear Filters", onClick: () => { setStatusFilter("All"); setSearchQuery(""); } }}
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCollectors.map(collector => {
              const activePickups = pickups.filter(p => p.collector_id === collector.id && (p.status === 'Collector Assigned' || p.status === 'Collector En Route'));
              const completedPickups = pickups.filter(p => p.collector_id === collector.id && p.status === 'Collected');
              const cStatus = collector.status || 'Available';

              return (
                <div key={collector.id} className="bg-surface border border-border-subtle p-5 rounded-2xl shadow-sm flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {collector.full_name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{collector.full_name}</h3>
                        <p className="text-xs text-text-secondary">{collector.area}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusBadgeVariant(cStatus)}>{cStatus}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-muted p-2 rounded-lg">
                      <p className="text-xs text-text-secondary mb-1">Active</p>
                      <p className="font-semibold">{activePickups.length} Pickups</p>
                    </div>
                    <div className="bg-muted p-2 rounded-lg">
                      <p className="text-xs text-text-secondary mb-1">Completed</p>
                      <p className="font-semibold">{completedPickups.length} Today</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-text-secondary mb-6">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-text-tertiary" />
                      <span>{collector.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-text-tertiary" />
                      <span>{collector.community}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenStatusDialog(collector.id, cStatus)}>Set Status</Button>
                    <Button variant="secondary" size="sm" onClick={() => toast.info('Detail sheet prototype')}>View Details</Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Status Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Collector Status</DialogTitle>
            <DialogDescription>
              Change the prototype availability for this collector.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Availability Status</label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="On Route">On Route</SelectItem>
                  <SelectItem value="At Capacity">At Capacity</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newStatus === 'Offline' && (
              <div className="bg-warning-background text-warning p-3 rounded-lg flex items-start gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <p>Setting a collector to Offline while they have active assignments may delay pickups. Ensure reassignments are handled.</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleStatusSubmit}>
              Save Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
