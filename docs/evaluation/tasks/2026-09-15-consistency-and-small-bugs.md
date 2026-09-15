# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

fix: แก้จุดขัดกันและบั๊กเล็กที่ไม่ต้องรอข้อมูลจากเจ้าของ (จาก critique หน้าหลักและ handoff งาน P1)

Risk / ความเสี่ยง: low (หน้าตาและข้อความ ไม่แตะ data flow หรือ API) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer เลือก "ชุด 1: แก้จุดขัดกัน + บั๊กเล็ก" พร้อมตัดสินใจ 2 ข้อ: ปุ่มขอราคาในหน้าบริการเป็นสีเขียวตามกฎ 0006 และเปลี่ยน "12 พื้นที่ให้บริการ" เป็น "2 จังหวัด"

Acceptance criteria (เขียนก่อนลงมือ):

1. ลิงก์ไป `/quote` ที่เป็นสีแดงทั้งเว็บ = 0
2. footer ไม่มี placeholder แผนที่
3. จำนวนพื้นที่ไม่ขัดกันระหว่างแถบตัวเลข รายการพื้นที่ และ FAQ
4. เส้น progress ไม่ทับ header, "24 ชม." ไม่ทับปุ่ม, ไม่มี letter-spacing กว้างบนอักษรไทย
5. ไม่มี horizontal scroll ที่ 390 และ 1440 ทั้งธีมสว่างและมืด

## What Changed / สิ่งที่เปลี่ยนแปลง

* หน้าบริการ: ปุ่ม "ขอใบเสนอราคา" ในการ์ด sidebar จาก `variant: "call"` เป็นปุ่มหลักสีเขียว + `shadow-cta` (ปุ่มโทรข้างล่างคง `soft`)
* footer: ลบกล่อง `ImagePlaceholder` "ภาพ Google Map ที่ตั้ง"
* แถบตัวเลข: `12 / พื้นที่ให้บริการ` → `2 จังหวัด / ภูเก็ต · พังงา`
* `Eyebrow`: `tracking-[0.1em]` → `tracking-[0.04em]` (ค่าต่ำสุดใน design handoff)
* แถบ CTA: `BigWord` "24 ชม." ย้ายไปมุมขวาบน (`top-[-0.4em]`, `clamp(120px,11vw,170px)`) และแสดงเฉพาะ `lg` ขึ้นไป เหมือน "20,000" ในบทขั้นตอน
* ปุ่ม size `nav` เปลี่ยนจาก `py-[11px]` (สูง 45.75px) เป็น `h-11` (44px เท่าโลโก้) → header สูง 69px คงที่ที่ ≥640px ตรงกับเส้น progress
* **บั๊กที่พบเพิ่มระหว่างงาน:** ที่ 900–914px (มี scrollbar) เมนูตกบรรทัด header สูง 108.5px เพราะขาดที่ 14px → gap ของแถว header เป็น `gap-3 lg:gap-6` (เดิม `gap-3 sm:gap-6`)

## Why / เหตุผล

* "2 จังหวัด" เป็นข้อมูลที่ยืนยันแล้วใน design handoff ไม่ขัดกับ "ทุกอำเภอ" และไม่ต้องคิดตัวเลขเอง
* ใช้ `lg:gap-6` แทน `min-[900px]:max-lg:gap-3`: ลองแบบหลังแล้วไม่มีผล เพราะ Tailwind v4 วาง rule arbitrary breakpoint ไว้ก่อน `sm:gap-6` ใน CSS (`sm:gap-6` ชนะ) · ที่ 640–899px gap ไม่มีผลที่มองเห็นเพราะ nav ซ่อนและกลุ่มขวาใช้ `ml-auto`
* ปรับความสูงปุ่มแทนการเปลี่ยน `top` ของเส้น progress เป็นค่าทศนิยม เพื่อให้ header สูงเท่ากันทุกหน้าจอ

## Files Changed / ไฟล์ที่แก้ไข

* `apps/web/features/services/components/service-detail.tsx`
* `apps/web/features/site/components/site-footer.tsx`
* `apps/web/features/site/components/site-header.tsx`
* `apps/web/features/home/components/sections.tsx`
* `packages/shared/src/home.ts`
* `packages/ui/src/components/button.tsx`
* `docs/decisions/0001-website-phase-1.md`, `docs/decisions/0006-cta-colour-and-mobile-first-viewport.md` (บันทึกการตัดสินใจ)

## Architecture / Data Impact

### Architecture Impact / ผลกระทบต่อ Architecture

None

### API Impact / ผลกระทบต่อ API

None

### Database / Data Impact / ผลกระทบต่อ Database / Data

`home.stats[2]` เปลี่ยนค่า (schema เดิม)

## Verification / การตรวจสอบ

### Verification Commands / คำสั่งตรวจสอบ

Attempts / จำนวนรอบ: 2

1. typecheck / lint / build pass → ตรวจ acceptance criteria แล้วไม่ผ่านข้อ 4: header ที่ 900–914px ยังสูง 108.5px (class `min-[900px]:max-lg:gap-3` แพ้ลำดับ CSS) และ "24 ชม." ห่างปุ่มแค่ 1px ที่ 1920px
2. เปลี่ยนเป็น `gap-3 lg:gap-6` และ `top-[-0.4em]` → typecheck / lint / build pass และ acceptance criteria ผ่านทุกข้อ

| Command / คำสั่ง | Result / ผล |
| --- | --- |
| pnpm typecheck | pass |
| pnpm lint | pass |
| none (test) | none |
| pnpm build | pass |

Baseline: None

### Tests / การทดสอบ

Production build + Chrome headless (CDP):

* 6 หน้า (`/`, `/services/hotel-water`, `/areas/phuket`, `/blog`, `/blog/phuket-dry-season`, `/quote`) × 390/1440 × สว่าง/มืด = 24 รอบ: ลิงก์ `/quote` ที่มี `bg-call` = 0 ทุกรอบ (ลิงก์ `/quote` ทั้งหมด 11–39 ต่อหน้า), ไม่มี horizontal scroll ทุกรอบ
* footer ไม่มีข้อความ "Google Map" ทุกหน้า
* header สูงเท่า `top` ของเส้น progress ที่ 390 (65), 640, 800, 899, 900, 905, 914, 950, 1023, 1024, 1280, 1440 (69)
* "24 ชม.": ซ่อนที่ 390 และ 1023 · ที่ 1024 / 1280 / 1440 / 1920 อยู่เหนือแถวปุ่ม 16 / 34 / 22 / 10 px
* Eyebrow `letter-spacing` 0.54px (0.04em ของ 13.5px)
* Screenshot: แถบ CTA 1440 และ 1024, header 905, แถบตัวเลข 390 ธีมมืด, sidebar และ footer หน้าบริการ 1440

### Result / ผลการทดสอบ

* Passed

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* ความกว้างเมนูวัดจากฟอนต์บน Chrome Windows ระยะเผื่อที่ 900px ≈10px ถ้า macOS render ตัวอักษรกว้างกว่านี้อาจตกบรรทัดอีก (ยังไม่ได้ทดสอบ Safari/Firefox)

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** รอบที่ 2 คำสั่งตรวจสอบผ่านทุกคำสั่ง และ acceptance criteria ทั้ง 5 ข้อผ่านจากการวัดในเบราว์เซอร์
* **Human intervention / การแทรกแซงของ Developer:** expected-review — Developer เลือกงาน สีปุ่ม และข้อความจำนวนพื้นที่ก่อนลงมือ

## Known Issues / ปัญหาที่ทราบ

* หน้า `/areas/phuket` ยังมีช่องแผนที่ placeholder ในเนื้อหา (ต้องมีที่อยู่จริงเพื่อฝัง Google Maps)
* P2 ที่เหลือ: หน้าหลักยาว, ขนาดรถซ้ำ 4 ที่, บทขั้นตอนยาว, รีวิวไม่มีที่มา

## Important Decisions / Decision สำคัญ

* **Decision:** กฎสีแดง = `tel:` เท่านั้น ใช้ทั้งเว็บ รวมหน้าบริการ
  * **Reason:** Developer เลือก (บันทึกใน 0006 ข้อ 1)
* **Decision:** แถบตัวเลขใช้ "2 จังหวัด" แทน "12 พื้นที่"
  * **Reason:** ข้อมูลที่ยืนยันแล้ว ไม่ขัดกับส่วนอื่น (บันทึกใน 0001)

## Debug / Continue

### วิธี Debug / ตรวจสอบปัญหา

1. เส้น progress ทับหรือลอยจาก header: วัด `header` height เทียบ `.reading-progress` top (`scroll-spy.tsx`) · อะไรก็ตามใน header ที่สูงเกิน 44px จะทำให้ไม่ตรง
2. เมนูตกบรรทัดใกล้ 900px: ความกว้างที่ต้องใช้ = โลโก้ 210 + เมนู 494 + ปุ่ม 107 + gap 2×12 ต้องไม่เกินความกว้างหน้าจอ − scrollbar − 40
3. Tailwind variant ไม่มีผล: ดูลำดับ rule ใน CSS ที่ build (`.next/static/chunks/*.css`) arbitrary breakpoint อาจอยู่ก่อน `sm:`/`lg:`

### Next Steps / งานที่ต้องทำต่อ

1. P2 ย่อหน้าหลัก (`/impeccable distill`) แล้วรัน `/impeccable critique` เทียบคะแนน (ครั้งแรก 25/36)
2. เมื่อได้ที่อยู่จริง: Google Maps ในหน้าพื้นที่ (และ footer ถ้าต้องการ)

## Developer Understanding

## สิ่งที่ Developer ต้องเข้าใจ

The Developer should be able to explain:

Developer ต้องสามารถอธิบายได้ว่า:

* **What changed / เปลี่ยนอะไร**
* **Why it changed / ทำไมเปลี่ยน**
* **How it works / ทำงานอย่างไร**
* **How to test it / ทดสอบอย่างไร**
* **How to debug it / Debug อย่างไร**
* **What risks or limitations exist / มีความเสี่ยงหรือข้อจำกัดอะไร**
* **What should happen next / งานต่อไปคืออะไร**

## Handoff Status / สถานะการส่งต่องาน

* [x] Implementation completed / Implementation เสร็จแล้ว
* [x] Tests run and results recorded / รัน Test และบันทึกผลแล้ว
* [x] Verification completed / ตรวจสอบแล้ว
* [x] Known issues documented / ระบุปัญหาที่ทราบแล้ว
* [x] Important decisions documented / บันทึก Decision สำคัญแล้ว
* [x] Next steps documented / ระบุงานต่อแล้ว
* [x] Verification Commands run / รันคำสั่งตรวจสอบแล้ว
* [x] Evidence block filled / กรอก Evidence block แล้ว
* [x] Developer can continue independently / Developer สามารถทำงานต่อได้

## Evidence / หลักฐาน

```yaml
evidence:
  task:
    id: "2026-09-15-consistency-and-small-bugs"
    type: "fix"
    risk: "low"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 2
    duration_minutes: 50  # estimated
  verification:
    typecheck: "pass"
    lint: "pass"
    test: "none"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "attempt 2: all Verification Commands pass; all five acceptance criteria measured in headless Chrome"
  failure:
    occurred: true
    category: "implementation"
    reason: "attempt 1: arbitrary-breakpoint gap class lost to sm:gap-6 in CSS order, so the nav still wrapped at 900-914px"
  human:
    intervention: true
    type: "expected-review"
    reason: "Developer chose the task, the quote button colour and the area-count wording before implementation"
  files_changed: 8
```
