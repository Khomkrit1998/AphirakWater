# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

perf: รูปแกลเลอรีหน้าแรกโหลดใหญ่เกินขนาดที่แสดงจริง

Risk / ความเสี่ยง: low (แก้ attribute `sizes` จุดเดียว ไม่เปลี่ยนหน้าตา) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer: "ตามต่อ" หมายถึงตามเรื่องที่ `2026-09-16-cloudflare-prefetch-loop.md` พบไว้แต่ยังไม่ได้แก้ คือจำนวนรูป ขนาด HTML และ `/_next/image` บน Cloudflare

Acceptance criteria:

1. แยกให้ออกว่าข้อไหนเป็นปัญหาจริง โดยดูจากตัวเลขที่วัดได้
2. แก้เฉพาะข้อที่เป็นปัญหาจริง โดยหน้าตาไม่เปลี่ยน

## Findings / ผลการตรวจ

| ข้อที่สงสัย | วัดได้ | สรุป |
| --- | --- | --- |
| แถว marquee render รูปสองชุด (`<img>` 37 ตัว) | ชุดซ้ำใช้ URL เดียวกัน เบราว์เซอร์โหลดแค่ครั้งเดียวต่อรูป (netlog: 1 request ต่อ URL) | ไม่เป็นปัญหา |
| HTML หน้าแรก 437 KB (blur base64 77 KB) | ส่งจริงด้วย zstd แค่ **34.4 KB** | ไม่เป็นปัญหา |
| `/_next/image` ไม่มี cache ที่ edge จึงนับโควต้า Cloudflare Images | เอกสาร Cloudflare ระบุว่านับเฉพาะ transformation ที่ไม่ซ้ำกันภายในเดือนเดียวกัน ทุกหน้ารวมกันมี URL รูปไม่ซ้ำ 266 แบบ × 2 format (webp / ไฟล์เดิม) = สูงสุด **532 ต่อเดือน** จากโควต้าฟรี 5,000 (ถ้าเกินจะได้ error 9422 ไม่มีค่าใช้จ่าย) | ไม่เป็นปัญหาตอนนี้ |
| `/_next/image` ต้องผ่าน Worker ทุกครั้ง | ~20 request ต่อผู้เข้าชมใหม่ (ครั้งถัดไปใช้ cache ของเบราว์เซอร์ `immutable`) Workers Free รับได้ 100,000 ต่อวัน | ไม่เป็นปัญหาตอนนี้ |
| รูปแกลเลอรีมี `sizes="(min-width: 640px) 470px, 360px"` ทุกรูป | ช่องรูปสูงคงที่ 200/260px ความกว้างจริงจึงขึ้นกับสัดส่วน: แนวตั้ง 196px, 4:3 347px, 16:9 463px เบราว์เซอร์เลยโหลดใหญ่เกินจริงถึง 2.4 เท่า | **ปัญหาจริง** |

## Baseline (ก่อนแก้) / สภาพเดิม

ขนาด webp ที่ Cloudflare ส่งจริง รวม 16 รูปแกลเลอรี เทียบระหว่างความกว้างที่เบราว์เซอร์เลือกกับความกว้างที่ควรเลือก:

| อุปกรณ์ | เดิม | หลังแก้ | ลดลง |
| --- | --- | --- | --- |
| desktop DPR1 | 1,020 KB (640w ทุกรูป) | 337 KB | −67% |
| desktop DPR2 | 2,434 KB (1080w ทุกรูป) | 1,252 KB | −49% |
| mobile DPR2 | 1,341 KB (750w ทุกรูป) | 728 KB | −46% |
| mobile DPR3 | 2,434 KB (1080w ทุกรูป) | 1,363 KB | −44% |

## What Changed / สิ่งที่เปลี่ยนแปลง

* `apps/web/features/home/components/sections.tsx` (`PhotoRow`): คำนวณ `sizes` ของแต่ละรูปจากสัดส่วนของรูปและความสูงของช่อง (`widthAt(260)` / `widthAt(200)`) แทนค่าคงที่ 470/360px

## Why / เหตุผล

* ความสูงของช่องรูปตายตัวอยู่แล้ว ความกว้างจึงคำนวณได้ตรงจาก `width/height` ของ `StaticImageData` ไม่ต้องเพิ่มขนาดรูปหรือ config
* ความสูง 200/260 ต้องตรงกับ class `h-[200px] sm:h-[260px]` จึงใส่คอมเมนต์กำกับไว้ (Tailwind ต้องการ class แบบตัวอักษรตรงๆ จึงไม่ดึงค่ามาใช้ร่วมกัน)

## Files Changed / ไฟล์ที่แก้ไข

* `apps/web/features/home/components/sections.tsx`
* `docs/evaluation/tasks/2026-09-16-cloudflare-prefetch-loop.md` (แก้ข้อ 4 ที่สรุปเกินจริง ให้ชี้มาที่ไฟล์นี้)

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

* HTML ที่ build ได้มี `sizes` สามแบบตามสัดส่วน: `196px, 151px` (14 ตัว), `347px, 267px` (16 ตัว), `463px, 356px` (2 ตัว)
* Chrome headless + CDP บน `next start` เลื่อนไปที่ `#gallery` แล้วดูความกว้างที่เบราว์เซอร์ขอ:

| อุปกรณ์ | ก่อน (วัดจากเว็บจริง) | หลัง |
| --- | --- | --- |
| 1440×900 DPR1 | 640w ทุกรูป | 256w ×4, 384w ×6, 640w ×1 |
| 1440×900 DPR2 | 1080w ทุกรูป | 640w ×3, 750w ×6, 1080w ×1 |
| 390×844 DPR3 | 1080w ทุกรูป | 640w ×6, 828w ×8, 1080w ×2 |

ความกว้างที่เลือกตรงกับที่ใช้คำนวณตาราง Baseline ทุกกรณี

### Result / ผลการทดสอบ

* Passed

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* ตัวเลข KB ในตาราง Baseline วัดจาก Cloudflare ด้วยความกว้างที่คาดว่าเบราว์เซอร์จะเลือก ส่วนความกว้างที่เลือกจริงวัดบน `next start` ยังไม่ได้วัดซ้ำหลัง deploy
* ยังไม่ได้ดูว่ารูปคมพอบนจอจริงหรือไม่ แต่ทุกกรณีเบราว์เซอร์เลือกรูปที่กว้างเท่าหรือมากกว่าขนาดที่แสดง × DPR

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** คำสั่งตรวจสอบผ่านทุกคำสั่ง, เบราว์เซอร์เลือกความกว้างรูปเล็กลงตามที่คาดไว้ทุกอุปกรณ์
* **Human intervention / การแทรกแซงของ Developer:** none

## Debug / Continue

1. เปลี่ยนความสูงของช่องรูปแกลเลอรี: แก้ทั้ง class `h-[200px] sm:h-[260px]` และ `widthAt(260)` / `widthAt(200)` ให้ตรงกัน
2. ถ้าเว็บโตจนใกล้โควต้า (5,000 transformation หรือ 100,000 request ต่อวัน): เอารูปใน `features/home/assets` ไปย่อไว้ก่อนตอน build แล้วตั้ง `images.unoptimized` หรือเปลี่ยนไปใช้ Workers Paid
3. รูปต้นฉบับบางไฟล์ใหญ่ (`work-residence.jpg` 528 KB, `work-wet-road.jpg` 526 KB) แต่ส่งถึงผู้ใช้หลังย่อแล้ว จึงมีผลแค่ขนาด repo และเวลา build

## Evidence / หลักฐาน

```yaml
evidence:
  task:
    id: "2026-09-16-gallery-image-sizes"
    type: "change"
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
    reason: "all Verification Commands pass; CDP shows the browser now requests 256/384w (desktop DPR1), 640/750w (DPR2) and 640/828w (mobile DPR3) instead of 640w/1080w for every gallery photo, 44-67% fewer gallery bytes measured on Cloudflare"
  failure:
    occurred: false
    category: "none"
    reason: "none"
  human:
    intervention: false
    type: "none"
    reason: "none"
  files_changed: 2
```
