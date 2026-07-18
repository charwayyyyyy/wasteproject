"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface HydrationGateProps {
  children: React.ReactNode;
}

export function HydrationGate({ children }: HydrationGateProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm font-medium text-muted-foreground">Loading prototype data...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
