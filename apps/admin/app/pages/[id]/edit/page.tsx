import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { listPageDocs } from "@workspace/shared"

import { BuilderView, getBuilderPage } from "@/features/page-builder"
import { AdminTopbar } from "@/features/shell"
import { env } from "@/lib/env"

type Props = { params: Promise<{ id: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return listPageDocs().map((doc) => ({ id: doc.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getBuilderPage((await params).id, env.NEXT_PUBLIC_SITE_URL)
  return { title: page ? `แก้ไข ${page.title}` : "Page Builder" }
}

export default async function Page({ params }: Props) {
  const page = getBuilderPage((await params).id, env.NEXT_PUBLIC_SITE_URL)
  if (!page) notFound()

  return (
    <>
      <AdminTopbar
        title="แก้ไขหน้า · Page Builder"
        subtitle={`Landing Pages / ${page.title}`}
      />
      <BuilderView key={page.id} page={page} />
    </>
  )
}
