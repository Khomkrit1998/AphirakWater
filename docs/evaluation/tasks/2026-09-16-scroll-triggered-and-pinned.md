# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

feat: Scroll-triggered animation (ตัวเลขนับขึ้น, การ์ดเข้าจอ) และฉากตรึง (sticky + scroll-based) "ทำไมต้องเลือกเรา"

Risk / ความเสี่ยง: medium (เพิ่ม client component 2 ตัว, เปลี่ยน layout ทั้ง section, ความยาวหน้าหลักเพิ่ม) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer: "เพิ่ม Scroll-triggered Animation และ Scroll-based / Sticky Animation" ระหว่างทำ Developer แจ้งว่า "ทำงานเป็นระบบ ตรงเวลาใน desktop ไม่ได้แสดงอะไร"

Acceptance criteria:

1. ตัวเลขใต้ hero นับขึ้นเมื่อเลื่อนมาถึง HTML จาก server เป็นตัวเลขจริง ตัวเลขที่อยู่บนจอแล้วตอนโหลดไม่รีเซ็ต
2. "ทำไมต้องเลือกเรา": รูปตรึงใต้ header ระหว่างที่การ์ดเหตุผลเลื่อนผ่าน รูปซูม/มืดลงและแถบความคืบหน้าเดินตามระยะเลื่อน
3. การ์ดแต่ละใบเล่น transition ครั้งเดียวเมื่อเข้าจอ และแสดงครบทั้ง desktop และมือถือ
4. Reduced motion: ไม่ขยับ ไม่ซ่อน เนื้อหาครบ (ยังตรึงได้)
5. ไม่มี console error / hydration warning, ไม่มี horizontal scroll

## What Changed / สิ่งที่เปลี่ยนแปลง

* ใหม่ `apps/web/features/home/components/count-up.tsx` (client): นับจาก 0 ถึงค่าจริง 1.4 วินาที ease-out เมื่อเข้าจอ
* ใหม่ `apps/web/features/home/components/in-view-item.tsx` (client): `<li>` ที่ตั้ง `data-inview` false → true
* `hero.tsx`: ตัวเลขใช้ `CountUp` + `tabular-nums`
* `sections.tsx` `WhyUs`: เปลี่ยนจากแถบรูป + แผงเขียวเข้ม เป็น wrapper `pin-track` → ชั้นรูป sticky (รูป `pin-zoom`, ชั้นมืด `pin-darken`, gradient, หัวข้อ, แถบ `pin-fill-x`) + รายการการ์ด `InViewItem` 4 ใบ (`-mt` เท่าชั้นรูป, `gap-y-[26svh]`) การ์ดเลื่อนขึ้น + จาง 700ms และเครื่องหมายถูก scale เด้งหลัง 200ms
* `globals.css`: `pin-track`, `pin-zoom`, `pin-darken`, `pin-fill-x`
* `docs/decisions/0009-night-hero-and-gallery-marquee.md` ข้อ 10 (และขีดฆ่ารายการใน ข้อ 8–9 ที่ถูกแทน)

## Why / เหตุผล

* Scroll-triggered ต้องการ "เล่นตามเวลาเมื่อถูก trigger" ซึ่ง CSS ยังทำไม่ได้ในเบราว์เซอร์ทั่วไป จึงใช้ IntersectionObserver ขนาดเล็ก ส่วน scroll-based ในฉากตรึงใช้ CSS scroll timeline แบบเดิม
* Server render สถานะสุดท้ายเพื่อ SEO และผู้ใช้ที่ไม่มี JS ตามกฎ 0005 ข้อ 1
* ใช้ `contain` range เพราะตรงกับช่วงที่ชั้นรูปถูกตรึงพอดี

## Bug found during the task / บั๊กที่พบระหว่างงาน

Desktop ไม่เห็นการ์ด (ตรงกับที่ Developer แจ้ง): `gap-[26svh]` บน grid 12 คอลัมน์ใส่ช่องว่างคอลัมน์ 11 × 234px เกินความกว้าง 1160px คอลัมน์ทั้งหมดเหลือ 0px การ์ดอยู่ที่ left 1778px (นอกจอ) และ IntersectionObserver ไม่เคย trigger มือถือไม่เจอเพราะมีคอลัมน์เดียว → เปลี่ยนเป็น `gap-y-[26svh]` หลังแก้การ์ดอยู่ที่ left 817px กว้าง 483px

## Files Changed / ไฟล์ที่แก้ไข

* `apps/web/features/home/components/count-up.tsx` (ใหม่)
* `apps/web/features/home/components/in-view-item.tsx` (ใหม่)
* `apps/web/features/home/components/hero.tsx`
* `apps/web/features/home/components/sections.tsx`
* `packages/ui/src/styles/globals.css`
* `docs/decisions/0009-night-hero-and-gallery-marquee.md`

## Architecture / Data Impact

### Architecture Impact / ผลกระทบต่อ Architecture

client component ในหน้าหลักเพิ่ม 2 ตัว (บันทึกใน 0009 ข้อ 10 ซึ่งขยาย 0005 ข้อ 5)

### API Impact / ผลกระทบต่อ API

None

### Database / Data Impact / ผลกระทบต่อ Database / Data

None

## Verification / การตรวจสอบ

### Verification Commands / คำสั่งตรวจสอบ

Attempts / จำนวนรอบ: 2

1. typecheck / lint / build pass → วัดในเบราว์เซอร์ไม่ผ่านข้อ 3 บน desktop (การ์ด `data-inview` ค้าง false, opacity 0) และ Developer แจ้งอาการเดียวกัน
2. เปลี่ยน `gap` → `gap-y`, ดันแถบความคืบหน้าบนมือถือพ้นแถบปุ่มล่าง (`pb-28` < 900px) → typecheck / lint / build pass และ acceptance criteria ผ่านทุกข้อ

| Command / คำสั่ง | Result / ผล |
| --- | --- |
| pnpm typecheck | pass |
| pnpm lint | pass |
| none (test) | none |
| pnpm build | pass |

Baseline: None

### Tests / การทดสอบ

Production build + Chrome headless (DevTools protocol):

* HTML จาก server: มี "1,000+" และข้อความการ์ดครบ, ไม่มี `data-inview`
* ตัวเลข 1440×900 และ 390×844: หลังโหลด `0+ | 0+ | 0 จังหวัด | 0 ชม.` → ระหว่างนับ `7+ | 685+ | 1 จังหวัด | 16 ชม.` → สุดท้าย `10+ | 1,000+ | 2 จังหวัด | 24 ชม.` · 1440×1400 (อยู่บนจอตั้งแต่โหลด) และ reduced motion: ค่าจริงตลอด
* ฉากตรึงที่ progress −0.3 → 1.15: ชั้นรูป top = 69px (มือถือ 65px) ตลอดช่วง 0–1, `scale` 1.12 → 1, ชั้นมืด 0.15 → 0.70, แถบ 0 → 1, การ์ด false → true ทีละใบ · reduced motion: ยังตรึง, scale/แถบ `none`, ชั้นมืด 0.50, การ์ด opacity 1 ไม่มี `data-inview`
* การ์ดไม่ทับหัวข้อที่กลางฉาก, ความยาวฉาก 2.2 หน้าจอ (1440×900), `scrollWidth − innerWidth` = 0, console error / warning = 0
* มือถือ: แถบความคืบหน้า bottom 732px < แถบปุ่มล่าง top 767px
* Screenshot กลางฉาก 1440 และ 390

### Result / ผลการทดสอบ

* Passed

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* Safari/Firefox: ตัวเลขนับและการ์ด trigger ทำงาน (IntersectionObserver) แต่ซูม/มืด/แถบไม่ขยับ (ไม่รองรับ scroll timeline) แถบจะเต็มค้าง ยังไม่ได้ทดสอบบนเครื่องจริง
* ยังไม่ได้วัด TBT/INP หลังเพิ่ม client component

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** รอบที่ 2 คำสั่งตรวจสอบผ่านทุกคำสั่ง และ acceptance criteria ทั้ง 5 ข้อผ่านจากการวัดในเบราว์เซอร์
* **Human intervention / การแทรกแซงของ Developer:** Developer รายงานบั๊กการ์ดไม่แสดงบน desktop ระหว่างงาน (ตรงกับที่วัดพบ)

## Known Issues / ปัญหาที่ทราบ

* หน้าหลักยาวขึ้นราว 1 หน้าจอ (ฉากเดิม ~1.2 → ~2.2 หน้าจอ)
* ถ้า JS โหลดช้าบนมือถือ ตัวเลขที่อยู่ใต้จอจะแสดงค่าจริงก่อนแล้วรีเซ็ตเป็น 0 (มองไม่เห็นเพราะอยู่ใต้จอ)

## Debug / Continue

1. การ์ดไม่แสดง: ดู `data-inview` ของ `li` ถ้าค้าง `false` ให้ดูว่า `li` อยู่ในจอจริงไหม (`getBoundingClientRect`) — grid ที่คอลัมน์เป็น 0px คือสาเหตุครั้งนี้
2. รูปไม่ตรึง: ห้ามมี `overflow-hidden`/`overflow-auto` ระหว่างชั้น sticky กับหน้า (ใช้ `overflow-clip`) และ top ต้องเท่าความสูง header
3. ซูม/มืดไม่ขยับ: element ต้องเป็นลูกของ `pin-track` และ wrapper ต้องสูงกว่าจอ (ไม่งั้นช่วง `contain` ไม่มี)

## Evidence / หลักฐาน

```yaml
evidence:
  task:
    id: "2026-09-16-scroll-triggered-and-pinned"
    type: "feature"
    risk: "medium"
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
    reason: "attempt 2: all Verification Commands pass; counter, pinned layer, timelines and card triggers measured over CDP at 1440 and 390, reduced motion checked"
  failure:
    occurred: true
    category: "implementation"
    reason: "attempt 1: gap-[26svh] on a 12-column grid squeezed the columns to 0px, so desktop cards sat off-screen and never triggered"
  human:
    intervention: true
    type: "bug-report"
    reason: "Developer reported the empty desktop section while the fix was being found"
  files_changed: 7
```
