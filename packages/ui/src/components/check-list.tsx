import { CheckIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

function CheckMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-[22px] shrink-0 place-items-center rounded-full bg-check text-brand-strong",
        className
      )}
    >
      <CheckIcon className="size-3" strokeWidth={3} />
    </span>
  )
}

function CheckList({
  items,
  className,
}: {
  items: string[]
  className?: string
}) {
  return (
    <ul
      className={cn(
        "grid gap-2.5 text-base leading-[1.65] text-ink-600",
        className
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckMark className="mt-[0.2em]" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export { CheckList, CheckMark }
