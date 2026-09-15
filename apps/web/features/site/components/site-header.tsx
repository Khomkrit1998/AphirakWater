import Link from "next/link"

import { mainNav, site } from "@workspace/shared"
import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { Brand } from "./brand"
import { ContactIcons } from "./contact-icons"
import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  return (
    <>
      {/* Desktop only, scrolls away; below 900px the sticky bar and the menu sheet carry these links. */}
      <div className="hidden bg-footer text-footer-foreground min-[900px]:block">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-1">
          <p className="text-[13.5px]">
            เปิดรับงาน {site.hours} · ภูเก็ต · พังงา
          </p>
          <ContactIcons linkClassName="size-8 hover:bg-white/10 hover:text-white" />
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/92 backdrop-blur-md">
        {/* gap-3 below lg: at 900–1023px (with a scrollbar) gap-6 left the nav 14px short and it wrapped. */}
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-5 py-3 lg:gap-6">
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
          <div className="ml-auto flex shrink-0 items-center gap-2 min-[900px]:ml-0 sm:gap-2.5">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-[7px] rounded-[10px] px-3 py-[9px] text-[14.5px] font-semibold text-call-text transition-colors hover:bg-call-soft min-[640px]:max-[899px]:flex xl:flex"
            >
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-call"
              />
              {site.phone}
            </a>
            <Link
              href="/quote"
              className={cn(
                buttonVariants({ size: "nav" }),
                // below 900px the sticky bar carries this action
                "shadow-cta max-[899px]:hidden"
              )}
            >
              ขอราคาน้ำ
            </Link>
            <MobileNav
              contact={
                <ContactIcons
                  className="mt-6 justify-center gap-2.5"
                  linkClassName="size-10 rounded-[12px] border bg-card text-ink-700 hover:bg-soft hover:text-brand-strong"
                />
              }
            />
          </div>
        </div>
      </header>
    </>
  )
}
