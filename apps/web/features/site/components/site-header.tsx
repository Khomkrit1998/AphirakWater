import Link from "next/link"

import { mainNav, site } from "@workspace/shared"
import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { Brand } from "./brand"
import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-5 py-3 sm:gap-6">
        <Brand />
        <nav
          aria-label="เมนูหลัก"
          className="ml-auto hidden flex-wrap gap-1 min-[900px]:flex"
        >
          {mainNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-[10px] px-3 py-[9px] text-[14.5px] font-medium text-ink-700 transition-colors hover:bg-soft hover:text-brand-strong"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5 min-[900px]:ml-0">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-[7px] rounded-[10px] px-3 py-[9px] text-[14.5px] font-semibold text-call-text transition-colors hover:bg-call-soft min-[640px]:max-[899px]:flex xl:flex"
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-call" />
            {site.phone}
          </a>
          <Link
            href="/quote"
            className={cn(
              buttonVariants({ size: "nav" }),
              "shadow-cta max-sm:px-3.5 max-sm:py-2.5 max-sm:text-sm"
            )}
          >
            ขอราคาน้ำ
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
