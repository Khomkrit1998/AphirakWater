"use client"

import { useEffect, useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

// Chapters of the home page. A chapter can span several sections.
const chapters = [
  { label: "บริการ", sections: ["services"] },
  { label: "ขั้นตอน", sections: ["process"] },
  { label: "ทำไมต้องเรา", sections: ["why-us"] },
  { label: "พื้นที่และราคา", sections: ["areas", "pricing"] },
  { label: "งานจริง", sections: ["gallery", "reviews"] },
  { label: "คำถามที่พบบ่อย", sections: ["faq"] },
]
// While these are under the reading line the wayfinding steps aside.
const quietSections = ["top", "contact"]
// Below lg the process chapter shows its own sticky progress bar in the same spot.
const storyChapter = chapters.findIndex((c) => c.sections.includes("process"))

const ROW = 36 // px per chapter row

// Quiet wayfinding: a hairline with one tick per chapter, fixed in the right
// gutter on wide screens. Smaller screens get a 2px reading-progress line instead.
export function ScrollSpy() {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const owner = new Map<Element, number | null>()
    chapters.forEach((c, i) =>
      c.sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el) owner.set(el, i)
      })
    )
    quietSections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) owner.set(el, null)
    })

    // A thin reading line just above the middle of the screen decides the chapter.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(owner.get(entry.target) ?? null)
        }
      },
      { rootMargin: "-42% 0px -57% 0px" }
    )
    owner.forEach((_, el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const go = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    event.preventDefault()
    const smooth = window.matchMedia("(prefers-reduced-motion: no-preference)").matches
    el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" })
    history.replaceState(null, "", `#${id}`)
  }

  const visible = active !== null

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "reading-progress fixed inset-x-0 top-[65px] z-40 h-0.5 bg-primary/80 sm:top-[69px] min-[1360px]:hidden",
          active === storyChapter && "max-lg:invisible"
        )}
      />

      <nav
        aria-label="ส่วนต่างๆ ของหน้า"
        className={cn(
          "group/spy fixed top-1/2 right-7 z-30 hidden -translate-y-1/2 transition-[opacity,visibility] duration-500 motion-reduce:transition-none min-[1360px]:block",
          visible ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <ol className="relative">
          <span aria-hidden="true" className="absolute inset-y-0 right-0 w-px bg-foreground/12" />
          <span
            aria-hidden="true"
            style={{ height: ROW, transform: `translateY(${(active ?? 0) * ROW}px)` }}
            className="absolute top-0 right-0 w-px bg-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          />
          {chapters.map((chapter, i) => {
            const current = active === i
            return (
              <li key={chapter.label} style={{ height: ROW }} className="relative">
                <a
                  href={`#${chapter.sections[0]}`}
                  onClick={(e) => go(e, chapter.sections[0]!)}
                  aria-current={current ? "location" : undefined}
                  className="group/item flex h-full w-10 items-center justify-end rounded-sm outline-offset-4"
                >
                  {/* Label: out of the hit area, so it never blocks the page underneath */}
                  <span
                    style={{ transitionDelay: `${i * 30}ms` }}
                    className={cn(
                      "pointer-events-none absolute right-full mr-3 translate-x-1.5 rounded-full bg-background/85 px-2.5 py-1 text-[13px] leading-none whitespace-nowrap opacity-0 backdrop-blur-sm transition-[opacity,translate] duration-300 group-focus-within/spy:translate-x-0 group-focus-within/spy:opacity-100 group-hover/spy:translate-x-0 group-hover/spy:opacity-100 motion-reduce:transition-none",
                      current ? "font-medium text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {chapter.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block h-px transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none",
                      current
                        ? "w-7 bg-brand"
                        : "w-3 bg-foreground/25 group-hover/item:w-5 group-hover/item:bg-foreground/55"
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
