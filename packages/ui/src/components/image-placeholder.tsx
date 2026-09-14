import { ImageIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

// Stand-in for photos the client has not supplied yet. Replace with next/image.
function ImagePlaceholder({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex size-full flex-col items-center justify-center gap-2 bg-tint bg-[repeating-linear-gradient(135deg,transparent_0_12px,var(--tint-border)_12px_13px)] p-4 text-center text-sm text-muted-foreground",
        className
      )}
    >
      <ImageIcon className="size-6 text-ink-400" aria-hidden="true" />
      <span className="max-w-[28ch]">{label}</span>
    </div>
  )
}

export { ImagePlaceholder }
