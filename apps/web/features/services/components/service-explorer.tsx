"use client"

import Link from "next/link"
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  PhoneIcon,
} from "lucide-react"
import { Fragment, useState } from "react"

import {
  quoteHref,
  resolveRef,
  services,
  site,
  truckVolumeSchema,
  type Service,
} from "@workspace/shared"
import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { ServiceIcon } from "./service-icon"

const volumeLabel = (v: string) => `${Number(v).toLocaleString("en-US")} ลิตร`

// One service's details + the conversion actions. Rendered in the sticky panel
// on desktop and inline under the selected card on mobile.
function ServicePanel({
  service,
  className,
}: {
  service: Service
  className?: string
}) {
  const page = resolveRef({
    label: service.title,
    kind: "service",
    slug: service.slug,
  })
  return (
    <div
      className={cn(
        "rounded-[24px] bg-surface-dark p-6 text-white sm:p-8 lg:rounded-[28px] lg:p-10",
        className
      )}
    >
      {/* the enter animation replays whenever the panel is un-hidden */}
      <div className="animate-in duration-300 fade-in-0 slide-in-from-bottom-2 motion-reduce:animate-none">
        <div className="mb-6 hidden items-center gap-4 lg:flex">
          <span className="grid size-14 place-items-center rounded-[16px] bg-white/12">
            <ServiceIcon name={service.icon} className="size-7" />
          </span>
          <h3 className="text-[clamp(24px,2.4vw,30px)] text-white">
            {service.title}
          </h3>
        </div>
        <p className="mb-7 max-w-[52ch] text-[16.5px] leading-[1.7] text-on-dark-muted">
          {service.shortDescription}
        </p>

        <p className="mb-2.5 text-sm font-semibold text-white">
          ขนาดรถที่เหมาะกับงานนี้
        </p>
        <ul className="mb-3 flex flex-wrap gap-2">
          {truckVolumeSchema.options.map((v) => {
            const fits = service.volumes.includes(v)
            return (
              <li key={v}>
                {fits ? (
                  <Link
                    href={quoteHref({ service: service.quoteType, volume: v })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-surface-dark transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
                  >
                    <CheckIcon
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={3}
                    />
                    {volumeLabel(v)}
                  </Link>
                ) : (
                  <span className="inline-flex rounded-full border border-white/20 px-3.5 py-2 text-sm text-white/45">
                    <span className="sr-only">ไม่แนะนำ </span>
                    {volumeLabel(v)}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
        <p className="mb-7 text-[13px] text-on-dark-muted">
          {service.monthlyContract ? "รองรับสัญญารายเดือน · " : ""}
          กดขนาดรถเพื่อขอราคาได้ทันที
        </p>

        <p className="mb-2.5 text-sm font-semibold text-white">
          เตรียมข้อมูลนี้ ได้ราคาเร็วขึ้น
        </p>
        <ul className="mb-8 grid gap-2">
          {service.prepare.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[15px] leading-[1.6] text-on-dark-muted"
            >
              <CheckIcon
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-white"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={quoteHref({ service: service.quoteType })}
            className={cn(
              buttonVariants({ variant: "call", size: "cta-sm" }),
              "group/cta max-sm:w-full"
            )}
          >
            ขอราคา{service.title}
            <ArrowRightIcon
              aria-hidden="true"
              className="transition-transform motion-safe:group-hover/cta:translate-x-1"
            />
          </Link>
          <a
            href={site.phoneHref}
            className={cn(
              buttonVariants({ variant: "on-dark", size: "cta-sm" }),
              "max-sm:w-full"
            )}
          >
            <PhoneIcon aria-hidden="true" />
            {site.phone}
          </a>
          {page.href !== "/quote" && (
            <Link
              href={page.href}
              className="text-[15px] font-semibold text-white underline-offset-4 hover:underline"
            >
              ดูรายละเอียดบริการ
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// Desktop grid rows for the six cards (static strings so Tailwind generates them).
const cardRow = [
  "lg:row-start-1",
  "lg:row-start-2",
  "lg:row-start-3",
  "lg:row-start-4",
  "lg:row-start-5",
  "lg:row-start-6",
]

// Interactive service picker: choosing a card shows what fits that job and
// links straight into a pre-filled quote form.
//
// SEO: every service's details are server-rendered, once each. Inactive panels
// only get the `hidden` attribute, so the content stays in the HTML for crawlers.
// Layout: on mobile each panel follows its card in document order (opens inline);
// on desktop the grid stacks all panels in one sticky right-hand cell.
export function ServiceExplorer() {
  const [selected, setSelected] = useState(
    services.find((s) => s.slug === "hotel-water")?.slug ?? services[0]!.slug
  )

  return (
    <div className="grid items-start gap-3 lg:grid-cols-12 lg:grid-rows-[repeat(6,auto)_1fr] lg:gap-x-10">
      {services.map((service, i) => {
        const active = service.slug === selected
        const panelId = `service-panel-${service.slug}`
        return (
          <Fragment key={service.slug}>
            <button
              type="button"
              aria-expanded={active}
              aria-controls={panelId}
              id={`service-card-${service.slug}`}
              onClick={(e) => {
                setSelected(service.slug)
                // Mobile: details open inline and the previous card collapses,
                // so bring the chosen card back to the top of the screen.
                const card = e.currentTarget
                if (window.matchMedia("(max-width: 1023px)").matches) {
                  const smooth = window.matchMedia(
                    "(prefers-reduced-motion: no-preference)"
                  ).matches
                  requestAnimationFrame(() =>
                    card.scrollIntoView({
                      block: "start",
                      behavior: smooth ? "smooth" : "auto",
                    })
                  )
                }
              }}
              className={cn(
                "group grid w-full scroll-mt-24 grid-cols-[48px_1fr_auto] items-center gap-4 rounded-[18px] border px-4 py-4 text-left transition-colors sm:px-5 lg:col-[1/6]",
                cardRow[i],
                active
                  ? "border-primary bg-soft"
                  : "bg-card hover:border-soft-border hover:bg-tint"
              )}
            >
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-[14px] transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-soft text-brand"
                )}
              >
                <ServiceIcon name={service.icon} className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-heading text-lg font-semibold text-foreground">
                  {service.title}
                </span>
                <span className="mt-0.5 line-clamp-1 text-[14px] text-muted-foreground">
                  {service.shortDescription}
                </span>
              </span>
              <ChevronDownIcon
                aria-hidden="true"
                className={cn(
                  "size-5 text-brand transition-transform motion-reduce:transition-none lg:-rotate-90",
                  active && "rotate-180 lg:translate-x-1 lg:-rotate-90"
                )}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`service-card-${service.slug}`}
              hidden={!active}
              className="mb-3 lg:sticky lg:top-28 lg:col-[6/13] lg:row-[1/8] lg:mb-0"
            >
              <ServicePanel service={service} />
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
