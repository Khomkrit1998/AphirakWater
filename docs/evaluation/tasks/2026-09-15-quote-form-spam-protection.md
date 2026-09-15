# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

feat: กันสแปมฟอร์มขอใบเสนอราคาด้วย honeypot + เวลากรอก

Risk / ความเสี่ยง: medium (endpoint สาธารณะ และถ้ากันพลาดลูกค้าจริงจะส่งคำขอไม่ได้) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer เลือกงาน "กันสแปมฟอร์ม" และเลือกวิธี "Honeypot + เวลากรอก" (ถามก่อนลงมือเพราะเป็นเรื่อง security)

Acceptance criteria (เขียนก่อนลงมือ):

1. คำขอจาก bot ถูกปฏิเสธ ไม่มีอีเมลออกไป
2. ลูกค้าจริงส่งได้ปกติ ไม่มีขั้นตอนเพิ่มที่ลำบาก
3. ถ้าระบบกันสแปมล่ม ลูกค้าเห็นข้อความให้โทร และไม่มีการตอบสำเร็จปลอม
4. ไม่มี script เพิ่มในหน้าอื่นนอกจาก `/quote`

## What Changed / สิ่งที่เปลี่ยนแปลง

* `@workspace/shared/quote`: `quoteFormSchema` (+ `website`), `quoteSubmissionSchema` (+ `elapsedMs`), `QUOTE_MIN_FILL_MS = 2000`, `spamReason()` · field ที่ขาดได้ข้อความไทยให้โหลดหน้าใหม่
* `quote-form.tsx`: ช่อง honeypot ที่ซ่อน (`sr-only`, `aria-hidden`, `tabIndex=-1`, `autoComplete="off"`) ลงทะเบียนผ่าน react-hook-form, วัดเวลาจาก mount ถึงกดส่งด้วย `useRef` + `performance.now()`, ห่อ `handleSubmit` ไว้ใน `onSubmit` handler
* `route.ts`: parse ด้วย `quoteSubmissionSchema` แล้วเรียก `spamReason()` ก่อนตรวจ env/ส่งอีเมล · ปฏิเสธ = 400 ข้อความจริง + `console.warn`
* `submit-quote.ts`: รับ `QuoteSubmission`
* `self-check.ts`: เพิ่ม 5 assert ของ `spamReason` และ schema

## Why / เหตุผล

* ไม่ตอบสำเร็จปลอมให้ bot เพราะถ้าจับลูกค้าจริงผิด คำขอจะหายเงียบ · กรณีเร็วเกินไป ลูกค้ากดซ้ำก็ผ่านเอง
* ใส่ logic ใน `@workspace/shared` ข้าง schema เดิมเพื่อให้ self-check ทดสอบได้
* รายละเอียดและข้อจำกัด: `docs/decisions/0008-quote-form-spam-protection.md`

## Files Changed / ไฟล์ที่แก้ไข

* `packages/shared/src/quote.ts`
* `packages/shared/src/self-check.ts`
* `apps/web/app/api/quote/route.ts`
* `apps/web/features/quote/api/submit-quote.ts`
* `apps/web/features/quote/components/quote-form.tsx`
* `docs/decisions/0008-quote-form-spam-protection.md` (ใหม่)
* `docs/decisions/0007-quote-request-email.md` (อัปเดตหัวข้อ "ยังไม่ได้ทำ")

## Architecture / Data Impact

### Architecture Impact / ผลกระทบต่อ Architecture

None

### API Impact / ผลกระทบต่อ API

`POST /api/quote` ต้องมี `website` (string) และ `elapsedMs` (number ≥ 0) เพิ่ม · honeypot มีค่าหรือ `elapsedMs < 2000` → 400 · client เดิมที่ไม่ส่งสอง field นี้ได้ 400 "กรุณาโหลดหน้านี้ใหม่แล้วส่งอีกครั้ง" (เว็บยังไม่เคย deploy จึงยังไม่มี client เดิม)

### Database / Data Impact / ผลกระทบต่อ Database / Data

None

## Verification / การตรวจสอบ

### Verification Commands / คำสั่งตรวจสอบ

Attempts / จำนวนรอบ: 3

1. typecheck **fail** (self-check ส่ง object ดิบที่ `serviceType` เป็น string ไม่ใช่ enum), lint pass แต่มี warning ใหม่ 2 ข้อ (React Compiler: อ่าน ref / เรียก `performance.now()` ใน callback ที่ส่งเข้า `handleSubmit(...)` ระหว่าง render), build pass → RETRY
2. แก้ self-check ให้ parse ผ่าน schema และห่อ `handleSubmit` ไว้ใน `onSubmit` → ทุกคำสั่งผ่าน ไม่มี warning → PASS
3. ตรวจ acceptance criteria แล้วพบว่า request ที่ไม่มี field กันสแปมได้ข้อความ zod ภาษาอังกฤษ แก้เป็นข้อความไทย แล้วรันซ้ำ → ทุกคำสั่งผ่าน → PASS

| Command / คำสั่ง | Result / ผล |
| --- | --- |
| pnpm typecheck | pass |
| pnpm lint | pass |
| none (test) | none |
| pnpm build | pass |

Baseline: None

### Tests / การทดสอบ

* `pnpm --filter @workspace/shared test`: ผ่าน
* Production build + `next start`, mock `fetch` ของ Resend ผ่าน `NODE_OPTIONS=--import`, ยิง API ด้วย curl:

| Request | ผล | อีเมล |
| --- | --- | --- |
| ไม่มี `website`/`elapsedMs` | 400 "กรุณาโหลดหน้านี้ใหม่…" | ไม่ส่ง |
| `elapsedMs: -5` | 400 "กรุณาโหลดหน้านี้ใหม่…" | ไม่ส่ง |
| honeypot มีค่า | 400 "ส่งคำขอไม่สำเร็จ กรุณาโทรหาเราโดยตรง" + log `honeypot` | ไม่ส่ง |
| `elapsedMs: 400` | 400 "กรุณารอสักครู่แล้วกดส่งอีกครั้ง…" + log `too-fast` | ไม่ส่ง |
| ปกติ `elapsedMs: 9000` | 200 `AW-260915-95C9` | ส่ง 1 ครั้ง |

* Chrome headless (CDP) 390×844 ที่ `/quote?service=hotel&volume=10000`:
  * honeypot: `tabIndex -1`, อยู่ใต้ `aria-hidden`, ไม่อยู่ใน accessibility tree, ค่าว่าง
  * กด Tab จากช่องชื่อไปจนถึงลิงก์โทร: phone > lineId > serviceType > volume > date > location > details > ปุ่มส่ง > ลิงก์ ไม่ผ่าน honeypot
  * กรอกแล้วกดส่งทันทีหลัง hydrate: แถบแจ้ง "กรุณารอสักครู่แล้วกดส่งอีกครั้ง หรือโทรหาเราโดยตรง โทร 087-418-1199"
  * กดส่งอีกครั้ง: การ์ด "ส่งคำขอใบเสนอราคาเรียบร้อย" พร้อมเลขอ้างอิง `AW-260915-B308`, อีเมล (mock) หัวเรื่องภาษาไทยถูกต้อง

### Result / ผลการทดสอบ

* Passed · Acceptance criteria 1, 2, 4 ผ่านตามผลข้างบน · ข้อ 3: กลไกกันสแปมไม่มี service ภายนอกที่จะล่ม ส่วน 502/503 ของอีเมลไม่ได้แก้ในงานนี้ (ทดสอบไว้ในงาน 2026-09-15-quote-request-email)

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* ยังไม่ได้ทดสอบ autofill จริงของ Chrome/Safari/password manager กับช่อง honeypot
* ยังไม่ได้ทดสอบกับ screen reader จริง (ตรวจจาก accessibility tree เท่านั้น)
* ในเคส curl หัวเรื่องแสดง `???` แทนชื่อ เพราะ Git Bash ส่งภาษาไทยผ่าน argument ผิด ไม่ใช่บั๊กของโค้ด (เคสเบราว์เซอร์ถูกต้อง)

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** รอบที่ 3 ทุกคำสั่งผ่าน และ acceptance criteria ผ่านจากการทดสอบ API และเบราว์เซอร์
* **Human intervention / การแทรกแซงของ Developer:** expected-review — Developer เลือกวิธีกันสแปม (เรื่อง security) ก่อนลงมือ

## Known Issues / ปัญหาที่ทราบ

* bot ที่อ่าน JavaScript แล้วยิง API ตรงพร้อมค่าปลอมผ่านได้ (ต้อง Turnstile)
* ไม่มี rate limit ต่อ IP

## Important Decisions / Decision สำคัญ

* **Decision:** ปฏิเสธด้วย 400 และข้อความจริง ไม่ตอบสำเร็จปลอม
  * **Reason:** ลูกค้าจริงที่ถูกจับผิดต้องรู้ว่าคำขอไม่ถึง
* **Decision:** เกณฑ์เวลา 2000 ms
  * **Reason:** bot กรอกทันที ส่วนลูกค้าต้องกรอกอย่างน้อยชื่อ เบอร์ และพื้นที่ · ปรับได้ที่ `QUOTE_MIN_FILL_MS`

## Debug / Continue

### วิธี Debug / ตรวจสอบปัญหา

1. ลูกค้าบอกว่าส่งไม่ได้: ดู server log `quote rejected as spam: too-fast|honeypot`
2. `too-fast` จากลูกค้าจริง: ลด `QUOTE_MIN_FILL_MS` ใน `packages/shared/src/quote.ts`
3. `honeypot` จากลูกค้าจริง (autofill เติม): เปลี่ยนชื่อ field `website` เป็นชื่อที่ autofill ไม่รู้จัก ทั้งใน schema และฟอร์ม

### Next Steps / งานที่ต้องทำต่อ

1. เจ้าของสมัคร Resend แล้วทดสอบส่งจริง (จากงานก่อน)
2. เพิ่ม Cloudflare Turnstile เมื่อเจอสแปมที่ผ่าน honeypot
3. ตัดสินเรื่องสีปุ่มขอราคาในหน้าบริการ และแก้ P2 จาก critique

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
    id: "2026-09-15-quote-form-spam-protection"
    type: "feature"
    risk: "medium"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 3
    duration_minutes: 40  # estimated
  verification:
    typecheck: "pass"
    lint: "pass"
    test: "none"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "attempt 3: all Verification Commands pass; acceptance criteria confirmed by API and headless Chrome tests"
  failure:
    occurred: true
    category: "implementation"
    reason: "attempt 1: self-check typed raw object against enum type, and ref/impure call inside handleSubmit callback flagged during render"
  human:
    intervention: true
    type: "expected-review"
    reason: "Developer chose the spam protection method (security choice) before implementation"
  files_changed: 7
```
