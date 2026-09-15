# Development Handoff

# สรุปการส่งต่องาน

## Task / งาน

chore: เตรียม apps/web ให้ deploy บน Cloudflare Workers (OpenNext) และเปลี่ยนโดเมนเป็น aphirakwater.com

Risk / ความเสี่ยง: medium (เพิ่ม dependency และเปลี่ยน build และโฮสต์ ไม่แตะโค้ดหน้าเว็บ) · กำหนดก่อนเริ่มงาน

## What Was Requested / สิ่งที่ได้รับมอบหมาย

Developer ถามว่าขึ้น Vercel แพลนฟรีพร้อมโดเมน aphirakwater.com ได้หรือไม่ ผมตอบว่า Hobby ห้ามใช้เชิงพาณิชย์ Developer จึงถามราคา Cloudflare แล้วตอบว่า "โอเคใช้ cloudflare" และยืนยันตัวสะกดโดเมน `aphirakwater.com`

Goal: build `apps/web` เป็น Cloudflare Worker ได้ ทุกหน้าและฟอร์มขอใบเสนอราคาทำงานเหมือน `next start` และมีขั้นตอน deploy และผูกโดเมนให้ Developer ทำต่อเองได้

Scope: เฉพาะ `apps/web` ไม่ deploy จริง (ต้องใช้บัญชี Cloudflare ของ Developer) และไม่แตะ `apps/admin`

## What Changed / สิ่งที่เปลี่ยนแปลง

* **dependency:** เพิ่ม `@opennextjs/cloudflare` 1.20.6 และ `wrangler` 4.132.0 (dev) ใน `apps/web`
* **ไฟล์ตั้งค่าใหม่:**
  * `wrangler.jsonc`: binding `ASSETS` และ `IMAGES`, `nodejs_compat`, observability
  * `open-next.config.ts`: static assets incremental cache และ cache interception
  * `public/_headers`
* **script:** `preview` และ `deploy` ใน `apps/web/package.json`
* **ไฟล์ของ monorepo:**
  * `pnpm-workspace.yaml`: อนุญาต build script ของ `esbuild` และ `workerd`
  * `.gitignore`: ignore `.open-next`, `.wrangler` และ `.dev.vars*` และลบ `.vercel` ออก
  * eslint base: ignore `.open-next/**` และ `.wrangler/**`
* **โดเมน:** ค่า default ของ `NEXT_PUBLIC_SITE_URL` เปลี่ยนเป็น `https://aphirakwater.com` (เดิมเป็น `apirakwater.com` ไม่มี h) และแก้ decision 0001 ให้ตรง
* **เอกสาร:**
  * decision `0011-cloudflare-workers-hosting.md`: เหตุผล ขั้นตอน deploy วิธีผูกโดเมน และข้อจำกัด
  * README: คำสั่ง deploy

## Why / เหตุผล

* Vercel Hobby จำกัดให้ใช้ได้เฉพาะ non-commercial ส่วน Cloudflare Workers Free ไม่มีข้อห้ามนี้ในหน้าราคา
* ใช้ cache อ่านอย่างเดียวจากไฟล์ที่ build ไว้ เพราะไม่มี revalidate จึงไม่ต้องสมัคร R2 และ cache interception ช่วยลด CPU ต่อ request
* ไม่เพิ่ม `initOpenNextCloudflareForDev()` ใน `next.config.ts` เพราะโค้ดไม่ได้เรียก binding ของ Cloudflare
* build บน Windows ไม่ได้ (ดู Known Issues) จึงทดสอบใน Docker ที่เป็น Linux แทน

## Files Changed / ไฟล์ที่แก้ไข

* `apps/web/package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`
* `apps/web/wrangler.jsonc`, `apps/web/open-next.config.ts`, `apps/web/public/_headers`
* `.gitignore`, `packages/eslint-config/base.js`
* `packages/shared/src/env.ts`
* `docs/decisions/0001-website-phase-1.md`, `docs/decisions/0011-cloudflare-workers-hosting.md`, `README.md`

## Architecture / Data Impact

* เปลี่ยนโฮสต์เป้าหมายเป็น Cloudflare Workers (บันทึกเป็น decision 0011)
* canonical, sitemap และ JSON-LD เปลี่ยนไปใช้โดเมน `aphirakwater.com`

## Verification / การตรวจสอบ

### Verification Commands / คำสั่งตรวจสอบ

Attempts / จำนวนรอบ: 1 (รันซ้ำหลังเปลี่ยนโดเมนก็ผ่าน)

| Command / คำสั่ง | Result / ผล |
| --- | --- |
| pnpm typecheck | pass |
| pnpm lint | pass |
| none (test) | none (รัน `pnpm --filter @workspace/shared test` เพิ่ม: pass) |
| pnpm build | pass |

Baseline: None

### Tests / การทดสอบ

build Worker ใน container `node:22-bookworm` ด้วย `opennextjs-cloudflare build` แล้วรัน `populateCache local` และ `wrangler dev`:

* **หน้าเว็บ:** `/`, `/services/hotel-water`, `/areas/phuket`, `/blog`, `/blog/phuket-dry-season`, `/quote` และ `/quote?service=hotel-water` ได้ 200 และ title ถูก หน้า static ตอบใน ~10 ms และไม่มี error ใน log
* **canonical และ sitemap:** ใช้ `https://aphirakwater.com`
* **Cache header:** `/_next/static/*.js` ได้ `Cache-Control: public,max-age=31536000,immutable`
* **รูป:** `/_next/image?url=/logo.png&w=48` ได้ 200 เป็น `image/webp`
* **`POST /api/quote`:**
  * ข้อมูลถูกและยังไม่ตั้ง env → 503 พร้อมข้อความให้โทร
  * `elapsedMs` 100 → 400 (too-fast)
  * ตั้ง `RESEND_API_KEY` ปลอมใน `.dev.vars` → 502 และ log `Resend 401 API key is invalid` แสดงว่า env ถึง `process.env` และ Worker เรียก Resend ได้
* **404:** status, เนื้อหา และ `noindex` เหมือน `next start` ต่างกันแค่ `<title>`
* **ขนาด:** `wrangler deploy --dry-run` ได้ 7278 KiB (gzip 1483 KiB)

### Result / ผลการทดสอบ

* Passed (ในเครื่องผ่าน Docker) · ยังไม่ได้ deploy ขึ้น Cloudflare จริง

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

* ยังไม่ได้วัด CPU จริงบน Cloudflare เพราะ `wrangler dev` ไม่บังคับลิมิต 10 ms
* ยังไม่ได้ทดสอบ Workers Builds, คำสั่ง deploy และการผูกโดเมน เพราะต้องใช้บัญชีของ Developer
* ในโหมด local รูปผ่าน Images binding แบบ local ไม่ใช่ Cloudflare Images จริง

## Decision / การตัดสินใจ

* **Decision:** PASS
* **Reason / เหตุผล:** คำสั่งตรวจสอบผ่านรอบแรก Worker build และทำงานได้ครบทุก route ใน Linux ขั้น deploy จริงเป็นงานของ Developer ตาม decision 0011
* **Human intervention / การแทรกแซงของ Developer:** Developer เปิด Windows Developer Mode ให้ (แก้ symlink EPERM ได้ แต่ build ยังล้มด้วยปัญหาอื่นบน Windows) และยืนยันตัวสะกดโดเมน

## Known Issues / ปัญหาที่ทราบ

* build Worker บน Windows ไม่ได้: หลังเปิด Developer Mode, pnpm junction ที่ชี้ path แบบเต็มยังทำให้ `sharp` ถูกดึงเข้า bundle ต้อง build บน Linux (Workers Builds, WSL หรือ Docker)
* ห้ามรัน `wrangler dev` ตรงๆ หลัง build เพราะจะข้าม `populateCache` หน้า `[slug]` จะขึ้น 404 (`NoFallbackError`)
* `<title>` ของหน้า 404 บน Worker เป็นชื่อหน้าหลัก

## Debug / Continue

1. หน้า `[slug]` ขึ้น 404 บน Worker: cache ยังไม่ถูก populate → รัน `opennextjs-cloudflare preview` หรือ `deploy` ไม่ใช่ `wrangler dev` ตรงๆ
2. ฟอร์มตอบ 503 บน production: ยังไม่ได้ตั้ง Variables & Secrets ของ Worker (ต้องตั้งเป็น runtime ไม่ใช่ build variable)
3. log มี "Exceeded CPU" (1102): อัปเป็น Workers Paid
4. แก้เนื้อหาแล้วเว็บไม่เปลี่ยน: cache อ่านอย่างเดียว → push หรือ deploy ใหม่

## Next Steps / ขั้นตอนต่อไป

1. ซื้อโดเมน `aphirakwater.com`
2. push repo ขึ้น GitHub
3. สร้าง Worker ผ่าน Workers Builds (ค่าต่างๆ ใน decision 0011)
4. ตั้ง secret ของ Resend
5. เพิ่ม Custom Domain และ redirect www
6. verify โดเมนใน Resend แล้วส่งฟอร์มทดสอบจริง

## Evidence / หลักฐาน

```yaml
evidence:
  task:
    id: "2026-09-16-cloudflare-workers-hosting"
    type: "chore"
    risk: "medium"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 1
    duration_minutes: 70  # estimated
  verification:
    typecheck: "pass"
    lint: "pass"
    test: "none"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "attempt 1: all Verification Commands pass; worker built on Linux serves every route with correct status, quote API reaches Resend with worker env; real deploy left to Developer"
  failure:
    occurred: true
    category: "environment"
    reason: "OpenNext build fails on Windows (symlink EPERM, then pnpm absolute junctions pull sharp into the bundle); verified in a Linux container instead"
  human:
    intervention: true
    type: "unexpected"
    reason: "Developer enabled Windows Developer Mode and confirmed the domain spelling"
  files_changed: 13
```
