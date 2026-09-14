import { z } from "zod"

import { linkSchema, refSchema } from "@workspace/shared/common"

export const siteSchema = z.object({
  name: z.string().min(1),
  legalName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  phone: z.string().min(1),
  phoneHref: z.string().startsWith("tel:"),
  phoneIntl: z.string().regex(/^\+66\d{8,9}$/),
  lineId: z.string().min(1),
  lineHref: z.url(),
  hours: z.string().min(1),
})

export const site = siteSchema.parse({
  name: "อภิรักษ์บริการน้ำ",
  legalName: "หจก.อภิรักษ์บริการน้ำ",
  tagline: "ภูเก็ต · พังงา · รถส่งน้ำ 24 ชม.",
  description:
    "ผู้ให้บริการรถส่งน้ำในพื้นที่ภูเก็ตและพังงา รองรับบ้านพัก โรงแรม รีสอร์ต Pool Villa สระว่ายน้ำ และงานก่อสร้าง",
  phone: "087-418-1199",
  phoneHref: "tel:0874181199",
  phoneIntl: "+66874181199",
  // Unconfirmed: LINE ID taken from the prototype. Confirm with the client.
  lineId: "@0874181199",
  lineHref: "https://line.me/R/ti/p/%400874181199",
  hours: "24 ชั่วโมง ทุกวัน",
})

export const mainNav = z.array(linkSchema).parse([
  { label: "หน้าหลัก", href: "/" },
  { label: "บริการน้ำ", href: "/#services" },
  { label: "พื้นที่ให้บริการ", href: "/#areas" },
  { label: "ราคา", href: "/quote" },
  { label: "บทความ", href: "/blog" },
  { label: "ติดต่อเรา", href: "/quote" },
])

export const footerColumns = z
  .array(
    z.object({
      title: z.string().min(1),
      links: z.array(z.union([refSchema, linkSchema])),
    })
  )
  .parse([
    {
      title: "บริการ",
      links: [
        { label: "ส่งน้ำทั่วไป", kind: "service", slug: "water-delivery" },
        { label: "น้ำใช้", kind: "service", slug: "utility-water" },
        { label: "น้ำเติมสระว่ายน้ำ", kind: "service", slug: "pool-water" },
        { label: "น้ำสำหรับโรงแรม", kind: "service", slug: "hotel-water" },
        { label: "น้ำ Pool Villa", kind: "service", slug: "pool-villa-water" },
      ],
    },
    {
      title: "พื้นที่ให้บริการ",
      links: [
        { label: "ภูเก็ต", kind: "area", slug: "phuket" },
        { label: "ถลาง", kind: "area", slug: "phuket" },
        { label: "ป่าตอง", kind: "area", slug: "phuket" },
        { label: "โคกกลอย", kind: "area", slug: "khok-kloi" },
        { label: "เขาหลัก", kind: "area", slug: "khao-lak" },
      ],
    },
    {
      title: "ข้อมูล",
      links: [
        { label: "บทความ", href: "/blog" },
        { label: "ขอใบเสนอราคา", href: "/quote" },
      ],
    },
  ])
