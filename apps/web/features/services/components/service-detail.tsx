import Link from "next/link"

import {
  areaLinks,
  resolveRef,
  site,
  type ServicePage,
} from "@workspace/shared"
import { buttonVariants } from "@workspace/ui/components/button"
import { CheckList } from "@workspace/ui/components/check-list"
import { FaqList } from "@workspace/ui/components/faq-list"
import { ImagePlaceholder } from "@workspace/ui/components/image-placeholder"
import { InfoTable } from "@workspace/ui/components/info-table"
import { cn } from "@workspace/ui/lib/utils"

export function ServiceDetail({ page }: { page: ServicePage }) {
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-5 pt-[52px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-10">
          <div>
            <h1 className="mb-4 text-[clamp(30px,4.4vw,50px)] leading-[1.1]">
              {page.h1}
            </h1>
            <p className="mb-[26px] text-[17.5px] leading-[1.7] text-ink-600">
              {page.lead}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/quote"
                className={cn(buttonVariants({ size: "cta-sm" }), "max-sm:w-full")}
              >
                ขอใบเสนอราคา
              </Link>
              <a
                href={site.phoneHref}
                className={cn(
                  buttonVariants({ variant: "call-outline", size: "cta-sm" }),
                  "max-sm:w-full"
                )}
              >
                โทร {site.phone}
              </a>
            </div>
          </div>
          <div className="aspect-[4/3] min-w-0 overflow-hidden rounded-[22px] border">
            <ImagePlaceholder label={page.heroImageLabel} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 pt-16 pb-[84px]">
        <div className="grid items-start gap-11 min-[900px]:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0">
            <h2 className="mb-3.5 text-[clamp(24px,3vw,34px)]">
              {page.intro.heading}
            </h2>
            {page.intro.paragraphs.map((text) => (
              <p
                key={text}
                className="mb-4 text-[16.5px] leading-[1.8] text-ink-600 last-of-type:mb-[30px]"
              >
                {text}
              </p>
            ))}

            <h3 className="mb-3 text-[21px]">{page.scopeHeading}</h3>
            <CheckList items={page.scope} className="mb-[30px]" />

            <h3 className="mb-3.5 text-[21px]">{page.fleetHeading}</h3>
            <InfoTable
              head={page.fleet.head}
              rows={page.fleet.rows}
              className="mb-8"
            />

            <h3 className="mb-3.5 text-[21px]">{page.stepsHeading}</h3>
            <ol className="mb-9 grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-3.5">
              {page.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="motion-rise rounded-[16px] border bg-card p-[18px]"
                >
                  <p className="mb-2 font-heading text-[13px] font-bold text-brand">
                    STEP {i + 1}
                  </p>
                  <p className="mb-1.5 font-heading text-[16.5px] font-semibold">
                    {step.title}
                  </p>
                  <p className="text-sm leading-[1.6] text-muted-foreground">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>

            <h2 className="mb-[18px] text-[clamp(24px,2.8vw,30px)]">
              {page.faqHeading}
            </h2>
            <FaqList
              name="service-faq"
              size="sm"
              items={page.faqs}
              className="mb-[34px]"
            />

            <div className="rounded-[20px] border border-tint-border bg-tint p-[26px]">
              <h2 className="mb-3.5 text-[19px]">บริการที่เกี่ยวข้อง</h2>
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-2.5">
                {page.related.map((ref) => {
                  const link = resolveRef(ref)
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex justify-between gap-2.5 rounded-[12px] border bg-card px-4 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:border-primary"
                      >
                        {link.label}
                        <span
                          aria-hidden="true"
                          className="text-brand transition-transform motion-safe:group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </article>

          <aside className="grid min-w-0 gap-4 min-[900px]:sticky min-[900px]:top-[92px]">
            <div className="rounded-[20px] border bg-card p-6 shadow-lift">
              <p className="mb-2 font-heading text-lg font-bold">
                {page.sidebar.title}
              </p>
              <p className="mb-[18px] text-[14.5px] leading-[1.65] text-muted-foreground">
                {page.sidebar.text}
              </p>
              <Link
                href="/quote"
                className={cn(
                  buttonVariants({ variant: "call" }),
                  "mb-2.5 h-auto w-full rounded-[12px] py-3.5 text-[15.5px] font-semibold"
                )}
              >
                ขอใบเสนอราคา
              </Link>
              <a
                href={site.phoneHref}
                className={cn(
                  buttonVariants({ variant: "soft" }),
                  "h-auto w-full rounded-[12px] py-3.5 text-[15.5px] font-semibold"
                )}
              >
                โทร {site.phone}
              </a>
            </div>
            <nav
              aria-label="พื้นที่ให้บริการยอดนิยม"
              className="rounded-[20px] border bg-card p-[22px]"
            >
              <p className="mb-3 font-heading text-[15.5px] font-semibold">
                พื้นที่ให้บริการยอดนิยม
              </p>
              <ul className="grid gap-2">
                {areaLinks.map((area) => (
                  <li key={area.name}>
                    <Link
                      href={
                        resolveRef({ label: area.name, kind: "area", slug: area.pageSlug }).href
                      }
                      className="text-[14.5px] text-ink-600 hover:text-brand-strong"
                    >
                      ส่งน้ำ {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>
    </>
  )
}
