"use client"

import { useEffect, useRef, useState } from "react"

const DURATION = 1400 // ms

// Scroll-triggered counter. The server renders the final value (what crawlers and
// visitors without JS read). Once hydrated, a number that is still below the
// screen resets to 0 and counts up the first time it scrolls into view; one that
// is already on screen is left alone. Nothing moves with reduced motion.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [text, setText] = useState(value)

  useEffect(() => {
    const el = ref.current
    const digits = value.match(/\d[\d,]*/)?.[0]
    if (!el || !digits || matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const target = Number(digits.replaceAll(",", ""))
    const show = (n: number) => setText(value.replace(digits, n.toLocaleString("en-US")))
    let armed = false
    let frame = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (!entry.isIntersecting) {
          if (!armed) show(0)
          armed = true
          return
        }
        observer.disconnect()
        if (!armed) return
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1)
          show(Math.round(target * (1 - (1 - t) ** 3))) // ease-out cubic
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <span ref={ref}>{text}</span>
}
