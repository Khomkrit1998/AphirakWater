import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  areaPageSlugs,
  areaServiceLd,
  faqPageLd,
  getAreaPage,
} from "@workspace/shared"
import { JsonLd } from "@workspace/ui/components/json-ld"

import { AreaDetail } from "@/features/areas"
import { ServiceCards } from "@/features/services"
import { Breadcrumbs } from "@/features/site"
import { env } from "@/lib/env"
import { pageMetadata } from "@/lib/metadata"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return areaPageSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getAreaPage((await params).slug)
  if (!page) return {}
  return pageMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `/areas/${page.slug}`,
  })
}

export default async function Page({ params }: Props) {
  const page = getAreaPage((await params).slug)
  if (!page) notFound()

  return (
    <>
      <JsonLd data={areaServiceLd(env.NEXT_PUBLIC_SITE_URL, page)} />
      <JsonLd data={faqPageLd(page.faqs)} />
      <Breadcrumbs
        items={[
          { label: "หน้าหลัก", href: "/" },
          { label: "พื้นที่ให้บริการ", href: "/#areas" },
        ]}
        current={{ label: page.name, href: `/areas/${page.slug}` }}
      />
      <AreaDetail
        page={page}
        services={<ServiceCards titleSuffix={` ${page.name}`} />}
      />
    </>
  )
}
