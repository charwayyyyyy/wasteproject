import Link from "next/link";
import { ArrowLeft, ArrowRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PresentationPage() {
  return (
    <div className="min-h-screen bg-text-primary text-white font-sans selection:bg-success/30">
      {/* Pitch Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-text-primary/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white" asChild>
            <Link href="/"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <span className="font-semibold tracking-tight text-lg text-white">Hackathon Pitch Mode</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/20 border border-success/30 text-success text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          Live Demo Ready
        </div>
      </header>

      {/* Main Pitch Content */}
      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <div className="space-y-32">
          
          {/* Slide 1: The Problem */}
          <section className="min-h-[60vh] flex flex-col justify-center">
            <h2 className="text-success font-bold tracking-widest uppercase text-sm mb-4">01. The Core Problem</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Waste isn&apos;t the problem.<br />
              <span className="text-white/40">Irregular collection is.</span>
            </h1>
            <p className="text-text-secondary text-lg mb-8 max-w-lg leading-relaxed">
              We&apos;re not just managing waste; we&apos;re building a closed-loop economy where nothing is truly wasted.
            </p>

            <blockquote className="border-l-4 border-success pl-4 italic text-lg text-text-tertiary mb-10 max-w-lg">
              &quot;How Might We give households a reliable, rewarding way to dispose of waste?&quot;
            </blockquote>
          </section>

          {/* Slide 2: The Solution */}
          <section className="min-h-[60vh] flex flex-col justify-center border-t border-white/10 pt-32">
            <h2 className="text-information font-bold tracking-widest uppercase text-sm mb-4">02. Our POV & Solution</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
              A community-driven<br />
              <span className="text-white/40">logistics network.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed mb-12">
              EcoLoop bridges the gap between households, local collectors, and verified disposal points. We turn waste into a tracked, rewarded commodity.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-information/20 flex items-center justify-center text-information mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold">Households</h3>
                <p className="text-white/60">Request pickups instantly and earn EcoPoints.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center text-warning mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold">Collectors</h3>
                <p className="text-white/60">See optimized local routes and guarantee payment.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center text-success mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold">Recyclers</h3>
                <p className="text-white/60">Buy pre-sorted materials from disposal points.</p>
              </div>
            </div>
          </section>

          {/* Slide 3: Live Demo CTA */}
          <section className="min-h-[60vh] flex flex-col justify-center items-center text-center border-t border-white/10 pt-32">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-8">
              <Navigation className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
              Experience the prototype.
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mb-12">
              We built a fully functional web application to prove this coordination works. Let&apos;s step into the shoes of our community.
            </p>
            <Button size="lg" className="h-16 px-10 rounded-full text-lg font-semibold bg-success hover:bg-success/90 text-white shadow-lg hover:shadow-success/20 hover:-translate-y-1 transition-all" asChild>
              <Link href="/login">
                Launch Live Demo <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
}
