import { z } from "zod"

export const serviceTypeOptions = [
  { value: "general", label: "ส่งน้ำทั่วไป / น้ำใช้" },
  { value: "pool", label: "น้ำเติมสระว่ายน้ำ" },
  { value: "hotel", label: "น้ำสำหรับโรงแรม / รีสอร์ต" },
  { value: "pool-villa", label: "น้ำสำหรับ Pool Villa" },
  { value: "construction", label: "น้ำสำหรับงานก่อสร้าง" },
] as const

export const volumeOptions = [
  { value: "5000", label: "5,000 ลิตร" },
  { value: "10000", label: "10,000 ลิตร" },
  { value: "20000", label: "20,000 ลิตร" },
  { value: "unknown", label: "ยังไม่ทราบ ให้ทีมงานประเมิน" },
] as const

const values = <T extends readonly { value: string }[]>(options: T) =>
  options.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]]

export const serviceTypeSchema = z.enum(values(serviceTypeOptions))
export type ServiceType = z.infer<typeof serviceTypeSchema>
export const truckVolumeSchema = z.enum(["5000", "10000", "20000"])
export type TruckVolume = z.infer<typeof truckVolumeSchema>

// `/quote?service=hotel&volume=10000` preselects the form (links from the home
// page). Anything invalid is ignored rather than failing the page.
export const quoteDefaultsSchema = z.object({
  service: serviceTypeSchema.optional().catch(undefined),
  volume: truckVolumeSchema.optional().catch(undefined),
})
export type QuoteDefaults = z.infer<typeof quoteDefaultsSchema>

export function quoteHref(defaults: QuoteDefaults) {
  const params = new URLSearchParams()
  if (defaults.service) params.set("service", defaults.service)
  if (defaults.volume) params.set("volume", defaults.volume)
  const query = params.toString()
  return query ? `/quote?${query}` : "/quote"
}

// Business runs in Thailand, so "today" is today in Bangkok, on server and client.
export function todayInBangkok(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok" }).format(now)
}

export const quoteRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "กรุณากรอกชื่อผู้ติดต่อ")
    .max(120, "ชื่อยาวเกินไป"),
  phone: z
    .string()
    .trim()
    .min(1, { error: "กรุณากรอกเบอร์โทรศัพท์", abort: true })
    .refine(
      (v) => /^\d{9,10}$/.test(v.replace(/[\s-]/g, "")),
      "เบอร์โทรต้องเป็นตัวเลข 9–10 หลัก"
    ),
  lineId: z.string().trim().max(60, "LINE ID ยาวเกินไป"),
  serviceType: z
    .string()
    .min(1, { error: "กรุณาเลือกประเภทบริการ", abort: true })
    .pipe(z.enum(values(serviceTypeOptions), "กรุณาเลือกประเภทบริการ")),
  volume: z
    .string()
    .min(1, { error: "กรุณาเลือกปริมาณน้ำ", abort: true })
    .pipe(z.enum(values(volumeOptions), "กรุณาเลือกปริมาณน้ำ")),
  date: z
    .string()
    .refine(
      (v) => v === "" || (/^\d{4}-\d{2}-\d{2}$/.test(v) && v >= todayInBangkok()),
      "วันที่ต้องไม่เป็นวันในอดีต"
    ),
  location: z
    .string()
    .trim()
    .min(1, "กรุณาระบุพื้นที่หน้างาน")
    .max(200, "พื้นที่หน้างานยาวเกินไป"),
  details: z.string().trim().max(2000, "รายละเอียดยาวเกินไป"),
})
export type QuoteRequestInput = z.input<typeof quoteRequestSchema>
export type QuoteRequest = z.output<typeof quoteRequestSchema>

// Spam checks on the public quote form, not customer data (decision 0008).
// `website` is a honeypot: hidden from people, so only bots fill it.
// A missing field means a page opened before these checks were deployed.
const reload = "กรุณาโหลดหน้านี้ใหม่แล้วส่งอีกครั้ง หรือโทรหาเราโดยตรง"
export const quoteFormSchema = quoteRequestSchema.extend({ website: z.string(reload) })
export type QuoteFormInput = z.input<typeof quoteFormSchema>
export type QuoteForm = z.output<typeof quoteFormSchema>

// `elapsedMs`: how long the form was open before this submit.
export const quoteSubmissionSchema = quoteFormSchema.extend({
  elapsedMs: z.number(reload).nonnegative(reload),
})
export type QuoteSubmission = z.output<typeof quoteSubmissionSchema>

// ponytail: both signals come from the browser, so a bot that posts to the API
// directly can fake them. Add Cloudflare Turnstile when that spam shows up.
// Tune QUOTE_MIN_FILL_MS if real customers hit "too-fast" (server logs it).
export const QUOTE_MIN_FILL_MS = 2000

export function spamReason(submission: QuoteSubmission) {
  if (submission.website.trim() !== "") return "honeypot"
  if (submission.elapsedMs < QUOTE_MIN_FILL_MS) return "too-fast"
  return null
}

export const quoteResponseSchema = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true), reference: z.string().min(1) }),
  z.object({ ok: z.literal(false), message: z.string().min(1) }),
])
export type QuoteResponse = z.infer<typeof quoteResponseSchema>

export const quotePage = {
  seoTitle: "ขอใบเสนอราคาน้ำ",
  metaDescription:
    "แจ้งข้อมูลหน้างานเพื่อรับใบเสนอราคาส่งน้ำภูเก็ต–พังงา ทีมงานเสนอราคาภายในวันเดียว รับงาน 24 ชั่วโมง โทร 087-418-1199",
  h1: "ขอใบเสนอราคาน้ำ",
  lead: "แจ้งข้อมูลหน้างานเพื่อให้ทีมงานคำนวณค่าบริการได้ตรงจริง เราเสนอราคาภายในวันเดียว และแจ้งค่าใช้จ่ายทั้งหมดก่อนเริ่มงานทุกครั้ง",
  urgent: {
    title: "ต้องการน้ำวันนี้?",
    text: "งานเร่งด่วนแนะนำให้โทรแจ้งโดยตรง ทีมงานจะเช็กคิวรถและยืนยันเวลาเข้าหน้างานให้ทันที",
  },
  example: {
    title: "ข้อมูลที่ช่วยให้เสนอราคาได้เร็วขึ้น",
    rows: [
      { label: "ประเภทบริการ", value: "น้ำสำหรับโรงแรม / รีสอร์ต" },
      { label: "ปริมาณน้ำที่ต้องการ", value: "10,000 ลิตร ต่อเที่ยว" },
      { label: "พื้นที่หน้างาน", value: "ป่าตอง, ภูเก็ต" },
      { label: "วันที่ต้องการใช้น้ำ", value: "12 กันยายน 2569" },
    ],
  },
  pricingFactors: {
    title: "ค่าบริการคิดจากอะไร",
    text: "ปริมาณน้ำต่อเที่ยว · ระยะทางจากจุดจ่ายน้ำ · ความยากง่ายของการเข้าถึงหน้างาน · จำนวนเที่ยวต่อรอบ และช่วงเวลาที่ให้บริการ",
  },
}
