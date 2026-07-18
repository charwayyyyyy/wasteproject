"use client";

import { useDemoStore } from "@/store/demo-store";
import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, CheckCircle2, Factory } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function RecyclerDashboard() {
  const { currentUser, materials, claimMaterial, disposalPoints } = useDemoStore();
  const [activeTab, setActiveTab] = useState("available");
  
  if (!currentUser) return null;

  const availableMaterials = materials.filter(m => m.status === 'Available')
    .sort((a, b) => new Date(a.available_from).getTime() - new Date(b.available_from).getTime());
    
  const claimedMaterials = materials.filter(m => m.recycling_partner_id === currentUser.id)
    .sort((a, b) => new Date(b.claimed_at || '').getTime() - new Date(a.claimed_at || '').getTime());

  const handleClaim = (id: string) => {
    claimMaterial(id, currentUser.id);
    toast.success("Material claimed successfully. You can now coordinate pickup.");
  };

  const getDisposalPointName = (id: string) => {
    return disposalPoints.find(dp => dp.id === id)?.name || "Unknown Location";
  };

  const getDisposalPointAddress = (id: string) => {
    return disposalPoints.find(dp => dp.id === id)?.address || "Unknown Address";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 bg-white p-6 rounded-lg border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold mb-1">Materials Marketplace</h1>
          <p className="text-muted-foreground text-sm">Find and claim separated recyclable materials in the community.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center bg-green-50 px-4 py-2 rounded-md border border-green-100">
            <p className="text-xs font-semibold text-green-800 uppercase tracking-wider mb-0.5">Available</p>
            <p className="text-xl font-bold text-green-700">{availableMaterials.length}</p>
          </div>
          <div className="text-center bg-blue-50 px-4 py-2 rounded-md border border-blue-100">
            <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-0.5">My Claims</p>
            <p className="text-xl font-bold text-blue-700">{claimedMaterials.length}</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="available">Available Materials</TabsTrigger>
          <TabsTrigger value="claims">My Claims</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-6">
          {availableMaterials.length === 0 ? (
            <div className="bg-white border rounded-lg p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No materials available</h3>
              <p className="text-muted-foreground">There are currently no separated materials ready for recycling. Check back later.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {availableMaterials.map((material) => (
                <Card key={material.id} className="border-0 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                          {material.type}
                        </Badge>
                        <CardTitle className="text-xl">{material.quantity}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-xs text-muted-foreground">
                        {material.quality_rating} Quality
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3 pt-4">
                    <div className="flex items-start gap-3 text-sm">
                      <Factory className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">{getDisposalPointName(material.location_id)}</p>
                        <p className="text-muted-foreground mt-0.5">{getDisposalPointAddress(material.location_id)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Package className="h-4 w-4 shrink-0" /> Available since {format(parseISO(material.available_from), 'MMM d')}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4 px-4 border-t bg-slate-50 mt-4 rounded-b-lg">
                    <Button className="w-full mt-4" onClick={() => handleClaim(material.id)}>
                      Claim Material
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="claims" className="mt-6">
          {claimedMaterials.length === 0 ? (
            <div className="bg-white border rounded-lg p-12 text-center shadow-sm">
              <h3 className="text-lg font-medium mb-2">No claims yet</h3>
              <p className="text-muted-foreground">Materials you claim will appear here.</p>
              <Button variant="link" onClick={() => setActiveTab("available")}>Browse available materials</Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {claimedMaterials.map((material) => (
                <Card key={material.id} className="border-0 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                  <div className="flex flex-col md:flex-row">
                    <CardContent className="p-5 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{material.type}</h3>
                          <Badge variant="outline">{material.quantity}</Badge>
                        </div>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                          {material.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mt-4 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">{getDisposalPointName(material.location_id)}</p>
                            <p className="text-muted-foreground text-xs">{getDisposalPointAddress(material.location_id)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0" /> Claimed on {format(parseISO(material.claimed_at!), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </CardContent>
                    
                    <div className="bg-slate-50 p-4 md:w-64 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l">
                      <p className="text-sm font-medium mb-2">Coordinate Pickup</p>
                      <Button variant="outline" className="w-full text-xs" onClick={() => toast.info("Contact info revealed.")}>
                        View Contact Info
                      </Button>
                      <Button variant="default" className="w-full text-xs" onClick={() => toast.success("Marked as collected.")}>
                        Mark as Collected
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
