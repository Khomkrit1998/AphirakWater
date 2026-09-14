"use client"

import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { useState } from "react"

import { mainNav, site } from "@workspace/shared"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { cn } from "@workspace/ui/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            className="size-10 rounded-[12px] sm:size-11 min-[900px]:hidden"
            aria-label="เปิดเมนู"
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 p-5 pt-4 sm:max-w-sm">
        <SheetTitle className="mb-4 text-lg font-bold">เมนู</SheetTitle>
        <nav aria-label="เมนูหลัก" className="grid gap-1">
          {mainNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-[12px] px-3 py-3.5 text-base font-medium text-ink-700 hover:bg-soft hover:text-brand-strong"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 grid gap-2.5">
          <a
            href={site.phoneHref}
            className={cn(buttonVariants({ variant: "call", size: "cta-sm" }))}
          >
            โทร {site.phone}
          </a>
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ size: "cta-sm" }))}
          >
            ขอราคาน้ำ
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
