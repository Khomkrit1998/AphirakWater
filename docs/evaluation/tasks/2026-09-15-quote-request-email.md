# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

feat: ฟอร์มขอใบเสนอราคาส่งคำขอเป็นอีเมลผ่าน Resend

Risk / ความเสี่ยง: medium (endpoint สาธารณะรับข้อมูลจากภายนอกและส่งอีเมลออก)

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer ถามทางเลือก backend แล้วเลือก "ทำฟอร์มขอราคาแบบส่งอีเมลก่อน" ส่วน CMS / database ตัดสินใจภายหลัง

## What Changed / สิ่งที่เปลี่ยนแปลง

* `POST /api/quote` เลิกตอบ 503 ตายตัว: ตรวจข้อมูลด้วย `quoteRequestSchema` เหมือนเดิม แล้วส่งอีเมลผ่าน Resend REST API และตอบ `{ ok: true, reference }`
* ถ้ายังไม่ได้ตั้ง env หรือตั้งผิดรูปแบบ ตอบ 503 ข้อความเดิม · ถ้า Resend ปฏิเสธหรือเกิน 10 วินาที ตอบ 502 "ส่งคำขอไม่สำเร็จ กรุณาโทรหาเราโดยตรง"
* อีเมลเป็นข้อความล้วน ภาษาไทย แสดง label ของบริการ/ปริมาณ, วันที่แบบไทย, เวลาที่ส่ง, หัวเรื่องมีเลขอ้างอิง ชื่อ และบริการ
* env ฝั่ง server (`RESEND_API_KEY`, `QUOTE_EMAIL_TO` คั่นด้วย `,`, `QUOTE_EMAIL_FROM`) ตรวจด้วย zod ตอนมี request
* `turbo.json`: เพิ่ม `globalPassThroughEnv` สำหรับ 3 ตัวแปรนี้ (แก้ warning `turbo/no-undeclared-env-vars` และกัน turbo strict mode กรอง env ทิ้ง)
* ฝั่ง client ไม่ได้แก้ (`quote-form.tsx` รองรับ success + reference อยู่แล้ว)

## Why / เหตุผล

* ใช้ `fetch` ตรงแทน SDK `resend` เพราะเป็น request เดียว ไม่ต้องเพิ่ม dependency
* อ่าน env ตอน request เพื่อให้เว็บ build/deploy ได้ก่อนเจ้าของสมัคร Resend และยังรักษากฎเดิม "ห้ามบอกลูกค้าว่าส่งสำเร็จถ้าไม่ได้ส่งจริง"
* รายละเอียดและวิธีเปิดใช้งาน: `docs/decisions/0007-quote-request-email.md`

## Files Changed / ไฟล์ที่แก้ไข

* `apps/web/app/api/quote/route.ts`
* `apps/web/features/quote/api/send-quote-email.ts` (ใหม่)
* `apps/web/features/quote/index.ts`
* `apps/web/lib/env.ts`
* `turbo.json`
* `docs/decisions/0007-quote-request-email.md` (ใหม่)

## Architecture / Data Impact

### Architecture Impact / ผลกระทบต่อ Architecture

เพิ่มบริการภายนอก Resend (api.resend.com) เป็นช่องทางส่งคำขอ

### API Impact / ผลกระทบต่อ API

`POST /api/quote`: 200 `{ ok: true, reference }` เมื่อส่งสำเร็จ · 400 ข้อมูลผิด (เดิม) · 502 Resend ล้มเหลว (ใหม่) · 503 ยังไม่ตั้งค่า (เดิม) · รูปแบบ response ตรง `quoteResponseSchema` เดิม

### Database / Data Impact / ผลกระทบต่อ Database / Data

None (ไม่มีการเก็บคำขอ ข้อมูลลูกค้าอยู่ในอีเมลเท่านั้น)

## Verification / การตรวจสอบ

### Verification Commands / คำสั่งตรวจสอบ

Attempts / จำนวนรอบ: 2 (รอบแรก lint มี warning ใหม่ 3 ข้อจาก env ที่ไม่ได้ประกาศใน turbo.json แก้แล้วรันซ้ำผ่านไม่มี warning)

| Command / คำสั่ง | Result / ผล |
| --- | --- |
| pnpm typecheck | pass |
| pnpm lint | pass |
| none (test) | none |
| pnpm build | pass |

Baseline: None

### Tests / การทดสอบ

`next start` (production build) แล้ว POST `/api/quote` ด้วย curl 4 กรณี โดย mock `globalThis.fetch` เฉพาะ `api.resend.com` ผ่าน `NODE_OPTIONS=--import` (ไม่แก้โค้ด ไม่ใช้ key จริง):

| กรณี | ข้อมูลถูก | ข้อมูลผิด |
| --- | --- | --- |
| ไม่ตั้ง env | 503 ข้อความเดิม + log "not configured" | 400 |
| Resend ตอบ 200, ผู้รับ 2 อีเมล | 200 `AW-260915-D938` | 400 |
| Resend ตอบ 401 | 502 + log `Resend 401: API key is invalid` | 400 |
| `QUOTE_EMAIL_TO=not-an-email` | 503 + log `invalid_format` | 400 |

ตรวจ payload ที่ส่งไป Resend: header `Bearer <key>`, มี timeout signal, `to` เป็น array 2 อีเมล, หัวเรื่องยุบขึ้นบรรทัดใหม่ในชื่อเป็นช่องว่าง, วันที่ `15 มกราคม 2573`, เวลาส่งเป็นเวลาไทย

### Result / ผลการทดสอบ

* Passed

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* ยังไม่ได้ส่งอีเมลจริง (ไม่มี API key) · URL, header และรูปแบบ body อ้างอิงเอกสาร Resend ต้องทดสอบจริงหนึ่งครั้งหลังตั้ง key
* ยังไม่ได้เปิดการ์ด "ส่งคำขอใบเสนอราคาเรียบร้อย" ในเบราว์เซอร์ (เป็นครั้งแรกที่ state นี้เกิดขึ้นจริง โค้ด client ไม่ได้แก้)
* ยังไม่ได้ดูว่าอีเมลภาษาไทยแสดงผลอย่างไรใน Gmail / มือถือ

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** Verification Commands ผ่านทุกคำสั่งในรอบสุดท้าย และทุกกรณีของ route ให้สถานะ/ข้อความตรงตามที่ออกแบบ
* **Human intervention / การแทรกแซงของ Developer:** expected-review — Developer เลือกช่องทางอีเมลก่อนเริ่ม

## Known Issues / ปัญหาที่ทราบ

* ไม่มีการกันสแปม (reCAPTCHA / Turnstile / rate limit)
* ผู้ส่ง `onboarding@resend.dev` ส่งถึงได้เฉพาะอีเมลที่สมัคร Resend · หลายผู้รับต้อง verify โดเมนก่อน (ยังไม่มีโดเมนจริง)
* อีเมลส่งไม่สำเร็จ = คำขอไม่ถูกเก็บ (ลูกค้าเห็นข้อความให้โทร)

## Important Decisions / Decision สำคัญ

* **Decision:** Resend ผ่าน REST `fetch` ไม่ใช้ SDK
  * **Reason:** request เดียว ไม่ต้องเพิ่ม dependency
* **Decision:** env ไม่ครบ → 503, ส่งไม่สำเร็จ → 502, ไม่มีการตอบสำเร็จปลอม
  * **Reason:** ฟอร์มเป็น conversion หลัก ลูกค้าต้องรู้ว่าต้องโทรเมื่อคำขอไม่ถึง

## Debug / Continue

### วิธี Debug / ตรวจสอบปัญหา

1. ลูกค้าเห็น "ระบบรับคำขอออนไลน์ยังไม่เปิดใช้งาน": log ของ server มี `quote email is not configured` พร้อม field ที่ขาดหรือผิด (`apps/web/lib/env.ts`)
2. ลูกค้าเห็น "ส่งคำขอไม่สำเร็จ": log มี `quote email failed: Error: Resend <status>: <ข้อความ>` เช่น 401 key ผิด, 403 ผู้ส่ง/ผู้รับไม่ได้รับอนุญาต
3. ทดสอบโดยไม่ส่งจริง: ใช้ preload mock `fetch` แบบในหัวข้อ Tests

### Next Steps / งานที่ต้องทำต่อ

1. เจ้าของสมัคร Resend แล้วตั้ง env บน server ส่งทดสอบจริง 1 ครั้ง และดูการ์ดสำเร็จในเบราว์เซอร์
2. เพิ่มการกันสแปมก่อนเปิดใช้จริง (Turnstile หรือ reCAPTCHA v3 ตาม design handoff)
3. เมื่อได้โดเมน: verify โดเมนใน Resend, ตั้ง `QUOTE_EMAIL_FROM` และเพิ่มผู้รับ
4. เมื่อเลือก database/CMS แล้ว: บันทึกคำขอก่อนส่งอีเมล และแสดงใน admin (`quotes`)

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
    id: "2026-09-15-quote-request-email"
    type: "feature"
    risk: "medium"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 2
    duration_minutes: 30  # estimated
  verification:
    typecheck: "pass"
    lint: "pass"
    test: "none"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "all Verification Commands pass; all four route scenarios return the designed status and message against a mocked Resend"
  failure:
    occurred: false
    category: "none"
    reason: "none"
  human:
    intervention: true
    type: "expected-review"
    reason: "Developer chose email as the delivery channel before implementation"
```
