import { z } from "zod"

export const slugSchema = z.string().regex(/^[a-z0-9-]+$/)

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})
export type SiteLink = z.infer<typeof linkSchema>

// A link to a service or area page. Resolved to a URL by `resolveRef`,
// which falls back to /quote while the target page has no content yet.
export const refSchema = z.object({
  label: z.string().min(1),
  kind: z.enum(["service", "area"]),
  slug: slugSchema,
})
export type ContentRef = z.infer<typeof refSchema>

export const faqSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
})
export type Faq = z.infer<typeof faqSchema>

export const seoSchema = z.object({
  seoTitle: z.string().min(1),
  metaDescription: z.string().min(1),
})
