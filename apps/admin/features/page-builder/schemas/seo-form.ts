import { z } from "zod"

// Same thresholds as the SEO checks, surfaced while typing.
export const seoFormSchema = z.object({
  seoTitle: z
    .string()
    .trim()
    .min(30, "SEO Title ควรยาวอย่างน้อย 30 ตัวอักษร")
    .max(65, "SEO Title ไม่ควรเกิน 65 ตัวอักษร"),
  metaDescription: z
    .string()
    .trim()
    .min(70, "Meta Description ควรยาวอย่างน้อย 70 ตัวอักษร")
    .max(160, "Meta Description ไม่ควรเกิน 160 ตัวอักษร"),
  robots: z.enum(["index,follow", "noindex"]),
  schemaType: z.enum(["Service", "LocalBusiness", "FAQPage", "Article"]),
})
export type SeoFormValues = z.infer<typeof seoFormSchema>
