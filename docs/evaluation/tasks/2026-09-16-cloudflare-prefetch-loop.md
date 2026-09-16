# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

fix: เว็บบน Cloudflare ยิง request ซ้ำไม่หยุดจากการ prefetch ของ Next router

Risk / ความเสี่ยง: medium (แก้ config ของ runtime ทั้ง Worker ไม่ได้แตะโค้ดหน้าเว็บ) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer: "ช่วยดูหน่อยทำไมขึ้น cloudflare มันถึงยิง network รัวๆ https://aphirakwater.k-chuaycrotha.workers.dev"

Acceptance criteria:

1. หาสาเหตุที่แท้จริงว่าอะไรยิง request ซ้ำ ไม่ใช่เดาจากอาการ
2. จำนวน request หลังโหลดหน้าเสร็จต้องนิ่ง ไม่วิ่งต่อเรื่อยๆ
3. ไม่เพิ่ม dependency และไม่แก้โค้ดหน้าเว็บ

## Baseline (ก่อนแก้) / สภาพเดิม

วัดด้วย Chrome headless ผ่าน DevTools Protocol เปิดหน้าแรกทิ้งไว้ 20 วินาที:

| ที่วัด | request ใน 20 วินาที |
| --- | --- |
| `https://aphirakwater.k-chuaycrotha.workers.dev/` | **1,346** และยังวิ่งต่อ |
| `next start` production build บนเครื่อง | **53** แล้วหยุด |

request ที่ซ้ำมีสองตัว คือ `/?_rsc=...` และ `/blog?_rsc=...` (ลิงก์โลโก้กับเมนูใน header) ประมาณ 65 ครั้งต่อวินาทีต่อแท็บ ทุกครั้งส่ง header เดียวกัน:

```
rsc: 1
next-router-prefetch: 1
next-router-segment-prefetch: /_tree
next-url: /
```

## Root Cause / สาเหตุที่แท้จริง

Next 16 prefetch ทีละ segment โดยส่ง `Next-Router-Segment-Prefetch: /_tree` ฝั่ง server ต้องตอบเฉพาะ tree ของ route นั้นพร้อม header `x-nextjs-postponed: 2`

Cache interception ของ OpenNext 1.20.6 ตอบคำขอนั้นไม่ถูก เงื่อนไขใน `@opennextjs/aws/dist/core/routing/cacheInterceptor.js` (`getBodyForAppRouter`) คือ

```js
const isSegmentResponse =
  Boolean(segmentHeader) &&
  segmentHeader in (cachedValue.segmentData || {}) &&
  !NextConfig.experimental?.prefetchInlining
```

Next 16.3.3 ตั้ง `experimental.prefetchInlining = { maxSize: 2048, maxBundleSize: 10240 }` มาเป็นค่าเริ่มต้น ค่านี้เป็น object จึง truthy `isSegmentResponse` เลยเป็น false เสมอ ทั้งที่ build มี segment ครบ (`.next/server/app/blog.meta` มี `segmentPaths: ["/_tree", "/_full", "/_index", "/blog/__PAGE__"]`)

ผลคือ interceptor ตกไปคืน `cachedValue.rsc` ซึ่งเป็น payload ทั้งหน้า สถานะ 200 และไม่มี `x-nextjs-postponed` router หาไม่เจอว่า tree อยู่ไหน จึงถือว่า prefetch ยังไม่สำเร็จแล้วขอใหม่ทันที วนไม่จบ

วัดเทียบตรงๆ ที่ `/blog` ด้วย header `Next-Router-Segment-Prefetch: /_tree`:

| server | body | header ที่บอกว่าเป็น segment |
| --- | --- | --- |
| Cloudflare (interception เปิด) | 46,841 bytes = ทั้งหน้า, `x-opennext-cache: HIT` | ไม่มี |
| `next start` บนเครื่อง | 1,232 bytes = tree จริง | `x-nextjs-postponed: 2` |

## What Changed / สิ่งที่เปลี่ยนแปลง

* `apps/web/open-next.config.ts`: เอา `enableCacheInterception: true` ออก พร้อมคอมเมนต์อธิบายว่าทำไมต้องปิดไว้

## Why / เหตุผล

* Next 16.3.3 ไม่มี flag ให้ปิด segment cache ฝั่ง client แล้ว (`experimental.clientSegmentCache` ถูกถอดออก) จึงแก้ที่ฝั่ง client ไม่ได้
* ทางเลือกอื่นคือตั้ง `experimental.prefetchInlining: false` ใน `next.config.ts` เพื่อให้เงื่อนไขของ interceptor ผ่าน แต่เป็นการปิด optimization ของ Next เพื่ออ้อม bug ของ OpenNext และยังต้องหวังว่าเส้นทาง segment ที่เหลือของ interceptor ถูกต้อง การปิด interception ตรงไปตรงมากว่าและเป็น diff ที่เล็กกว่า
* ราคาที่จ่ายคือ request ของหน้า HTML ต้องผ่าน Next server แทนที่จะตอบจาก cache asset ตรงๆ ซึ่งกินเวลา CPU มากขึ้น (Workers Free จำกัด 10 ms) แต่ยังเป็นการอ่านจาก incremental cache ไม่ได้ render ใหม่ และแลกกับ request ที่ลดลงหลายพันเท่า

## Files Changed / ไฟล์ที่แก้ไข

* `apps/web/open-next.config.ts`

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

* Chrome headless + CDP บันทึกทุก request 20 วินาที: Cloudflare 1,346 (ไม่หยุด) เทียบกับ `next start` 53 (หยุด)
* `curl` เทียบ response ของ `/_tree` ระหว่าง Cloudflare กับ `next start` ตามตารางใน Root Cause
* อ่าน `cacheInterceptor.js` ใน `node_modules` ยืนยันเส้นทางที่ตกไปคืน payload ทั้งหน้า
* อ่าน `.next/required-server-files.json` ยืนยันว่า `experimental.prefetchInlining` ถูกตั้งมาจาก Next เอง ไม่ได้มาจาก config ของ Project

### Result / ผลการทดสอบ

* Passed (เท่าที่ตรวจได้บนเครื่องนี้ ดูข้อจำกัดด้านล่าง)

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* **ยังไม่ได้ deploy และวัดซ้ำบน Cloudflare จริง** `opennextjs-cloudflare build` ล้มที่ `EPERM: operation not permitted, symlink` เพราะ build บน Windows ไม่ได้ (เปิด Developer Mode แล้วก็ยังล้ม ดู [0011](../../decisions/0011-cloudflare-workers-hosting.md#windows)) Developer ต้อง deploy ผ่าน Workers Builds หรือ Docker ตาม 0011 แล้ววัดซ้ำ
* หลักฐานที่มีคือ root cause ที่อ่านจาก source ของ OpenNext ตรงกับ response จริงของ Cloudflare และเทียบ A/B กับ `next start` ซึ่งไม่มี interceptor แล้วไม่วน

## Debug / Continue

1. หลัง deploy ให้วัดซ้ำ: เปิด DevTools แท็บ Network ทิ้งไว้ 20 วินาที ต้องนิ่ง หรือใช้ `curl` เช็กว่า `/blog` พร้อม header `Next-Router-Segment-Prefetch: /_tree` ตอบ body สั้น (~1.2 KB) และมี `x-nextjs-postponed: 2`
2. ถ้าเจอ `Error 1102 Worker exceeded CPU` หลังปิด interception แปลว่าค่า CPU ของ Workers Free ไม่พอ ทางแก้คืออัป Workers Paid หรือกลับไปหา interception เมื่อ OpenNext แก้เงื่อนไข `prefetchInlining` แล้ว
3. เมื่ออัป `@opennextjs/cloudflare` ในอนาคต ให้เช็กว่า `getBodyForAppRouter` ยังมีเงื่อนไข `!NextConfig.experimental?.prefetchInlining` อยู่ไหม ถ้าไม่มีแล้วจึงเปิด `enableCacheInterception` กลับได้ และต้องวัดซ้ำตามข้อ 1
4. เรื่องรูปและขนาดหน้าที่เห็นระหว่างตรวจ ตามต่อแล้วใน `2026-09-16-gallery-image-sizes.md`

## Evidence / หลักฐาน

```yaml
evidence:
  task:
    id: "2026-09-16-cloudflare-prefetch-loop"
    type: "bug-fix"
    risk: "medium"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 1
    duration_minutes: 40  # estimated
  verification:
    typecheck: "pass"
    lint: "pass"
    test: "none"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "root cause traced to OpenNext cacheInterceptor skipping segment responses when Next 16.3 sets experimental.prefetchInlining; confirmed by comparing the /_tree response on Cloudflare (full 46,841-byte page payload) with next start (1,232-byte tree + x-nextjs-postponed: 2), and by CDP request counts 1,346 vs 53 in 20s"
  failure:
    occurred: false
    category: "none"
    reason: "none"
  human:
    intervention: true
    type: "deploy"
    reason: "opennextjs-cloudflare build does not work on Windows (decision 0011); Developer must deploy via Workers Builds or Docker and re-measure"
  files_changed: 1
```
