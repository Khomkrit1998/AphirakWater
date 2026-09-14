import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  faqPageLd,
  getServicePage,
  serviceLd,
  servicePageSlugs,
} from "@workspace/shared"
import { JsonLd } from "@workspace/ui/components/json-ld"

import { ServiceDetail } from "@/features/services"
import { Breadcrumbs } from "@/features/site"
import { env } from "@/lib/env"
import { pageMetadata } from "@/lib/metadata"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return servicePageSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getServicePage((await params).slug)
  if (!page) return {}
  return pageMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `/services/${page.slug}`,
  })
}

export default async function Page({ params }: Props) {
  const page = getServicePage((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={serviceLd(env.NEXT_PUBLIC_SITE_URL, page)} />
      <JsonLd data={faqPageLd(page.faqs)} />
      <Breadcrumbs
        items={[
          { label: "หน้าหลัก", href: "/" },
          { label: "บริการน้ำ", href: "/#services" },
        ]}
        current={{ label: page.breadcrumb, href: `/services/${page.slug}` }}
      />
      <ServiceDetail page={page} />
    </>
  )
}
