import { z } from "zod"

import { refSchema, seoSchema, slugSchema } from "@workspace/shared/common"

const inlineSchema = z.union([z.string(), refSchema])
export type ArticleInline = z.infer<typeof inlineSchema>

// Rich text is limited to the block types the CMS brief allows.
export const articleBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("p"), content: z.array(inlineSchema).min(1) }),
  z.object({ type: z.literal("h2"), id: slugSchema, text: z.string().min(1) }),
  z.object({ type: z.literal("h3"), id: slugSchema, text: z.string().min(1) }),
  z.object({
    type: z.literal("checklist"),
    items: z.array(z.string().min(1)).min(1),
  }),
  z.object({
    type: z.literal("table"),
    head: z.array(z.string()).min(2),
    rows: z.array(z.array(z.string())).min(1),
  }),
])
export type ArticleBlock = z.infer<typeof articleBlockSchema>

export const articleSchema = seoSchema.extend({
  slug: slugSchema,
  category: z.string().min(1),
  publishedAt: z.iso.date(),
  readMinutes: z.number().int().positive(),
  breadcrumb: z.string().min(1),
  h1: z.string().min(1),
  lead: z.string().min(1),
  coverLabel: z.string().min(1),
  body: z.array(articleBlockSchema).min(1),
  cta: z.object({ title: z.string().min(1), text: z.string().min(1) }),
  related: z.array(refSchema),
})
export type Article = z.infer<typeof articleSchema>

export const articles = z.array(articleSchema).parse([
  {
    slug: "phuket-dry-season",
    seoTitle: "หน้าแล้งภูเก็ต ควรสำรองน้ำไว้เท่าไหร่ถึงจะพอ",
    metaDescription:
      "คู่มือคำนวณปริมาณน้ำสำรองสำหรับบ้านพัก วิลล่าให้เช่า และที่พักขนาดเล็กในภูเก็ตและพังงา พร้อมสัญญาณเตือนที่ควรเรียกรถส่งน้ำก่อนน้ำหมด",
    category: "ความรู้เรื่องน้ำ",
    publishedAt: "2026-09-04",
    readMinutes: 6,
    breadcrumb: "สำรองน้ำหน้าแล้ง",
    h1: "หน้าแล้งภูเก็ต ควรสำรองน้ำไว้เท่าไหร่ถึงจะพอ",
    lead: "คู่มือคำนวณปริมาณน้ำสำรองสำหรับบ้านพัก วิลล่าให้เช่า และที่พักขนาดเล็กในภูเก็ตและพังงา พร้อมสัญญาณเตือนที่ควรเรียกรถส่งน้ำก่อนน้ำหมด",
    coverLabel: "ภาพหน้าปกบทความ (แนวนอน 21:9)",
    body: [
      {
        type: "p",
        content: [
          "ในช่วงเดือนกุมภาพันธ์ถึงพฤษภาคม ปริมาณน้ำดิบในภูเก็ตลดลงตามระดับน้ำในขุมเหมืองและอ่างเก็บน้ำ หลายพื้นที่จึงมีการจ่ายน้ำเป็นช่วงเวลา ผู้ที่ดูแลบ้านพักหรือที่พักให้เช่าจะเห็นผลกระทบชัดที่สุด เพราะแขกใช้น้ำไม่สม่ำเสมอและคาดการณ์ยาก",
        ],
      },
      { type: "h2", id: "why-water-runs-short", text: "ทำไมช่วงหน้าแล้งภูเก็ตน้ำไม่พอใช้" },
      {
        type: "p",
        content: [
          "สาเหตุหลักมาจากความต้องการใช้น้ำที่สูงขึ้นในฤดูท่องเที่ยว สวนทางกับปริมาณน้ำต้นทุนที่ลดลง เมื่อแรงดันน้ำในเส้นท่อต่ำ น้ำจะขึ้นถังบนดาดฟ้าได้ช้าหรือไม่ขึ้นเลย บ้านที่พึ่งพาน้ำประปาโดยตรงจึงได้รับผลกระทบก่อนบ้านที่มีถังเก็บน้ำสำรอง",
        ],
      },
      { type: "h3", id: "warning-signs", text: "สัญญาณที่บอกว่าควรสำรองน้ำล่วงหน้า" },
      {
        type: "checklist",
        items: [
          "น้ำไหลอ่อนช่วงเช้าและหัวค่ำต่อเนื่องหลายวัน",
          "ปั๊มน้ำทำงานถี่ขึ้นแต่แรงดันไม่นิ่ง",
          "ระดับน้ำในถังเก็บน้ำลดลงเร็วกว่าปกติ",
          "มีประกาศหยุดจ่ายน้ำหรือซ่อมท่อในพื้นที่",
        ],
      },
      { type: "h2", id: "how-much-to-store", text: "คำนวณปริมาณน้ำที่ควรสำรอง" },
      {
        type: "p",
        content: [
          "หลักคิดง่าย ๆ คือประมาณ 200 ลิตรต่อคนต่อวันสำหรับการอุปโภคทั่วไป และเพิ่มส่วนของสระว่ายน้ำที่ระเหยประมาณ 5 มิลลิเมตรต่อวัน ตารางด้านล่างเป็นตัวอย่างการสำรองน้ำ 3 วัน",
        ],
      },
      {
        type: "table",
        head: ["ประเภทที่พัก", "ใช้ต่อวัน", "สำรอง 3 วัน"],
        rows: [
          ["บ้านพัก 4 คน", "800 ลิตร", "2,400 ลิตร"],
          ["วิลล่า 2 ห้องนอน + สระเล็ก", "1,600 ลิตร", "5,000 ลิตร"],
          ["วิลล่า 4 ห้องนอน + สระ 40 ตร.ม.", "3,000 ลิตร", "10,000 ลิตร"],
          ["ที่พัก 10 ห้อง", "6,000 ลิตร", "20,000 ลิตร"],
        ],
      },
      { type: "h2", id: "before-you-call", text: "ข้อควรรู้ก่อนเรียกรถส่งน้ำ" },
      {
        type: "p",
        content: [
          "วัดความกว้างซอยและตรวจจุดจอดรถล่วงหน้า เพราะรถ 20,000 ลิตรต้องการพื้นที่มากกว่ารถ 5,000 ลิตรอย่างชัดเจน หากถังเก็บน้ำอยู่ด้านหลังอาคาร ควรแจ้งระยะจากจุดจอดถึงถังเพื่อให้ทีมงานเตรียมสายส่งให้พอ รายละเอียดเพิ่มเติมอ่านได้ที่หน้า ",
          { label: "บริการส่งน้ำสำหรับโรงแรมและที่พัก", kind: "service", slug: "hotel-water" },
          " หรือดูพื้นที่ให้บริการที่หน้า ",
          { label: "ส่งน้ำภูเก็ต", kind: "area", slug: "phuket" },
        ],
      },
    ],
    cta: {
      title: "ไม่แน่ใจว่าต้องใช้น้ำเท่าไหร่?",
      text: "แจ้งจำนวนคนและขนาดสระ ทีมงานคำนวณให้พร้อมเสนอราคา",
    },
    related: [
      { label: "น้ำสำหรับ Pool Villa", kind: "service", slug: "pool-villa-water" },
      { label: "น้ำเติมสระว่ายน้ำ", kind: "service", slug: "pool-water" },
      { label: "น้ำสำหรับงานก่อสร้าง", kind: "service", slug: "construction-water" },
      { label: "ส่งน้ำ ภูเก็ต", kind: "area", slug: "phuket" },
    ],
  },
])

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug)
}
