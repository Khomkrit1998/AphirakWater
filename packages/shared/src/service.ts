import { z } from "zod"

import { faqSchema, refSchema, seoSchema, slugSchema } from "@workspace/shared/common"
import { serviceTypeSchema, truckVolumeSchema } from "@workspace/shared/quote"

export const serviceIconSchema = z.enum([
  "truck",
  "tap",
  "pool",
  "hotel",
  "villa",
  "construction",
])
export type ServiceIcon = z.infer<typeof serviceIconSchema>

export const serviceSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  icon: serviceIconSchema,
  // Used by the interactive service picker on the home page.
  quoteType: serviceTypeSchema,
  volumes: z.array(truckVolumeSchema).min(1),
  monthlyContract: z.boolean(),
  prepare: z.array(z.string().min(1)).min(1),
})
export type Service = z.infer<typeof serviceSchema>

// Draft: suitable truck sizes follow the "ราคาบริการ" table on the home page and
// the hotel fleet table; the "prepare" lists follow the quote form hints.
// Confirm with the owner.
export const services = z.array(serviceSchema).parse([
  {
    slug: "water-delivery",
    title: "ส่งน้ำทั่วไป",
    shortDescription: "บริการส่งน้ำสะอาดถึงหน้างาน สำหรับบ้านพัก อาคาร และหอพัก",
    icon: "truck",
    quoteType: "general",
    volumes: ["5000", "10000"],
    monthlyContract: false,
    prepare: ["ขนาดถังเก็บน้ำ", "ความกว้างซอยและจุดจอดรถ", "วันเวลาที่สะดวกให้เข้าหน้างาน"],
  },
  {
    slug: "utility-water",
    title: "น้ำใช้",
    shortDescription: "น้ำสำหรับอุปโภคในครัวเรือนและสำนักงาน สั่งเป็นรอบประจำได้",
    icon: "tap",
    quoteType: "general",
    volumes: ["5000", "10000"],
    monthlyContract: true,
    prepare: ["ปริมาณน้ำที่ใช้ต่อวัน", "ขนาดถังเก็บน้ำ", "ต้องการรอบส่งประจำหรือไม่"],
  },
  {
    slug: "pool-water",
    title: "น้ำเติมสระว่ายน้ำ",
    shortDescription: "เติมน้ำสระใหม่และเปลี่ยนถ่ายน้ำสระ ควบคุมอัตราการเติม",
    icon: "pool",
    quoteType: "pool",
    volumes: ["10000", "20000"],
    monthlyContract: false,
    prepare: ["ขนาดและความลึกของสระ", "เติมสระใหม่หรือเปลี่ยนถ่ายน้ำ", "ระยะจากจุดจอดรถถึงสระ"],
  },
  {
    slug: "hotel-water",
    title: "น้ำสำหรับโรงแรม",
    shortDescription: "รองรับปริมาณมาก ส่งได้หลายเที่ยวต่อวัน พร้อมเอกสารครบ",
    icon: "hotel",
    quoteType: "hotel",
    volumes: ["5000", "10000", "20000"],
    monthlyContract: true,
    prepare: ["จำนวนห้องพักและอัตราการเข้าพัก", "ปริมาณน้ำที่ใช้ต่อวัน", "ตำแหน่งถังเก็บน้ำและจุดจอดรถ"],
  },
  {
    slug: "pool-villa-water",
    title: "น้ำสำหรับ Pool Villa",
    shortDescription: "บริการตามรอบสำหรับวิลล่าให้เช่า ประสานกับทีมดูแลบ้านได้",
    icon: "villa",
    quoteType: "pool-villa",
    volumes: ["5000", "10000"],
    monthlyContract: true,
    prepare: ["จำนวนห้องนอนและขนาดสระ", "วันที่แขกเข้าพัก", "ช่องทางติดต่อทีมดูแลบ้าน"],
  },
  {
    slug: "construction-water",
    title: "น้ำสำหรับงานก่อสร้าง",
    shortDescription: "น้ำงานฐานราก งานบดอัด และล้างพื้นที่ ส่งตามแผนงาน",
    icon: "construction",
    quoteType: "construction",
    volumes: ["20000"],
    monthlyContract: true,
    prepare: ["ประเภทงาน เช่น ฐานราก หรืองานบดอัด", "ปริมาณน้ำต่อวันตามแผนงาน", "ทางเข้าไซต์งานสำหรับรถขนาดใหญ่"],
  },
])

export const servicePageSchema = seoSchema.extend({
  slug: slugSchema,
  breadcrumb: z.string().min(1),
  h1: z.string().min(1),
  lead: z.string().min(1),
  heroImageLabel: z.string().min(1),
  intro: z.object({
    heading: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
  }),
  scopeHeading: z.string().min(1),
  scope: z.array(z.string().min(1)).min(1),
  fleetHeading: z.string().min(1),
  fleet: z.object({
    head: z.array(z.string()).length(3),
    rows: z.array(z.array(z.string()).length(3)).min(1),
  }),
  stepsHeading: z.string().min(1),
  steps: z.array(z.object({ title: z.string(), desc: z.string() })).min(1),
  faqHeading: z.string().min(1),
  faqs: z.array(faqSchema).min(1),
  related: z.array(refSchema).min(1),
  sidebar: z.object({ title: z.string().min(1), text: z.string().min(1) }),
})
export type ServicePage = z.infer<typeof servicePageSchema>

// Only services with real, unique copy get a page (no boilerplate pages).
export const servicePages = z.array(servicePageSchema).parse([
  {
    slug: "hotel-water",
    seoTitle: "บริการส่งน้ำโรงแรมและรีสอร์ต ภูเก็ต–พังงา",
    metaDescription:
      "รถส่งน้ำหลายขนาด รองรับปริมาณมาก วางแผนรอบส่งตามอัตราการเข้าพัก ออกเอกสารครบทุกเที่ยว โทร 087-418-1199",
    breadcrumb: "น้ำสำหรับโรงแรม",
    h1: "บริการส่งน้ำสำหรับโรงแรมและรีสอร์ต ภูเก็ต–พังงา",
    lead: "รองรับการใช้น้ำปริมาณมากต่อวัน วางแผนรอบส่งตามอัตราการเข้าพัก พร้อมเอกสารประกอบการเบิกจ่ายทุกเที่ยว",
    heroImageLabel: "ภาพรถส่งน้ำเข้าโรงแรม / รีสอร์ต",
    intro: {
      heading: "โรงแรมและรีสอร์ตควรวางแผนน้ำอย่างไร",
      paragraphs: [
        "ความต้องการน้ำของที่พักขึ้นอยู่กับจำนวนห้องที่ขายได้ ปริมาณผ้าที่ต้องซัก และการใช้น้ำในสระว่ายน้ำ ในช่วงไฮซีซันที่อัตราการเข้าพักสูง ระบบน้ำประปาในหลายพื้นที่ของภูเก็ตและพังงามักจ่ายน้ำไม่ทัน การมีรอบส่งน้ำสำรองจึงช่วยลดความเสี่ยงที่กระทบประสบการณ์ของผู้เข้าพักโดยตรง",
        "เราเริ่มจากการสำรวจถังเก็บน้ำ จุดเข้าถึงของรถ และช่วงเวลาที่สะดวกให้บริการ จากนั้นเสนอแผนรอบส่งพร้อมราคาต่อเที่ยวและต่อเดือนให้ฝ่ายจัดซื้อพิจารณา",
      ],
    },
    scopeHeading: "ขอบเขตงานที่ครอบคลุม",
    scope: [
      "ประเมินปริมาณน้ำต่อวันจากจำนวนห้องและอัตราการเข้าพัก",
      "วางแผนรอบส่งประจำสัปดาห์ พร้อมรองรับการเรียกเพิ่มเที่ยวช่วงไฮซีซัน",
      "ส่งน้ำเข้าถังเก็บน้ำใต้ดินและถังบนดาดฟ้าด้วยปั๊มแรงดัน",
      "เติมน้ำสระว่ายน้ำและสระเด็กก่อนเปิดให้บริการ",
      "ออกใบส่งของและใบกำกับภาษีทุกเที่ยว สำหรับฝ่ายบัญชีและจัดซื้อ",
    ],
    fleetHeading: "ขนาดรถและปริมาณน้ำที่ให้บริการ",
    fleet: {
      head: ["ปริมาณต่อเที่ยว", "เวลาเข้าหน้างาน", "เหมาะกับ"],
      rows: [
        ["5,000 ลิตร", "ภายใน 2–4 ชม.", "บูติกโฮเทล · เกสต์เฮาส์"],
        ["10,000 ลิตร", "ภายในวันเดียวกัน", "รีสอร์ตขนาดกลาง · Pool Villa"],
        ["20,000 ลิตร", "นัดล่วงหน้า 1 วัน", "โรงแรมขนาดใหญ่ · เติมสระ"],
      ],
    },
    stepsHeading: "ขั้นตอนการใช้บริการ",
    steps: [
      { title: "แจ้งข้อมูลหน้างาน", desc: "ที่ตั้ง จำนวนห้อง และปริมาณน้ำที่ใช้ต่อวัน" },
      { title: "ประเมินและเสนอราคา", desc: "ทีมงานสำรวจจุดเข้าถึงรถและถังเก็บน้ำ" },
      { title: "กำหนดรอบส่ง", desc: "ตกลงวันเวลาและจำนวนเที่ยวต่อสัปดาห์" },
      { title: "ส่งน้ำและออกเอกสาร", desc: "ยืนยันปริมาณทุกเที่ยวพร้อมเอกสารครบ" },
    ],
    faqHeading: "คำถามที่พบบ่อยสำหรับงานโรงแรม",
    faqs: [
      {
        q: "รับงานโรงแรมเป็นสัญญารายเดือนได้หรือไม่?",
        a: "ได้ เรากำหนดปริมาณน้ำต่อเดือนและจำนวนเที่ยวขั้นต่ำร่วมกัน พร้อมสำรองรถสำหรับการเรียกเพิ่มในช่วงไฮซีซัน",
      },
      {
        q: "ส่งน้ำกลางคืนได้หรือไม่?",
        a: "ได้ กรณีโรงแรมต้องการหลีกเลี่ยงช่วงเช็กอิน สามารถนัดส่งช่วงเช้าตรู่หรือกลางคืนได้ เพราะเรารับงานตลอด 24 ชั่วโมง",
      },
      {
        q: "มีเอกสารสำหรับฝ่ายจัดซื้อครบหรือไม่?",
        a: "มีใบส่งของ ใบกำกับภาษี และสรุปปริมาณน้ำรายเดือน สามารถส่งเป็นไฟล์ให้ฝ่ายบัญชีได้ทุกสิ้นเดือน",
      },
      {
        q: "น้ำที่ส่งมาจากแหล่งใด?",
        a: "จากจุดจ่ายน้ำที่ได้รับอนุญาตในพื้นที่ภูเก็ตและพังงา ระบุแหล่งน้ำและวัตถุประสงค์การใช้งานในเอกสารประกอบทุกเที่ยว",
      },
    ],
    related: [
      { label: "น้ำสำหรับ Pool Villa", kind: "service", slug: "pool-villa-water" },
      { label: "น้ำเติมสระว่ายน้ำ", kind: "service", slug: "pool-water" },
      { label: "น้ำสำหรับงานก่อสร้าง", kind: "service", slug: "construction-water" },
      { label: "ส่งน้ำ ภูเก็ต", kind: "area", slug: "phuket" },
    ],
    sidebar: {
      title: "ขอราคาน้ำสำหรับที่พักของท่าน",
      text: "แจ้งจำนวนห้อง ปริมาณน้ำต่อวัน และพื้นที่ ทีมงานเสนอราคาภายในวันเดียว",
    },
  },
])

export const servicePageSlugs = servicePages.map((p) => p.slug)

export function getServicePage(slug: string) {
  return servicePages.find((p) => p.slug === slug)
}
