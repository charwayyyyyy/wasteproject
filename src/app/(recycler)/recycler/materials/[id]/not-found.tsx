import { PackageX } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <PackageX className="w-8 h-8 text-text-tertiary" />
      </div>
      <h2 className="text-xl font-bold text-text-primary">Material Not Found</h2>
      <p className="text-text-secondary text-sm">The material listing you are looking for does not exist or has been removed.</p>
      <Button asChild className="mt-4">
        <Link href="/recycler">Return to Marketplace</Link>
      </Button>
    </div>
  )
}
