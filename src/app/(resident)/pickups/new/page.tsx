"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemoStore } from "@/store/demo-store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronRight, Package, Box, MapPin, CalendarClock, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const WASTE_TYPES = [
  { id: 'plastic', label: 'Plastics', description: 'Bottles, containers, wrapping', icon: Box },
  { id: 'organic', label: 'Organic', description: 'Food scraps, yard waste', icon: LeafIcon },
  { id: 'electronic', label: 'E-Waste', description: 'Batteries, old devices', icon: Package },
  { id: 'mixed', label: 'Mixed General', description: 'Unsorted household waste', icon: Package },
];

const QUANTITIES = [
  { id: 'small', label: 'Small (1-2 bags)' },
  { id: 'medium', label: 'Medium (3-5 bags)' },
  { id: 'large', label: 'Large (Bulk/Furniture)' },
];

function LeafIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 14 6h7v7a7 7 0 0 1-7 7Z"/><path d="M11 20a7 7 0 0 0 7-7v-7"/><path d="M11 20a7 7 0 0 1-7-7v-7h7Z"/>
    </svg>
  );
}

export default function NewPickup() {
  const router = useRouter();
  const { currentUser, addPickup } = useDemoStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [wasteType, setWasteType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [notes, setNotes] = useState('');

  if (!currentUser) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate network delay for polish
    setTimeout(() => {
      addPickup({
        user_id: currentUser.id,
        waste_type: wasteType,
        quantity_category: quantity,
        address: currentUser.area,
        community: currentUser.community,
        status: 'Submitted',
        scheduled_date: scheduledDate || new Date().toISOString().split('T')[0],
        notes
      });
      router.push('/pickups?success=true');
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto pb-20 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={() => step > 1 ? setStep(step - 1) : router.push('/dashboard')}>
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-text-primary tracking-tight">Request Pickup</h1>
        </div>
        <div className="text-sm font-medium text-text-tertiary">
          Step {step} of 3
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-surface-muted rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="bg-surface border border-border-subtle rounded-[24px] p-6 shadow-sm min-h-[400px] flex flex-col">
        
        {/* Step 1: What are you throwing away? */}
        {step === 1 && (
          <div className="flex-1 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-2">What are you throwing away?</h2>
            <p className="text-text-secondary mb-6 text-[15px]">Select the primary type of waste to help us assign the right collector.</p>
            
            <div className="space-y-3">
              {WASTE_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setWasteType(type.id)}
                  className={cn(
                    "w-full text-left flex items-center p-4 rounded-[16px] border transition-all active:scale-[0.98]",
                    wasteType === type.id 
                      ? "border-primary bg-success-background ring-1 ring-primary shadow-sm" 
                      : "border-border-subtle bg-surface hover:border-border-strong"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                    wasteType === type.id ? "bg-primary text-white" : "bg-surface-muted text-text-secondary"
                  )}>
                    <type.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[15px] text-text-primary">{type.label}</h3>
                    <p className="text-[13px] text-text-secondary">{type.description}</p>
                  </div>
                  {wasteType === type.id && <CheckCircle2 className="w-5 h-5 text-primary ml-2" />}
                </button>
              ))}
            </div>
            
            <div className="mt-8">
              <Button 
                onClick={() => setStep(2)} 
                disabled={!wasteType}
                className="w-full h-14 rounded-xl text-[15px] font-semibold"
              >
                Continue <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: How much and When? */}
        {step === 2 && (
          <div className="flex-1 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-2">Details & Timing</h2>
            <p className="text-text-secondary mb-6 text-[15px]">Help the collector prepare for the volume.</p>
            
            <div className="space-y-6">
              <div>
                <label className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider block mb-3 ml-1">Estimated Quantity</label>
                <div className="flex gap-2 bg-surface-muted p-1 rounded-xl">
                  {QUANTITIES.map(q => (
                    <button
                      key={q.id}
                      onClick={() => setQuantity(q.id)}
                      className={cn(
                        "flex-1 py-2.5 text-[13px] font-medium rounded-lg transition-all",
                        quantity === q.id 
                          ? "bg-surface text-text-primary shadow-sm" 
                          : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                      {q.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider block mb-3 ml-1">Preferred Date</label>
                <div className="relative">
                  <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input 
                    type="date" 
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full h-12 bg-surface border border-border-subtle rounded-xl pl-10 pr-4 text-[15px] text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-8">
              <Button 
                onClick={() => setStep(3)} 
                disabled={!quantity || !scheduledDate}
                className="w-full h-14 rounded-xl text-[15px] font-semibold"
              >
                Continue <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {step === 3 && (
          <div className="flex-1 animate-in slide-in-from-right-4 duration-300 flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-2">Review Request</h2>
            <p className="text-text-secondary mb-6 text-[15px]">Confirm the details before submitting.</p>
            
            <div className="bg-surface-muted rounded-[16px] p-5 space-y-4 mb-6">
              <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[13px] text-text-secondary font-medium uppercase tracking-wider">Type</p>
                    <p className="font-semibold text-text-primary capitalize">{wasteType.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[13px] text-text-secondary font-medium uppercase tracking-wider">Volume</p>
                  <p className="font-semibold text-text-primary capitalize">{quantity}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-text-tertiary mt-0.5" />
                <div>
                  <p className="font-medium text-[15px] text-text-primary">{currentUser.area}</p>
                  <p className="text-[13px] text-text-secondary">{currentUser.community}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CalendarClock className="w-5 h-5 text-text-tertiary mt-0.5" />
                <div>
                  <p className="font-medium text-[15px] text-text-primary">{scheduledDate}</p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider block mb-2 ml-1">Additional Notes (Optional)</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Gate code, specific placement..."
                className="w-full bg-surface border border-border-subtle rounded-xl p-3 text-[15px] text-text-primary focus:outline-none focus:border-primary resize-none h-24"
              />
            </div>
            
            <div className="mt-auto pt-6">
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl text-[15px] font-semibold bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
                ) : (
                  'Confirm & Request'
                )}
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
