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
import workFilling from "../assets/work-filling.jpg"
import workNight from "../assets/work-night.jpg"
import workRear from "../assets/work-rear.jpg"
import workResidence from "../assets/work-residence.jpg"
import { BigWord, WaterGlow, WaveField } from "./decor"

const container = "mx-auto max-w-[1200px] px-5"
const gapTop = "pt-[clamp(72px,9vw,120px)]"
const h2 = "text-[clamp(28px,3.4vw,42px)] leading-[1.15]"

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("mb-3 text-[13.5px] font-semibold tracking-[0.1em] text-brand", className)}>
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
      <div className="mb-10 grid gap-4 lg:grid-cols-12 lg:items-end">
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

const gaugeTicks = [
  { label: "20,000 ลิตร", at: "100%" },
  { label: "10,000", at: "50%" },
  { label: "5,000", at: "25%" },
]

// The story chapter. A named scroll timeline taken from the steps list drives the
// water tank (desktop, sticky) or the progress bar (mobile), and each step comes
// into focus as it reaches the middle of the screen. Pure CSS; see globals.css.
export function ProcessStory() {
  const { process } = home
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
                {gaugeTicks.slice(1).map((tick) => (
                  <span
                    key={tick.label}
                    style={{ bottom: tick.at }}
                    className="absolute inset-x-0 border-t border-dashed border-foreground/15"
                  />
                ))}
              </div>
              <div className="relative h-[280px] w-28 text-[13px] text-muted-foreground">
                {gaugeTicks.map((tick) => (
                  <span
                    key={tick.label}
                    style={{ bottom: tick.at }}
                    className="absolute left-0 translate-y-1/2 whitespace-nowrap tabular-nums"
                  >
                    {tick.label}
                  </span>
                ))}
                <span className="absolute bottom-0 left-0 translate-y-full pt-2 font-medium text-ink-700">
                  {process.gaugeLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-6 lg:col-start-7">
          <div
            aria-hidden="true"
            className="sticky top-[69px] z-10 -mx-5 mb-4 bg-background/92 px-5 py-3 backdrop-blur-md lg:hidden"
          >
            <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
              <span>{process.gaugeLabel}</span>
              <span className="tabular-nums">20,000 ลิตร</span>
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

// Full-width photo band with a dark panel pulled up over its right side.
export function WhyUs() {
  const { whyUs } = home
  return (
    <section id="why-us" className={cn(gapTop, "scroll-mt-4")}>
      {/* overflow-clip (not hidden) so the image keeps the page as its scroll timeline */}
      <div className="relative h-[clamp(240px,40vw,520px)] overflow-clip bg-tint">
        <Image
          src={fleet}
          alt={whyUs.imageAlt}
          fill
          placeholder="blur"
          sizes="100vw"
          className="motion-zoom-out object-cover object-[center_55%]"
        />
      </div>
      <div className={container}>
        <div className="relative -mt-16 rounded-[28px] bg-surface-dark p-7 text-white sm:p-10 lg:-mt-44 lg:ml-[calc(100%*5/12)] lg:p-12">
          <Eyebrow className="text-on-dark-muted">{whyUs.eyebrow}</Eyebrow>
          <h2 className={cn(h2, "mb-8 text-white")}>
            <Lines lines={whyUs.heading} />
          </h2>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {whyUs.items.map((item) => (
              <li key={item.title} className="flex items-start gap-3.5">
                <CheckMark className="mt-0.5 bg-white/12 text-white" />
                <div>
                  <h3 className="mb-1 text-[17.5px] text-white">{item.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-on-dark-muted">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
        <div className="lg:col-span-5">
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
        <div className="pt-[clamp(56px,7vw,96px)] lg:col-span-5">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <h2 className={cn(h2, "mb-4")}>
            <Lines lines={pricing.heading} />
          </h2>
          <p className="mb-6 text-[16.5px] leading-[1.7] text-ink-600">{pricing.lead}</p>
          <Link
            href="/quote"
            className={cn(
              buttonVariants({ variant: "call", size: "cta-sm" }),
              "shadow-cta-call max-sm:w-full"
            )}
          >
            {pricing.cta}
          </Link>
        </div>
        <div className="relative z-10 overflow-hidden rounded-[24px] border bg-card shadow-lift lg:col-span-6 lg:col-start-7 lg:-mt-28">
          <ul>
            {pricing.volumes.map((v) => (
              <li key={v.size} className="border-b border-line-soft">
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

const galleryPhotos: Record<
  (typeof home.gallery.items)[number]["image"],
  { src: StaticImageData; position: string }
> = {
  branding: { src: workBranding, position: "object-[center_70%]" },
  residence: { src: workResidence, position: "object-[65%_center]" },
  filling: { src: workFilling, position: "object-[60%_center]" },
  night: { src: workNight, position: "object-center" },
  rear: { src: workRear, position: "object-[30%_center]" },
}

// Asymmetric mosaic, in item order: one large photo beside the intro, then a row.
const galleryLayout = [
  "sm:col-span-2 lg:col-[6/13] lg:row-[1/3]",
  "lg:col-[1/6] lg:row-[2/3]",
  "lg:col-[1/5] lg:row-[3/4]",
  "lg:col-[5/9] lg:row-[3/4]",
  "lg:col-[9/13] lg:row-[3/4]",
]

export function WorkGallery() {
  const { gallery } = home
  return (
    <section id="gallery" aria-labelledby="gallery-heading" className={cn(container, gapTop, "scroll-mt-20")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_260px_260px] lg:gap-5">
        <div className="sm:col-span-2 lg:col-[1/6] lg:row-[1/2] lg:self-end lg:pb-2">
          <Eyebrow>{gallery.eyebrow}</Eyebrow>
          <h2 id="gallery-heading" className={cn(h2, "mb-4")}>
            <Lines lines={gallery.heading} />
          </h2>
          <p className="max-w-[44ch] text-[16.5px] leading-[1.7] text-ink-600">{gallery.lead}</p>
        </div>
        {gallery.items.map((item, i) => {
          const photo = galleryPhotos[item.image]
          return (
            <figure
              key={item.image}
              className={cn(
                "relative aspect-[4/3] overflow-clip rounded-[20px] bg-tint lg:aspect-auto",
                galleryLayout[i]
              )}
            >
              <Image
                src={photo.src}
                alt={item.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                className={cn("object-cover", photo.position)}
              />
              <figcaption className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] rounded-full bg-background/92 px-3.5 py-1.5 text-[13px] font-medium text-foreground backdrop-blur-sm">
                {item.caption}
              </figcaption>
            </figure>
          )
        })}
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
      <h2 className={cn(h2, "mb-10")}>{reviews.heading}</h2>
      <div className="grid gap-10 lg:grid-cols-12">
        <figure className="lg:col-span-7">
          {stars}
          <blockquote className="mb-7 font-heading text-[clamp(22px,2.6vw,32px)] leading-[1.5] font-medium text-foreground">
            “{featured.text}”
          </blockquote>
          {caption(featured)}
        </figure>
        <ul className="grid content-start gap-8 border-t pt-8 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {others.map((review) => (
            <li key={review.name}>
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
          <div className="lg:sticky lg:top-28">
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
        <FaqList name="home-faq" items={home.faq.items} className="lg:col-span-8" />
      </div>
    </section>
  )
}

export function CtaBand() {
  const { cta } = home
  return (
    <section id="contact" className="relative isolate mt-[clamp(72px,9vw,120px)] scroll-mt-20 overflow-clip bg-surface-dark text-white">
      <WaveField className="inset-y-0 right-0 w-full text-white opacity-[0.1] lg:w-2/3" />
      <BigWord className="right-[-7%] bottom-[-0.3em] text-[clamp(140px,19vw,300px)] text-white opacity-[0.1]">
        24 ชม.
      </BigWord>
      <div className={cn(container, "grid items-end gap-8 py-[clamp(56px,7vw,96px)] lg:grid-cols-12")}>
        <div className="lg:col-span-7">
          <h2 className="mb-4 text-[clamp(30px,4vw,52px)] leading-[1.12] text-white">
            <Lines lines={cta.heading} />
          </h2>
          <p className="text-[17px] leading-[1.7] text-on-dark-muted">{cta.lead}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
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
