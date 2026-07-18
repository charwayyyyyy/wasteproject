import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
      <div className="bg-surface border border-border-subtle rounded-2xl p-6 shadow-sm flex flex-col items-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
        </div>
        <h2 className="text-lg font-bold text-text-primary mb-1">Loading Content</h2>
        <p className="text-sm text-text-secondary">Please wait a moment while we prepare your dashboard.</p>
      </div>
    </div>
  );
}
