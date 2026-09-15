import type { AreaPage } from "@workspace/shared/area"
import type { Article } from "@workspace/shared/article"
import type { Faq, SiteLink } from "@workspace/shared/common"
import type { ServicePage } from "@workspace/shared/service"
import { site } from "@workspace/shared/site"

// schema.org JSON-LD builders. `siteUrl` is the absolute origin, no trailing slash.
type JsonLd = Record<string, unknown>

const context = "https://schema.org"
const provinces = ["ภูเก็ต", "พังงา"].map((name) => ({
  "@type": "AdministrativeArea",
  name,
}))

const businessId = (siteUrl: string) => `${siteUrl}/#business`

// On every page: the website and the business (LocalBusiness is an Organization).
// ponytail: no address / geo yet (client has not supplied them); Google needs
// `address` for LocalBusiness rich results, add it when known.
export function siteGraphLd(siteUrl: string): JsonLd {
  return {
    "@context": context,
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        inLanguage: "th",
        publisher: { "@id": businessId(siteUrl) },
      },
      {
        "@type": "LocalBusiness",
        "@id": businessId(siteUrl),
        name: site.legalName,
        alternateName: site.name,
        description: site.description,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: `${siteUrl}/logo.png`,
        telephone: site.phoneIntl,
        areaServed: provinces,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
  }
}

export function breadcrumbLd(siteUrl: string, trail: SiteLink[]): JsonLd {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: trail.map((link, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: link.label,
      item: `${siteUrl}${link.href}`,
    })),
  }
}

export function faqPageLd(faqs: Faq[]): JsonLd {
  return {
    "@context": context,
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }
}

export function serviceLd(siteUrl: string, page: ServicePage): JsonLd {
  return {
    "@context": context,
    "@type": "Service",
    name: page.h1,
    serviceType: page.breadcrumb,
    description: page.metaDescription,
    url: `${siteUrl}/services/${page.slug}`,
    provider: { "@id": businessId(siteUrl) },
    areaServed: provinces,
  }
}

export function areaServiceLd(siteUrl: string, page: AreaPage): JsonLd {
  return {
    "@context": context,
    "@type": "Service",
    name: page.h1,
    serviceType: "บริการรถส่งน้ำ",
    description: page.metaDescription,
    url: `${siteUrl}/areas/${page.slug}`,
    provider: { "@id": businessId(siteUrl) },
    areaServed: {
      "@type": "AdministrativeArea",
      name: page.name,
      containsPlace: page.zones.map((name) => ({ "@type": "Place", name })),
    },
  }
}

// ponytail: no `image` until the client supplies a cover photo; Google wants one
// for Article rich results.
export function articleLd(siteUrl: string, article: Article): JsonLd {
  const url = `${siteUrl}/blog/${article.slug}`
  return {
    "@context": context,
    "@type": "Article",
    headline: article.h1,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "th",
    mainEntityOfPage: url,
    url,
    author: { "@type": "Organization", name: site.legalName, url: siteUrl },
    publisher: { "@id": businessId(siteUrl) },
  }
}
