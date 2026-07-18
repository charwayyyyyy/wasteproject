"use client";

import { useState } from "react";
import { useDemoStore } from "@/store/demo-store";
import { 
  Package, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Clock,
  FilterX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";

export default function RecyclerClaimsPage() {
  const { currentUser, materials, completeMaterialClaim } = useDemoStore();
  const [activeTab, setActiveTab] = useState("active");
  
  // Mark Collected State
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [collectionDialogOpen, setCollectionDialogOpen] = useState(false);
  const [collectedQuantity, setCollectedQuantity] = useState("");
  const [collectionNotes, setCollectionNotes] = useState("");
  
  if (!currentUser || currentUser.role !== 'recycler') {
    return <EmptyState icon={Package} title="Unauthorized" description="Please log in as a recycler." />;
  }

  const myClaims = materials.filter(m => m.recycling_partner_id === currentUser.id);
  const activeClaims = myClaims.filter(m => m.status === 'Claimed');
  const completedClaims = myClaims.filter(m => m.status === 'Collected');

  const handleOpenCollection = (materialId: string, currentQuantity: string) => {
    setSelectedMaterialId(materialId);
    setCollectedQuantity(currentQuantity);
    setCollectionNotes("");
    setCollectionDialogOpen(true);
  };

  const handleCompleteSubmit = () => {
    if (!selectedMaterialId) return;

    const res = completeMaterialClaim(selectedMaterialId, currentUser.id, {
      quantity: collectedQuantity,
      note: collectionNotes
    });

    if (res.success) {
      toast.success(res.message);
      setCollectionDialogOpen(false);
    } else {
      toast.error(res.message);
    }
  };

  const renderClaimCard = (material: import("@/types").RecyclableMaterial, isActive: boolean) => {
    return (
      <div key={material.id} className="bg-surface border border-border-subtle p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-text-secondary">{material.id}</span>
            <Badge variant={isActive ? "secondary" : "default"}>
              {isActive ? "Claimed" : "Collected"}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg text-text-primary mb-1">{material.material_type}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-text-secondary mt-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-text-tertiary" />
              <span className="truncate">{material.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-text-tertiary" />
              <span>{isActive ? material.approximate_quantity : material.approximate_quantity}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-tertiary" />
              <span>{new Date(isActive ? (material.claimed_at || new Date().toISOString()) : (material.collected_at || new Date().toISOString())).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-text-tertiary" />
              <span>{new Date(isActive ? (material.claimed_at || new Date().toISOString()) : (material.collected_at || new Date().toISOString())).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
          </div>
        </div>
        
        <div className="flex md:flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-border-subtle justify-end">
          {isActive ? (
            <>
              <Button onClick={() => handleOpenCollection(material.id, material.approximate_quantity)}>
                Mark Collected
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/recycler/materials/${material.id}`}>View Details</Link>
              </Button>
            </>
          ) : (
            <Button variant="outline" asChild>
              <Link href={`/recycler/materials/${material.id}`}>View Receipt</Link>
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Material Sourcing</p>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">My Claims</h1>
          </div>
        </div>
        <p className="text-text-secondary text-[15px]">Manage your active material claims and track completed collections.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Active Claims ({activeClaims.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Collected ({completedClaims.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-0">
          <div className="space-y-4">
            {activeClaims.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No active claims"
                description="You haven't claimed any materials yet. Head to the marketplace to find available materials."
                actionLabel="Browse Marketplace"
                onAction={() => window.location.href = "/recycler"}
              />
            ) : (
              activeClaims.map(m => renderClaimCard(m, true))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <div className="space-y-4">
            {completedClaims.length === 0 ? (
              <EmptyState
                icon={FilterX}
                title="No completed collections"
                description="Once you collect your claimed materials, they will appear here."
              />
            ) : (
              completedClaims.map(m => renderClaimCard(m, false))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Mark Collected Dialog */}
      <Dialog open={collectionDialogOpen} onOpenChange={setCollectionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Collection</DialogTitle>
            <DialogDescription>
              Confirm the final details of the collected material to finalize this claim.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Final Quantity Collected</label>
              <Input 
                value={collectedQuantity} 
                onChange={e => setCollectedQuantity(e.target.value)} 
                placeholder="e.g. 50 kg" 
              />
              <p className="text-xs text-text-tertiary">Adjust if the actual amount differed from the estimate.</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (Optional)</label>
              <Input 
                value={collectionNotes} 
                onChange={e => setCollectionNotes(e.target.value)} 
                placeholder="Condition notes, partial collection details..." 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCollectionDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCompleteSubmit} disabled={!collectedQuantity}>
              Mark as Collected
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
