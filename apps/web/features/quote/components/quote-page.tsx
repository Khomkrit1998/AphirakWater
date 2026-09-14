import { quotePage, site, type QuoteDefaults } from "@workspace/shared"
import { buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { QueryProvider } from "@/components/query-provider"

import { QuoteForm } from "./quote-form"

export function QuotePage({ defaults }: { defaults: QuoteDefaults }) {
  const { urgent, example, pricingFactors } = quotePage
  return (
    <section className="mx-auto max-w-[1120px] px-5 pt-[52px] pb-[90px]">
      <div className="mb-9 max-w-[680px]">
        <h1 className="mb-3.5 text-[clamp(30px,4vw,46px)] leading-[1.12]">
          {quotePage.h1}
        </h1>
        <p className="text-[17px] leading-[1.7] text-ink-600">{quotePage.lead}</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-start gap-7">
        <QueryProvider>
          <QuoteForm defaults={defaults} />
        </QueryProvider>

        <aside className="grid min-w-0 gap-[18px]">
          <div className="rounded-[22px] bg-surface-dark p-[26px] text-white">
            <h2 className="mb-2.5 text-[19px] font-bold">{urgent.title}</h2>
            <p className="mb-[18px] text-[15px] leading-[1.7] text-on-dark-muted">
              {urgent.text}
            </p>
            <a
              href={site.phoneHref}
              className={cn(
                buttonVariants({ variant: "call" }),
                "h-auto w-full rounded-[13px] py-[15px] text-base font-semibold"
              )}
            >
              โทร {site.phone}
            </a>
          </div>

          <div className="rounded-[22px] border bg-card p-[26px]">
            <h2 className="mb-4 text-[16.5px]">{example.title}</h2>
            <dl className="grid gap-3.5">
              {example.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between gap-3.5 border-b border-line-soft pb-3 text-[14.5px]"
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="text-right font-semibold text-foreground">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-[22px] border border-tint-border bg-tint p-6">
            <h2 className="mb-3 text-[16.5px]">{pricingFactors.title}</h2>
            <p className="text-[14.5px] leading-[1.75] text-ink-600">
              {pricingFactors.text}
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
