"use client"

import { useEffect, useRef, useState } from "react"

// Scroll-triggered list item. After hydration an item still below the screen gets
// data-inview="false", then "true" the first time it scrolls in, so CSS can play a
// timed transition from the hidden state (data-[inview=false]:…). Without JS, with
// reduced motion, or when already on screen, the attribute stays off or turns true
// straight away and the content simply shows.
export function InViewItem({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLLIElement>(null)
  const [inView, setInView] = useState<boolean>()

  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        } else {
          setInView((v) => v ?? false)
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <li ref={ref} data-inview={inView} className={className}>
      {children}
    </li>
  )
}
