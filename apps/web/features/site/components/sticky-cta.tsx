import Link from "next/link"
import { FileTextIcon, PhoneIcon } from "lucide-react"
import { siLine, siWhatsapp } from "simple-icons"

import { site } from "@workspace/shared"
import { cn } from "@workspace/ui/lib/utils"

import { BrandIcon } from "./contact-icons"

const item =
  "flex h-14 flex-col items-center justify-center gap-1 rounded-[12px] text-[13px] font-semibold transition-colors"
const soft = "bg-soft text-brand-strong hover:bg-soft-hover"

// Mobile only (< 900px). The spacer keeps the footer from hiding under the bar.
// Below 900px this bar is the page's call/quote control, so the header and hero skip theirs.
export function StickyCta() {
  return (
    <>
      <div
        aria-hidden="true"
        className="h-[calc(77px+env(safe-area-inset-bottom))] min-[900px]:hidden"
      />
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 gap-2 border-t bg-background px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-sticky min-[900px]:hidden">
        <a
          href={site.phoneHref}
          className={cn(item, "bg-call text-white hover:bg-call-hover")}
        >
          <PhoneIcon aria-hidden="true" className="size-5" />
          โทร
        </a>
        <a href={site.lineHref} className={cn(item, soft)}>
          <BrandIcon icon={siLine} />
          LINE
        </a>
        <a href={site.whatsappHref} className={cn(item, soft)}>
          <BrandIcon icon={siWhatsapp} />
          WhatsApp
        </a>
        <Link
          href="/quote"
          className={cn(
            item,
            "bg-primary text-primary-foreground hover:bg-primary-hover"
          )}
        >
          <FileTextIcon aria-hidden="true" className="size-5" />
          ขอราคาน้ำ
        </Link>
      </div>
    </>
  )
}
