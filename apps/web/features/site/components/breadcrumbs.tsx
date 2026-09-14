import Link from "next/link"
import { Fragment } from "react"

import { breadcrumbLd, type SiteLink } from "@workspace/shared"
import { JsonLd } from "@workspace/ui/components/json-ld"

import { env } from "@/lib/env"

export function Breadcrumbs({
  items,
  current,
}: {
  items: SiteLink[]
  current: SiteLink
}) {
  return (
    <nav aria-label="breadcrumb" className="border-b border-tint-border bg-tint">
      <JsonLd data={breadcrumbLd(env.NEXT_PUBLIC_SITE_URL, [...items, current])} />
      <ol className="mx-auto flex max-w-[1200px] flex-wrap gap-2 px-5 py-3.5 text-[13.5px] text-muted-foreground">
        {items.map((item) => (
          <Fragment key={item.href}>
            <li>
              <Link href={item.href} className="text-brand hover:text-brand-strong">
                {item.label}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
          </Fragment>
        ))}
        <li aria-current="page" className="text-foreground">
          {current.label}
        </li>
      </ol>
    </nav>
  )
}
