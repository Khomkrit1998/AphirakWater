import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { Fragment } from "react"
import { ArrowRightIcon, UserIcon } from "lucide-react"

import { areaLinks, home, quoteHref, resolveRef, site } from "@workspace/shared"
import { buttonVariants } from "@workspace/ui/components/button"
import { CheckMark } from "@workspace/ui/components/check-list"
import { FaqList } from "@workspace/ui/components/faq-list"
import { cn } from "@workspace/ui/lib/utils"

import fleet from "../assets/fleet.jpg"
import workBranding from "../assets/work-branding.jpg"
import workDusk from "../assets/work-dusk.jpg"
import workFilling from "../assets/work-filling.jpg"
import workHose from "../assets/work-hose.jpg"
import workLakeside from "../assets/work-lakeside.jpg"
import workMountainRoad from "../assets/work-mountain-road.jpg"
import workNightLights from "../assets/work-night-lights.jpg"
import workNightPair from "../assets/work-night-pair.jpg"
import workPairDay from "../assets/work-pair-day.jpg"
import workPairYard from "../assets/work-pair-yard.jpg"
import workRear from "../assets/work-rear.jpg"
import workResidence from "../assets/work-residence.jpg"
import workShed from "../assets/work-shed.jpg"
import workSide from "../assets/work-side.jpg"
import workWetRoad from "../assets/work-wet-road.jpg"
import workYard from "../assets/work-yard.jpg"
import { BigWord, WaterGlow, WaveField } from "./decor"
import { InViewItem } from "./in-view-item"

const container = "mx-auto max-w-[1200px] px-5"
const gapTop = "pt-[clamp(72px,9vw,120px)]"
const h2 = "text-[clamp(28px,3.4vw,42px)] leading-[1.15]"

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("mb-3 text-[13.5px] font-semibold tracking-[0.04em] text-brand", className)}>
      {children}
    </p>
  )
}

function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => (
    <Fragment key={line}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ))
}

// Intro, then the interactive service picker (passed in from the services feature).
export function ServicesSection({ children }: { children: React.ReactNode }) {
  const intro = home.services
  return (
    <section id="services" className={cn(container, gapTop, "relative isolate scroll-mt-20")}>
      <WaterGlow className="-top-10 -left-56 size-[640px]" />
      <div className="motion-rise mb-10 grid gap-4 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Eyebrow>{intro.eyebrow}</Eyebrow>
          <h2 className={cn(h2, "mb-4")}>
            <Lines lines={intro.heading} />
          </h2>
          <p className="max-w-[56ch] text-[17px] leading-[1.7] text-ink-600">{intro.lead}</p>
        </div>
        <p className="text-[15px] font-medium text-brand-strong lg:col-span-5 lg:justify-self-end lg:text-right">
          เลือกบริการเพื่อดูขนาดรถที่เหมาะ แล้วขอราคาได้ทันที
        </p>
      </div>
      {children}
    </section>
  )
}

// The story chapter. A named scroll timeline taken from the steps list drives the
// water tank (desktop, sticky) or the progress bar (mobile), and each step comes
// into focus as it reaches the middle of the screen. Pure CSS; see globals.css.
// The gauge shows reading progress through the steps, so it is labelled with the
// first and last step, never with litres (it is not an order size).
export function ProcessStory() {
  const { process } = home
  const first = process.steps[0]!.title
  const last = process.steps.at(-1)!.title
  const stepLines = process.steps.slice(1).map((_, i) => `${((i + 1) * 100) / process.steps.length}%`)
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className={cn(container, gapTop, "story-scope scroll-mt-20 relative isolate pb-[clamp(40px,6vw,80px)] lg:pb-56")}
    >
      {/* full-bleed soft tint behind the chapter, fading in and out at the edges */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-linear-to-b from-transparent via-tint to-transparent"
      />
      {/* sits in the bottom padding under the last step, clear of step text and the sticky tank */}
      <BigWord className="motion-drift right-0 bottom-6 hidden text-[clamp(110px,12vw,180px)] text-brand opacity-[0.22] lg:block">
        20,000
      </BigWord>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{process.eyebrow}</Eyebrow>
            <h2 id="process-heading" className={cn(h2, "mb-4")}>
              <Lines lines={process.heading} />
            </h2>
            <p className="max-w-[44ch] text-[17px] leading-[1.7] text-ink-600">{process.lead}</p>

            <div aria-hidden="true" className="mt-10 hidden gap-4 lg:flex">
              <div className="relative h-[280px] w-[104px] overflow-clip rounded-[26px] border-2 border-soft-border bg-tint">
                <div className="story-fill-y absolute inset-0 bg-primary" />
                {stepLines.map((at) => (
                  <span
                    key={at}
                    style={{ bottom: at }}
                    className="absolute inset-x-0 border-t border-dashed border-foreground/15"
                  />
                ))}
              </div>
              <div className="flex h-[280px] flex-col justify-between text-[13px] whitespace-nowrap">
                <span className="font-medium text-ink-700">{last}</span>
                <span className="text-muted-foreground">{first}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-6 lg:col-start-7">
          <div
            aria-hidden="true"
            className="sticky top-[65px] z-10 -mx-5 mb-4 sm:top-[69px] bg-background/92 px-5 py-3 backdrop-blur-md lg:hidden"
          >
            <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
              <span>{first}</span>
              <span>{last}</span>
            </div>
            <div className="h-2 overflow-clip rounded-full bg-tint">
              <div className="story-fill-x h-full bg-primary" />
            </div>
          </div>

          <ol className="story-track">
            {process.steps.map((step, i) => (
              <li
                key={step.title}
                className="story-step grid grid-cols-[auto_1fr] gap-5 border-t py-8 first:border-t-0 lg:min-h-[34vh] lg:content-center"
              >
                <span className="story-step-mark grid size-12 place-items-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-2 text-[clamp(20px,2vw,24px)]">{step.title}</h3>
                  <p className="max-w-[48ch] text-base leading-[1.7] text-ink-600">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

// Below the sticky header (65px, 69px from sm); the pinned layer fills the rest.
const pinned = "sticky top-[65px] h-[calc(100svh-65px)] sm:top-[69px] sm:h-[calc(100svh-69px)]"

// Pinned chapter (scroll-based + sticky). The fleet photo pins under the header
// while the reasons scroll up over it one at a time. The wrapper's own view
// timeline (pin-* in globals.css) zooms the photo out, darkens it and fills the
// progress bar; each card plays a timed entrance when it scrolls in (InViewItem).
// The card list is pulled up by the pinned layer's height so both start together.
export function WhyUs() {
  const { whyUs } = home
  return (
    <section id="why-us" aria-labelledby="why-us-heading" className={cn(gapTop, "scroll-mt-4")}>
      <div className="pin-track relative overflow-clip bg-night text-white">
        <div className={cn(pinned, "overflow-clip")}>
          <Image
            src={fleet}
            alt={whyUs.imageAlt}
            fill
            placeholder="blur"
            sizes="100vw"
            className="pin-zoom object-cover object-[center_55%]"
          />
          <div aria-hidden="true" className="pin-darken absolute inset-0 bg-night opacity-50" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-night/85 via-night/10 via-40% to-night/50 lg:bg-linear-to-r lg:from-night/90 lg:via-night/35 lg:via-45% lg:to-transparent"
          />
          {/* pb-28 below 900px keeps the progress bar above the fixed call/quote bar */}
          <div className={cn(container, "relative flex h-full flex-col justify-between pt-8 pb-28 min-[900px]:pb-8 lg:py-16")}>
            <div className="max-w-[520px]">
              <Eyebrow className="text-on-dark-muted">{whyUs.eyebrow}</Eyebrow>
              <h2 id="why-us-heading" className={cn(h2, "text-white")}>
                <Lines lines={whyUs.heading} />
              </h2>
            </div>
            <div aria-hidden="true" className="h-1 w-40 overflow-clip rounded-full bg-white/20 motion-reduce:hidden">
              <div className="pin-fill-x h-full bg-live" />
            </div>
          </div>
        </div>

        <ul
          className={cn(
            container,
            // gap-y only: a plain gap would also apply between the 12 columns and squeeze them to 0
            "relative -mt-[calc(100svh-65px)] grid gap-y-[26svh] pt-[52svh] pb-[22svh] sm:-mt-[calc(100svh-69px)] lg:grid-cols-12"
          )}
        >
          {whyUs.items.map((item) => (
            <InViewItem
              key={item.title}
              className="group flex items-start gap-4 rounded-[24px] border border-white/10 bg-night/80 p-6 backdrop-blur-md transition-[opacity,translate] duration-700 ease-out data-[inview=false]:translate-y-10 data-[inview=false]:opacity-0 motion-reduce:transition-none sm:p-8 lg:col-span-5 lg:col-start-8"
            >
              <CheckMark className="mt-0.5 size-8 bg-live/20 text-live transition-transform delay-200 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[inview=false]:scale-0 motion-reduce:transition-none" />
              <div>
                <h3 className="mb-1.5 text-[clamp(18px,1.8vw,22px)] text-white">{item.title}</h3>
                <p className="text-[15.5px] leading-[1.65] text-on-dark-muted">{item.desc}</p>
              </div>
            </InViewItem>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Full-width tint band; places grouped by province instead of identical cards.
export function AreasSection() {
  const { areas } = home
  const provinces = [...new Set(areaLinks.map((a) => a.province))]
  return (
    <section
      id="areas"
      className="relative isolate mt-[clamp(72px,9vw,120px)] scroll-mt-20 overflow-clip border-y border-tint-border bg-tint"
    >
      <WaveField className="inset-x-0 bottom-0 h-72 text-brand opacity-[0.16]" />
      <div className={cn(container, "grid gap-10 py-[clamp(56px,7vw,96px)] lg:grid-cols-12 lg:pb-44")}>
        <div className="motion-rise lg:col-span-5">
          <Eyebrow>{areas.eyebrow}</Eyebrow>
          <h2 className={cn(h2, "mb-4")}>
            <Lines lines={areas.heading} />
          </h2>
          <p className="mb-7 text-[16.5px] leading-[1.7] text-ink-600">{areas.lead}</p>
          <Link
            href={resolveRef({ label: areas.cta, kind: "area", slug: "phuket" }).href}
            className="inline-flex items-center gap-2 rounded-[12px] border border-soft-border bg-background px-5 py-[13px] text-[15px] font-semibold text-brand transition-colors hover:bg-soft"
          >
            {areas.cta}
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {provinces.map((province) => (
            <div key={province}>
              <h3 className="border-b-2 border-primary pb-3 text-xl">{province}</h3>
              <ul>
                {areaLinks
                  .filter((a) => a.province === province)
                  .map((area) => (
                    <li key={area.name} className="motion-rise">
                      <Link
                        href={resolveRef({ label: area.name, kind: "area", slug: area.pageSlug }).href}
                        className="group flex items-center justify-between gap-3 border-b border-tint-border py-3.5 text-base font-medium text-foreground transition-colors hover:text-brand-strong"
                      >
                        {area.name}
                        <ArrowRightIcon
                          aria-hidden="true"
                          className="size-4 text-brand transition-transform motion-safe:group-hover:translate-x-1"
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// The volume table overlaps the bottom edge of the areas band.
export function PricingSection() {
  const { pricing } = home
  return (
    <section id="pricing" className={cn(container, "scroll-mt-20")}>
      <div className="grid items-start gap-10 lg:grid-cols-12">
        <div className="motion-rise pt-[clamp(56px,7vw,96px)] lg:col-span-5">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <h2 className={cn(h2, "mb-4")}>
            <Lines lines={pricing.heading} />
          </h2>
          <p className="mb-6 text-[16.5px] leading-[1.7] text-ink-600">{pricing.lead}</p>
          <Link
            href="/quote"
            className={cn(buttonVariants({ size: "cta-sm" }), "shadow-cta max-sm:w-full")}
          >
            {pricing.cta}
          </Link>
        </div>
        {/* From lg the card overlaps the areas band and floats up a little faster than the page. */}
        <div className="relative z-10 overflow-hidden rounded-[24px] border bg-card shadow-lift lg:col-span-6 lg:col-start-7 lg:-mt-28 lg:motion-parallax lg:[--parallax:-6%]">
          <ul>
            {pricing.volumes.map((v) => (
              <li key={v.size} className="motion-rise border-b border-line-soft">
                {/* Each size opens the quote form with that volume already chosen. */}
                <Link
                  href={quoteHref({ volume: v.volume })}
                  className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-tint sm:px-7"
                >
                  <div>
                    <p className="font-heading text-[21px] font-bold">{v.size}</p>
                    <p className="mt-[3px] text-[13.5px] text-muted-foreground">{v.use}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-[13px] py-2 text-[13.5px] font-semibold whitespace-nowrap text-brand-strong transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {v.tag}
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-3.5 transition-transform motion-safe:group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="bg-row-hover px-6 py-[18px] text-[13.5px] text-muted-foreground sm:px-7">
            {pricing.note}
          </p>
        </div>
      </div>
    </section>
  )
}

type GalleryItem = (typeof home.gallery.items)[number]

const galleryPhotos: Record<GalleryItem["image"], StaticImageData> = {
  branding: workBranding,
  residence: workResidence,
  filling: workFilling,
  rear: workRear,
  "mountain-road": workMountainRoad,
  side: workSide,
  lakeside: workLakeside,
  yard: workYard,
  "pair-day": workPairDay,
  "pair-yard": workPairYard,
  "night-lights": workNightLights,
  "night-pair": workNightPair,
  dusk: workDusk,
  hose: workHose,
  shed: workShed,
  "wet-road": workWetRoad,
}

// One endless row. The photos are rendered twice (the copy hidden from assistive
// tech) so marquee-track can loop by moving half its width. With reduced motion
// the copy is dropped and the row scrolls by hand instead.
function PhotoRow({ items, reverse = false }: { items: GalleryItem[]; reverse?: boolean }) {
  const photos = (copy: boolean) =>
    items.map((item) => {
      const src = galleryPhotos[item.image]
      return (
        <div
          key={item.image}
          style={{ aspectRatio: `${src.width} / ${src.height}` }}
          className="relative h-[200px] shrink-0 overflow-clip rounded-[18px] bg-tint sm:h-[260px]"
        >
          <Image
            src={src}
            alt={copy ? "" : item.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 640px) 470px, 360px"
            className="object-cover transition-transform duration-700 hover:scale-105 motion-reduce:transition-none"
          />
        </div>
      )
    })

  // Each row slides in from the side it scrolls away from.
  return (
    <div
      className={cn(
        "motion-slide-in mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:overflow-x-auto motion-reduce:mask-none",
        reverse ? "[--slide:-6rem]" : "[--slide:6rem]"
      )}
    >
      <div
        className={cn(
          "marquee-track gap-4 pr-4 group-hover/rows:paused group-has-checked/gallery:paused motion-reduce:px-5",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {photos(false)}
        <div aria-hidden="true" className="contents motion-reduce:hidden">
          {photos(true)}
        </div>
      </div>
    </div>
  )
}

// Two full-bleed rows of real photos moving in opposite directions. They pause on
// hover and with the toggle, so the motion can be stopped (WCAG 2.2.2).
export function WorkGallery() {
  const { gallery } = home
  const half = Math.ceil(gallery.items.length / 2)
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className={cn(gapTop, "group/gallery scroll-mt-20")}
    >
      <div className={cn(container, "motion-rise mb-10 flex flex-wrap items-end justify-between gap-6")}>
        <div>
          <Eyebrow>{gallery.eyebrow}</Eyebrow>
          <h2 id="gallery-heading" className={cn(h2, "mb-4")}>
            <Lines lines={gallery.heading} />
          </h2>
          <p className="max-w-[44ch] text-[16.5px] leading-[1.7] text-ink-600">{gallery.lead}</p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border bg-card px-4 py-2.5 text-[14px] font-medium text-ink-700 transition-colors select-none hover:bg-soft has-focus-visible:outline-2 has-focus-visible:outline-ring motion-reduce:hidden">
          <input type="checkbox" className="size-4 accent-primary" />
          หยุดภาพเลื่อน
        </label>
      </div>
      <div className="group/rows grid gap-4">
        <PhotoRow items={gallery.items.slice(0, half)} />
        <PhotoRow items={gallery.items.slice(half)} reverse />
      </div>
    </section>
  )
}

// One review set large; the rest sit quietly in a side column.
export function ReviewsSection() {
  const { reviews } = home
  const [featured, ...others] = reviews.items
  if (!featured) return null

  const caption = (review: typeof featured) => (
    <figcaption className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-soft text-brand">
        <UserIcon aria-hidden="true" className="size-5" />
      </span>
      <span>
        <span className="block text-[15px] font-semibold">{review.name}</span>
        <span className="block text-[13px] text-muted-foreground">{review.role}</span>
      </span>
    </figcaption>
  )
  const stars = (
    <p role="img" aria-label="คะแนน 5 จาก 5" className="mb-4 text-[15px] tracking-[2px] text-star">
      ★★★★★
    </p>
  )

  return (
    <section id="reviews" className={cn(container, gapTop, "scroll-mt-20")}>
      <h2 className={cn(h2, "motion-rise mb-10")}>{reviews.heading}</h2>
      <div className="grid gap-10 lg:grid-cols-12">
        <figure className="motion-rise lg:col-span-7">
          {stars}
          <blockquote className="mb-7 font-heading text-[clamp(22px,2.6vw,32px)] leading-[1.5] font-medium text-foreground">
            “{featured.text}”
          </blockquote>
          {caption(featured)}
        </figure>
        <ul className="grid content-start gap-8 border-t pt-8 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {others.map((review) => (
            <li key={review.name} className="motion-rise">
              <figure>
                {stars}
                <blockquote className="mb-4 text-[15.5px] leading-[1.7] text-ink-700">
                  {review.text}
                </blockquote>
                {caption(review)}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function FaqSection() {
  return (
    <section id="faq" className={cn(container, gapTop, "relative isolate scroll-mt-20")}>
      <WaterGlow className="top-0 -right-64 size-[680px]" />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="motion-rise lg:sticky lg:top-28">
            <h2 className={cn(h2, "mb-4")}>{home.faq.heading}</h2>
            <p className="text-[16px] leading-[1.7] text-ink-600">
              ไม่พบคำถามที่ต้องการ โทร{" "}
              <a href={site.phoneHref} className="font-semibold text-brand underline underline-offset-4">
                {site.phone}
              </a>{" "}
              ได้ตลอด 24 ชั่วโมง
            </p>
          </div>
        </div>
        {/* *: reaches each question, which FaqList renders as direct children */}
        <FaqList name="home-faq" items={home.faq.items} className="lg:col-span-8 *:motion-rise" />
      </div>
    </section>
  )
}

export function CtaBand() {
  const { cta } = home
  return (
    <section id="contact" className="relative isolate mt-[clamp(72px,9vw,120px)] scroll-mt-20 overflow-clip bg-surface-dark text-white">
      <WaveField className="inset-y-0 right-0 w-full text-white opacity-[0.1] lg:w-2/3" />
      {/* Top-right, clear of the translucent button row; hidden where the buttons stack. */}
      <BigWord className="top-[-0.4em] right-[-3%] hidden text-[clamp(120px,11vw,170px)] text-white opacity-[0.1] lg:block">
        24 ชม.
      </BigWord>
      <div className={cn(container, "grid items-end gap-8 py-[clamp(56px,7vw,96px)] lg:grid-cols-12")}>
        <div className="motion-rise lg:col-span-7">
          <h2 className="mb-4 text-[clamp(30px,4vw,52px)] leading-[1.12] text-white">
            <Lines lines={cta.heading} />
          </h2>
          <p className="text-[17px] leading-[1.7] text-on-dark-muted">{cta.lead}</p>
        </div>
        <div className="motion-rise flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <a
            href={site.phoneHref}
            className={cn(
              buttonVariants({ variant: "call", size: "cta" }),
              "px-[30px] py-[17px] text-[16.5px] max-sm:w-full"
            )}
          >
            โทร {site.phone}
          </a>
          <Link
            href="/quote"
            className={cn(
              buttonVariants({ variant: "on-dark", size: "cta" }),
              "py-[17px] text-[16.5px] max-sm:w-full"
            )}
          >
            ขอราคาน้ำ
          </Link>
        </div>
      </div>
    </section>
  )
}
