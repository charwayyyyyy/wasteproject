"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Phone } from "lucide-react";
import { useDemoStore } from "@/store/demo-store";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DisposalPointsPage() {
  const { disposalPoints } = useDemoStore();

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Approved Disposal Points</h1>
          <p className="text-xl text-muted-foreground">
            Find official drop-off locations for your separated waste and recyclables.
          </p>
        </div>

        {disposalPoints.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-lg border">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No disposal points found</h3>
            <p className="text-muted-foreground">There are currently no approved disposal points listed for this community.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {disposalPoints.map((point) => (
              <Card key={point.id} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{point.name}</CardTitle>
                    <Badge variant={point.status === 'Open' ? 'default' : 'secondary'}>
                      {point.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{point.area}, {point.community}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <span>{point.address} {point.landmark && <span className="text-muted-foreground">({point.landmark})</span>}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <span>{point.opening_hours}</span>
                  </div>
                  {point.contact_phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-5 w-5 text-primary shrink-0" />
                      <span>{point.contact_phone}</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-muted/30 pt-4 border-t">
                  <div className="w-full">
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Accepted Waste Types</p>
                    <div className="flex flex-wrap gap-2">
                      {point.accepted_waste_types.map(type => (
                        <Badge key={type} variant="outline" className="bg-white">{type}</Badge>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
