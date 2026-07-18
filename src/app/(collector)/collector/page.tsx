"use client";

import { useDemoStore } from "@/store/demo-store";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { MapPin, Truck, CheckCircle2, Clock, Map, Navigation, Phone, Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function CollectorDashboard() {
  const { currentUser, pickups, updatePickupStatus, addEcoPoints, profiles } = useDemoStore();
  const [activeTab, setActiveTab] = useState("my-route");

  if (!currentUser) return null;

  // Filter jobs
  const myAssignedPickups = pickups.filter(p => 
    p.collector_id === currentUser.id && 
    (p.status === 'Collector Assigned' || p.status === 'Collector En Route')
  ).sort((a, b) => new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime());

  const availablePickups = pickups.filter(p => 
    p.area === currentUser.area && 
    (p.status === 'Submitted' || p.status === 'Awaiting Assignment')
  ).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const completedToday = pickups.filter(p => 
    p.collector_id === currentUser.id && 
    p.status === 'Collected' &&
    new Date(p.collected_at || p.updated_at).toDateString() === new Date().toDateString()
  ).length;

  const handleAcceptJob = (pickupId: string) => {
    updatePickupStatus(pickupId, 'Collector Assigned', currentUser.id);
    toast.success("Job accepted and added to your route.");
  };

  const handleStartJob = (pickupId: string) => {
    updatePickupStatus(pickupId, 'Collector En Route', currentUser.id);
    toast.info("Status updated. The resident has been notified.");
  };

  const handleCompleteJob = (pickupId: string, residentId: string, wasteType: string) => {
    updatePickupStatus(pickupId, 'Collected', currentUser.id);
    
    // Reward the resident
    const points = wasteType.includes('Plastic') || wasteType.includes('Recyclable') ? 50 : 20;
    addEcoPoints(residentId, points, `Waste collection: ${wasteType}`);
    
    toast.success("Collection complete! Resident has been rewarded.");
  };

  const getUserPhone = (userId: string) => {
    return profiles.find(p => p.id === userId)?.phone || "No phone provided";
  };
  const getUserName = (userId: string) => {
    return profiles.find(p => p.id === userId)?.full_name || "Resident";
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm bg-blue-600 text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-blue-100 font-medium mb-1">Active Route</p>
              <h2 className="text-3xl font-bold">{myAssignedPickups.length} <span className="text-lg font-normal text-blue-200">jobs</span></h2>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <Map className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground font-medium mb-1">Available Nearby</p>
              <h2 className="text-3xl font-bold">{availablePickups.length} <span className="text-lg font-normal text-muted-foreground">requests</span></h2>
            </div>
            <div className="bg-slate-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-slate-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground font-medium mb-1">Completed Today</p>
              <h2 className="text-3xl font-bold">{completedToday} <span className="text-lg font-normal text-muted-foreground">pickups</span></h2>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="my-route">My Route ({myAssignedPickups.length})</TabsTrigger>
          <TabsTrigger value="available">Available ({availablePickups.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-route" className="mt-6 space-y-4">
          {myAssignedPickups.length === 0 ? (
            <div className="bg-white border rounded-lg p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No active jobs</h3>
              <p className="text-muted-foreground mb-4">You have no assigned pickups in your route.</p>
              <Button onClick={() => setActiveTab("available")}>Find Nearby Requests</Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {myAssignedPickups.map((pickup) => (
                <Card key={pickup.id} className="border-0 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                  <div className="flex flex-col md:flex-row">
                    <CardContent className="p-5 flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <Badge variant={pickup.status === 'Collector En Route' ? 'default' : 'secondary'} className="mb-2">
                            {pickup.status}
                          </Badge>
                          <h3 className="font-semibold text-lg">{pickup.waste_type}</h3>
                        </div>
                        <span className="text-sm font-medium bg-slate-100 px-2.5 py-1 rounded-md">{pickup.quantity_category}</span>
                      </div>
                      
                      <div className="space-y-2 mt-4 text-sm">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">{pickup.address}</p>
                            {pickup.landmark && <p className="text-muted-foreground text-xs">Near: {pickup.landmark}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Clock className="h-4 w-4 shrink-0" /> Requested: {format(parseISO(pickup.preferred_date), 'MMM d')}
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <Phone className="h-4 w-4 shrink-0" /> {getUserName(pickup.user_id)} - {getUserPhone(pickup.user_id)}
                        </div>
                      </div>

                      {pickup.notes && (
                        <div className="mt-4 bg-slate-50 p-3 rounded text-sm text-slate-700">
                          <strong>Note:</strong> {pickup.notes}
                        </div>
                      )}
                    </CardContent>
                    
                    <div className="bg-slate-50 p-4 md:w-48 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l">
                      {pickup.status === 'Collector Assigned' ? (
                        <>
                          <Button className="w-full" onClick={() => handleStartJob(pickup.id)}>
                            <Navigation className="mr-2 h-4 w-4" /> Start Route
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleCompleteJob(pickup.id, pickup.user_id, pickup.waste_type)}>
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Complete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available" className="mt-6 space-y-4">
          {availablePickups.length === 0 ? (
            <div className="bg-white border rounded-lg p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No available requests</h3>
              <p className="text-muted-foreground">There are no pending waste collection requests in your registered area ({currentUser.area}) right now.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {availablePickups.map((pickup) => (
                <Card key={pickup.id} className="border-0 shadow-sm flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{pickup.waste_type}</h3>
                      <Badge variant="outline">{pickup.quantity_category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{pickup.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0" />
                      <span>{format(parseISO(pickup.preferred_date), 'MMM d')}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t bg-slate-50">
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => handleAcceptJob(pickup.id)}>
                      Accept Request
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
