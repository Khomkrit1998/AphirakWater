# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

fix: มือถือกดปุ่มเมนู (burger) ด้านบนไม่ได้

Risk / ความเสี่ยง: low (config เฉพาะโหมด dev + ขนาดไอคอนในเมนู) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer: "device mobile กด menu burger ด้านบนไม่ได้"

Acceptance criteria:

1. เปิดเว็บจากมือถือ (ผ่าน IP ในวง Wi-Fi) แตะ burger แล้วเมนูเปิด
2. ไม่กระทบ production build

## Root Cause / สาเหตุ

โค้ดเมนูไม่มีปัญหา: บน production build และ `localhost:3000` แตะแล้วเปิดได้ (ไม่มีอะไรทับปุ่ม, ไม่มี console error)

ปัญหาเกิดเฉพาะเมื่อเปิด `pnpm dev` ผ่าน IP (`http://192.168.1.57:3000`) ซึ่งเป็นวิธีที่มือถือเข้าถึง: Next.js 16 (`block-cross-site-dev.js`) อนุญาต dev resource (`/_next/*`) เฉพาะ origin `localhost` และที่อยู่ใน `allowedDevOrigins` request อื่นได้ 403 → หน้า render จาก server แต่ไม่ hydrate → client component ทุกตัว (เมนูมือถือ, ตัวเลือกบริการ, ฟอร์ม) ไม่ทำงาน

## What Changed / สิ่งที่เปลี่ยนแปลง

* `apps/web/next.config.ts`: `allowedDevOrigins: ["192.168.*.*"]` (มีผลเฉพาะ dev, wildcard `*` = 1 ส่วนของ IP ตาม `matchWildcardDomain`)
* `apps/web/features/site/components/site-header.tsx`: ไอคอนช่องทางติดต่อในเมนูมือถือ `size-11` → `size-10` (5 ไอคอนเดิมกว้าง 260px เกินเนื้อที่ 252px ของ sheet ทำให้ TikTok ตกบรรทัด)

## Files Changed / ไฟล์ที่แก้ไข

* `apps/web/next.config.ts`
* `apps/web/features/site/components/site-header.tsx`

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

Chrome headless (DevTools protocol) จำลอง 390×844 + touch, แตะกลางปุ่มด้วย `Input.dispatchTouchEvent`:

| URL | ก่อนแก้ | หลังแก้ |
| --- | --- | --- |
| production `localhost:3100` (`/` scroll 0, `/` scroll 1500, `/quote`) | เปิด | เปิด |
| dev `localhost:3000` | เปิด | — |
| dev `192.168.1.57:3000` | **ไม่เปิด** (`aria-expanded=false`) | เปิด (`role=dialog`) |

* `elementFromPoint` ที่กลางปุ่มเป็นตัวปุ่มทุกกรณี (ไม่มี element ทับ)
* Screenshot เมนูหลังแก้: ไอคอน 5 ตัวอยู่แถวเดียว

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* ทดสอบด้วย Chrome บนเครื่องเดียวกันผ่าน IP ไม่ได้ทดสอบบนมือถือจริง (iOS Safari)
* ถ้า Wi-Fi ใช้วง IP อื่น (เช่น `10.*` หรือ `172.16.*`) ต้องเพิ่มใน `allowedDevOrigins`
* `apps/admin` ยังไม่ได้ตั้งค่า ถ้าจะเปิดหลังบ้านจากมือถือตอน dev จะเจอปัญหาเดียวกัน

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** ทำให้เกิดปัญหาได้ก่อนแก้ และหลังแก้แตะผ่าน IP แล้วเมนูเปิด คำสั่งตรวจสอบผ่านทุกคำสั่ง
* **Human intervention / การแทรกแซงของ Developer:** none

## Debug / Continue

1. ปุ่มหรือฟอร์มทุกตัวไม่ตอบสนองบนมือถือตอน dev: ดู log ของ `pnpm dev` หา "Blocked cross-origin request to Next.js dev resource" แล้วเพิ่ม host ที่ log แนะนำใน `allowedDevOrigins` (Next รีสตาร์ตเองเมื่อแก้ config)
2. Production ไม่มีการบล็อกนี้

## Evidence / หลักฐาน

```yaml
evidence:
  task:
    id: "2026-09-16-mobile-menu-dev-origin"
    type: "bug-fix"
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
    reason: "reproduced on dev via LAN IP (menu stayed closed), fixed with allowedDevOrigins; tap opens the menu; Verification Commands pass"
  failure:
    occurred: false
    category: "none"
    reason: "none"
  human:
    intervention: false
    type: "none"
    reason: "none"
  files_changed: 3
```
