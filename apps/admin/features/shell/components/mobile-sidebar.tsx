"use client"

import { MenuIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"

import { AdminBrand, PreviewModeNote } from "./admin-brand"
import { SidebarNav } from "./sidebar-nav"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-[10px] md:hidden"
            aria-label="เปิดเมนูหลังบ้าน"
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] gap-0 overflow-y-auto px-3.5 pt-[18px] pb-8">
        <SheetTitle className="sr-only">เมนูหลังบ้าน</SheetTitle>
        <AdminBrand />
        <SidebarNav onNavigate={() => setOpen(false)} />
        <PreviewModeNote />
      </SheetContent>
    </Sheet>
  )
}
