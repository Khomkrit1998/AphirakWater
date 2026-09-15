import { z } from "zod"

import { faqSchema } from "@workspace/shared/common"
import { truckVolumeSchema } from "@workspace/shared/quote"

const sectionIntroSchema = z.object({
  eyebrow: z.string().min(1),
  heading: z.array(z.string().min(1)).min(1),
  lead: z.string().min(1),
})

export const homeSchema = z.object({
  hero: z.object({
    badge: z.string().min(1),
    heading: z.string().min(1),
    headingAccent: z.string().min(1),
    lead: z.string().min(1),
    proof: z.array(z.string().min(1)),
    // What happens after the quote button; only repeats promises made elsewhere on the page.
    ctaNote: z.string().min(1),
    // Exactly two: the second cross-fades over the first (hero-slide in globals.css).
    slides: z
      .array(z.object({ image: z.enum(["night", "night-side"]), alt: z.string().min(1) }))
      .length(2),
    floatStat: z.object({ value: z.string(), label: z.string() }),
  }),
  // Unconfirmed: trust numbers and reviews are sample copy from the prototype.
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
  services: sectionIntroSchema,
  whyUs: z.object({
    eyebrow: z.string().min(1),
    heading: z.array(z.string().min(1)).min(1),
    imageAlt: z.string().min(1),
    items: z.array(z.object({ title: z.string(), desc: z.string() })),
  }),
  process: sectionIntroSchema.extend({
    steps: z
      .array(z.object({ title: z.string().min(1), desc: z.string().min(1) }))
      .min(2),
  }),
  areas: sectionIntroSchema.extend({ cta: z.string().min(1) }),
  pricing: sectionIntroSchema.extend({
    cta: z.string().min(1),
    volumes: z.array(
      z.object({ size: z.string(), use: z.string(), tag: z.string(), volume: truckVolumeSchema.optional() })
    ),
    note: z.string().min(1),
  }),
  gallery: sectionIntroSchema.extend({
    items: z
      .array(
        z.object({
          image: z.enum([
            "branding",
            "residence",
            "filling",
            "rear",
            "mountain-road",
            "side",
            "lakeside",
            "yard",
            "pair-day",
            "pair-yard",
            "night-lights",
            "night-pair",
            "dusk",
            "hose",
            "shed",
            "wet-road",
          ]),
          alt: z.string().min(1),
        })
      )
      .min(2),
  }),
  reviews: z.object({
    heading: z.string().min(1),
    items: z.array(
      z.object({
        text: z.string().min(1),
        name: z.string().min(1),
        role: z.string().min(1),
      })
    ),
  }),
  faq: z.object({ heading: z.string().min(1), items: z.array(faqSchema) }),
  cta: z.object({
    heading: z.array(z.string().min(1)).min(1),
    lead: z.string().min(1),
  }),
})

export const home = homeSchema.parse({
  hero: {
    badge: "ให้บริการภูเก็ต–พังงา ตลอด 24 ชั่วโมง",
    heading: "บริการส่งน้ำ",
    headingAccent: "ถึงหน้างาน ตรงเวลา",
    lead: "รถส่งน้ำหลายขนาด พร้อมให้บริการบ้านพัก โรงแรม รีสอร์ต Pool Villa สระว่ายน้ำ และงานก่อสร้าง รองรับการใช้น้ำปริมาณมากและงานเร่งด่วน",
    proof: ["ส่งตรงเวลา", "มีรถหลายขนาด", "รองรับงานปริมาณมาก"],
    ctaNote: "รับใบเสนอราคาภายในวันเดียว · รู้ราคารวมก่อนรถออกทุกครั้ง",
    slides: [
      { image: "night", alt: "รถส่งน้ำ 2 คันของอภิรักษ์บริการน้ำ เปิดไฟหลากสีจอดคู่กันในเวลากลางคืน" },
      {
        image: "night-side",
        alt: "ด้านข้างรถส่งน้ำถังสีเขียว มีชื่อหจก.อภิรักษ์บริการน้ำ เปิดไฟสีแดงใต้ถังในเวลากลางคืน",
      },
    ],
    floatStat: { value: "1,000+", label: "เที่ยวส่งน้ำต่อปี" },
  },
  stats: [
    { value: "10+", label: "ปีประสบการณ์" },
    { value: "1,000+", label: "เที่ยวส่งน้ำต่อปี" },
    { value: "2 จังหวัด", label: "ภูเก็ต · พังงา" },
    { value: "24 ชม.", label: "รับงานทุกวัน ไม่มีวันหยุด" },
  ],
  services: {
    eyebrow: "บริการของเรา",
    heading: ["บริการน้ำสำหรับทุกความต้องการ"],
    lead: "เลือกบริการที่ตรงกับงานของท่าน ทีมงานจะประเมินปริมาณน้ำ ระยะทาง และรอบการส่งให้เหมาะสมกับหน้างาน",
  },
  whyUs: {
    eyebrow: "ทำไมต้องเลือกเรา",
    heading: ["ทำงานเป็นระบบ ตรงเวลา", "ตรวจสอบได้ทุกเที่ยว"],
    imageAlt: "รถส่งน้ำของอภิรักษ์บริการน้ำ 3 คันจอดเรียงกันที่ลานจอดรถ",
    items: [
      {
        title: "ยืนยันเวลาเข้าหน้างานทุกครั้ง",
        desc: "แจ้งช่วงเวลาส่งล่วงหน้า และอัปเดตเมื่อรถออกจากจุดจ่ายน้ำ",
      },
      {
        title: "รถหลายขนาดเลือกได้ตามหน้างาน",
        desc: "ตั้งแต่ 5,000 ถึง 20,000 ลิตร เข้าถึงซอยแคบและพื้นที่จำกัดได้",
      },
      {
        title: "น้ำจากแหล่งที่ตรวจสอบได้",
        desc: "ระบุแหล่งน้ำและวัตถุประสงค์การใช้งานในเอกสารทุกเที่ยว",
      },
      {
        title: "รองรับงานสัญญารายเดือน",
        desc: "วางแผนรอบส่งสำหรับโรงแรม รีสอร์ต และโครงการก่อสร้าง",
      },
    ],
  },
  // Step titles from the design handoff (Homepage · Process); descriptions are draft copy.
  process: {
    eyebrow: "ขั้นตอนการใช้บริการ",
    heading: ["จากโทรแจ้งงาน", "ถึงน้ำเต็มถังที่หน้างาน"],
    lead: "ทุกงานผ่าน 4 ขั้นตอนเดียวกัน ท่านรู้ราคารวมและเวลาเข้าหน้างานก่อนรถออกทุกครั้ง",
    steps: [
      {
        title: "แจ้งข้อมูลหน้างาน",
        desc: "โทรหรือกรอกฟอร์ม แจ้งพื้นที่ ปริมาณน้ำที่ต้องการ และวันที่ต้องใช้น้ำ",
      },
      {
        title: "ประเมินและเสนอราคา",
        desc: "ทีมงานตรวจระยะทาง จุดจอดรถ และตำแหน่งถังเก็บน้ำ แล้วแจ้งราคารวมทั้งหมด",
      },
      {
        title: "กำหนดรอบส่ง",
        desc: "ยืนยันวันเวลาเข้าหน้างาน หรือวางรอบส่งประจำสำหรับงานสัญญารายเดือน",
      },
      {
        title: "ส่งน้ำและออกเอกสาร",
        desc: "ส่งน้ำเข้าถังตามปริมาณที่ตกลง พร้อมเอกสารยืนยันปริมาณทุกเที่ยว",
      },
    ],
  },
  areas: {
    eyebrow: "พื้นที่ให้บริการ",
    heading: ["ส่งน้ำครอบคลุมภูเก็ตและพังงา"],
    lead: "พื้นที่นอกเหนือจากรายการด้านล่าง สามารถสอบถามได้ ทีมงานจะแจ้งค่าบริการตามระยะทางก่อนยืนยันงาน",
    cta: "ดูหน้าพื้นที่ภูเก็ต",
  },
  pricing: {
    eyebrow: "ราคาบริการ",
    heading: ["แจ้งปริมาณน้ำและพื้นที่", "รับใบเสนอราคาภายในวันเดียว"],
    lead: "ค่าบริการขึ้นอยู่กับปริมาณน้ำ ระยะทางจากจุดจ่ายน้ำ ความยากง่ายของหน้างาน และจำนวนเที่ยวต่อรอบ เพื่อความถูกต้องเราจึงเสนอราคาเป็นรายงาน ไม่ใช้ราคาเหมาแบบตายตัว",
    cta: "ขอราคาน้ำ",
    volumes: [
      { size: "5,000 ลิตร", use: "บ้านพัก ถังเก็บน้ำขนาดเล็ก", tag: "ขอใบเสนอราคา", volume: "5000" },
      { size: "10,000 ลิตร", use: "บ้านพักขนาดใหญ่ · Pool Villa", tag: "ขอใบเสนอราคา", volume: "10000" },
      { size: "20,000 ลิตร", use: "โรงแรม · สระว่ายน้ำ · งานก่อสร้าง", tag: "ขอใบเสนอราคา", volume: "20000" },
      { size: "สัญญารายเดือน", use: "กำหนดรอบส่งและปริมาณต่อวัน", tag: "ประเมินหน้างานฟรี" },
    ],
    note: "* รับงานตลอด 24 ชั่วโมง งานเร่งด่วนและงานกลางคืนคิดค่าบริการเพิ่มตามจริง แจ้งให้ทราบก่อนเริ่มงานทุกครั้ง",
  },
  // Photos are the company's own (supplied by the owner); alt text describes what is
  // visible. Left out: identifiable people, a customer's signage, and the red pickup
  // tanks (they contradict the 5,000-litre minimum until the owner confirms, see 0004).
  // The first half of the list scrolls in the top row, the rest in the bottom row.
  gallery: {
    eyebrow: "ภาพจากงานจริง",
    heading: ["รถของเรา", "ในการทำงานจริง"],
    lead: "ภาพรถส่งน้ำของหจก.อภิรักษ์บริการน้ำ ทั้งตอนเติมน้ำ ออกงาน และเข้าหน้างาน",
    items: [
      {
        image: "branding",
        alt: "รถส่งน้ำถังสีม่วงเขียว มีชื่อหจก.อภิรักษ์บริการน้ำและเบอร์โทรข้างถัง จอดริมถนนหน้าแนวต้นไม้",
      },
      { image: "mountain-road", alt: "ด้านหน้ารถส่งน้ำ ISUZU แต่งไฟบนหลังคา จอดบนถนนริมภูเขา" },
      { image: "residence", alt: "รถส่งน้ำถังสีเขียวเลี้ยวเข้าทางเข้าที่พักในซอย" },
      { image: "night-lights", alt: "รถส่งน้ำเปิดไฟ LED สีฟ้าและเขียวบนหลังคารถในเวลากลางคืน" },
      { image: "side", alt: "รถส่งน้ำถังสีเขียวม่วง มีชื่อหจก.อภิรักษ์บริการน้ำข้างถัง จอดหน้าอาคาร" },
      { image: "hose", alt: "รถส่งน้ำจอดริมถนน มีสายส่งน้ำสีแดงต่อจากตัวรถ" },
      { image: "pair-day", alt: "รถส่งน้ำ 2 คัน ถังสีแดงและถังสีเขียว จอดคู่กันที่ลานจอด" },
      { image: "dusk", alt: "ด้านหน้ารถส่งน้ำ ISUZU แต่งโครเมียม จอดริมถนนตอนฟ้าสลัว" },
      { image: "filling", alt: "รถส่งน้ำจอดใต้ท่อจ่ายน้ำสีฟ้าเพื่อเติมน้ำเข้าถัง" },
      { image: "night-pair", alt: "รถส่งน้ำ 2 คันเปิดไฟหลากสีจอดคู่กันตอนหัวค่ำ" },
      { image: "lakeside", alt: "รถส่งน้ำถังสีเขียวจอดบนถนนริมน้ำ มีภูเขาด้านหลัง" },
      { image: "shed", alt: "รถส่งน้ำถังสีเขียวจอดใต้หลังคาโรงจอดรถ" },
      {
        image: "rear",
        alt: "ท้ายรถส่งน้ำ ถังมีชื่อหจก.อภิรักษ์บริการน้ำและเบอร์โทร 087-418-1199",
      },
      { image: "wet-road", alt: "รถส่งน้ำถังสีเขียวจอดบนถนนเปียกหน้าแนวต้นไม้" },
      { image: "pair-yard", alt: "รถส่งน้ำถังสีแดงและถังสีเขียวจอดเรียงกันหน้าอาคาร" },
      { image: "yard", alt: "รถส่งน้ำถังสีเขียวจอดที่ลานหน้าอาคาร" },
    ],
  },
  reviews: {
    heading: "ลูกค้าที่ใช้บริการ",
    items: [
      {
        text: "ใช้บริการส่งน้ำเข้าโรงแรมทุกสัปดาห์ ทีมงานตรงเวลาและประสานงานกับแม่บ้านได้ดี ไม่เคยมีปัญหาน้ำขาด",
        name: "คุณธนวัฒน์",
        role: "ผู้จัดการโรงแรม · ป่าตอง",
      },
      {
        text: "เรียกเติมน้ำสระวิลล่าก่อนแขกเข้าพัก แจ้งช่วงเช้าได้น้ำช่วงบ่ายวันเดียวกัน ราคาชัดเจนไม่มีบวกเพิ่ม",
        name: "คุณศิริพร",
        role: "เจ้าของ Pool Villa · เชิงทะเล",
      },
      {
        text: "งานก่อสร้างต้องใช้น้ำต่อเนื่อง ทางทีมวางแผนรอบส่งให้ตามแผนงาน ช่วยให้งานไม่หยุดชะงัก",
        name: "คุณอนุชา",
        role: "ผู้ควบคุมงาน · โคกกลอย",
      },
    ],
  },
  faq: {
    heading: "คำถามที่พบบ่อย",
    items: [
      {
        q: "สั่งน้ำขั้นต่ำกี่ลิตร?",
        a: "เริ่มต้นที่ 5,000 ลิตรต่อเที่ยว สำหรับงานที่ต้องใช้น้ำน้อยกว่านี้สามารถแจ้งทีมงานเพื่อรวมรอบกับงานใกล้เคียงได้",
      },
      {
        q: "ส่งน้ำในพื้นที่ไหนบ้าง?",
        a: "ครอบคลุมจังหวัดภูเก็ตทุกอำเภอ และพังงาโดยเฉพาะโคกกลอย ตะกั่วทุ่ง ท้ายเหมือง และเขาหลัก พื้นที่อื่นสอบถามเพิ่มเติมได้",
      },
      {
        q: "สามารถส่งน้ำไปโรงแรมได้หรือไม่?",
        a: "ได้ เรารับงานโรงแรมและรีสอร์ตเป็นสัญญารายเดือน กำหนดรอบส่งและปริมาณต่อวันได้ พร้อมออกเอกสารประกอบการเบิกจ่าย",
      },
      {
        q: "มีบริการเติมน้ำสระว่ายน้ำหรือไม่?",
        a: "มีบริการเติมน้ำสระใหม่และเปลี่ยนถ่ายน้ำสระ ใช้สายส่งที่แยกสำหรับงานสระ และควบคุมอัตราการเติมเพื่อไม่ให้กระทบผิวสระ",
      },
      {
        q: "สามารถส่งน้ำด่วนได้หรือไม่?",
        a: "ได้ กรณีงานเร่งด่วนโทรแจ้งได้ตลอด 24 ชั่วโมง ทีมงานจะยืนยันเวลาเข้าหน้างานและค่าบริการเพิ่มเติมก่อนออกรถ",
      },
      {
        q: "คิดค่าบริการตามระยะทางหรือไม่?",
        a: "ค่าบริการคำนวณจากปริมาณน้ำ ระยะทางจากจุดจ่ายน้ำ และจำนวนเที่ยว โดยแจ้งราคารวมทั้งหมดในใบเสนอราคาก่อนเริ่มงาน",
      },
    ],
  },
  cta: {
    heading: ["ต้องการน้ำวันนี้?", "โทรแจ้งงานได้ทันที"],
    lead: "ทีมงานพร้อมรับงานทั้งงานประจำและงานเร่งด่วน ในพื้นที่ภูเก็ตและพังงา",
  },
})
