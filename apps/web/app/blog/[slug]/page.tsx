import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { articleLd, articles, getArticle } from "@workspace/shared"
import { JsonLd } from "@workspace/ui/components/json-ld"

import { ArticleView } from "@/features/blog"
import { Breadcrumbs } from "@/features/site"
import { env } from "@/lib/env"
import { pageMetadata } from "@/lib/metadata"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug)
  if (!article) return {}
  return pageMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: `/blog/${article.slug}`,
    type: "article",
  })
}

export default async function Page({ params }: Props) {
  const article = getArticle((await params).slug)
  if (!article) notFound()

  return (
    <>
      <JsonLd data={articleLd(env.NEXT_PUBLIC_SITE_URL, article)} />
      <Breadcrumbs
        items={[
          { label: "หน้าหลัก", href: "/" },
          { label: "บทความ", href: "/blog" },
        ]}
        current={{ label: article.breadcrumb, href: `/blog/${article.slug}` }}
      />
      <ArticleView article={article} />
    </>
  )
}
