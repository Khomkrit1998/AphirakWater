# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

feat: Smooth scrolling และระบบระยะใต้ sticky header ที่ใช้ร่วมกันทั้งเว็บ

Risk / ความเสี่ยง: medium (แตะ layout ของทุกหน้า และ offset ของ sticky หลายจุด) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer: "ปรับ Smooth Scrolling และ ทำให้เข้ากับระบบด้วย"

Acceptance criteria:

1. ลิงก์ในหน้า (เมนู header, เมนูมือถือ, scroll-spy, การ์ดบริการ) เลื่อนนุ่ม; reduced motion กระโดด; เปลี่ยนหน้าไม่ไหลยาว
2. ทุก `#section` หยุดโดยหัวข้ออยู่ที่ระยะเดียวกันใต้ header ทั้ง desktop และมือถือ
3. ระยะใต้ header และ sticky ทุกตัวอิงค่ากลางเดียว
4. ฉากตรึงและ scroll timeline เดิมยังทำงาน, ไม่มี console error

## Baseline (ก่อนแก้) / สภาพเดิม

วัดด้วย Chrome headless 1440×900:

* กดเมนู `#services` / `#areas` = กระโดด (scrollY เปลี่ยน 1 ครั้ง)
* หัวข้อหยุดที่ 177–200px (header สูง 69px) → ว่างเกินราว 110–130px เพราะ `scroll-mt-20` ไม่นับ padding บนของ section · `#why-us` ใช้ `scroll-mt-4` ขอบบนไปอยู่ใต้ header
* ค่า header ถูกเขียนซ้ำ: `top-[65px] sm:top-[69px]` (3 ที่), `top-[92px]` (2), `scroll-mt-24` (3), `lg:top-28` (3), และ JS 2 ที่เช็ก `prefers-reduced-motion` เอง

## What Changed / สิ่งที่เปลี่ยนแปลง

* `apps/web/app/layout.tsx`: `<html data-scroll-behavior="smooth">` + `[--header-h:65px] sm:[--header-h:69px] [--sticky-top:calc(var(--header-h)+1.5rem)] scroll-pt-(--sticky-top) motion-safe:scroll-smooth`
* `sections.tsx`: `gapTop` = padding + scroll margin ติดลบเท่ากัน, `bandScroll` สำหรับแถบ (พื้นที่, ราคา, CTA), `#why-us` หยุดที่ขอบ header, ลบ `scroll-mt-20` ทั้งหมด, sticky ใช้ `top-(--header-h)` / `top-(--sticky-top)`, ฉากตรึงใช้ `h-[calc(100svh-var(--header-h))]`
* `scroll-spy.tsx`: เส้น progress `top-(--header-h)`, `scrollIntoView({ block: "start" })` ไม่เช็ก reduced motion เอง
* `service-explorer.tsx`: ลบ `scroll-mt-24` และการเช็ก reduced motion, panel sticky `top-(--sticky-top)`
* `article-view.tsx`, `service-detail.tsx`: ลบ `scroll-mt-24`, aside sticky `top-(--sticky-top)`
* `docs/decisions/0010-scrolling-system.md`

## Why / เหตุผล

* Native CSS แทน library แรงเฉื่อย เพื่อไม่ขัด 0005 (motion เป็น CSS, ไม่มี scroll library) และไม่แย่งการเลื่อนของผู้ใช้/ระบบช่วยการเข้าถึง
* `scroll-padding` บนหน้าครอบคลุมทุกการเลื่อนอัตโนมัติ (hash, `scrollIntoView`, focus ช่องฟอร์มที่ผิด) โดยไม่ต้องใส่ทีละ element
* ค่าใน `<html>` ของ web ไม่ใช่ใน `globals.css` เพราะ admin ใช้ไฟล์ CSS เดียวกันแต่ header คนละแบบ

## Files Changed / ไฟล์ที่แก้ไข

* `apps/web/app/layout.tsx`
* `apps/web/features/home/components/sections.tsx`
* `apps/web/features/home/components/scroll-spy.tsx`
* `apps/web/features/services/components/service-explorer.tsx`
* `apps/web/features/services/components/service-detail.tsx`
* `apps/web/features/blog/components/article-view.tsx`
* `docs/decisions/0010-scrolling-system.md`

## Architecture / Data Impact

None (convention ของ CSS บันทึกใน 0010)

## Verification / การตรวจสอบ

### Verification Commands / คำสั่งตรวจสอบ

Attempts / จำนวนรอบ: 2

1. typecheck / lint / build pass → วัดแล้วหัวข้อ FAQ และบทขั้นตอนหยุดต่ำกว่าส่วนอื่น (sticky `lg:top-28` = 112px) ไม่ผ่านข้อ 2–3
2. เพิ่ม `--sticky-top` ให้ scroll-padding และ sticky ใช้ค่าเดียว → typecheck / lint / build pass และ acceptance criteria ผ่าน

| Command / คำสั่ง | Result / ผล |
| --- | --- |
| pnpm typecheck | pass |
| pnpm lint | pass |
| none (test) | none |
| pnpm build | pass |

Baseline: None

### Tests / การทดสอบ

Production build + Chrome headless (DevTools protocol), รอให้หยุดเลื่อนก่อนวัด:

| กรณี | ก่อน | หลัง |
| --- | --- | --- |
| เมนู header `#services` / `#areas` (1440) | กระโดด, หัวข้อ 200 / 177px | เลื่อน 34 / 76 เฟรม, หัวข้อ 24 / 25px ใต้ header |
| เมนูมือถือ `#services` / `#areas` (390) | กระโดด | เลื่อน 33 / 75 เฟรม, 24 / 25px, เมนูปิด |
| ทุก `#section` (1440 และ 390) | 108–131px (why-us −53px) | 24–25px; why-us ชั้นตรึง 0px ใต้ header; contact บน 1440 = 116px (ท้ายหน้า) |
| `/quote` → `/#areas` | — | 25px |
| `/` (scrollY 8896) → `/blog` | — | กระโดดไป scrollY 0 (2 ค่า ไม่ไหล) |
| reduced motion เมนู `#areas` | — | กระโดด (2 ค่า), 25px |

* aside ในบทความ `position: sticky; top: 93px`
* ฟอร์มขอราคา 390 กดส่งว่าง: focus ช่อง `name` อยู่ที่ 388px (ไม่อยู่ใต้ header)
* ฉากตรึงหลังเปลี่ยนเป็นตัวแปร: ชั้นรูป top 69px (1440) / 65px (390) ตลอดช่วงตรึง, ซูม/มืด/แถบ/การ์ดทำงาน, reduced motion ยังตรึง
* CSS ที่ build มี `scroll-padding-top:var(--sticky-top)`-แบบ, `scroll-margin-top:calc(-1*clamp(...))`, `top:var(--header-h)`
* console error / warning = 0

### Result / ผลการทดสอบ

* Passed

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* ยังไม่ได้ทดสอบ Safari/Firefox จริง (`scroll-behavior`, `scroll-padding` รองรับแล้วทั้งคู่)
* หน้าหลักยาว การกดเมนูไป section ไกลๆ ใช้เวลาเลื่อน ~1 วินาที (ความเร็วของเบราว์เซอร์ ปรับไม่ได้ด้วย CSS)

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** รอบที่ 2 คำสั่งตรวจสอบผ่านทุกคำสั่ง และ acceptance criteria ทั้ง 4 ข้อผ่านจากการวัดก่อน/หลังในเบราว์เซอร์
* **Human intervention / การแทรกแซงของ Developer:** none

## Debug / Continue

1. หัวข้อไปหลบใต้ header หลังเปลี่ยนความสูง header: แก้ `--header-h` ใน `app/layout.tsx` ที่เดียว
2. section ใหม่หยุดต่ำเกิน: section นั้นมี padding บนแต่ไม่มี scroll margin คู่กัน → ใช้ `gapTop` / `bandScroll` หรือเพิ่มคู่แบบเดียวกัน
3. อยากได้การเลื่อนแบบมีแรงเฉื่อย: ต้องเพิ่ม library และแก้ 0005 ข้อ 2 (ให้ Developer ตัดสิน)

## Evidence / หลักฐาน

```yaml
evidence:
  task:
    id: "2026-09-16-smooth-scrolling-system"
    type: "feature"
    risk: "medium"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 2
    duration_minutes: 55  # estimated
  verification:
    typecheck: "pass"
    lint: "pass"
    test: "none"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "attempt 2: all Verification Commands pass; before/after CDP measurements show smooth in-page scrolling, headings 24px under the header on every section, instant route changes and reduced-motion jumps"
  failure:
    occurred: true
    category: "implementation"
    reason: "attempt 1: sticky intros kept lg:top-28, so FAQ and process headings stopped 19px lower than the new scroll-padding"
  human:
    intervention: false
    type: "none"
    reason: "none"
  files_changed: 8
```
