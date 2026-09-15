# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

feat: Parallax scroll animation หน้าหลัก

Risk / ความเสี่ยง: low (CSS ล้วน ไม่แตะเนื้อหา data หรือ API) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer: "เพิ่ม Parallax Scroll Animation ให้หน่อย"

Acceptance criteria (เขียนก่อนลงมือ):

1. เลื่อนหน้าแล้วชั้นภาพ/ข้อความ/decor ขยับคนละความเร็ว เห็นความลึก
2. รูปในกรอบไม่เผยขอบระหว่างเลื่อน
3. Reduced motion และเบราว์เซอร์ที่ไม่รองรับ `animation-timeline` → ไม่ขยับ เนื้อหาครบ
4. ไม่มี horizontal scroll ที่ 390 และ 1440

## What Changed / สิ่งที่เปลี่ยนแปลง

* `globals.css`: keyframes `parallax` / `parallax-exit` และ utility `motion-parallax` (range `cover`) / `motion-parallax-exit` (range `exit`) ระยะตั้งด้วย `--parallax`
* `hero.tsx`: ห่อรูป 2 รูป + gradient ไว้ใน band เดียวที่ขยับ 30% (gradient ขยับด้วย เพื่อให้ขอบจางของ band บนมือถือไม่แยกจากรูป), แสงเรือง 15%, ข้อความ −12%
* `sections.tsx`: รูปรถ "ทำไมต้องเลือกเรา" อยู่ในชั้น `-inset-y-[12%]` ขยับ 8%, การ์ดราคา `lg:motion-parallax` −6%
* `decor.tsx`: `WaveField` 12%, `WaterGlow` 20% (มีผลทุกที่ที่ใช้ในหน้าหลัก)
* `docs/decisions/0009-night-hero-and-gallery-marquee.md` ข้อ 8: กฎการใช้ parallax

## Why / เหตุผล

* ใช้ scroll-driven animation (CSS) ตามกฎ 0005 ไม่เพิ่ม JS หรือ library, animate เฉพาะ `translate`
* hero ใช้ range `exit` เพราะเริ่มอยู่บนจอ ถ้าใช้ `cover` ตอนโหลดหน้าจะขยับไปแล้วครึ่งทาง
* animation ใหม่ใส่บน div ห่อ ไม่ใส่บน element ที่มี `hero-slide` / `hero-drift` / `motion-zoom-out` อยู่แล้ว เพราะ `animation` shorthand จะทับกัน

## Files Changed / ไฟล์ที่แก้ไข

* `packages/ui/src/styles/globals.css`
* `apps/web/features/home/components/hero.tsx`
* `apps/web/features/home/components/sections.tsx`
* `apps/web/features/home/components/decor.tsx`
* `docs/decisions/0009-night-hero-and-gallery-marquee.md`

## Architecture / Data Impact

### Architecture Impact / ผลกระทบต่อ Architecture

None

### API Impact / ผลกระทบต่อ API

None

### Database / Data Impact / ผลกระทบต่อ Database / Data

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

Production build + Chrome headless (DevTools protocol) เลื่อนไป 10 ตำแหน่งแล้วอ่าน `translate` ที่คำนวณได้:

* 1440: รูป hero 0% → 7.3% → 18.6% → 30%, ข้อความ 0% → −12%, รูปรถ −8% → +8%, การ์ดราคา 6% → −2.9%
* 390: รูป hero ถึง 30% ที่ scroll 600, การ์ดราคา `none` (เฉพาะ lg)
* reduced motion: ทุกชั้น `none`
* ขอบรูปรถเทียบกรอบทุกตำแหน่ง: gap 0px · `scrollWidth − innerWidth` = 0 ทุกกรณี
* CSS ที่ build มี `.motion-parallax`, `.motion-parallax-exit`, `.lg\:motion-parallax`
* Screenshot: hero ตอนเลื่อน 420px (1440, 390), แถบรูปรถ 1440

### Result / ผลการทดสอบ

* Passed

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* Safari/Firefox ยังไม่รองรับ `animation-timeline` เต็มที่ จะเห็นหน้านิ่ง (fallback ตั้งใจ) ยังไม่ได้ทดสอบบนเครื่องจริง
* ยังไม่ได้วัด frame rate บนมือถือจริง (animation เป็น `translate` บน compositor)

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** รอบแรกคำสั่งตรวจสอบผ่านทุกคำสั่ง และ acceptance criteria ทั้ง 4 ข้อผ่านจากการวัดในเบราว์เซอร์
* **Human intervention / การแทรกแซงของ Developer:** none

## Known Issues / ปัญหาที่ทราบ

* None

## Important Decisions / Decision สำคัญ

* **Decision:** ระยะ parallax ต่อชั้นและกฎ "รูปใน clip ต้องสูงเกินกรอบ ≥ ระยะที่ขยับ"
  * **Reason:** ให้ดูมีความลึกโดยไม่เผยขอบ (บันทึกใน 0009 ข้อ 8)

## Debug / Continue

### วิธี Debug / ตรวจสอบปัญหา

1. ชั้นไม่ขยับ: `getComputedStyle(el).animationName` ต้องเป็น `parallax` หรือ `parallax-exit` (ถ้า `none` = reduced motion หรือเบราว์เซอร์ไม่รองรับ)
2. เห็นขอบรูปตอนเลื่อน: เพิ่ม `-inset-y-*` ของชั้นรูป หรือลด `--parallax`
3. animation เดิมหาย (เช่นรูปไม่ซูม): มีการใส่ `motion-parallax` บน element เดียวกับ animation อื่น → ย้ายไปใส่ div ห่อ

### Next Steps / งานต่อไป

1. ปรับค่า `--parallax` ตามความชอบของ Developer หลังดูบนเครื่องจริง

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
    id: "2026-09-16-parallax-scroll"
    type: "feature"
    risk: "low"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 1
    duration_minutes: 30  # estimated
  verification:
    typecheck: "pass"
    lint: "pass"
    test: "none"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "attempt 1: all Verification Commands pass; computed translate measured at 10 scroll positions, no edge gap, none with reduced motion"
  failure:
    occurred: false
    category: "none"
    reason: "none"
  human:
    intervention: false
    type: "none"
    reason: "none"
  files_changed: 6
```
