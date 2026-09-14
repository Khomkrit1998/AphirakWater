import { quoteDefaultsSchema, quotePage } from "@workspace/shared"

import { QuotePage } from "@/features/quote"
import { Breadcrumbs } from "@/features/site"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: quotePage.seoTitle,
  description: quotePage.metaDescription,
  path: "/quote",
})

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  // ?service=hotel&volume=10000 comes from the home page; invalid values are ignored.
  const defaults = quoteDefaultsSchema.parse(await searchParams)

  return (
    <>
      <Breadcrumbs
        items={[{ label: "หน้าหลัก", href: "/" }]}
        current={{ label: "ขอใบเสนอราคา", href: "/quote" }}
      />
      <QuotePage defaults={defaults} />
    </>
  )
}
