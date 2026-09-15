# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

feat: Hero ธีมกลางคืน (รูปจริงสลับกัน) และแกลเลอรีแบบแถบรูปเลื่อน 2 แถว

Risk / ความเสี่ยง: low–medium (หน้าตาหน้าหลัก, LCP ของ hero เปลี่ยนรูป, ไม่แตะ data flow หรือ API) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer อยากให้เว็บน่าสนใจแบบ leonardo.ai ชอบภาพเคลื่อนไหว และให้ใช้รูปใน `C:\Users\kchua\Desktop\งานพ่อ\images` จากข้อเสนอ 4 ข้อ เลือก "ลงมือทำข้อ 1 และ 2"

Acceptance criteria (เขียนก่อนลงมือ):

1. Hero พื้นมืด รูปรถกลางคืนจริงเต็มพื้นที่ สลับรูปแบบ fade และขยับช้าๆ ข้อความอ่านได้
2. แกลเลอรีเป็นรูปจริง 2 แถว เลื่อนสวนทางไม่มีรอยต่อ หยุดได้ด้วย hover และปุ่มหยุด
3. ลดภาพเคลื่อนไหว (reduced motion) → ไม่มีอะไรขยับเอง เนื้อหาครบ
4. ไม่มีรูปที่เห็นหน้าคนชัด หรือเห็นชื่อ/โลโก้ลูกค้า
5. ไม่มี horizontal scroll ที่ 375 / 390 / 768 / 1024 / 1440

## What Changed / สิ่งที่เปลี่ยนแปลง

* `hero.tsx`: เปลี่ยนจากรูป cut-out บนพื้นสว่างเป็น hero พื้น `bg-night` มีรูปกลางคืน 2 รูป (`hero-slide` + `hero-drift`), gradient อ่านง่าย, แสงเรือง `live`, ปุ่ม "ขอราคาน้ำ" + ปุ่มโทรสีแดง (ซ่อน < 900px ตาม 0006) ต่ำกว่า `lg` รูปเป็นแถบบนที่จางลงไปหาข้อความ
* `sections.tsx` `WorkGallery`: เปลี่ยนจาก mosaic 5 รูปมี caption เป็นแถบเลื่อน 2 แถว 16 รูป เต็มความกว้าง ขอบซ้ายขวาจาง, `PhotoRow` render รูป 2 ชุด (ชุดซ้ำ `aria-hidden`, alt ว่าง), checkbox "หยุดภาพเลื่อน"
* `globals.css`: token `--night` (สว่าง/มืด), keyframes + utility `hero-slide`, `hero-drift`, `marquee-track` · ลบ `motion-drive` / `story-drive`
* `home.ts`: `hero.imageAlt` → `hero.slides` (2 รูป), `gallery.items` 16 รูป ไม่มี `caption`
* รูป: เพิ่ม 13 ไฟล์, rename `work-night.jpg` → `hero-night.jpg`, ลบ `hero-truck.png`
* บันทึกการตัดสินใจ: `docs/decisions/0009-night-hero-and-gallery-marquee.md`

## Why / เหตุผล

* ใช้รูปกลางคืนของร้านเองแทนสีม่วงของ leonardo.ai: ได้บรรยากาศมืดมีแสงเรืองโดยยังเป็นสีแบรนด์ และเป็นรูปจริงแทนรูปแต่งด้วย AI
* CSS ล้วน ไม่เพิ่ม library ไม่มี JS เพิ่ม ตามกฎ 0005 (รายละเอียดใน 0009)
* ปุ่มหยุดเป็น checkbox + `group-has-checked` แทน client component
* Hero มือถือรอบแรกวางข้อความทับรูปทั้งจอ ภาพ screenshot แทบไม่เห็นรถ จึงเปลี่ยนเป็นแถบรูปด้านบน

## Files Changed / ไฟล์ที่แก้ไข

* `apps/web/features/home/components/hero.tsx`
* `apps/web/features/home/components/sections.tsx`
* `apps/web/features/home/assets/*` (เพิ่ม 13, rename 1, ลบ 1)
* `packages/shared/src/home.ts`
* `packages/ui/src/styles/globals.css`
* `docs/decisions/0009-night-hero-and-gallery-marquee.md`

## Architecture / Data Impact

### Architecture Impact / ผลกระทบต่อ Architecture

None

### API Impact / ผลกระทบต่อ API

None

### Database / Data Impact / ผลกระทบต่อ Database / Data

schema `home`: `hero.imageAlt` ถูกแทนด้วย `hero.slides`, `gallery.items[].caption` ถูกลบ และ enum `gallery.items[].image` เปลี่ยน (ไม่มีที่อื่นใช้ field เหล่านี้ ตรวจด้วย grep ทั้ง apps และ packages แล้ว)

## Verification / การตรวจสอบ

### Verification Commands / คำสั่งตรวจสอบ

Attempts / จำนวนรอบ: 2

1. typecheck / lint / build pass → ตรวจ acceptance criteria ด้วย screenshot ไม่ผ่านข้อ 1 บนมือถือ (รูปมืดจนไม่เห็นรถ) และพบว่าใส่รูปรถกระบะถังแดงซึ่ง 0004 ห้ามไว้
2. เปลี่ยน hero มือถือเป็นแถบรูปด้านบน, ลบรูปรถกระบะ 2 รูป → typecheck / lint / build pass และ acceptance criteria ผ่านทุกข้อ

| Command / คำสั่ง | Result / ผล |
| --- | --- |
| pnpm typecheck | pass |
| pnpm lint | pass |
| none (test) | none |
| pnpm build | pass |

Baseline: None

### Tests / การทดสอบ

Production build + Chrome headless ผ่าน DevTools protocol:

* Hero: screenshot 390 / 375 / 768 / 1024 / 1440 และรูปที่สองหลังรอ 8 วินาทีที่ 390 และ 1440 · สูง 790px ที่ 1440×900
* แกลเลอรี: `animation-name` = `marquee` ปกติ, `none` เมื่อ reduced motion · กด checkbox แล้วทั้งสองแถวเปลี่ยนจาก `running` เป็น `paused` (แถวล่าง `reverse`) · รูป 32 ใบ alt ว่าง 16 (ชุดซ้ำ) · hero alt ครบ 2
* `scrollWidth - innerWidth` = 0 ที่ทุกความกว้างที่ทดสอบ
* Screenshot reduced motion 390: แถวเดียวเลื่อนด้วยมือ ไม่มีปุ่มหยุด

### Result / ผลการทดสอบ

* Passed

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* ยังไม่ได้วัด LCP / Lighthouse ใหม่ (0005 วัดไว้ 1.28s กับรูป cut-out ~91KB รูป hero ใหม่เป็นภาพถ่าย 1477px อาจหนักกว่า)
* ยังไม่ได้ทดสอบ Safari/Firefox จริง และธีมมืด (hero ใช้ token `night` ทั้งสองธีม ส่วนแกลเลอรีใช้ token เดิม)

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** รอบที่ 2 คำสั่งตรวจสอบผ่านทุกคำสั่ง และ acceptance criteria ทั้ง 5 ข้อผ่านจาก screenshot และการวัดในเบราว์เซอร์
* **Human intervention / การแทรกแซงของ Developer:** expected-review — Developer เลือกข้อ 1 และ 2 ก่อนลงมือ

## Known Issues / ปัญหาที่ทราบ

* Developer ยังไม่ได้ตอบเรื่องรูปที่เห็นหน้าคนและรูปป้าย Wyndham Grand จึงใช้ค่าปลอดภัย (ไม่ใช้/ครอปออก) ตาม 0009 ข้อ 6–7
* `hero-night-side.jpg` ถูกครอปจาก 1477×1108 เหลือ 1477×793 บนจอกว้างมากจะถูกขยายเล็กน้อย
* จอกว้างกว่า ~2,400px แถบรูปอาจเห็นช่องว่างก่อนวนรอบ (เพิ่มรูปถ้าต้องรองรับ)

## Important Decisions / Decision สำคัญ

* **Decision:** motion ที่เล่นเองตามเวลาได้เฉพาะ hero และแกลเลอรี ต้องหยุดได้และเคารพ reduced motion
  * **Reason:** Developer ขอภาพเคลื่อนไหว แต่ 0005 กำหนดให้ motion เบาและไม่กระทบ performance/a11y (บันทึกใน 0009)
* **Decision:** ไม่ใช้รูปที่เห็นหน้าคน รูปรถกระบะ และรูปที่ป้ายลูกค้าตัดออกไม่ได้
  * **Reason:** ความเป็นส่วนตัว, ข้อขัดแย้งกับ FAQ (0004), design handoff กำหนดให้ขออนุญาตใช้ชื่อ/โลโก้ลูกค้า

## Debug / Continue

### วิธี Debug / ตรวจสอบปัญหา

1. รูป hero ไม่สลับ: ดู `animation-name` ของ div ที่มี class `hero-slide` ต้องเป็น `hero-show` (ถ้า `none` แปลว่าเครื่องตั้ง reduced motion)
2. แถบรูปกระตุกตอนวนรอบ: track ต้องมี `pr-*` เท่ากับ `gap-*` และต้องมีรูป 2 ชุดเท่ากัน
3. ปุ่มหยุดไม่ทำงาน: checkbox ต้องอยู่ใน element ที่มี `group/gallery`

### Next Steps / งานต่อไป

1. วัด LCP บนมือถือ (Slow 4G) เทียบกับ 0005
2. ถามเจ้าของเรื่องรูปที่เห็นหน้าคน, รูป Wyndham Grand และบริการรถกระบะ แล้วเพิ่มรูปในแถบถ้าได้รับอนุญาต
3. ข้อ 3–4 ของข้อเสนอที่ยังไม่ทำ: ส่วนกองรถโทนมืด, ภาพเคลื่อนไหวตอน scroll ทั้งหน้า

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
    id: "2026-09-16-night-hero-and-gallery-marquee"
    type: "feature"
    risk: "medium"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 2
    duration_minutes: 90  # estimated
  verification:
    typecheck: "pass"
    lint: "pass"
    test: "none"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "attempt 2: all Verification Commands pass; five acceptance criteria checked with CDP screenshots and computed styles"
  failure:
    occurred: true
    category: "implementation"
    reason: "attempt 1: mobile hero buried the photo under the copy, and two pickup photos excluded by decision 0004 were used"
  human:
    intervention: true
    type: "expected-review"
    reason: "Developer chose proposals 1 and 2 before implementation"
  files_changed: 20
```
