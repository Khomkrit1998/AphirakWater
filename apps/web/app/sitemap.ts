import type { MetadataRoute } from "next"

import { areaPageSlugs, articles, servicePageSlugs } from "@workspace/shared"

import { env } from "@/lib/env"

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${env.NEXT_PUBLIC_SITE_URL}${path}`
  return [
    { url: url("/"), priority: 1 },
    { url: url("/quote"), priority: 0.9 },
    ...servicePageSlugs.map((slug) => ({ url: url(`/services/${slug}`), priority: 0.8 })),
    ...areaPageSlugs.map((slug) => ({ url: url(`/areas/${slug}`), priority: 0.8 })),
    { url: url("/blog"), priority: 0.5 },
    ...articles.map((a) => ({
      url: url(`/blog/${a.slug}`),
      lastModified: a.publishedAt,
      priority: 0.6,
    })),
  ]
}
