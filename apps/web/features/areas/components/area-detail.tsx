import Link from "next/link"

import { areaLinks, resolveRef, site, type AreaPage } from "@workspace/shared"
import { buttonVariants } from "@workspace/ui/components/button"
import { FaqList } from "@workspace/ui/components/faq-list"
import { ImagePlaceholder } from "@workspace/ui/components/image-placeholder"
import { cn } from "@workspace/ui/lib/utils"

const h2 = "text-[clamp(24px,3vw,34px)]"

// `services` is a slot so the route can pass cards from the services feature.
export function AreaDetail({
  page,
  services,
}: {
  page: AreaPage
  services: React.ReactNode
}) {
  const contact = [
    { label: "โทรศัพท์", value: <a href={site.phoneHref} className="text-brand">{site.phone}</a> },
    { label: "LINE", value: <a href={site.lineHref} className="text-brand">{site.lineId}</a> },
    { label: "เวลารับงาน", value: "24 ชั่วโมง" },
    { label: "งานเร่งด่วน", value: "24 ชั่วโมง" },
  ]

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-5 pt-[52px]">
        <h1 className="mb-4 max-w-[820px] text-[clamp(30px,4.4vw,50px)] leading-[1.1]">
          {page.h1}
        </h1>
        <p className="mb-7 max-w-[760px] text-[17.5px] leading-[1.75] text-ink-600">
          {page.lead}
        </p>
        <div className="mb-10 flex flex-wrap gap-3">
          <a
            href={site.phoneHref}
            className={cn(buttonVariants({ variant: "call", size: "cta-sm" }), "max-sm:w-full")}
          >
            โทร {site.phone}
          </a>
          <Link
            href="/quote"
            className={cn(
              buttonVariants({ variant: "outline", size: "cta-sm" }),
              "border-[1.5px] border-soft-border text-brand-strong hover:bg-soft hover:text-brand-strong max-sm:w-full"
            )}
          >
            {page.quoteCta}
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
          <div className="aspect-[16/10] min-w-0 overflow-hidden rounded-[22px] border">
            <ImagePlaceholder label={page.mapLabel} />
          </div>
          <div className="rounded-[22px] border bg-card p-[26px]">
            <h2 className="mb-4 text-lg font-bold">{page.contactTitle}</h2>
            <dl className="grid gap-3 text-[15px] text-ink-600">
              {contact.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between gap-3 border-b border-line-soft pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pt-16">
        <h2 className={cn(h2, "mb-5")}>{page.zonesHeading}</h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-3">
          {page.zones.map((zone) => (
            <li
              key={zone}
              className="motion-rise flex items-center gap-2.5 rounded-[14px] border bg-card px-4 py-3.5 text-[15px]"
            >
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-live" />
              {zone}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pt-16">
        <h2 className={cn(h2, "mb-5")}>{page.servicesHeading}</h2>
        {services}
      </section>

      <section className="mx-auto max-w-[900px] px-5 pt-16">
        <h2 className={cn(h2, "mb-[22px]")}>{page.faqHeading}</h2>
        <FaqList name="area-faq" size="sm" items={page.faqs} />
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pt-16 pb-[90px]">
        <nav
          aria-labelledby="nearby-areas"
          className="rounded-[22px] border border-tint-border bg-tint p-[26px]"
        >
          <h2 id="nearby-areas" className="mb-3.5 text-[19px]">
            {page.nearbyHeading}
          </h2>
          <ul className="flex flex-wrap gap-2.5">
            {areaLinks.map((area) => (
              <li key={area.name}>
                <Link
                  href={resolveRef({ label: area.name, kind: "area", slug: area.pageSlug }).href}
                  className="block rounded-full border bg-card px-4 py-2.5 text-[14.5px] text-foreground transition-colors hover:border-primary"
                >
                  ส่งน้ำ {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  )
}
