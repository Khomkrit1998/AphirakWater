# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

feat: Scroll-driven animation ให้เนื้อหาหน้าหลักค่อยๆ ปรากฏตอนเลื่อน

Risk / ความเสี่ยง: low (CSS class และ utility ใหม่ 1 ตัว ไม่แตะเนื้อหา data หรือ API) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer: "เพิ่ม Scroll-driven Animation" (หน้าหลักมี scroll-driven อยู่แล้วบางจุด จึงทำข้อ 4 ของข้อเสนอเดิม: หัวข้อและการ์ดค่อยๆ ลอยขึ้นอย่างสม่ำเสมอทั้งหน้า)

Acceptance criteria:

1. หัวข้อและบล็อกเนื้อหาทุกส่วนของหน้าหลัก (ยกเว้น hero) ค่อยๆ ปรากฏเมื่อเลื่อนเข้าจอ
2. เมื่ออยู่กลางจอ ทุกชิ้นต้องแสดงเต็ม (opacity 1) ไม่ค้างจาง
3. Reduced motion / เบราว์เซอร์ไม่รองรับ → แสดงปกติ ไม่ขยับ
4. ไม่มี horizontal scroll (แถวรูปเลื่อนเข้าด้านข้าง)

## What Changed / สิ่งที่เปลี่ยนแปลง

* `globals.css`: keyframes `story-slide-in` + utility `motion-slide-in` (ระยะเริ่มด้วย `--slide`)
* `hero.tsx`: ตัวเลข 4 ช่องใต้ hero `motion-rise`
* `sections.tsx`: `motion-rise` ที่ intro บริการ, แผง "ทำไมต้องเลือกเรา", intro พื้นที่, intro และแถวราคา, intro แกลเลอรี, หัวข้อ/รีวิวเด่น/รีวิวอื่น, หัวข้อ FAQ + ทุกคำถาม (`*:motion-rise`), สองบล็อกในแถบ CTA · แถวรูปแกลเลอรี `motion-slide-in` (แถวบน +6rem, แถวล่าง −6rem)
* `docs/decisions/0009-night-hero-and-gallery-marquee.md` ข้อ 9

## Why / เหตุผล

* ใช้ `motion-rise` ตัวเดิม (0005) เพื่อให้ทั้งเว็บเคลื่อนไหวแบบเดียวกัน เพิ่ม utility ใหม่เฉพาะแถวรูปที่ต้องเข้าด้านข้าง
* ไม่ใส่ที่บล็อกสูงกว่าจอ (ตัวเลือกบริการ, บทขั้นตอน) เพราะ range `entry` จะจบเมื่อบล็อกเข้าจอครบ ทำให้จางค้างนาน
* แถวรูปใส่ animation ที่ div ห่อ ไม่ใส่ที่ `marquee-track` เพราะ `animation` จะทับกัน

## Files Changed / ไฟล์ที่แก้ไข

* `packages/ui/src/styles/globals.css`
* `apps/web/features/home/components/hero.tsx`
* `apps/web/features/home/components/sections.tsx`
* `docs/decisions/0009-night-hero-and-gallery-marquee.md`

## Architecture / Data Impact

None

## Verification / การตรวจสอบ

### Verification Commands / คำสั่งตรวจสอบ

Attempts / จำนวนรอบ: 1

| Command / คำสั่ง | Result / ผล |
| --- | --- |
| pnpm typecheck | pass |
| pnpm lint | pass |
| none (test) | none |
| pnpm build | pass |

Baseline: None

### Tests / การทดสอบ

Production build + Chrome headless (DevTools protocol) ที่ 1440×900, 390×844 และ 390×844 reduced motion: เลื่อน element ที่มี animation ทีละตัวมากลางจอแล้วอ่าน `opacity`

* 36 ชิ้น (รวมคำถาม FAQ 6 ข้อ): มี animation 36/36 · ค้างจาง 0 · reduced motion มี animation 0/36
* แถวรูปตอนเข้าจอ 30%: opacity 0.30, `translate` ≈ 67px (เลื่อนเข้าจากขวา) · reduced motion: `1 / none`
* `scrollWidth − innerWidth` = 0 ทุกตำแหน่ง
* Screenshot 1440: แกลเลอรีกำลังเข้าจอ, รีวิวกำลังเข้าจอ

### Result / ผลการทดสอบ

* Passed

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* Safari/Firefox ที่ยังไม่รองรับ `animation-timeline` จะเห็นหน้าปกติไม่ขยับ (fallback ตั้งใจ) ยังไม่ได้ทดสอบบนเครื่องจริง
* บล็อกที่คร่อมขอบล่างของจอตอนโหลดหน้าจะจางอยู่จนผู้ใช้เริ่มเลื่อน (ลักษณะของ range `entry`)

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** รอบแรกคำสั่งตรวจสอบผ่านทุกคำสั่ง และ acceptance criteria ทั้ง 4 ข้อผ่านจากการวัดในเบราว์เซอร์
* **Human intervention / การแทรกแซงของ Developer:** none

## Debug / Continue

1. บล็อกจางค้าง: บล็อกสูงกว่าจอ → เอา `motion-rise` ออก แล้วใส่ที่ลูกที่เตี้ยกว่าแทน
2. animation เดิมของ element หาย: มี `motion-*` สองตัวบน element เดียว → ห่อด้วย div

## Evidence / หลักฐาน

```yaml
evidence:
  task:
    id: "2026-09-16-scroll-reveal"
    type: "feature"
    risk: "low"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 1
    duration_minutes: 25  # estimated
  verification:
    typecheck: "pass"
    lint: "pass"
    test: "none"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "attempt 1: all Verification Commands pass; 36 animated elements reach opacity 1 when centred, none animate with reduced motion, no horizontal overflow"
  failure:
    occurred: false
    category: "none"
    reason: "none"
  human:
    intervention: false
    type: "none"
    reason: "none"
  files_changed: 5
```
