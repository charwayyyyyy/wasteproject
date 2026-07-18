"use client";

import { useDemoStore } from "@/store/demo-store";
import { notFound, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  Package,
  Info,
  Clock,
  User,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";

export default function MaterialDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { materials, profiles, pickups, currentUser, claimMaterial } = useDemoStore();
  const material = materials.find(m => m.id === id);

  if (!material) {
    notFound();
  }

  const pickup = pickups.find(p => p.id === material.pickup_id);
  const generator = pickup ? profiles.find(p => p.id === pickup.user_id) : undefined;
  const isAvailable = material.status === 'Available';
  const isMyClaim = material.recycling_partner_id === currentUser?.id;

  const handleClaim = () => {
    if (!currentUser) {
      toast.error("Please log in to claim materials");
      return;
    }
    
    const res = claimMaterial(material.id, currentUser.id);
    if (res.success) {
      toast.success(res.message);
      router.push('/recycler/claims');
    } else {
      toast.error(res.message);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Available': return 'default';
      case 'Claimed': return 'secondary';
      case 'Collected': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20 md:pb-0">
      
      {/* Back Navigation */}
      <div>
        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent text-text-secondary hover:text-text-primary mb-4">
          <Link href="/recycler">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-mono bg-muted px-2 py-1 rounded text-text-secondary">{material.id}</span>
              {material.status === 'Available' ? (
                <Badge className="bg-success text-white hover:bg-success">Available</Badge>
              ) : (
                <Badge variant={getStatusBadgeVariant(material.status)}>{material.status}</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">{material.material_type}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {isAvailable && (
              <Button onClick={handleClaim} className="w-full sm:w-auto">
                Claim Material
              </Button>
            )}
            {material.status === 'Claimed' && isMyClaim && (
              <Button asChild className="w-full sm:w-auto">
                <Link href="/recycler/claims">Manage in Claims</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Listing Details
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">Material Category</p>
                <p className="font-semibold text-text-primary">{material.material_type}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-text-secondary mb-1">Estimated Quantity</p>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-text-tertiary" />
                  <p className="font-semibold text-text-primary">{material.approximate_quantity}</p>
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-text-secondary mb-1">Reported Condition</p>
                <p className="text-text-primary bg-muted/50 p-3 rounded-lg border border-border-subtle">
                  {pickup?.notes || "No additional notes provided."}
                </p>
              </div>
            </div>
          </div>
          
          {/* Timeline / History */}
          <div className="bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Timeline
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <div className="w-px h-10 bg-border-subtle" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">Listed on Marketplace</p>
                  <p className="text-sm text-text-secondary">{new Date(material.available_at).toLocaleString()}</p>
                </div>
              </div>
              
              {material.claimed_at && (
                <div className="flex gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-information" />
                    {material.collected_at && <div className="w-px h-10 bg-border-subtle" />}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Claimed by Recycler</p>
                    <p className="text-sm text-text-secondary">{new Date(material.claimed_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
              
              {material.collected_at && (
                <div className="flex gap-4">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-success" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">Collected & Processed</p>
                    <p className="text-sm text-text-secondary">{new Date(material.collected_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          <div className="bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Location
            </h2>
            <p className="font-semibold text-text-primary mb-1">{material.area}</p>
            {material.status === 'Claimed' && isMyClaim ? (
              <p className="text-sm text-text-secondary">Full address provided upon claim approval.</p>
            ) : (
              <p className="text-sm text-text-secondary">Exact location is hidden until the material is claimed to protect privacy.</p>
            )}
          </div>
          
          <div className="bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Generator
            </h2>
            
            {generator ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {generator.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{generator.full_name}</p>
                    <p className="text-xs text-text-secondary capitalize">{generator.role}</p>
                  </div>
                </div>
                {isMyClaim && (
                  <div className="pt-3 border-t border-border-subtle">
                    <p className="text-sm text-text-secondary mb-1">Contact</p>
                    <p className="text-sm font-medium text-text-primary">{generator.phone}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-text-secondary">Generator details unavailable.</p>
            )}
          </div>
          
          <div className="bg-success-background border border-success/20 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-success-foreground mb-1">Quality Guaranteed</p>
              <p className="text-xs text-success-foreground/80">
                EcoLoop verifies listings and ensures material handlers adhere to environmental safety guidelines.
              </p>
            </div>
          </div>
          
        </div>

      </div>

    </div>
  );
}
