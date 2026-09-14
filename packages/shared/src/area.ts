import { z } from "zod"

import { faqSchema, seoSchema, slugSchema } from "@workspace/shared/common"

export const areaLinkSchema = z.object({
  name: z.string().min(1),
  province: z.enum(["ภูเก็ต", "พังงา"]),
  // Area landing page that covers this place.
  pageSlug: slugSchema,
})
export type AreaLink = z.infer<typeof areaLinkSchema>

export const areaLinks = z.array(areaLinkSchema).parse([
  { name: "เมืองภูเก็ต", province: "ภูเก็ต", pageSlug: "phuket" },
  { name: "ถลาง", province: "ภูเก็ต", pageSlug: "phuket" },
  { name: "กะทู้ · ป่าตอง", province: "ภูเก็ต", pageSlug: "phuket" },
  { name: "เชิงทะเล · บางเทา", province: "ภูเก็ต", pageSlug: "phuket" },
  { name: "ราไวย์ · กะรน", province: "ภูเก็ต", pageSlug: "phuket" },
  { name: "โคกกลอย", province: "พังงา", pageSlug: "khok-kloi" },
  { name: "ตะกั่วทุ่ง", province: "พังงา", pageSlug: "takua-thung" },
  { name: "เขาหลัก · ท้ายเหมือง", province: "พังงา", pageSlug: "khao-lak" },
])

export const areaPageSchema = seoSchema.extend({
  slug: slugSchema,
  name: z.string().min(1),
  h1: z.string().min(1),
  lead: z.string().min(1),
  quoteCta: z.string().min(1),
  mapLabel: z.string().min(1),
  contactTitle: z.string().min(1),
  zonesHeading: z.string().min(1),
  zones: z.array(z.string().min(1)).min(1),
  servicesHeading: z.string().min(1),
  faqHeading: z.string().min(1),
  faqs: z.array(faqSchema).min(1),
  nearbyHeading: z.string().min(1),
})
export type AreaPage = z.infer<typeof areaPageSchema>

export const areaPages = z.array(areaPageSchema).parse([
  {
    slug: "phuket",
    seoTitle: "บริการส่งน้ำ ภูเก็ต รถน้ำถึงหน้างานทุกอำเภอ",
    metaDescription:
      "รถส่งน้ำภูเก็ต สำหรับบ้านพัก โรงแรม Pool Villa สระว่ายน้ำ และงานก่อสร้าง ครอบคลุมทุกอำเภอ รับงานเร่งด่วน 24 ชั่วโมง โทร 087-418-1199",
    name: "ภูเก็ต",
    h1: "บริการส่งน้ำ ภูเก็ต — รถน้ำถึงหน้างานทุกอำเภอ",
    lead: "ให้บริการส่งน้ำในจังหวัดภูเก็ตทั้งบ้านพัก โรงแรม Pool Villa สระว่ายน้ำ และงานก่อสร้าง ครอบคลุมเมืองภูเก็ต ถลาง กะทู้ ป่าตอง เชิงทะเล ราไวย์ และกะรน พร้อมรับงานเร่งด่วนตลอด 24 ชั่วโมง",
    quoteCta: "ขอราคาน้ำในพื้นที่ภูเก็ต",
    mapLabel: "แผนที่พื้นที่ให้บริการ ภูเก็ต (Google Map)",
    contactTitle: "ติดต่องานพื้นที่ภูเก็ต",
    zonesHeading: "อำเภอและตำบลที่ให้บริการ",
    zones: [
      "เมืองภูเก็ต",
      "ถลาง",
      "กะทู้",
      "ป่าตอง",
      "เชิงทะเล · บางเทา",
      "ราไวย์",
      "กะรน",
      "ฉลอง",
      "ไม้ขาว · สนามบิน",
    ],
    servicesHeading: "บริการน้ำในพื้นที่ภูเก็ต",
    faqHeading: "คำถามที่พบบ่อย · พื้นที่ภูเก็ต",
    faqs: [
      {
        q: "ส่งน้ำในภูเก็ตใช้เวลานานเท่าไหร่?",
        a: "โดยทั่วไปเข้าหน้างานภายใน 2–4 ชั่วโมงหลังยืนยันงาน ขึ้นอยู่กับสภาพจราจรและคิวงานในช่วงเวลานั้น",
      },
      {
        q: "ซอยแคบรถเข้าได้หรือไม่?",
        a: "มีรถขนาด 5,000 ลิตรสำหรับซอยแคบ และสายส่งความยาวเพิ่มเติมกรณีรถจอดได้ไม่ถึงจุดถังเก็บน้ำ",
      },
      {
        q: "คิดค่าบริการต่างกันตามอำเภอหรือไม่?",
        a: "ค่าบริการคิดตามระยะทางจากจุดจ่ายน้ำที่ใกล้ที่สุด พื้นที่เมืองภูเก็ต ถลาง และกะทู้อยู่ในอัตราปกติ",
      },
      {
        q: "รับงานเร่งด่วนกลางคืนหรือไม่?",
        a: "รับ กรณีน้ำหมดฉุกเฉินสามารถโทร 087-418-1199 ได้ตลอด 24 ชั่วโมง ทีมงานจะยืนยันเวลาและค่าบริการก่อนออกรถ",
      },
    ],
    nearbyHeading: "พื้นที่ใกล้เคียง",
  },
])

export const areaPageSlugs = areaPages.map((p) => p.slug)

export function getAreaPage(slug: string) {
  return areaPages.find((p) => p.slug === slug)
}
