import {
  areaLinks,
  getAreaPage,
  getArticle,
  getPageDoc,
  getServicePage,
  services,
  type Block,
  type BlockType,
} from "@workspace/shared"

const block = (type: BlockType, heading: string, note: string, i: number): Block => ({
  id: `${type}-${i}`,
  type,
  heading,
  note,
  visible: true,
  background: "white",
})

// The block list mirrors how each template renders today, so the builder
// starts from the real page instead of placeholder rows.
function initialBlocks(type: string, slug: string): Block[] {
  if (type === "service") {
    const p = getServicePage(slug)
    if (!p) return []
    return [
      block("hero", p.h1, "H1 · CTA คู่ · ภาพรถส่งน้ำ", 0),
      block("richText", p.intro.heading, `${p.intro.paragraphs.length} ย่อหน้า`, 1),
      block("richText", p.scopeHeading, `รายการ ${p.scope.length} ข้อ`, 2),
      block("pricing", p.fleetHeading, `ตารางขนาดรถ ${p.fleet.rows.length} แถว`, 3),
      block("featureGrid", p.stepsHeading, `${p.steps.length} ขั้นตอน`, 4),
      block("faq", p.faqHeading, `${p.faqs.length} คำถาม · FAQ Schema`, 5),
      block("relatedServices", "บริการที่เกี่ยวข้อง", `${p.related.length} ลิงก์`, 6),
      block("cta", p.sidebar.title, "การ์ดขอราคาใน sidebar", 7),
    ]
  }
  if (type === "area") {
    const p = getAreaPage(slug)
    if (!p) return []
    return [
      block("hero", p.h1, "H1 · ปุ่มโทร · ขอราคาในพื้นที่", 0),
      block("googleMap", p.contactTitle, "แผนที่ + ข้อมูลติดต่อ", 1),
      block("areaList", p.zonesHeading, `${p.zones.length} อำเภอ/ตำบล`, 2),
      block("serviceCards", p.servicesHeading, `${services.length} การ์ดบริการ`, 3),
      block("faq", p.faqHeading, `${p.faqs.length} คำถาม · FAQ Schema`, 4),
      block("areaList", p.nearbyHeading, `${areaLinks.length} ลิงก์`, 5),
    ]
  }
  const a = getArticle(slug)
  if (!a) return []
  const sections = a.body.filter((b) => b.type === "h2")
  return [
    block("hero", a.h1, "หมวด · วันที่ · ภาพปก", 0),
    ...sections.map((s, i) => block("richText", s.text, "H2 + เนื้อหา", i + 1)),
    block("cta", a.cta.title, "การ์ดขอราคาท้ายบทความ", sections.length + 1),
    block("relatedServices", "บริการที่เกี่ยวข้อง", `${a.related.length} ลิงก์`, sections.length + 2),
  ]
}

const templates = { service: "Service Landing", area: "Area Landing", blog: "Article" }

export function getBuilderPage(id: string, siteUrl: string) {
  const doc = getPageDoc(id)
  if (!doc) return undefined
  const slug = doc.path.split("/").pop() ?? ""
  return {
    id: doc.id,
    title: doc.title,
    path: doc.path,
    liveUrl: `${siteUrl}${doc.path}`,
    template: templates[doc.type],
    blocks: initialBlocks(doc.type, slug),
    seo: {
      seoTitle: doc.seoTitle,
      metaDescription: doc.metaDescription,
      robots: "index,follow" as const,
      schemaType: doc.type === "blog" ? ("Article" as const) : ("Service" as const),
    },
  }
}

export type BuilderPage = NonNullable<ReturnType<typeof getBuilderPage>>
