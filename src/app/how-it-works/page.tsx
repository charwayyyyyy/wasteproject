import Link from "next/link";
import { ArrowLeft, Users, Truck, ShieldCheck, Recycle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">How EcoLoop Works</h1>
        <p className="text-xl text-muted-foreground mb-12">
          EcoLoop provides different tools for different community members to create a complete, coordinated waste management system.
        </p>

        <div className="space-y-8">
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">For Residents & Businesses</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit a simple request when your waste is ready.</li>
                <li>Track the status so you know exactly when the collector is arriving.</li>
                <li>Report illegal dumping hotspots to the community leaders.</li>
                <li>Earn EcoPoints for responsible behavior.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">For Collectors</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>See assigned pickup requests in your area.</li>
                <li>Accept jobs and notify residents that you are en route.</li>
                <li>Mark jobs as complete to build a reliable history.</li>
                <li>Avoid wasting fuel on empty routes.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">For Administrators</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>View community waste requests on a central dashboard.</li>
                <li>Assign requests to available local collectors.</li>
                <li>Review and act upon reports of illegal dumping or blocked drains.</li>
                <li>Monitor service completion rates and overall community cleanliness.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Recycle className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">For Recycling Partners</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>See lists of separated recyclable materials across the community.</li>
                <li>Claim materials before they are sent to the general landfill.</li>
                <li>Coordinate directly for large commercial pickups.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
