import { ExternalLinkIcon } from "lucide-react"

import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { env } from "@/lib/env"

import { MobileSidebar } from "./mobile-sidebar"

export function AdminTopbar({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle: string
  actions?: React.ReactNode
}) {
  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-4 border-b bg-card px-5 py-4 md:px-7">
      <MobileSidebar />
      <div className="min-w-0">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p>
      </div>
      <div className="ml-auto flex flex-wrap items-center gap-2.5">
        <a
          href={env.NEXT_PUBLIC_SITE_URL}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-auto rounded-[10px] border-input px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-tint"
          )}
        >
          ดูเว็บไซต์
          <ExternalLinkIcon aria-hidden="true" />
        </a>
        {actions}
      </div>
    </header>
  )
}
