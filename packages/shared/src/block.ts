import { z } from "zod"

// The 15 block types of the page builder palette (design handoff, CMS content model).
export const blockTypes = [
  "hero",
  "richText",
  "serviceCards",
  "imageText",
  "featureGrid",
  "pricing",
  "faq",
  "testimonials",
  "gallery",
  "cta",
  "contact",
  "googleMap",
  "areaList",
  "relatedServices",
  "relatedArticles",
] as const
export type BlockType = (typeof blockTypes)[number]

export const blockLabels: Record<BlockType, string> = {
  hero: "Hero",
  richText: "Rich Text",
  serviceCards: "Service Cards",
  imageText: "Image + Text",
  featureGrid: "Feature Grid",
  pricing: "Pricing",
  faq: "FAQ",
  testimonials: "Testimonials",
  gallery: "Gallery",
  cta: "CTA",
  contact: "Contact",
  googleMap: "Google Map",
  areaList: "Area List",
  relatedServices: "Related Services",
  relatedArticles: "Related Articles",
}

export const blockBackgrounds = [
  { value: "white", label: "ขาว" },
  { value: "tint", label: "เขียวอ่อน" },
  { value: "dark", label: "เขียวเข้ม" },
] as const

export const blockSchema = z.object({
  id: z.string().min(1),
  type: z.enum(blockTypes),
  heading: z.string(),
  note: z.string(),
  visible: z.boolean(),
  background: z.enum(["white", "tint", "dark"]),
})
export type Block = z.infer<typeof blockSchema>
