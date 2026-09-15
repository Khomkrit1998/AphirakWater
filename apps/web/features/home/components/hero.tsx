import Image, { type StaticImageData } from "next/image"
import Link from "next/link"

import { home, site } from "@workspace/shared"
import { buttonVariants } from "@workspace/ui/components/button"
import { CheckMark } from "@workspace/ui/components/check-list"
import { cn } from "@workspace/ui/lib/utils"

import heroNight from "../assets/hero-night.jpg"
import heroNightSide from "../assets/hero-night-side.jpg"
import { CountUp } from "./count-up"

// hero-night-side.jpg is cropped at the top to leave out a customer's sign.
const slidePhotos: Record<
  (typeof home.hero.slides)[number]["image"],
  { src: StaticImageData; position: string }
> = {
  night: { src: heroNight, position: "object-[72%_center]" },
  "night-side": { src: heroNightSide, position: "object-[62%_center]" },
}

// Photo band: the top of the hero below lg, the whole hero from lg.
const band = "absolute inset-x-0 top-0 -z-10 h-[92vw] max-h-[480px] lg:inset-0 lg:h-auto lg:max-h-none"

// Night hero. The company's own night photos cross-fade and drift (hero-slide /
// hero-drift in globals.css). From lg they fill the hero behind copy on the left;
// below lg they sit in a band on top that fades into the copy, so the photo is
// not buried under the text.
// Parallax on the way out: the photos (with their gradient, so the band's faded
// edge stays put) lag behind the scroll and the copy runs slightly ahead.
export function Hero() {
  const { hero } = home
  return (
    <>
      <section id="top" className="relative isolate overflow-clip bg-night text-white">
        <div className={cn(band, "motion-parallax-exit [--parallax:30%]")}>
          {hero.slides.map((slide, i) => {
            const photo = slidePhotos[slide.image]
            return (
              <div key={slide.image} className={cn("absolute inset-0 overflow-clip", i > 0 && "hero-slide")}>
                <Image
                  src={photo.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className={cn("hero-drift object-cover", photo.position)}
                />
              </div>
            )
          })}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-night via-night/45 via-35% to-night/5 lg:bg-linear-to-r lg:from-night lg:from-15% lg:via-night/70 lg:via-50% lg:to-night/5"
          />
        </div>
        <div
          aria-hidden="true"
          className="motion-parallax-exit pointer-events-none absolute -top-48 -left-48 -z-10 size-[760px] rounded-full bg-radial from-live/22 via-live/6 via-45% to-transparent to-70% [--parallax:15%]"
        />

        {/* Below lg the copy starts over the band's faded bottom. From lg it fills the
            first screen below the header and contact strip. */}
        <div className="motion-parallax-exit mx-auto flex max-w-[1200px] flex-col px-5 pt-[min(68vw,380px)] pb-10 [--parallax:-12%] lg:min-h-[max(600px,min(calc(100svh-110px),860px))] lg:justify-center lg:py-20">
          <div className="max-w-[640px]">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-[7px] text-[13px] font-semibold text-on-dark-muted backdrop-blur-sm">
              <span aria-hidden="true" className="size-[7px] rounded-full bg-live" />
              {hero.badge}
            </p>
            <h1 className="text-[clamp(38px,5.6vw,76px)] leading-[1.06] font-bold tracking-[-0.02em] text-white">
              {hero.heading}
              <br />
              <span className="text-live">{hero.headingAccent}</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-lg leading-[1.65] text-on-dark-muted">{hero.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className={cn(buttonVariants({ size: "cta" }), "shadow-cta max-sm:w-full")}
              >
                ขอราคาน้ำ
              </Link>
              {/* below 900px the sticky bar's โทร covers this (and would sit on top of it) */}
              <a
                href={site.phoneHref}
                className={cn(buttonVariants({ variant: "call", size: "cta" }), "max-[899px]:hidden")}
              >
                โทรสอบถาม {site.phone}
              </a>
            </div>
            <p className="mt-3 text-sm text-on-dark-muted">{hero.ctaNote}</p>
            <ul className="mt-6 flex flex-wrap gap-x-[26px] gap-y-2.5">
              {hero.proof.map((item) => (
                <li key={item} className="flex items-center gap-[9px] text-[15px] font-medium text-white">
                  <CheckMark className="size-5 bg-white/12 text-white" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* surface-dark per the handoff trust band; labels on bg-primary fell below 4.5:1 */}
      <section aria-label="ตัวเลขความน่าเชื่อถือ" className="bg-surface-dark">
        <div className="mx-auto max-w-[1200px] px-5 py-9 lg:py-12">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {home.stats.map((stat) => (
              <li key={stat.label} className="motion-rise text-white">
                <p className="font-heading text-[clamp(28px,2.4vw,34px)] leading-[1.05] font-bold whitespace-nowrap tabular-nums">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-1.5 max-w-[8.5rem] text-sm text-on-dark-muted">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
