import { areaLinks, areaPages, type AreaPage } from "@workspace/shared/area"
import { articles, type Article } from "@workspace/shared/article"
import type { ContentRef } from "@workspace/shared/common"
import {
  areaServiceLd,
  articleLd,
  serviceLd,
} from "@workspace/shared/jsonld"
import { resolveRef } from "@workspace/shared/links"
import {
  servicePages,
  services,
  type ServicePage,
} from "@workspace/shared/service"

export type PageType = "service" | "area" | "blog"

// One landing page flattened into what the SEO checks need.
export type PageDoc = {
  id: string
  type: PageType
  title: string
  path: string
  seoTitle: string
  metaDescription: string
  h1: string
  text: string
  links: ContentRef[]
  imageSlots: number
  ogImage: string | null
  schema: string[]
  schemaGaps: string[]
  publishedAt: string | null
}

const areaRefs = areaLinks.map(
  (a): ContentRef => ({ label: a.name, kind: "area", slug: a.pageSlug })
)
const serviceRefs = services.map(
  (s): ContentRef => ({ label: s.title, kind: "service", slug: s.slug })
)
// Builders only need an origin to produce the object; required keys don't depend on it.
const missing = (ld: Record<string, unknown>, keys: string[]) =>
  keys.filter((k) => !(k in ld))

function serviceDoc(p: ServicePage): PageDoc {
  return {
    id: `service-${p.slug}`,
    type: "service",
    title: p.breadcrumb,
    path: `/services/${p.slug}`,
    seoTitle: p.seoTitle,
    metaDescription: p.metaDescription,
    h1: p.h1,
    text: [
      p.h1,
      p.lead,
      p.intro.heading,
      ...p.intro.paragraphs,
      p.scopeHeading,
      ...p.scope,
      p.fleetHeading,
      ...p.fleet.head,
      ...p.fleet.rows.flat(),
      p.stepsHeading,
      ...p.steps.flatMap((s) => [s.title, s.desc]),
      p.faqHeading,
      ...p.faqs.flatMap((f) => [f.q, f.a]),
      p.sidebar.title,
      p.sidebar.text,
    ].join(" "),
    links: [...p.related, ...areaRefs],
    imageSlots: 1,
    ogImage: null,
    schema: ["Service", "FAQPage", "BreadcrumbList"],
    schemaGaps: missing(serviceLd("https://x", p), ["name", "provider"]),
    publishedAt: null,
  }
}

function areaDoc(p: AreaPage): PageDoc {
  return {
    id: `area-${p.slug}`,
    type: "area",
    title: `ส่งน้ำ ${p.name}`,
    path: `/areas/${p.slug}`,
    seoTitle: p.seoTitle,
    metaDescription: p.metaDescription,
    h1: p.h1,
    text: [
      p.h1,
      p.lead,
      p.contactTitle,
      p.zonesHeading,
      ...p.zones,
      p.servicesHeading,
      ...services.flatMap((s) => [s.title, s.shortDescription]),
      p.faqHeading,
      ...p.faqs.flatMap((f) => [f.q, f.a]),
    ].join(" "),
    links: [...serviceRefs, ...areaRefs],
    imageSlots: 1,
    ogImage: null,
    schema: ["Service", "FAQPage", "BreadcrumbList"],
    schemaGaps: missing(areaServiceLd("https://x", p), ["name", "provider", "areaServed"]),
    publishedAt: null,
  }
}

function articleDoc(a: Article): PageDoc {
  const text: string[] = [a.h1, a.lead, a.cta.title, a.cta.text]
  const links: ContentRef[] = [...a.related]
  for (const block of a.body) {
    if (block.type === "p") {
      for (const part of block.content) {
        if (typeof part === "string") text.push(part)
        else {
          text.push(part.label)
          links.push(part)
        }
      }
    } else if (block.type === "h2" || block.type === "h3") text.push(block.text)
    else if (block.type === "checklist") text.push(...block.items)
    else text.push(...block.head, ...block.rows.flat())
  }
  return {
    id: `blog-${a.slug}`,
    type: "blog",
    title: a.h1,
    path: `/blog/${a.slug}`,
    seoTitle: a.seoTitle,
    metaDescription: a.metaDescription,
    h1: a.h1,
    text: text.join(" "),
    links,
    imageSlots: 1,
    ogImage: null,
    schema: ["Article", "BreadcrumbList"],
    schemaGaps: missing(articleLd("https://x", a), ["headline", "datePublished", "author", "image"]),
    publishedAt: a.publishedAt,
  }
}

export function listPageDocs(): PageDoc[] {
  return [
    ...servicePages.map(serviceDoc),
    ...areaPages.map(areaDoc),
    ...articles.map(articleDoc),
  ]
}

export function getPageDoc(id: string) {
  return listPageDocs().find((d) => d.id === id)
}

// Thai has no spaces between words, so count with the ICU word segmenter.
const segmenter = new Intl.Segmenter("th", { granularity: "word" })
export function countWords(text: string) {
  let n = 0
  for (const s of segmenter.segment(text)) if (s.isWordLike) n++
  return n
}

export type SeoCheck = {
  key: string
  label: string
  ok: boolean
  detail: string
  field?: "seoTitle" | "metaDescription"
}

// Thresholds from the design handoff ("SEO Score — เกณฑ์คำนวณจริง").
export function seoChecks(doc: PageDoc, siteUrl: string): SeoCheck[] {
  const titleLen = doc.seoTitle.length
  const descLen = doc.metaDescription.length
  const canonical = new URL(doc.path, siteUrl).href
  const destinations = new Set(
    doc.links
      .map((ref) => resolveRef(ref).href)
      .filter((href) => href !== "/quote" && href !== doc.path)
  )
  const words = countWords(doc.text)

  return [
    {
      key: "title",
      label: "SEO Title",
      field: "seoTitle",
      ok: titleLen >= 30 && titleLen <= 65,
      detail: `${titleLen} ตัวอักษร · ควรอยู่ระหว่าง 30–65`,
    },
    {
      key: "description",
      label: "Meta Description",
      field: "metaDescription",
      ok: descLen >= 70 && descLen <= 160,
      detail: `${descLen} ตัวอักษร · ควรอยู่ระหว่าง 70–160`,
    },
    {
      key: "h1",
      label: "H1 เดียวต่อหน้า",
      ok: doc.h1.trim().length > 0,
      detail: doc.h1 || "ยังไม่มี H1",
    },
    {
      key: "canonical",
      label: "Canonical URL",
      ok: canonical.startsWith("https://"),
      detail: canonical,
    },
    {
      key: "og",
      label: "OG Image",
      ok: doc.ogImage !== null,
      detail: doc.ogImage ?? "ยังไม่มีรูปสำหรับแชร์ · ต้องมีขนาดอย่างน้อย 1200×630",
    },
    {
      key: "links",
      label: "Internal Links",
      ok: destinations.size >= 3,
      detail:
        destinations.size >= 3
          ? `ลิงก์ไปหน้าเนื้อหาอื่น ${destinations.size} หน้า`
          : `ลิงก์ไปหน้าเนื้อหาอื่นได้ ${destinations.size} หน้า (ต้อง ≥ 3) · หน้าปลายทางหลายหน้ายังไม่มีเนื้อหา จึงลิงก์ไป /quote แทน`,
    },
    {
      key: "length",
      label: "ความยาวเนื้อหา",
      ok: words >= 800,
      detail:
        words >= 800
          ? `${words.toLocaleString("en-US")} คำ`
          : `${words.toLocaleString("en-US")} คำ · แนะนำอย่างน้อย 800 คำ เพิ่มหัวข้อที่ตอบคำถามลูกค้าจริง`,
    },
    {
      key: "schema",
      label: "Structured Data",
      ok: doc.schemaGaps.length === 0,
      detail:
        doc.schemaGaps.length === 0
          ? doc.schema.join(" + ")
          : `${doc.schema[0]} ยังขาด ${doc.schemaGaps.join(", ")}`,
    },
    {
      key: "alt",
      label: "Alt text ของภาพ",
      ok: doc.imageSlots === 0,
      detail:
        doc.imageSlots === 0
          ? "ไม่มีรูปที่ขาด alt"
          : `ยังเป็นภาพตัวอย่าง ${doc.imageSlots} ช่อง · ใส่รูปจริงพร้อม alt ภาษาไทยที่บรรยายภาพ`,
    },
  ]
}

export function seoScore(checks: SeoCheck[]) {
  return Math.round((checks.filter((c) => c.ok).length / checks.length) * 100)
}
