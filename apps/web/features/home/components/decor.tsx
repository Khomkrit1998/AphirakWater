import { cn } from "@workspace/ui/lib/utils"

// Purely decorative background layers. Parents need `relative isolate` so the
// -z-10 layers sit above the section background but below its content.

export function WaveField({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("wave-field absolute -z-10", className)} />
}

export function WaterGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full bg-radial from-brand/14 via-brand/5 via-45% to-transparent to-70%",
        className
      )}
    />
  )
}

export function BigWord({ children, className }: { children: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-nosnippet=""
      className={cn(
        // Outline only: fill is hidden separately so text-* can set the stroke colour.
        "pointer-events-none absolute -z-10 font-heading leading-none font-bold tracking-[-0.03em] whitespace-nowrap select-none [-webkit-text-fill-color:transparent] [-webkit-text-stroke:1.5px_currentColor]",
        className
      )}
    >
      {children}
    </span>
  )
}
