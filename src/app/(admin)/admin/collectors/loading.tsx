import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-muted-foreground text-sm font-medium animate-pulse">Loading collectors...</p>
    </div>
  )
}
