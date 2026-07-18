import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-surface border border-border-subtle rounded-[20px] shadow-sm">
      <div className="h-16 w-16 bg-surface-muted rounded-full flex items-center justify-center mb-6">
        <Icon className="h-8 w-8 text-text-tertiary" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-[15px] text-text-secondary max-w-[280px] leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="rounded-xl px-6 font-medium">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
