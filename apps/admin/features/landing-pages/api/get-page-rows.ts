import { listPageDocs, seoChecks, seoScore, site } from "@workspace/shared"

const shortThaiDate = new Intl.DateTimeFormat("th-TH", {
  dateStyle: "medium",
  timeZone: "Asia/Bangkok",
})

// Server-side: flatten content + SEO checks into serializable table rows.
export function getPageRows(siteUrl: string) {
  return listPageDocs().map((doc) => {
    const checks = seoChecks(doc, siteUrl)
    return {
      id: doc.id,
      type: doc.type,
      title: doc.title,
      path: doc.path,
      // Static content is live on the site, so it is all published for now.
      status: "published" as const,
      updated: doc.publishedAt ? shortThaiDate.format(new Date(doc.publishedAt)) : "—",
      checks,
      score: seoScore(checks),
      serp: {
        url: `${siteUrl}${doc.path}`,
        title: `${doc.seoTitle} | ${site.name}`,
        description: doc.metaDescription,
      },
    }
  })
}

export type PageRow = ReturnType<typeof getPageRows>[number]
