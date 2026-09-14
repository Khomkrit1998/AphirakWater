import Link from "next/link"

import { site } from "@workspace/shared"
import { cn } from "@workspace/ui/lib/utils"

const item =
  "flex h-12 items-center justify-center rounded-[12px] text-[14.5px] font-semibold transition-colors"

// Mobile only (< 900px). The spacer keeps the footer from hiding under the bar.
export function StickyCta() {
  return (
    <>
      <div aria-hidden="true" className="h-[68px] min-[900px]:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t bg-background px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-sticky min-[900px]:hidden">
        <a
          href={site.phoneHref}
          className={cn(item, "bg-call text-white hover:bg-call-hover")}
        >
          โทร
        </a>
        <a
          href={site.lineHref}
          className={cn(item, "bg-soft text-brand-strong hover:bg-soft-hover")}
        >
          LINE
        </a>
        <Link
          href="/quote"
          className={cn(item, "bg-primary text-primary-foreground hover:bg-primary-hover")}
        >
          ขอราคาน้ำ
        </Link>
      </div>
    </>
  )
}
