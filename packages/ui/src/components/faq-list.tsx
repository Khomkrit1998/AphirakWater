import { MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

type FaqItem = { q: string; a: string }

// Native <details name> gives single-open behaviour with zero JS, and the
// answers stay in the DOM so crawlers and FAQPage schema can read them.
function FaqList({
  name,
  items,
  size = "default",
  className,
}: {
  name: string
  items: FaqItem[]
  size?: "default" | "sm"
  className?: string
}) {
  const sm = size === "sm"
  return (
    <div className={cn("grid", sm ? "gap-2.5" : "gap-3", className)}>
      {items.map((item, i) => (
        <details
          key={item.q}
          data-slot="faq-item"
          name={name}
          open={i === 0}
          className={cn(
            "group overflow-hidden border bg-card",
            sm ? "rounded-[14px]" : "rounded-[16px]"
          )}
        >
          <summary
            className={cn(
              "flex cursor-pointer list-none items-center hover:bg-row-hover [&::-webkit-details-marker]:hidden",
              sm ? "gap-3.5 px-5 py-[17px]" : "gap-4 px-[22px] py-5"
            )}
          >
            <h3
              className={cn(
                "flex-1 text-foreground",
                sm ? "text-[16.5px]" : "text-[17.5px]"
              )}
            >
              {item.q}
            </h3>
            <span
              aria-hidden="true"
              className={cn(
                "grid shrink-0 place-items-center rounded-lg bg-soft text-brand-strong transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none",
                sm ? "size-[26px]" : "size-7"
              )}
            >
              <PlusIcon className="size-4 group-open:hidden" />
              <MinusIcon className="hidden size-4 group-open:block" />
            </span>
          </summary>
          <p
            className={cn(
              "text-[15.5px] leading-[1.7] text-muted-foreground",
              sm ? "px-5 pb-5" : "px-[22px] pb-[22px]"
            )}
          >
            {item.a}
          </p>
        </details>
      ))}
    </div>
  )
}

export { FaqList, type FaqItem }
