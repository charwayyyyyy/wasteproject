import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, MapPin, Recycle, Smartphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <span className="font-bold text-lg leading-none">E</span>
            </div>
            <span className="font-bold tracking-tight text-xl text-text-primary">EcoLoop</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works" className="text-[15px] font-medium text-text-secondary hover:text-text-primary transition-colors">How it works</Link>
            <Link href="/disposal-points" className="text-[15px] font-medium text-text-secondary hover:text-text-primary transition-colors">Disposal points</Link>
            <Link href="/presentation" className="text-[15px] font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-information"></span>
              Pitch Mode
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:inline-block text-[15px] font-medium text-text-secondary hover:text-text-primary transition-colors">
              Log in
            </Link>
            <Button asChild className="rounded-full px-6 font-medium shadow-sm">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-background border border-success/20 text-success text-sm font-semibold mb-6 tracking-tight shadow-sm">
                <Leaf className="w-4 h-4" /> Case 13 Prototype
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight leading-[1.1] mb-6">
                The waste that has <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-information">nowhere to go.</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
                EcoLoop connects households directly with local collectors and verified disposal points, turning irregular waste management into a reliable, rewarding community utility.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="h-14 px-8 rounded-full text-base font-medium shadow-md hover:shadow-lg transition-all w-full sm:w-auto" asChild>
                  <Link href="/login">
                    Launch Prototype <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-medium bg-surface/50 backdrop-blur-sm border-border-strong w-full sm:w-auto" asChild>
                  <Link href="/presentation">View Hackathon Pitch</Link>
                </Button>
              </div>
            </div>

            {/* Layered Product Preview */}
            <div className="mt-16 md:mt-24 relative max-w-5xl mx-auto">
              <div className="absolute -inset-x-4 inset-y-0 bg-gradient-to-b from-transparent to-background z-20 pointer-events-none"></div>
              <div className="relative rounded-[2rem] border border-border-subtle bg-surface shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
                <div className="absolute top-0 left-0 right-0 h-12 bg-surface-muted border-b border-border-subtle flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-danger/80"></div>
                    <div className="w-3 h-3 rounded-full bg-warning/80"></div>
                    <div className="w-3 h-3 rounded-full bg-success/80"></div>
                  </div>
                  <div className="mx-auto px-3 py-1 rounded-md bg-surface border border-border-subtle text-[11px] font-medium text-text-tertiary flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" /> ecoloop.app
                  </div>
                </div>
                {/* Abstract mockup blocks */}
                <div className="pt-12 p-6 md:p-10 h-full bg-background-secondary flex gap-6">
                  {/* Sidebar mockup */}
                  <div className="hidden md:block w-48 space-y-4">
                    <div className="h-6 w-24 bg-border-strong/50 rounded-md mb-8"></div>
                    <div className="h-8 w-full bg-surface rounded-md shadow-sm"></div>
                    <div className="h-8 w-full bg-border-subtle/50 rounded-md"></div>
                    <div className="h-8 w-full bg-border-subtle/50 rounded-md"></div>
                  </div>
                  {/* Content mockup */}
                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-end mb-8">
                      <div className="space-y-2">
                        <div className="h-8 w-48 bg-border-strong/50 rounded-md"></div>
                        <div className="h-4 w-64 bg-border-subtle/50 rounded-md"></div>
                      </div>
                      <div className="h-10 w-32 bg-primary/20 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="h-32 bg-surface rounded-xl shadow-sm border border-border-subtle p-4">
                        <div className="h-10 w-10 bg-success-background rounded-full mb-3"></div>
                        <div className="h-4 w-24 bg-border-strong/50 rounded-md mb-2"></div>
                        <div className="h-3 w-16 bg-border-subtle/50 rounded-md"></div>
                      </div>
                      <div className="h-32 bg-surface rounded-xl shadow-sm border border-border-subtle p-4">
                        <div className="h-10 w-10 bg-information-background rounded-full mb-3"></div>
                        <div className="h-4 w-24 bg-border-strong/50 rounded-md mb-2"></div>
                        <div className="h-3 w-16 bg-border-subtle/50 rounded-md"></div>
                      </div>
                      <div className="hidden md:block h-32 bg-surface rounded-xl shadow-sm border border-border-subtle p-4">
                        <div className="h-10 w-10 bg-warning-background rounded-full mb-3"></div>
                        <div className="h-4 w-24 bg-border-strong/50 rounded-md mb-2"></div>
                        <div className="h-3 w-16 bg-border-subtle/50 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 bg-surface border-y border-border-subtle">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4">A complete ecosystem.</h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">We defined the problem not just as people not caring, but as the lack of a reliable, rewarding system.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-information-background flex items-center justify-center text-information">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">For Residents</h3>
                <p className="text-text-secondary leading-relaxed">Request pickups with one tap, track collector arrival in real-time, and earn EcoPoints for responsible disposal.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-warning-background flex items-center justify-center text-warning">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">For Collectors</h3>
                <p className="text-text-secondary leading-relaxed">View optimized routes, accept nearby jobs instantly, and guarantee payment upon successful drop-off.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-success-background flex items-center justify-center text-success">
                  <Recycle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">For Recyclers</h3>
                <p className="text-text-secondary leading-relaxed">Access a marketplace of pre-sorted materials ready for industrial collection at community disposal points.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-12 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-text-tertiary flex items-center justify-center text-white">
              <span className="font-bold text-xs leading-none">E</span>
            </div>
            <span className="font-medium text-text-secondary">EcoLoop Hackathon Prototype</span>
          </div>
          <div className="text-sm text-text-tertiary flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-success" />
            Designed for Case 13
          </div>
        </div>
      </footer>
    </div>
  );
}
