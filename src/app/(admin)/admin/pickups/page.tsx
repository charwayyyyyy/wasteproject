"use client";

import { useState } from "react";
import { useDemoStore } from "@/store/demo-store";
import { 
  ClipboardList, 
  UserCheck, 
  Truck, 
  CheckCircle2, 
  XCircle,
  Search,
  FilterX,
  MapPin,
  Calendar,
  User,
  AlertCircle
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

export default function AdminPickupsPage() {
  const { pickups, profiles, assignCollectorToPickup, reassignCollector, resetDemo } = useDemoStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  
  // Assignment state
  const [selectedPickupId, setSelectedPickupId] = useState<string | null>(null);
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);
  const [selectedCollectorId, setSelectedCollectorId] = useState<string>("");
  const [isReassigning, setIsReassigning] = useState(false);
  const [reassignReason, setReassignReason] = useState<string>("");

  // Derived metrics
  const awaitingAssignment = pickups.filter(p => p.status === 'Submitted' || p.status === 'Awaiting Assignment').length;
  const assigned = pickups.filter(p => p.status === 'Collector Assigned').length;
  const enRoute = pickups.filter(p => p.status === 'Collector En Route').length;
  
  const today = new Date().toISOString().split('T')[0];
  const completedToday = pickups.filter(p => p.status === 'Collected' && p.collected_at?.startsWith(today)).length;
  const couldNotCollect = pickups.filter(p => p.status === 'Could Not Collect').length;

  // Filtered list
  const filteredPickups = pickups.filter(p => {
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const resident = profiles.find(prof => prof.id === p.user_id);
      const collector = p.collector_id ? profiles.find(prof => prof.id === p.collector_id) : null;
      
      const matchRef = p.id.toLowerCase().includes(q);
      const matchArea = p.area.toLowerCase().includes(q);
      const matchResident = resident?.full_name.toLowerCase().includes(q) || false;
      const matchCollector = collector?.full_name.toLowerCase().includes(q) || false;
      
      return matchRef || matchArea || matchResident || matchCollector;
    }
    
    return true;
  });

  // Sort: Unassigned first, then by date
  filteredPickups.sort((a, b) => {
    const unassignedA = (a.status === 'Submitted' || a.status === 'Awaiting Assignment') ? 1 : 0;
    const unassignedB = (b.status === 'Submitted' || b.status === 'Awaiting Assignment') ? 1 : 0;
    if (unassignedA !== unassignedB) return unassignedB - unassignedA;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Collected': return 'default';
      case 'Could Not Collect':
      case 'Cancelled': return 'destructive';
      case 'Collector Assigned':
      case 'Collector En Route': return 'secondary';
      default: return 'outline';
    }
  };

  const handleOpenAssign = (pickupId: string, currentCollectorId?: string) => {
    setSelectedPickupId(pickupId);
    if (currentCollectorId) {
      setIsReassigning(true);
      setSelectedCollectorId(currentCollectorId);
    } else {
      setIsReassigning(false);
      setSelectedCollectorId("");
    }
    setReassignReason("");
    setAssignmentDialogOpen(true);
  };

  const handleAssignSubmit = () => {
    if (!selectedPickupId || !selectedCollectorId) return;

    if (isReassigning) {
      if (!reassignReason) {
        toast.error("Please provide a reason for reassignment");
        return;
      }
      const res = reassignCollector(selectedPickupId, selectedCollectorId, reassignReason);
      if (res.success) {
        toast.success(res.message);
        setAssignmentDialogOpen(false);
      } else {
        toast.error(res.message);
      }
    } else {
      const res = assignCollectorToPickup(selectedPickupId, selectedCollectorId);
      if (res.success) {
        toast.success(res.message);
        setAssignmentDialogOpen(false);
      } else {
        toast.error(res.message);
      }
    }
  };

  const availableCollectors = profiles.filter(p => p.role === 'collector');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Administration</p>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">Pickup Management</h1>
          </div>
          <Button variant="outline" onClick={() => resetDemo()}>Reset Demo Data</Button>
        </div>
        <p className="text-text-secondary text-[15px]">Monitor collection requests, assign collectors, and follow each pickup through completion.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-warning-background text-warning flex items-center justify-center mb-2">
            <ClipboardList className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{awaitingAssignment}</p>
          <p className="text-[11px] text-text-secondary uppercase font-semibold">Awaiting</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-information-background text-information flex items-center justify-center mb-2">
            <UserCheck className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{assigned}</p>
          <p className="text-[11px] text-text-secondary uppercase font-semibold">Assigned</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
            <Truck className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{enRoute}</p>
          <p className="text-[11px] text-text-secondary uppercase font-semibold">En Route</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-success-background text-success flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{completedToday}</p>
          <p className="text-[11px] text-text-secondary uppercase font-semibold">Completed Today</p>
        </div>
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-full bg-danger-background text-danger flex items-center justify-center mb-2">
            <XCircle className="w-4 h-4" />
          </div>
          <p className="text-2xl font-bold">{couldNotCollect}</p>
          <p className="text-[11px] text-text-secondary uppercase font-semibold">Could Not Collect</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary w-4 h-4" />
          <Input 
            placeholder="Search reference, resident, or area..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {["All", "Submitted", "Awaiting Assignment", "Collector Assigned", "Collector En Route", "Collected", "Cancelled", "Could Not Collect"].map(status => (
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
        {pickups.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No pickup requests yet"
            description="Pickup requests from residents and businesses will appear here."
          />
        ) : filteredPickups.length === 0 ? (
          <EmptyState
            icon={FilterX}
            title="No pickups match these filters"
            description="Adjust or clear the filters to see more requests."
            action={{ label: "Clear Filters", onClick: () => { setStatusFilter("All"); setSearchQuery(""); } }}
          />
        ) : (
          <div className="grid gap-4">
            {filteredPickups.map(pickup => {
              const resident = profiles.find(p => p.id === pickup.user_id);
              const collector = pickup.collector_id ? profiles.find(p => p.id === pickup.collector_id) : null;
              
              const isAssignable = pickup.status === 'Submitted' || pickup.status === 'Awaiting Assignment';
              const isReassignable = pickup.status === 'Collector Assigned' || pickup.status === 'Could Not Collect';

              return (
                <div key={pickup.id} className="bg-surface border border-border-subtle p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center gap-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-text-secondary">{pickup.id}</span>
                      <Badge variant={getStatusBadgeVariant(pickup.status)}>{pickup.status}</Badge>
                      {pickup.priority === 1 && <Badge variant="destructive" className="ml-auto md:ml-0 text-[10px]">Urgent</Badge>}
                    </div>
                    
                    <h3 className="font-semibold text-lg text-text-primary mb-1">{resident?.full_name || 'Unknown Resident'}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm text-text-secondary mt-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-text-tertiary" />
                        <span className="truncate">{pickup.address}, {pickup.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-text-tertiary" />
                        <span>{new Date(pickup.preferred_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-text-tertiary" />
                        <span>Collector: {collector ? collector.full_name : <span className="italic text-text-tertiary">Unassigned</span>}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-text-tertiary" />
                        <span>{pickup.waste_type} ({pickup.quantity_category})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-border-subtle justify-end">
                    {isAssignable && (
                      <Button onClick={() => handleOpenAssign(pickup.id)}>Assign Collector</Button>
                    )}
                    {isReassignable && (
                      <Button variant="outline" onClick={() => handleOpenAssign(pickup.id, pickup.collector_id)}>Reassign Collector</Button>
                    )}
                    <Button variant="ghost" className="text-primary hover:text-primary-hover hover:bg-primary/5">View Details</Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Assignment Dialog */}
      <Dialog open={assignmentDialogOpen} onOpenChange={setAssignmentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isReassigning ? "Reassign Collector" : "Assign Collector"}</DialogTitle>
            <DialogDescription>
              Select an available collector to handle this pickup request.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Collector</label>
              <Select value={selectedCollectorId} onValueChange={setSelectedCollectorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a collector" />
                </SelectTrigger>
                <SelectContent>
                  {availableCollectors.map(collector => (
                    <SelectItem key={collector.id} value={collector.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{collector.full_name}</span>
                        <span className="text-xs text-text-tertiary ml-4">{collector.status || 'Available'} - {collector.area}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {isReassigning && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for Reassignment</label>
                <Input 
                  value={reassignReason} 
                  onChange={e => setReassignReason(e.target.value)} 
                  placeholder="e.g. Vehicle breakdown, workload balancing..." 
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignmentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAssignSubmit} disabled={!selectedCollectorId || (isReassigning && !reassignReason)}>
              {isReassigning ? "Confirm Reassignment" : "Assign Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
