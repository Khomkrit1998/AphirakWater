# Handoff: อภิรักษ์บริการน้ำ — SEO-first Water Delivery Website + CMS

## Overview

เว็บไซต์และระบบหลังบ้านสำหรับ **หจก.อภิรักษ์บริการน้ำ** ธุรกิจรถส่งน้ำในพื้นที่ภูเก็ต–พังงา ให้บริการน้ำใช้ น้ำเติมสระ น้ำสำหรับโรงแรม/รีสอร์ต/Pool Villa และงานก่อสร้าง รับงาน 24 ชั่วโมง โทร **087-418-1199**

เป้าหมายของระบบ 3 ข้อ:

1. **Conversion-first** — ทุกหน้าตอบได้ใน 3–5 วินาทีว่าเราเป็นใคร ให้บริการอะไร ที่ไหน ติดต่ออย่างไร
2. **SEO-first** — Design System เดียวขยายเป็น Service Pages / Area Pages / Blog ได้ไม่จำกัด รองรับ semantic HTML, internal linking, structured data, Local SEO
3. **CMS-first** — Admin สร้างและแก้ Landing Page ได้เองโดยไม่ต้องแก้โค้ด ผ่าน Block-based Page Builder

## About the Design Files

ไฟล์ในชุดนี้เป็น **design reference ที่สร้างด้วย HTML** — เป็น prototype ที่แสดงหน้าตาและพฤติกรรมที่ต้องการ **ไม่ใช่ production code ที่ copy ไปใช้ตรง ๆ**

งานของผู้พัฒนาคือ **สร้างดีไซน์เหล่านี้ขึ้นใหม่ใน codebase จริง** ตาม pattern และ library ที่ทีมใช้อยู่ (Next.js, Nuxt, Laravel + Blade, WordPress ฯลฯ) หากยังไม่มี codebase แนะนำสถาปัตยกรรมในหัวข้อ *Recommended Stack* ด้านล่าง

Prototype ใช้ inline style ทั้งหมดเพื่อให้ render ได้ทันที — **ในระบบจริงควรแปลงเป็น design token + component ตามตารางใน Design Tokens**

## Fidelity

**High-fidelity (hifi)** — สี typography spacing radius shadow และ interaction เป็นค่าจริงที่ใช้ได้เลย ผู้พัฒนาควรทำให้ตรงตามค่าที่ระบุ

ข้อยกเว้น:
- **รูปภาพทั้งหมดเป็น placeholder** (`<image-slot>`) ต้องแทนด้วยรูปจริง — รายละเอียดในหัวข้อ Assets
- **ตัวเลข trust และรีวิวลูกค้าเป็นตัวอย่าง** ต้องยืนยันกับเจ้าของธุรกิจก่อนขึ้นจริง
- **แผนที่เป็น placeholder** ต้องฝัง Google Maps Embed จริง

---

## Recommended Stack

| ส่วน | แนะนำ | เหตุผล |
|---|---|---|
| Frontend | **Next.js (App Router) + TypeScript** | SSG/ISR ต่อหน้า สำคัญมากกับ SEO และ Core Web Vitals; รองรับ dynamic route `/services/[slug]`, `/areas/[slug]` |
| Styling | **Tailwind CSS** ผูก token ตามตารางด้านล่าง | ค่าที่ใช้ในดีไซน์เป็น scale ที่ map เข้า Tailwind ได้ตรง |
| CMS | **Payload CMS** (self-host, TypeScript) หรือ **Strapi** | ต้องการ block-based page builder + field-level SEO ซึ่งทั้งสองรองรับ native |
| Media | S3 / Cloudflare R2 + `next/image` | ต้อง responsive images + lazy loading |
| Forms | Server Action + reCAPTCHA v3 → อีเมล + บันทึกลง CMS collection `quotes` | ฟอร์มขอราคาเป็น conversion หลัก ต้องไม่หลุด |
| Analytics | GA4 + Google Search Console + event tracking บนทุก CTA | วัด conversion ต่อ Area Page |

**หัวใจของงานคือ CMS-driven rendering**: ทุก Landing Page ต้อง render จาก array ของ block ที่ดึงมาจาก CMS ไม่ใช่ hardcode ต่อหน้า

---

## Design Tokens

### Colors

สัดส่วนการใช้สีที่ต้องรักษาไว้: **เขียว 60–70% / neutral-white 20–30% / แดง 5–10%** สีแดงเป็น accent สำหรับ CTA ด่วนและเบอร์โทรเท่านั้น **ห้ามใช้แดงเป็นพื้นหลัง section เต็ม ๆ**

| Token | Hex | ใช้กับ |
|---|---|---|
| `green-700` (primary) | `#0E7A5F` | ปุ่ม primary, ลิงก์, ไอคอน, ตัวเลขเน้น |
| `green-800` (primary-hover) | `#0B6350` | hover ของ primary, ข้อความบนพื้นเขียวอ่อน |
| `green-900` (dark surface) | `#0B4A39` | footer, การ์ด CTA เข้ม, hero band |
| `green-950` | `#083527` | ไล่เฉดใน footer / overlay |
| `green-50` (tint) | `#EFF7F3` | พื้นไอคอน, badge, pill สถานะ "ดี" |
| `green-25` (page tint) | `#F5FAF8` | พื้นหลัง section สลับ, breadcrumb bar |
| `green-100` (border tint) | `#E5EFEA` | เส้นขอบบน section tint |
| `green-200` | `#E4F4EC` | พื้นไอคอน checklist ผ่าน |
| `mint-text` | `#C7E4D9` / `#CFE9DF` | ข้อความรองบนพื้นเขียวเข้ม |
| `red-600` (accent) | `#D92B2B` | CTA ด่วน, ปุ่มโทร, badge โปรโมชัน |
| `red-700` (accent-hover) | `#B31E1E` | hover ของ accent |
| `red-500` (icon) | `#C22626` | ไอคอนเตือน, ปุ่มลบ |
| `red-50` | `#FDF0F0` / `#FDECEC` | พื้น pill เตือน, hover ปุ่มลบ |
| `red-border` | `#F1DADA` | ขอบปุ่มลบ |
| `amber-50` | `#FEF6E7` / `#FDF3E8` | pill "ควรปรับ", pill ประเภท Area |
| `amber-700` | `#8A5514` | ข้อความบน amber |
| `indigo-50` | `#F0F1FA` | pill ประเภท Blog |
| `indigo-700` | `#454C99` | ข้อความบน indigo |
| `ink-900` | `#0F1B17` | หัวข้อ, ข้อความหลัก |
| `ink-700` | `#37473F` | label ฟอร์ม |
| `ink-600` | `#40514A` / `#4A5A52` | body text |
| `ink-500` | `#5B6B64` | ข้อความรอง, caption |
| `ink-400` | `#96A69E` | label หมวดใน sidebar, เลขลำดับ |
| `border` | `#E3EAE6` | ขอบการ์ดมาตรฐาน |
| `border-soft` | `#EDF2EF` / `#E7EDEA` | เส้นแบ่งในการ์ด, ขอบปุ่มเล็ก |
| `input-border` | `#DDE6E1` | ขอบ input |
| `input-bg` | `#FBFDFC` | พื้น input |
| `admin-bg` | `#F6F8F7` | พื้นหลัง Admin |
| `white` | `#FFFFFF` | พื้นหลังหลักของเว็บไซต์ |
| `google-link` | `#1A0DAB` | หัวข้อใน Google Search Preview |
| `google-desc` | `#4D5156` | คำบรรยายใน Google Search Preview |

### Typography

โหลดจาก Google Fonts:
```
https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap
```

| บทบาท | Font | รายละเอียด |
|---|---|---|
| หัวข้อทุกระดับ (h1–h4) + ตัวเลข + ชื่อการ์ด | **Anuphan** | `font-weight: 600–700`, `letter-spacing: -0.01em`, `text-wrap: pretty` |
| Body, ฟอร์ม, UI | **IBM Plex Sans Thai** | `font-weight: 400–600`, `line-height: 1.6` |

Fallback: `system-ui, sans-serif`

Scale (responsive ด้วย `clamp()`):

| ระดับ | ค่า | หมายเหตุ |
|---|---|---|
| H1 (hero / page title) | `clamp(30px, 4.4vw, 56px)`, `line-height: 1.1` | ต่ำสุดไม่ต่ำกว่า 30px |
| H2 (section) | `clamp(24px, 2.8vw, 38px)`, `line-height: 1.2` | |
| H3 | `20–24px` | |
| การ์ด title | `16.5–19px`, weight 600–700 | |
| Body large (hero sub, intro) | `17–18px`, `line-height: 1.75` | |
| Body | `15–16.5px`, `line-height: 1.7` | |
| Small / caption | `13–14.5px` | |
| Micro (pill, label หมวด) | `11.5–12.5px`, `letter-spacing: 0.04–0.1em` | |

**หัวข้อ H1 มีได้หน้าเดียวหนึ่งอัน** — เป็นเงื่อนไขใน SEO checklist

### Spacing

Section padding: `clamp(56px, 7vw, 96px)` แนวตั้ง, `20px` แนวนอน
Container: `max-width: 1200px; margin: 0 auto` (บทความใช้ `760px` สำหรับคอลัมน์อ่าน)
Grid gap: `14px` (แถวย่อย) / `18–20px` (การ์ด) / `24–28px` (คอลัมน์หลัก) / `48px` (บทความ + sidebar)
Card padding: `18–26px` (`clamp(22px, 3vw, 34px)` สำหรับฟอร์มใหญ่)

### Radius

| ใช้กับ | ค่า |
|---|---|
| ปุ่มเล็ก / pill สถานะ | `999px` |
| ปุ่มไอคอนใน builder | `8px` |
| input, select, ปุ่มรอง | `10–13px` |
| การ์ดมาตรฐาน | `14–18px` |
| การ์ดใหญ่ / ฟอร์ม / panel | `20–24px` |
| โลโก้ | `10–12px` |

### Shadows

| ใช้กับ | ค่า |
|---|---|
| การ์ดยกลอย / sticky sidebar | `0 24px 50px -40px rgba(13,54,40,0.4)` |
| ฟอร์มหลัก | `0 26px 54px -42px rgba(13,54,40,0.4)` |
| ปุ่ม primary | `0 16px 32px -20px rgba(14,122,95,0.95)` |
| ปุ่ม accent (แดง) | `0 16px 32px -20px rgba(217,43,43,0.85)` |

**ห้ามใช้ shadow หนัก / การ์ดซ้อนการ์ด / gradient เยอะ** เป็นข้อห้ามชัดเจนใน brand direction

### Motion

ทุก transition: `transition: all 0.18s ease` (hover เปลี่ยนสีพื้น/ขอบ/ยกขึ้น `translateY(-2px)` เท่านั้น)
**ไม่มี scroll animation, ไม่มี carousel, ไม่มี parallax** — เป็นข้อกำหนดด้าน Core Web Vitals
เคารพ `prefers-reduced-motion: reduce` → ปิด transform ทั้งหมด

---

## Screens / Views

Prototype มี 7 หน้าเว็บไซต์/Admin สลับด้วย state `screen` และ `adminPage` ในระบบจริงต้องเป็น **route จริงทั้งหมด**

### 1. Homepage — `/`

**Purpose:** ให้ผู้เข้าชมเข้าใจบริการและติดต่อได้ภายใน 5 วินาที

**Layout (บนลงล่าง):**

1. **Header (sticky)** — `position: sticky; top: 0; z-index: 50`, พื้นขาว, `border-bottom: 1px solid #E3EAE6`
   - ซ้าย: โลโก้ 44×44 radius 12 + ชื่อ "อภิรักษ์บริการน้ำ" (Anuphan 17px/700) + tagline "ภูเก็ต · พังงา · รถส่งน้ำ 24 ชม." (11.5px, `#5B6B64`, `letter-spacing: 0.04em`)
   - กลาง: nav 7 ลิงก์ — หน้าหลัก / บริการน้ำ / พื้นที่ให้บริการ / ราคา / บทความ / เกี่ยวกับเรา / ติดต่อเรา (15px, `#40514A`, hover → `#0B6350`)
   - ขวา: เบอร์โทรเป็นข้อความ + ปุ่ม primary "ขอราคาน้ำ"
   - **Mobile (<900px):** nav กลางซ่อน แสดงปุ่ม hamburger เปิด drawer เต็มจอ; ปุ่ม "ขอราคาน้ำ" ยังอยู่

2. **Hero** — grid 2 คอลัมน์ `repeat(auto-fit, minmax(320px, 1fr))`, gap 40px, พื้น `#fff` ทับ tint `#F5FAF8` ด้านหลัง
   - ซ้าย: badge เขียวอ่อน "รับงาน 24 ชั่วโมง ภูเก็ต–พังงา" → H1 "บริการส่งน้ำ ส่งถึงหน้างาน รวดเร็ว ตรงเวลา" → sub 18px → ปุ่มคู่ [ขอราคาน้ำ (เขียว)] [โทร 087-418-1199 (แดง)] → 3 checklist มี ✓ วงกลมเขียว
   - ขวา: `<image-slot>` aspect `4/3` radius 24 + การ์ดลอย "1,000+ เที่ยวส่งน้ำต่อปี" ทับมุมล่างซ้าย
   - **Mobile:** ภาพลงล่าง, ปุ่มเต็มความกว้าง, H1 ลดเป็น 30px

3. **Trust band** — พื้น `#0B4A39` แถบเดียว, 4 ตัวเลข (Anuphan 30px/700 สีขาว + label 14px `#CFE9DF`), grid `repeat(auto-fit, minmax(150px, 1fr))`
   ค่าใน prototype: `10+ ปีประสบการณ์` / `1,000+ เที่ยวส่งน้ำต่อปี` / `20+ พื้นที่ให้บริการ` / `24 ชม. รับงานทุกวัน ไม่มีวันหยุด` — **ต้องยืนยันตัวเลขจริง**

4. **Services** — 6 การ์ด grid `repeat(auto-fit, minmax(260px, 1fr))` gap 20px
   ส่งน้ำทั่วไป / น้ำใช้ / น้ำเติมสระว่ายน้ำ / น้ำสำหรับโรงแรม / น้ำสำหรับ Pool Villa / น้ำสำหรับงานก่อสร้าง
   แต่ละการ์ด: พื้นขาว, `border 1px #E3EAE6`, radius 18, padding 24, ไอคอน 42×42 พื้น `#EFF7F3` radius 12 → title (Anuphan 18px/600) → desc 2 บรรทัด (14.5px `#5B6B64`) → ลิงก์ "ดูบริการ →" (`#0E7A5F`, 14.5px/600)
   Hover: `border-color: #0E7A5F`, `transform: translateY(-2px)`
   **ทุกการ์ดลิงก์ไป `/services/<slug>`**

5. **Fleet / ขนาดรถ** — 3 การ์ด (5,000 / 10,000 / 20,000 ลิตร) แต่ละอันมี `<image-slot>` + ขนาด + การใช้งานเหมาะสม + ลิงก์ขอราคา

6. **Areas** — grid ลิงก์พื้นที่ (pill/การ์ดเล็ก) ไป `/areas/<slug>` + ลิงก์ "ดูพื้นที่ทั้งหมด"

7. **Process** — 4 ขั้นตอน (STEP 1–4) แจ้งข้อมูล → ประเมินและเสนอราคา → กำหนดรอบส่ง → ส่งน้ำและออกเอกสาร

8. **Testimonials** — 3 การ์ดรีวิว มีชื่อ ประเภทธุรกิจ พื้นที่ **(เนื้อหาตัวอย่าง)**

9. **FAQ** — accordion 6 ข้อ (รายละเอียดใน Components)

10. **CTA band** — พื้น `#0B4A39` radius 24 ภายใน container, หัวข้อ + ปุ่มคู่เขียว/แดง

11. **Footer** — พื้น `#0B4A39` → ไล่เป็น `#083527`, grid 4 คอลัมน์: แบรนด์+คำอธิบาย / บริการ (5 ลิงก์) / พื้นที่ให้บริการ (ลิงก์) / ติดต่อ (โทร, LINE, Facebook, ที่อยู่, รับงาน 24 ชม.) + แถบล่าง copyright
    ลิงก์: `#C7E4D9`, hover `#fff`

12. **Sticky mobile CTA (<900px)** — `position: fixed; bottom: 0`, 3 ปุ่มแบ่งเท่ากัน: **โทร** (แดง) / **LINE** / **ขอราคาน้ำ** (เขียว) สูง `56px` ต่อปุ่ม (เกิน 44px hit target), `z-index: 60`, `padding-bottom: env(safe-area-inset-bottom)`
    ควบคุมด้วย prop `showStickyCta` (boolean, default `true`)

---

### 2. Service Landing Page — `/services/[slug]`

ตัวอย่างใน prototype: `/services/hotel-water` — "น้ำสำหรับโรงแรมและรีสอร์ต"

**Layout:**
1. **Breadcrumb bar** — พื้น `#F5FAF8`, `border-bottom 1px #E5EFEA`, padding 14px/20px, 13.5px — หน้าหลัก / บริการน้ำ / ชื่อบริการ (ต้องมี BreadcrumbList schema)
2. **Page header** — H1 + intro 17–18px, ความกว้างจำกัด 760px
3. **Hero image** — `<image-slot>` aspect `16/9` radius 24
4. **Body 2 คอลัมน์** — `minmax(0,1fr)` + `minmax(0,300px)`, gap 48px
   - **บทความหลัก:** H2 "ขอบเขตงานที่เราดูแล" + checklist 5 ข้อ → H2 ตารางขนาดรถ 3 แถว (ปริมาณ / เวลาเข้าหน้างาน / เหมาะกับ) → H2 ขั้นตอนทำงาน 4 การ์ด → H2 FAQ accordion 4 ข้อ → H2 บริการที่เกี่ยวข้อง (internal links 4 ลิงก์)
   - **Sidebar (sticky `top: 92px`):** การ์ดขอราคา (มีปุ่มแดง) + การ์ดพื้นที่ให้บริการยอดนิยม
   - **Mobile:** ยุบเป็น 1 คอลัมน์ sidebar ลงล่าง, sticky ปิด
5. **CTA band + Footer** เหมือนหน้าหลัก

**หมายเหตุ SEO:** หน้านี้คือ template ที่จะขยายเป็น 5+ หน้า (`water-delivery`, `pool-water`, `hotel-water`, `pool-villa-water`, `construction-water`) — เนื้อหาต่างกันทั้งหมด **ห้ามใช้ boilerplate ซ้ำแล้วเปลี่ยนแค่คีย์เวิร์ด** (duplicate content penalty)

---

### 3. Area Landing Page — `/areas/[slug]`

ตัวอย่าง: `/areas/phuket` — "บริการส่งน้ำ ภูเก็ต"

โครงคล้าง Service Page แต่เพิ่ม:
- **Zone grid** — 9 ตำบล/อำเภอที่ครอบคลุม (เมืองภูเก็ต, ถลาง, กะทู้, ป่าตอง, เชิงทะเล·บางเทา, ราไวย์, กะรน, ฉลอง, ไม้ขาว·สนามบิน) เป็น pill grid
- **การ์ดติดต่อพื้นที่** — โทรศัพท์ / LINE / เวลารับงาน (24 ชั่วโมง) / พื้นที่ครอบคลุม
- **Map slot** — `<image-slot>` แทน Google Maps Embed จริง (ต้อง `loading="lazy"`)
- **FAQ เฉพาะพื้นที่** 4 ข้อ (เวลาเข้าหน้างาน, ซอยแคบ, ค่าบริการตามระยะทาง, งานกลางคืน)

**Local SEO ที่ต้องมี:** `LocalBusiness` schema พร้อม `areaServed`, `geo`, `openingHoursSpecification` (24/7), `telephone`; และ `FAQPage` schema

---

### 4. Quote Request — `/quote`

**Purpose:** conversion หลักของเว็บไซต์ (ลูกค้าเลือกแบบ "ขอใบเสนอราคาเท่านั้น" — **ไม่แสดงราคาบนเว็บ**)

**Layout:** grid `repeat(auto-fit, minmax(300px, 1fr))` gap 28px

**ฟอร์ม (ซ้าย)** — การ์ดขาว radius 22 padding `clamp(22px,3vw,34px)` มี shadow ฟอร์มหลัก:

| Field | Type | Required | Placeholder / Options |
|---|---|---|---|
| ชื่อผู้ติดต่อ | text | ✓ | "ชื่อ–นามสกุล หรือชื่อกิจการ" |
| เบอร์โทรศัพท์ | tel | ✓ | "08X-XXX-XXXX" |
| LINE ID | text | — | "@yourline" |
| ประเภทบริการ | select | ✓ | 5 ตัวเลือกตาม service |
| ปริมาณน้ำต่อเที่ยว | select | ✓ | 5,000 / 10,000 / 20,000 ลิตร / ยังไม่ทราบ ให้ทีมงานประเมิน |
| วันที่ต้องการใช้น้ำ | date | — | — |
| พื้นที่หน้างาน | text | ✓ | "อำเภอ / ตำบล เช่น ป่าตอง, ภูเก็ต" |
| รายละเอียดเพิ่มเติม | textarea (4 rows) | — | "เช่น จำนวนห้องพัก ขนาดสระ ความกว้างซอย จุดจอดรถ หรือรอบการส่งที่ต้องการ" |

- Input style: `font-size 15.5px; padding 14px 16px; radius 12px; border 1px #DDE6E1; background #FBFDFC`
- Focus: `border-color #0E7A5F; background #fff` — **ต้องมี visible focus ring สำหรับ accessibility**
- ปุ่มส่ง: เต็มความกว้าง, `#0E7A5F`, 16.5px/600, padding 17px, radius 14px
- ใต้ปุ่ม: "ทีมงานติดต่อกลับโดยเร็วที่สุด · รับสายตลอด 24 ชั่วโมง โทร 087-418-1199"

**Validation ที่ต้องทำ:** required 5 field; เบอร์โทรต้องเป็นเลข 9–10 หลัก (รับ `-` และเว้นวรรค); date ต้องไม่เป็นวันในอดีต; แสดง error ใต้ field ด้วย `#C22626` 13px + `aria-invalid`

**States ที่ต้อง implement (ยังไม่มีใน prototype):**
- **Loading** — ปุ่มเปลี่ยนเป็น spinner + disabled + ข้อความ "กำลังส่ง…"
- **Success** — แทนฟอร์มด้วยการ์ดยืนยัน มีเลขอ้างอิงคำขอ + ปุ่มโทร; ยิง GA4 event `generate_lead`
- **Error** — แถบแดงอ่อนด้านบนฟอร์ม + คงข้อมูลที่กรอกไว้ + แนะนำโทรแทน

**Sidebar (ขวา):** การ์ดเขียวเข้ม "ต้องการน้ำวันนี้?" + ปุ่มโทรแดง / การ์ดตัวอย่างข้อมูลที่ช่วยให้เสนอราคาเร็วขึ้น (4 แถว) / การ์ด tint "ค่าบริการคิดจากอะไร"

---

### 5. Blog Article — `/blog/[slug]`

ตัวอย่าง: `/blog/phuket-dry-season`

**Layout:** breadcrumb → meta row (หมวด pill + วันที่ + เวลาอ่าน) → H1 `clamp(30px,4vw,46px)` → lead 18px → cover `<image-slot>` aspect `21/9` → grid `minmax(0,1fr)` + `minmax(0,280px)` gap 48px
- **article** (max 760px): H2/H3 สลับ paragraph 17px/1.85, checklist, ตาราง 3 คอลัมน์ (ประเภทที่พัก / ใช้ต่อวัน / สำรอง 3 วัน), internal link ในเนื้อหาไปหน้า Service และ Area, การ์ด CTA ปิดท้าย
- **aside (sticky 92px):** สารบัญ (TOC 4 หัวข้อ) + บริการที่เกี่ยวข้อง

**ต้องมี:** `Article` schema (`headline`, `datePublished`, `author`, `image`), TOC สร้างอัตโนมัติจาก H2, anchor id บนทุก H2

**ยังต้องสร้างเพิ่ม:** หน้า index `/blog` (ยังไม่มีในดีไซน์ — ใช้ grid การ์ดแบบเดียวกับ Services)

---

### 6. Admin — Landing Pages — `/admin/pages`

**Shell (ใช้ร่วมทุกหน้า Admin):** grid `250px` + `minmax(0,1fr)`, พื้น `#F6F8F7`

**Sidebar** — พื้นขาว, `border-right 1px #E3EAE6`, padding 18px 14px, โลโก้ 36×36 + ชื่อ + "ระบบจัดการเว็บไซต์" ด้านบน

โครงเมนู 6 หมวด (label หมวด: 11.5px/700 `letter-spacing 0.1em` `#96A69E`):

| หมวด | รายการ |
|---|---|
| ภาพรวม | Dashboard |
| Content | Landing Pages · Services · Areas · Blog · FAQ · Testimonials |
| Media | Images · Files |
| SEO | SEO Settings · Redirects · Sitemap |
| Website | Navigation · Footer · Global Settings |
| System | Users · Settings |

Nav item: `padding 9px 12px; radius 10px; font-size 14px`
- ปกติ: `color #44554D; font-weight 500`
- active: `background #0E7A5F; color #fff; font-weight 600`

**Topbar (sticky `top:0`, `z-index:20`):** พื้นขาว, `border-bottom 1px #E3EAE6`, padding 16px 28px — ชื่อหน้า (Anuphan 18px/700) + subtitle; ขวา: ปุ่ม "ดูเว็บไซต์" (outline) + ปุ่ม action หลัก (เขียว)

**เนื้อหาหน้า Landing Pages:** grid `repeat(auto-fit, minmax(300px, 1fr))` gap 24px

- **แถบค้นหา** — input ค้นหา (filter ตาม title และ url แบบ live) + select ประเภท (ทุกประเภท/Service/Area/Blog) + select สถานะ (ทุกสถานะ/เผยแพร่แล้ว/ฉบับร่าง/ตั้งเวลา)
- **ตาราง** — การ์ดขาว radius 18 `overflow-x: auto` ภายในมี grid `min-width: 780px` คอลัมน์ `minmax(220px,2.1fr) 100px 90px 120px 100px 76px`
  หัวตาราง: พื้น `#F5FAF8` 13px/600 `#5B6B64`
  แถว: ชื่อหน้า (15px/600) + URL (13px `#5B6B64`, `overflow-wrap: anywhere`) / pill ประเภท / pill SEO / pill สถานะ / วันที่อัปเดต / ปุ่ม "แก้ไข"
  Row hover: `background #FAFCFB`

  **Pill color mapping:**
  | ค่า | พื้น | ตัวอักษร |
  |---|---|---|
  | Service | `#EFF7F3` | `#0B6350` |
  | Area | `#FDF3E8` | `#8A5514` |
  | Blog | `#F0F1FA` | `#454C99` |
  | SEO ดี / เผยแพร่แล้ว | `#EFF7F3` | `#0B6350` |
  | SEO ควรปรับ | `#FEF6E7` | `#8A5514` |
  | ฉบับร่าง | `#F1F4F2` | `#5B6B64` |
  | ตั้งเวลา | `#FDF0F0` | `#B31E1E` |

- **SEO Health panel** — คะแนน `X/100` **คำนวณจากจำนวน check ที่ผ่านหารด้วยทั้งหมด ไม่ใช่เลขสมมติ** (ข้อกำหนดชัดเจนจากลูกค้า) พร้อม checklist 9 ข้อ แต่ละข้อมีไอคอนวงกลม 22px (`✓` เขียว `#E4F4EC/#0B6350` หรือ `!` แดง `#FDECEC/#C22626`) + label 14.5px/600 + คำอธิบายที่ **บอกว่าต้องแก้อะไร** เช่น "620 คำ · แนะนำเพิ่มหัวข้อวิธีคำนวณปริมาณน้ำ", "2 จาก 6 ภาพยังไม่มีคำบรรยาย"

  Checks: SEO Title / Meta Description / H1 เดียวต่อหน้า / Canonical URL / OG Image / Internal Links / ความยาวเนื้อหา / Structured Data / Alt text ของภาพ

- **Google Search Preview** — จำลอง SERP: URL breadcrumb 13px `#5B6B64` / title 18px `#1A0DAB` / description 13.5px `#4D5156` — ต้องตัดข้อความตามความยาวจริงที่ Google ใช้ (title ~60 ตัวอักษร, desc ~155)

**Admin หน้าอื่น** (Dashboard, Services, Areas, Blog, FAQ, Testimonials, Images, Files, SEO Settings, Redirects, Sitemap, Navigation, Footer, Global Settings, Users, Settings) มีดีไซน์เป็น pattern 3 แบบ: **dashboard** (การ์ดสถิติ + งานที่ต้องทำ), **collection** (ตารางรายการ + ปุ่มเพิ่ม), **settings** (ฟอร์ม field group) — ดูรายละเอียดจริงในไฟล์ prototype

---

### 7. Admin — Page Builder — `/admin/pages/[id]/edit`

**Purpose:** Admin สร้าง/แก้ Landing Page โดยไม่แตะโค้ด — หัวใจของ CMS-first

**Layout:** grid `repeat(auto-fit, minmax(290px, 1fr))` gap 20px (desktop = 3 คอลัมน์)

**คอลัมน์ 1 — Block Palette** (การ์ดขาว radius 18 padding 18)
ปุ่ม "+ ชื่อบล็อก" 15 รายการ: Hero · Rich Text · Service Cards · Image + Text · Feature Grid · Pricing · FAQ · Testimonials · Gallery · CTA · Contact · Google Map · Area List · Related Services · Related Articles
ปุ่ม: `text-align left; 13.5px/500; background #FBFDFC; border 1px #E7EDEA; radius 10px; padding 10px 12px`
Hover: `border-color #0E7A5F; background #EFF7F3`
คลิก → **append block ใหม่ท้ายรายการ** (ในระบบจริงควรรองรับ drag-to-insert ด้วย)

**คอลัมน์ 2 — Section list**
- **แถบหัว:** ชื่อหน้า + `/services/hotel-water · Template: Service Landing` + ปุ่ม [Preview] (outline) [Publish] (เขียว)
- **แถวบล็อก:** การ์ดขาว radius 14 padding 14px 16px, `border 1.5px` — ปกติ `#E3EAE6`, **ที่เลือก `#0E7A5F`**, ที่ซ่อน `opacity: 0.55`
  ประกอบด้วย: เลขลำดับ 2 หลัก (`01`, `02`… Anuphan 12.5px/700 `#96A69E`) / ชื่อบล็อก (15.5px/600) + คำอธิบายสั้น (13px `#5B6B64`) / กลุ่มปุ่มขวา (flex-wrap): `↑` `↓` (30×30 radius 8) · `ซ่อน|แสดง` · `ทำซ้ำ` · `ลบ` (ตัวอักษรแดง `#C22626`, ขอบ `#F1DADA`, hover พื้น `#FDF0F0`)
  คลิกที่แถว → เลือกบล็อกนั้น (inspector อัปเดต)

**คอลัมน์ 3 — Inspector (2 การ์ด)**
- **SECTION ที่เลือก:** label หมวด → ชื่อบล็อก (17px/700) → คำอธิบาย → field: หัวข้อ (H2) text input / พื้นหลัง select (ขาว/เขียวอ่อน/เขียวเข้ม) / ปุ่ม dashed "อัปโหลดรูปภาพ"
- **SEO ของหน้านี้:** SEO Title text / Meta Description textarea 3 rows / Robots select (index,follow | noindex) / Schema select (Service | LocalBusiness | FAQPage | Article)

**Field SEO ครบชุดที่ต้องมีในระบบจริง** (prototype แสดงบางส่วน): SEO Title, Meta Description, URL Slug, Canonical URL, OG Title, OG Description, OG Image, Robots, Schema Type + Google Search Preview + Social Preview

---

## Interactions & Behavior

### Navigation
- ทุกลิงก์ใน prototype เป็น `onClick` เปลี่ยน state — **ในระบบจริงต้องเป็น `<Link href>` จริงทั้งหมด** เพื่อ SEO และ crawlability
- เปลี่ยนหน้า → `window.scrollTo(0, 0)`
- Sidebar Admin active state ตาม route ปัจจุบัน

### Accordion (FAQ)
- โหมด **single-open**: เปิดข้อใหม่ปิดข้อเดิม; คลิกข้อที่เปิดอยู่ → ปิด
- ข้อแรกเปิดไว้เป็น default (`faqOpen: 0`)
- ปุ่มหัวข้อ: `width: 100%; text-align: left; background: none; border: 0; padding: 20px 22px; cursor: pointer`
- ไอคอน 28×28 radius 8 พื้น `#EFF7F3` แสดง `−` เมื่อเปิด `+` เมื่อปิด
- คำตอบ: `padding: 0 22px 20px; font-size 16px; line-height 1.75; color #4A5A52`
- **Accessibility:** ต้องใช้ `<button aria-expanded>` + `aria-controls`, รองรับ keyboard, และ **render คำตอบใน DOM ตลอด** (ซ่อนด้วย CSS) เพื่อให้ Google อ่านได้และ FAQ schema ตรงกับเนื้อหา

### Page Builder (state ทั้งหมดต้อง persist ลง CMS)
| Action | พฤติกรรม |
|---|---|
| เพิ่มบล็อก | append ท้ายรายการ, note = "บล็อกใหม่ · ยังไม่ใส่เนื้อหา" |
| เลื่อนขึ้น/ลง | สลับตำแหน่งกับบล็อกข้างเคียง; บล็อกแรก/สุดท้าย → ปุ่มควร disabled |
| ซ่อน/แสดง | toggle `visible`; ที่ซ่อนแสดง `opacity 0.55` และไม่ render บนหน้าเว็บจริง |
| ทำซ้ำ | copy บล็อกแทรกต่อจากตัวเดิมทันที |
| ลบ | ในระบบจริง **ต้องมี confirm dialog** (prototype ลบทันที) |
| เลือก | คลิกแถว → inspector โหลด field ของบล็อกนั้น |
| Preview | เปิดหน้า preview mode ใน tab ใหม่ (draft token) |
| Publish | เปลี่ยนสถานะ + trigger revalidate ของหน้านั้น + อัปเดต sitemap |

**ยังต้องเพิ่ม:** drag-to-reorder, undo/redo, autosave + indicator "บันทึกแล้ว", optimistic lock กันสองคนแก้พร้อมกัน

### Admin Search
- filter แบบ live (ไม่มีปุ่มค้นหา) match บน `title` และ `url` แบบ case-insensitive substring
- ในระบบจริง: debounce 250ms + server-side pagination เมื่อเกิน 50 หน้า + empty state "ไม่พบหน้าที่ค้นหา"

### Hover / States ที่ต้องทำทุก component
| State | พฤติกรรม |
|---|---|
| Hover (ปุ่ม primary) | `#0E7A5F` → `#0B6350` |
| Hover (ปุ่ม accent) | `#D92B2B` → `#B31E1E` |
| Hover (การ์ด) | `border-color: #0E7A5F` + `translateY(-2px)` |
| Hover (ปุ่ม outline) | `background: #F5FAF8` |
| Focus (input) | `border-color: #0E7A5F; background: #fff` + focus ring |
| Focus (ปุ่ม/ลิงก์) | `outline: 2px solid #0E7A5F; outline-offset: 2px` — **ต้องเพิ่ม ยังไม่มีใน prototype** |
| Active (ปุ่ม) | `transform: scale(0.98)` |
| Disabled | `opacity: 0.5; cursor: not-allowed`, สีพื้น `#F1F4F2` ตัวอักษร `#96A69E` |
| Loading | spinner 16px หมุน 0.7s linear + ปุ่ม disabled + คงความกว้างเดิม |

Disabled/Loading state **ยังไม่ได้ออกแบบใน prototype** — ใช้ค่าข้างต้นเป็นสเปก

### Responsive Breakpoints

Mobile-first ตาม brief

| Breakpoint | พฤติกรรม |
|---|---|
| < 640px | 1 คอลัมน์ทุก grid; H1 30px; ปุ่มเต็มความกว้าง; sticky CTA แสดง; sidebar Admin เป็น drawer |
| 640–900px | การ์ด 2 คอลัมน์; nav ยังเป็น hamburger; sticky CTA แสดง |
| 900–1200px | nav เต็ม; sticky CTA ซ่อน; sidebar sticky ทำงาน; Admin builder 2 คอลัมน์ |
| > 1200px | container 1200px จัดกลาง; Admin builder 3 คอลัมน์ |

ทุก grid ในดีไซน์ใช้ `repeat(auto-fit, minmax(Xpx, 1fr))` — **ไม่ต้องพึ่ง media query** ยกเว้น header/sticky CTA/sidebar

---

## State Management

### Frontend (public site)
เว็บไซต์ควรเป็น **static/ISR เกือบทั้งหมด** — state ฝั่ง client มีเท่านี้:

| State | ขอบเขต | ค่าเริ่มต้น |
|---|---|---|
| `mobileNavOpen` | Header | `false` |
| `faqOpenIndex` | ทุก FAQ section (แยกต่อ section) | `0` |
| `quoteForm` | หน้าขอราคา | ค่าว่าง |
| `quoteStatus` | หน้าขอราคา | `'idle' \| 'loading' \| 'success' \| 'error'` |

### Admin
| State | ขอบเขต | หมายเหตุ |
|---|---|---|
| `currentRoute` | shell | ตัดสิน active nav |
| `searchQuery` + `filters` | รายการหน้า | ควร sync ลง URL query string |
| `blocks[]` | builder | `{ id, type, visible, order, data }` — source of truth คือ CMS |
| `selectedBlockId` | builder | default = บล็อกแรก |
| `dirty` / `saving` | builder | สำหรับ autosave + เตือนก่อนออกจากหน้า |
| `seoFields` | builder | คำนวณ SEO score จาก field เหล่านี้แบบ realtime |

### Data fetching
- Public: `generateStaticParams` จาก slug ทั้งหมดใน CMS + ISR revalidate 3600s + on-demand revalidate ตอน Publish
- Admin: CMS REST/GraphQL + optimistic update บน builder action
- `sitemap.xml` + `robots.txt` generate จาก CMS ทุกครั้งที่ publish

---

## CMS Content Model

โมเดลที่ต้องสร้าง (ชื่อ collection แนะนำ):

### `pages` (Landing Pages)
| Field | Type | หมายเหตุ |
|---|---|---|
| `title` | text | required |
| `slug` | text unique | validate `[a-z0-9-]+` |
| `type` | select | `service` \| `area` \| `blog` \| `custom` — ตัดสิน route prefix |
| `template` | select | Service Landing / Area Landing / Article / Blank |
| `status` | select | `draft` \| `published` \| `scheduled` |
| `publishAt` | datetime | ใช้เมื่อ scheduled |
| `blocks` | **blocks / repeater** | 15 block type ตาม palette |
| `seo` | group | ดูด้านล่าง |
| `updatedAt` / `updatedBy` | auto | แสดงในตาราง |

### `seo` group (ใช้ร่วมทุก collection)
`seoTitle` · `metaDescription` · `canonicalUrl` · `ogTitle` · `ogDescription` · `ogImage` (upload) · `robots` (select) · `schemaType` (select)

### Block types (15 แบบ ตรงกับ palette)
| Block | Fields สำคัญ |
|---|---|
| `hero` | badge, heading (H1), subheading, primaryCta, secondaryCta, checklist[], image |
| `richText` | content (rich text จำกัดเป็น H2/H3/p/ul/ol/table/link เท่านั้น) |
| `serviceCards` | heading, cards[] (relation → `services`) |
| `imageText` | heading, body, image, imagePosition (left/right) |
| `featureGrid` | heading, items[] (icon, title, desc) |
| `pricing` | heading, rows[] (volume, note), ctaLabel — **ปัจจุบันไม่แสดงราคา ใช้เป็นตารางขนาดรถ** |
| `faq` | heading, items[] (q, a) + toggle `emitSchema` |
| `testimonials` | heading, items[] (relation → `testimonials`) |
| `gallery` | heading, images[] |
| `cta` | heading, body, primaryCta, secondaryCta, background (white/tint/dark) |
| `contact` | heading, phone, line, hours, address |
| `googleMap` | embedUrl หรือ lat/lng, zoom |
| `areaList` | heading, areas[] (relation → `areas`) |
| `relatedServices` | heading, items[] (relation → `services`) |
| `relatedArticles` | heading, items[] (relation → `pages` type=blog) |

ทุก block มี field ร่วม: `visible` (boolean), `background` (select: white / green-tint / green-dark), `anchorId` (text, optional)

### Collection อื่น
- `services` — name, slug, icon, shortDescription, body, seo
- `areas` — name, slug, zones[], lat/lng, phone, body, seo, relatedServices[]
- `testimonials` — author, businessType, area, quote, avatar
- `faqs` — question, answer, category (global FAQ pool)
- `quotes` — คำขอราคาที่ส่งเข้ามา (read-only ใน Admin + export CSV)
- `redirects` — from, to, statusCode (301/302)
- `globals` — navigation, footer, siteSettings (ชื่อกิจการ, โทร, LINE, Facebook, ที่อยู่, เวลาให้บริการ, GA4 ID, default OG image)

### SEO Score — เกณฑ์คำนวณจริง
คะแนน = (จำนวน check ที่ผ่าน / จำนวน check ทั้งหมด) × 100 คำนวณ server-side ตอน save

| Check | เงื่อนไขผ่าน |
|---|---|
| SEO Title | มีค่า และยาว 30–65 ตัวอักษร |
| Meta Description | มีค่า และยาว 70–160 ตัวอักษร |
| H1 | มี H1 ในหน้า **หนึ่งอันเท่านั้น** |
| Canonical URL | มีค่า และเป็น absolute URL |
| OG Image | มีค่า และขนาด ≥ 1200×630 |
| Internal Links | มีลิงก์ภายใน ≥ 3 ลิงก์ |
| ความยาวเนื้อหา | ≥ 800 คำ (prototype แจ้งเตือนที่ 620 คำ) |
| Structured Data | มี schema ที่ตรงกับ `schemaType` และ validate ผ่าน |
| Alt text | ทุกรูปในหน้ามี alt |

**ข้อกำหนดสำคัญจากลูกค้า:** SEO score ต้องเป็น checklist ที่ช่วยแก้ปัญหาจริง ไม่ใช่คะแนนตกแต่ง — ทุกข้อที่ไม่ผ่านต้องบอกว่าต้องทำอะไร และควรลิงก์ไปที่ field นั้นโดยตรง

---

## SEO Requirements (สำคัญที่สุดของโปรเจกต์นี้)

1. **Semantic HTML** — `<header> <nav> <main> <article> <aside> <section> <footer>`, H1 หนึ่งอันต่อหน้า, ลำดับ H2/H3 ไม่ข้ามระดับ
2. **Structured data (JSON-LD)** ต่อประเภทหน้า:
   - ทุกหน้า: `Organization` + `WebSite`
   - Homepage / Area: `LocalBusiness` (`telephone: +66874181199`, `areaServed: ภูเก็ต, พังงา`, `openingHoursSpecification` 24/7)
   - Service page: `Service` + `BreadcrumbList`
   - หน้าที่มี FAQ: `FAQPage`
   - บทความ: `Article` + `BreadcrumbList`
3. **Internal linking** — Service ↔ Area ↔ Blog ต้องลิงก์ถึงกัน อย่างน้อย 3 ลิงก์ต่อหน้า จัดการผ่าน relation field ใน CMS
4. **ห้าม keyword stuffing** — เนื้อหาแต่ละหน้าต้องเขียนใหม่ ตอบ search intent จริง ห้าม generate จาก template เปลี่ยนแค่ชื่อพื้นที่
5. **Canonical + hreflang** — ทุกหน้ามี canonical; ถ้ามีภาษาอังกฤษในอนาคตต้องเตรียม `hreflang`
6. **Sitemap + robots** — generate อัตโนมัติ, split ตาม type เมื่อเกิน 5,000 URL
7. **Redirects** — จัดการใน Admin, 301 เป็นค่าเริ่มต้น, ตรวจ redirect loop ก่อนบันทึก

## Performance Requirements

เป้า Core Web Vitals: **LCP < 2.5s, INP < 200ms, CLS < 0.1** (mobile 4G)

- รูปทุกใบผ่าน `next/image` (หรือเทียบเท่า): WebP/AVIF, `srcset` responsive, `loading="lazy"` ยกเว้น hero (`priority`), ระบุ `width`/`height` ทุกใบเพื่อกัน CLS
- ฟอนต์: `display=swap`, preconnect, **preload เฉพาะ Anuphan 700 และ IBM Plex Sans Thai 400** เท่านั้น; subset ภาษาไทย
- JS: หน้า public ควรไม่มี client component ยกเว้น mobile nav, FAQ accordion, quote form
- Google Maps: โหลดแบบ lazy เมื่อ scroll ถึง (facade pattern) ไม่ใส่ iframe ตรง ๆ
- ไม่มี carousel, ไม่มี animation library, ไม่มี scroll-triggered effect

## Accessibility

- Contrast: ตรวจแล้วผ่าน 4.5:1 ทุกคู่สีในดีไซน์ — **รักษาไว้เมื่อเปลี่ยนสี** โดยเฉพาะ `#5B6B64` บนขาว (5.9:1) และ `#C7E4D9` บน `#0B4A39` (8.6:1)
- Hit target ≥ 44×44px บน mobile (sticky CTA ใช้ 56px)
- ทุก interactive element เข้าถึงด้วย keyboard + มี visible focus ring (`outline: 2px solid #0E7A5F; outline-offset: 2px`)
- FAQ ใช้ `aria-expanded` / `aria-controls`
- ฟอร์มมี `<label>` ผูก `for`/`id` ทุก field, error ผูกด้วย `aria-describedby` + `aria-invalid`
- `<img alt>` ทุกใบ (เป็น SEO check ด้วย)
- เคารพ `prefers-reduced-motion`

---

## Assets

### มีแล้วในโปรเจกต์
| ไฟล์ | ใช้ที่ |
|---|---|
| `assets/logo.jpg` | Header, Footer, Admin sidebar — **ควรขอไฟล์ SVG หรือ PNG โปร่งใสความละเอียดสูงมาแทน** |

### ต้องขอจากลูกค้า (ทุกช่องยังเป็น placeholder)
| ตำแหน่ง | สเปก | เนื้อหาที่ต้องการ |
|---|---|---|
| Hero (หน้าหลัก) | 4:3, ≥ 1600px กว้าง | รถส่งน้ำจริงกำลังส่งน้ำหน้างาน มีโลโก้บนรถ |
| Fleet ×3 | 4:3 | รถ 5,000 / 10,000 / 20,000 ลิตร แต่ละคัน |
| Service hero | 16:9, ≥ 1600px | หน้างานโรงแรม/รีสอร์ต, การเติมสระ, งานก่อสร้าง |
| Area map | 16:9 | แทนด้วย Google Maps Embed จริง |
| Blog cover | 21:9, ≥ 2000px | ภาพประกอบบทความ |
| Testimonials avatar ×3 | 1:1, 200px | รูปลูกค้าหรือโลโก้กิจการ (ต้องได้รับอนุญาต) |
| Client logos | PNG โปร่งใส สูง 80px | โลโก้โรงแรม/รีสอร์ตที่เป็นลูกค้า (ต้องได้รับอนุญาต) |
| OG image default | 1200×630 | ภาพรถ + โลโก้ + เบอร์โทร |
| Favicon | 512×512 + ico | จากโลโก้ |

ทุกรูปต้องมี **alt text ภาษาไทยที่บรรยายภาพจริง** ไม่ใช่คีย์เวิร์ด

### Icons
Prototype ใช้ emoji ชั่วคราว (`🚚` ฯลฯ) — **ในระบบจริงให้แทนด้วย icon set แบบ line/outline** เช่น Lucide (stroke 1.5–2px) สี `#0E7A5F` ขนาด 20–24px วางในกล่อง 42×42 พื้น `#EFF7F3` radius 12

---

## Business Data (ยืนยันแล้ว)

| ข้อมูล | ค่า |
|---|---|
| ชื่อกิจการ | หจก.อภิรักษ์บริการน้ำ |
| โทรศัพท์ | 087-418-1199 (`tel:0874181199`) |
| พื้นที่ให้บริการ | ภูเก็ต, พังงา |
| เวลาให้บริการ | 24 ชั่วโมง ทุกวัน ไม่มีวันหยุด |
| ขนาดรถ | 5,000 / 10,000 / 20,000 ลิตร |
| นโยบายราคา | **ขอใบเสนอราคาเท่านั้น — ไม่แสดงราคาบนเว็บไซต์** |
| โทนภาษา | ทางการ น่าเชื่อถือ |

**ต้องขอเพิ่ม:** LINE Official ID, Facebook Page URL, ที่อยู่จดทะเบียน, เลขทะเบียนนิติบุคคล, พิกัด lat/lng, อีเมลรับคำขอราคา, ตัวเลข trust จริง (ปีประสบการณ์ / เที่ยวส่งน้ำ / จำนวนพื้นที่)

---

## Files

| ไฟล์ | เนื้อหา |
|---|---|
| `Apirak Water.dc.html` | Prototype ทั้งหมด 7 หน้า (เว็บไซต์ 5 + Admin 2) รวม Admin หน้าอื่นทั้ง sidebar — สลับหน้าด้วยแถบด้านล่าง |
| `assets/logo.jpg` | โลโก้ที่ใช้อยู่ |
| `image-slot.js` | component placeholder รูปภาพ **ใช้เฉพาะใน prototype ไม่ต้องนำไปใช้จริง** |
| `support.js` | runtime ของ prototype **ไม่ต้องนำไปใช้จริง** |

เปิด `Apirak Water.dc.html` ในเบราว์เซอร์เพื่อดูและกดใช้งานได้ทุกหน้า

---

## Suggested Build Order

1. Design token + base component (Button, Container, Section, Heading, Card, Pill) + ฟอนต์
2. CMS content model ทั้งหมด + seed ข้อมูลจริง
3. Block renderer 15 block + template mapping
4. Homepage → Service template → Area template → Blog template
5. Quote form + backend (email + บันทึกลง CMS + reCAPTCHA)
6. SEO layer: metadata, JSON-LD, sitemap, robots, redirects
7. Admin: pages list → page builder → SEO panel + score engine
8. Admin ส่วนที่เหลือ (media, globals, users)
9. Performance audit + Lighthouse + Search Console setup

## Open Questions for the Client

1. LINE Official ID และ Facebook Page URL
2. ที่อยู่จดทะเบียนและพิกัดสำหรับ Google Maps / LocalBusiness schema
3. ตัวเลข trust จริง (ปีประสบการณ์ / เที่ยวส่งน้ำต่อปี / จำนวนพื้นที่)
4. รีวิวลูกค้าจริงและการอนุญาตใช้ชื่อ/โลโก้
5. รายชื่อพื้นที่ที่จะทำ Area Page ทั้งหมด (ปัจจุบันมีดีไซน์แค่ภูเก็ต)
6. โดเมนจริง (prototype ใช้ `apirakwater.co.th` เป็นตัวอย่าง)
7. อีเมล/ช่องทางที่ต้องการรับคำขอใบเสนอราคา และต้องการ SMS/LINE notify ด้วยหรือไม่
8. มีเว็บไซต์เดิมที่ต้องทำ 301 redirect หรือไม่
