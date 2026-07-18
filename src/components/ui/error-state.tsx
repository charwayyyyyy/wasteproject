import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  returnTo?: string;
  returnLabel?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this information. Please try again.",
  onRetry,
  returnTo = "/",
  returnLabel = "Return Home",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-surface border border-border-subtle rounded-[20px] shadow-sm">
      <div className="h-16 w-16 bg-danger-background rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="h-8 w-8 text-danger" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-[15px] text-text-secondary max-w-[280px] leading-relaxed mb-8">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {onRetry && (
          <Button onClick={onRetry} variant="default" className="rounded-xl px-6 font-medium">
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        )}
        <Button variant={onRetry ? "outline" : "default"} asChild className="rounded-xl px-6 font-medium">
          <Link href={returnTo}>{returnLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
