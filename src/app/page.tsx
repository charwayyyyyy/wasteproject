import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Recycle, ShieldCheck, Truck, Users, Leaf, ArrowRight, AlertTriangle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="px-6 py-4 flex items-center justify-between border-b bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Recycle className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary tracking-tight">EcoLoop</span>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="/disposal-points" className="hover:text-primary transition-colors">Disposal Points</Link>
        </nav>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="outline">Demo Login</Button>
          </Link>
          <Link href="/login" className="hidden md:block">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-20 md:py-32 bg-primary/5 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl mb-6">
            Responsible waste disposal should not be the hardest option.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 text-balance">
            EcoLoop helps residents request pickups, report waste hotspots, find approved disposal points, and stay informed—while helping collectors and community leaders coordinate faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto text-base">
                Request a Pickup <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                Report a Waste Site <AlertTriangle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* How It Works - 4 Simple Steps */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How EcoLoop Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A simpler system for everyone in the community.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary border-4 border-white">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1. Request</h3>
              <p className="text-sm text-muted-foreground">Select your waste type and location to request a pickup.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary border-4 border-white">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">2. Match</h3>
              <p className="text-sm text-muted-foreground">A local collector accepts the request and maps their route.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary border-4 border-white">
                <Recycle className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3. Collect</h3>
              <p className="text-sm text-muted-foreground">Waste is collected on time and correctly disposed of.</p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary border-4 border-white">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">4. Reward</h3>
              <p className="text-sm text-muted-foreground">Earn EcoPoints for helping keep the community clean.</p>
            </div>
          </div>
        </section>

        {/* Roles Section */}
        <section className="px-6 py-24 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Built for the Whole Community</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Households & Businesses</CardTitle>
                  <CardDescription>Get reliable service when you need it.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  No more waiting for irregular trucks. Request a pickup, track its status, and know exactly when your waste will be collected.
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <Truck className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Waste Collectors</CardTitle>
                  <CardDescription>Optimize routes and find ready pickups.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  See where waste is waiting. Accept jobs in your area, track your daily collections, and communicate easily with residents.
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <ShieldCheck className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Community Administrators</CardTitle>
                  <CardDescription>Identify hotspots and manage services.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  View reports of illegal dumping, coordinate cleanups, and track the overall health of the community waste system.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trust & Practicality */}
        <section className="px-6 py-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">A Practical Response to Real Problems</h2>
          <p className="text-lg text-muted-foreground mb-8">
            EcoLoop is grounded in design thinking. We recognized that irregular collection forces people to dump waste in drains or burn it. We built this platform not as a smart-city gimmick, but as an honest, accessible coordination tool.
          </p>
          <Link href="/about">
            <Button variant="outline">Read our Design Process</Button>
          </Link>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Recycle className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">EcoLoop</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Built for SHS Innovation Hackathon — Case 13: The Waste That Has Nowhere To Go
          </p>
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/login" className="hover:text-primary">Demo Mode</Link>
            <Link href="/feedback" className="hover:text-primary">Prototype Feedback</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
