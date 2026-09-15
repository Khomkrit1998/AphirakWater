# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

fix: แก้ปัญหา P1 จาก critique หน้าหลัก (สี CTA, จอแรกบนมือถือ, contrast และเกจขั้นตอน)

Risk / ความเสี่ยง: low

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer ขอให้รีวิวหน้าหลัก (`/impeccable critique`) แล้วสั่งแก้ "ทั้งหมดรวดเดียว" ภายในขอบเขตที่เลือก: เฉพาะ P1 ทั้ง 3 ข้อ และให้ปุ่มหลักยังเป็น "ขอราคาน้ำ"

1. ปุ่มขอราคาใช้สีแดงที่ควรเป็นของปุ่มโทร และมีหลายข้อความ
2. จอแรกบนมือถือ: ปุ่มโทรใน hero ถูกแถบ sticky บังทั้งปุ่ม, มีปุ่มขอราคาซ้ำ 3 ปุ่ม, แถบ sticky สูง 48px (spec 56px), ไม่มีข้อความบอกว่ากดแล้วได้อะไร
3. Contrast ไม่ผ่าน (label ตัวเลข 3.9:1, ดาวรีวิว 2.17:1, ขั้นตอนที่จาง ≈1.8:1) และเกจขั้นตอนเขียนเป็นลิตรจนเข้าใจผิด, มือถือมีแถบ progress ซ้อน 2 เส้น

## What Changed / สิ่งที่เปลี่ยนแปลง

* ลิงก์ไป `/quote` ไม่มีสีแดงแล้ว: ปุ่มในส่วนราคาเป็นสีเขียว ข้อความ "ขอราคาน้ำ", ปุ่มในตัวเลือกบริการ (panel เขียวเข้ม) เป็นปุ่มขาว
* ต่ำกว่า 900px: ซ่อนปุ่ม "ขอราคาน้ำ" ใน header และปุ่มโทรใน hero (แถบ sticky มีครบ), ปุ่มในแถบสูง 56px, spacer ใต้ footer เผื่อ safe area
* เพิ่มบรรทัดใต้ปุ่ม hero: "รับใบเสนอราคาภายในวันเดียว · รู้ราคารวมก่อนรถออกทุกครั้ง" (ใช้คำสัญญาที่มีอยู่แล้วในหัวข้อราคาและบทขั้นตอนเท่านั้น ไม่เพิ่มข้ออ้างใหม่)
* แถบตัวเลขเปลี่ยนจาก `bg-primary` เป็น `bg-surface-dark` ตาม handoff, token `--star` ธีมสว่าง `#e8a317` → `#b7790f`
* ขั้นตอนที่ยังไม่ถึงกลางจอ opacity 0.35 → 0.8
* เกจขั้นตอน (desktop และมือถือ) ใช้ชื่อขั้นแรก/ขั้นสุดท้ายแทนตัวเลขลิตร, เส้นประแบ่งตามจำนวนขั้น, ลบ `process.gaugeLabel`
* มือถือ: ซ่อนเส้น reading progress ของทั้งหน้าระหว่างอยู่ในบทขั้นตอน (บทนี้มีแถบของตัวเอง) และจัดแถบของบทให้ชิดใต้ header (65px / 69px)
* ปุ่ม size `cta-sm` เพิ่ม `gap-2` (ไอคอนลูกศร/โทรเคยติดตัวอักษร)
* ลบ `--shadow-cta-call` ที่ไม่มีใครใช้แล้ว

## Why / เหตุผล

* handoff กำหนดให้แดงเป็นของ CTA ด่วนและปุ่มโทร และแถบ sticky สอนผู้ใช้ว่าแดง = โทร จึงเก็บแดงไว้ให้ `tel:` อย่างเดียว
* แถบตัวเลข: เปลี่ยนพื้นเป็น surface-dark ทนกว่าการปรับสีตัวอักษร (label สีขาว 90% บน primary ได้แค่ ≈4.6:1) และตรงกับ handoff โดยไม่ต้องเพิ่ม token
* ซ่อนปุ่มที่ซ้ำกับแถบ sticky แทนการเลื่อนเนื้อหา hero เพราะตำแหน่ง fold เปลี่ยนตามอุปกรณ์ ส่วนแถบ sticky อยู่ในระยะนิ้วโป้งเสมอ

## Files Changed / ไฟล์ที่แก้ไข

* `apps/web/features/home/components/hero.tsx`
* `apps/web/features/home/components/sections.tsx`
* `apps/web/features/home/components/scroll-spy.tsx`
* `apps/web/features/services/components/service-explorer.tsx`
* `apps/web/features/site/components/site-header.tsx`
* `apps/web/features/site/components/sticky-cta.tsx`
* `packages/shared/src/home.ts`
* `packages/ui/src/components/button.tsx`
* `packages/ui/src/styles/globals.css`
* `docs/decisions/0006-cta-colour-and-mobile-first-viewport.md` (ใหม่)

## Architecture / Data Impact

### Architecture Impact / ผลกระทบต่อ Architecture

None

### API Impact / ผลกระทบต่อ API

None

### Database / Data Impact / ผลกระทบต่อ Database / Data

`homeSchema` ใน `@workspace/shared`: เพิ่ม `hero.ctaNote` (required), ลบ `process.gaugeLabel` · admin typecheck/build ผ่าน (ไม่มีที่ใช้ field ที่ลบ)

## Verification / การตรวจสอบ

### Verification Commands / คำสั่งตรวจสอบ

Attempts / จำนวนรอบ: 2 (รอบแรกผ่าน รอบสองรันซ้ำหลังแก้ gap ของปุ่มและตำแหน่งแถบขั้นตอนที่พบตอนตรวจในเบราว์เซอร์)

| Command / คำสั่ง | Result / ผล |
| --- | --- |
| pnpm typecheck | pass |
| pnpm lint | pass |
| none (test) | none |
| pnpm build | pass |

Baseline: None

### Tests / การทดสอบ

* `pnpm --filter @workspace/shared test` (self-check): ผ่าน
* Impeccable detector บนไฟล์ UI ที่แก้: 0 findings
* Production build + Chrome headless (CDP) ที่ 1440, 1280, 1000, 768, 390px ธีมสว่างและมืด พร้อม screenshot

### Result / ผลการทดสอบ

* Passed
* ลิงก์ `/quote` ที่เป็นสีแดง: 0 (จาก 24 ลิงก์)
* Contrast: label ตัวเลข 7.56 (มืด 8.21), ดาว 3.65 (มืด 8.68), ขั้นตอนที่จางสุด 4.90, ปุ่มขาวใน panel 10.23
* มือถือ 390×844: ปุ่ม sticky สูง 56px ทั้ง 3 ปุ่ม, hit test กลางปุ่ม hero "ขอราคาน้ำ" ได้ปุ่มนั้นเอง, ปุ่มขอราคาในจอแรกเหลือ 2 (hero + แถบ), footer ไม่ถูกแถบบัง, ไม่มี horizontal scroll
* บทขั้นตอนบนมือถือ: เส้น progress ของทั้งหน้าซ่อน และกลับมาหลังออกจากบท, แถบของบทชิด header (65 = 65)
* 1000/1280px: ปุ่มใน header และปุ่มโทรใน hero ยังแสดง, แถบ sticky ซ่อน
* Console error: ไม่มี

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

ยังไม่ได้ทดสอบ Safari/Firefox จริง และ screen reader · บนจอ 390×844 ขอบล่าง 7px ของปุ่ม hero กับบรรทัด ctaNote อยู่ใต้แถบ sticky ในจอแรก (เห็นเมื่อเลื่อน)

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** Verification Commands ผ่านทุกคำสั่งในรอบสุดท้าย และผลวัดในเบราว์เซอร์ตรงกับปัญหา P1 ทั้ง 3 ข้อ
* **Human intervention / การแทรกแซงของ Developer:** expected-review — Developer เลือกขอบเขตและทิศทาง CTA ก่อนเริ่ม

## Known Issues / ปัญหาที่ทราบ

* หน้าบริการ `service-detail.tsx:144` ยังมีลิงก์ `/quote` สีแดง (handoff ของหน้าบริการระบุ "การ์ดขอราคา มีปุ่มแดง") อยู่นอกขอบเขตหน้าหลัก ต้องให้ Developer ตัดสินว่าจะใช้กฎข้อ 1 ของ decision 0006 ทั้งเว็บหรือไม่
* ที่ ≥900px เส้น reading progress (`top-[69px]`) ทับขอบล่าง header (สูง 70.75px) ราว 2px มีมาก่อนงานนี้
* token `--star` ใช้ใน admin dashboard เป็นจุดสี (`bg-star`) ด้วย สีเข้มขึ้นเล็กน้อยในธีมสว่าง
* P2 จาก critique ยังไม่ได้แก้: หน้ายาว/พื้นที่ให้บริการอยู่ลึก, ขนาดรถซ้ำ 4 ที่, จำนวนพื้นที่ขัดกัน (12 / 8 / ทุกอำเภอ), map placeholder ใน footer, รีวิวไม่มีที่มา

## Important Decisions / Decision สำคัญ

* **Decision:** แดงสำหรับ `tel:` เท่านั้น, ปุ่มขาวสำหรับ CTA บนพื้นเขียวเข้ม
  * **Reason:** ตาม handoff และแยกหน้าที่ของปุ่มให้ชัด (ดู decision 0006)
* **Decision:** ต่ำกว่า 900px แถบ sticky เป็นเจ้าของปุ่มโทร/ขอราคา
  * **Reason:** ปุ่มโทรใน hero ถูกแถบบัง และปุ่มซ้ำทำให้จอแรกรก

## Debug / Continue

### วิธี Debug / ตรวจสอบปัญหา

1. ปุ่มหายหรือซ้ำบนมือถือ: ดู class `max-[899px]:hidden` ใน `site-header.tsx` / `hero.tsx` คู่กับ `min-[900px]:hidden` ใน `sticky-cta.tsx` (breakpoint ต้องตรงกัน)
2. เส้น progress ไม่ซ่อนในบทขั้นตอน: `scroll-spy.tsx` ใช้ `active === storyChapter` จาก IntersectionObserver ที่เส้นอ่าน 42% ของจอ
3. สีหรือ contrast: token ใน `packages/ui/src/styles/globals.css` (`--star`, `--on-dark-muted`, `--surface-dark`) และ keyframe `story-focus`

### Next Steps / งานที่ต้องทำต่อ

1. ตัดสินเรื่องสีปุ่ม `/quote` ในหน้าบริการ (Known Issue ข้อแรก)
2. แก้ P2 จาก critique (`/impeccable distill`, `/impeccable harden`) แล้วรัน `/impeccable critique` ใหม่เพื่อเทียบคะแนน (ครั้งแรก 25/36)
3. ให้เจ้าของยืนยันข้อความ ctaNote ("รับใบเสนอราคาภายในวันเดียว") ว่าทำได้จริง

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
    id: "2026-09-15-home-critique-p1-fixes"
    type: "fix"
    risk: "low"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 2
    duration_minutes: 45  # estimated
  verification:
    typecheck: "pass"
    lint: "pass"
    test: "none"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "all Verification Commands pass; browser measurements confirm the three P1 issues are fixed"
  failure:
    occurred: false
    category: "none"
    reason: "none"
  human:
    intervention: true
    type: "expected-review"
    reason: "Developer chose scope (P1 only) and kept the quote form as primary CTA"
```
