"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@workspace/ui/lib/utils"

// Items without href are designed but not built yet (need a backend first).
const groups: { title: string; items: { label: string; href?: string }[] }[] = [
  { title: "ภาพรวม", items: [{ label: "Dashboard", href: "/" }] },
  {
    title: "Content",
    items: [
      { label: "Landing Pages", href: "/pages" },
      { label: "Services" },
      { label: "Areas" },
      { label: "Blog" },
      { label: "FAQ" },
      { label: "Testimonials" },
    ],
  },
  { title: "Media", items: [{ label: "Images" }, { label: "Files" }] },
  {
    title: "SEO",
    items: [{ label: "SEO Settings" }, { label: "Redirects" }, { label: "Sitemap" }],
  },
  {
    title: "Website",
    items: [{ label: "Navigation" }, { label: "Footer" }, { label: "Global Settings" }],
  },
  { title: "System", items: [{ label: "Users" }, { label: "Settings" }] },
]

const item = "flex items-center justify-between gap-2 rounded-[10px] px-3 py-[9px] text-sm"

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <nav aria-label="เมนูหลังบ้าน" className="grid gap-5">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="px-2.5 pb-2 text-[11.5px] font-bold tracking-[0.1em] text-ink-400">
            {group.title}
          </p>
          <ul className="grid gap-0.5">
            {group.items.map(({ label, href }) => (
              <li key={label}>
                {href ? (
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={cn(
                      item,
                      isActive(href)
                        ? "bg-primary font-semibold text-primary-foreground"
                        : "font-medium text-ink-700 hover:bg-soft hover:text-brand-strong"
                    )}
                  >
                    {label}
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    className={cn(item, "cursor-not-allowed font-medium text-ink-400")}
                  >
                    {label}
                    <span className="text-[11px]">เร็วๆ นี้</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
