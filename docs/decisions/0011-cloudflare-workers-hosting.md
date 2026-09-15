# 0011 — โฮสต์ apps/web บน Cloudflare Workers (OpenNext)

วันที่: 2026-09-16 · สถานะ: Implemented (ยังไม่ deploy จริง) · เกี่ยวกับ [0001](0001-website-phase-1.md), [0007](0007-quote-request-email.md)

## Decision

Developer เลือก Cloudflare Workers แพลนฟรี ผ่าน adapter `@opennextjs/cloudflare` ส่วนโดเมนจริงคือ `aphirakwater.com` (ยืนยัน 2026-09-16)

| ตัวเลือก | ผล | เหตุผล |
| --- | --- | --- |
| Vercel Hobby (ฟรี) | ไม่เลือก | เงื่อนไขของแพลนจำกัดให้ใช้ได้เฉพาะ "non-commercial, personal use only" ซึ่งเว็บของ หจก. ขัดเงื่อนไข |
| Vercel Pro | ไม่เลือก | $20 ต่อคนต่อเดือน |
| **Cloudflare Workers Free** | **เลือก** | $0 (มีแพลน Paid $5/เดือนเมื่อจำเป็น) · request ไปยังไฟล์ static ฟรีไม่จำกัด · หน้าราคาไม่ได้ห้ามใช้เชิงพาณิชย์ |

## ตั้งค่า

| ไฟล์ | หน้าที่ |
| --- | --- |
| `apps/web/wrangler.jsonc` | ตั้งชื่อ Worker `aphirakwater-web`, ใช้ `nodejs_compat`, ผูก binding `ASSETS` และ `IMAGES` (สำหรับ `next/image`) และเปิด observability |
| `apps/web/open-next.config.ts` | ใช้ incremental cache แบบ static assets (อ่านอย่างเดียว) และเปิด `enableCacheInterception` |
| `apps/web/public/_headers` | ให้ `/_next/static/*` cache ได้ 1 ปี (immutable) |
| `apps/web/package.json` | script `preview` และ `deploy` |
| `pnpm-workspace.yaml` | อนุญาต build script ของ `esbuild` และ `workerd` |

* **Cache อ่านอย่างเดียว:** ทุกหน้าเนื้อหาสร้างไว้ล่วงหน้าตอน build และไม่มี revalidate จึงไม่ต้องใช้ R2 ส่วน cache interception ตอบหน้าเหล่านี้โดยไม่บูต Next ช่วยให้ใช้ CPU ต่อ request น้อย (แพลนฟรีจำกัด 10 ms)
* **ข้อจำกัด:** แก้เนื้อหาแล้วต้อง build และ deploy ใหม่ ถ้าในอนาคต CMS ต้องเผยแพร่โดยไม่ build ใหม่ ให้เปลี่ยนไปใช้ R2 incremental cache
* **หน้าที่รันบน Worker ทุก request:** `/quote` (อ่าน `searchParams`) และ `POST /api/quote`
* **Env:** `NEXT_PUBLIC_SITE_URL` ไม่ต้องตั้ง เพราะค่า default เป็น `https://aphirakwater.com` แล้ว ส่วน `RESEND_API_KEY`, `QUOTE_EMAIL_TO` และ `QUOTE_EMAIL_FROM` ให้ตั้งเป็น Variables & Secrets ของ Worker (runtime) ไม่ใช่ build variable

## Windows

`opennextjs-cloudflare build` ใช้บน Windows ไม่ได้ (ทดสอบ 2026-09-16):

1. ถ้ายังไม่เปิด Developer Mode จะสร้าง symlink ไม่ได้ (EPERM)
2. เปิด Developer Mode แล้วก็ยังพัง เพราะ pnpm บน Windows ใช้ junction ที่ชี้ path แบบเต็ม bundle จึงวิ่งกลับไปที่ `node_modules` ต้นฉบับแล้วดึง `sharp` (native `.node`) เข้ามา ทำให้ esbuild ล้ม

build จึงต้องทำบน Linux: Cloudflare Workers Builds, WSL หรือ Docker

## วิธี deploy

**ทางหลัก: Workers Builds (build บน Linux ทุกครั้งที่ push `main`)**

1. push repo ขึ้น GitHub
2. ใน Cloudflare dashboard ไปที่ Workers & Pages → Create → Import a repository แล้วตั้งค่า:
   * Worker name `aphirakwater-web` (ต้องตรงกับ `wrangler.jsonc`)
   * Root directory `apps/web`
   * Build command `pnpm exec opennextjs-cloudflare build`
   * Deploy command `pnpm exec opennextjs-cloudflare deploy`
3. ไปที่ Worker → Settings → Variables & Secrets แล้วตั้ง `RESEND_API_KEY` (Secret), `QUOTE_EMAIL_TO` และ `QUOTE_EMAIL_FROM`

**ทางสำรอง: deploy จากเครื่อง Windows ด้วย Docker** (ต้องมี API token ที่มีสิทธิ์ "Edit Cloudflare Workers")

```powershell
docker run --rm -e CLOUDFLARE_API_TOKEN=<token> -e CLOUDFLARE_ACCOUNT_ID=<id> -v "${PWD}:/src:ro" node:22-bookworm bash -c 'mkdir /app && tar -C /src --exclude=node_modules --exclude=.next --exclude=.open-next --exclude=.turbo --exclude=.git -cf - . | tar -C /app -xf - && cd /app && corepack enable && CI=true pnpm install --frozen-lockfile && cd apps/web && pnpm run deploy'
```

ต้องรันจาก root ของ repo ขั้นคัดลอกไฟล์, install และ build ในคำสั่งนี้ทดสอบแล้ว แต่ขั้น deploy ยังไม่ได้รันจริงเพราะยังไม่มี token ถ้าต้องการ preview ในเครื่อง ให้ build ใน container แล้วรัน `opennextjs-cloudflare preview` โดยให้ wrangler ฟังที่ `0.0.0.0` และเพิ่ม `-p 8787:8787`

**ห้ามรัน `wrangler dev` ตรงๆ หลัง build** เพราะจะข้ามขั้น `populateCache` หน้า `[slug]` (ซึ่งตั้ง `dynamicParams = false`) จะขึ้น 404 และหน้าอื่นจะ render ใหม่ทุก request ให้ใช้ `preview` หรือ `deploy` ซึ่งทำขั้นนี้ให้

## ผูกโดเมน

1. ซื้อ `aphirakwater.com` (Cloudflare Registrar ขายราคาทุน) หรือย้าย nameserver ของโดเมนมาที่ Cloudflare
2. ไปที่ Worker → Settings → Domains & Routes แล้วเพิ่ม Custom Domain `aphirakwater.com`
3. ทำ redirect `www.aphirakwater.com` → `aphirakwater.com` ด้วย Redirect Rule
4. verify โดเมนใน Resend แล้วตั้ง `QUOTE_EMAIL_FROM` เป็นอีเมลในโดเมนนี้ (ดู [0007](0007-quote-request-email.md))

## ยังไม่ได้ทำ / ต้องเฝ้าดู

* ยังไม่ได้วัด CPU จริงบน Cloudflare เพราะ `wrangler dev` ไม่บังคับลิมิต 10 ms ถ้า log ของ Worker มี "Exceeded CPU" (error 1102) ที่ `/quote` หรือ `/api/quote` ให้อัปเป็น Workers Paid ($5/เดือน)
* Cloudflare Images แพลนฟรีให้ 5,000 unique transformations ต่อเดือน เว็บมีรูปต้นฉบับประมาณ 20 รูป
* หน้า 404 บน Worker มาจาก cache ที่สร้างไว้ล่วงหน้า จึงได้ `<title>` เป็นชื่อหน้าหลัก ไม่ใช่ "404: This page could not be found." แต่ status 404, เนื้อหา และ `noindex` เหมือน `next start`
* `apps/admin` ยังไม่ deploy (ยังไม่มี login ตาม 0002)
