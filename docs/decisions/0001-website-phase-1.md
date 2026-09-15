# 0001 — เว็บไซต์ลูกค้า Phase 1 (จากดีไซน์ Claude Design)

วันที่: 2026-09-14 · สถานะ: Implemented (ยังไม่ commit)

ดีไซน์และ requirement ต้นทาง: `docs/requirements/design-handoff/` (เปิด `Apirak Water.dc.html` ในเบราว์เซอร์เพื่อดู prototype)

## Decisions (Developer เป็นผู้เลือก)

| # | เรื่อง | ตัดสินใจ | เหตุผล |
| --- | --- | --- | --- |
| 1 | ขอบเขตรอบนี้ | เว็บลูกค้า 5 หน้าใน `apps/web` ก่อน Admin ทำรอบถัดไป | ดีไซน์ใหญ่ ทำเป็นเฟส |
| 2 | ที่มาของเนื้อหา | ไฟล์ TypeScript + zod ใน `packages/shared/src/*.ts` ยังไม่ใช้ CMS | CLAUDE.md ห้ามเพิ่ม framework (Payload/Strapi) และ backend ยังไม่เลือก schema ใช้ต่อกับ CMS ได้ |
| 3 | ขอบเขตธุรกิจ | ดีไซน์ถูก: เว็บ SEO + ขอใบเสนอราคา + CMS ไม่ใช่ระบบออเดอร์น้ำดื่ม | แก้คำอธิบายใน CLAUDE.md / README แล้ว |
| 4 | README handoff กับ prototype ไม่ตรงกัน | หน้าตาและเนื้อหายึด prototype, พฤติกรรม (responsive, hamburger, a11y, validation, states) ยึด README | |
| 5 | ลิงก์ไปหน้าที่ยังไม่มี | ลิงก์เฉพาะหน้าที่มีจริง ที่เหลือไป `/quote` (ผ่าน `resolveRef()`), เมนู บริการ→`/#services`, พื้นที่→`/#areas`, บทความ→`/blog`, ติดต่อเรา→`/quote`, ซ่อน "เกี่ยวกับเรา" | ไม่มี 404 และไม่สร้างหน้า duplicate content |
| 6 | ฟอร์มขอใบเสนอราคา | ทำครบ (validation, loading, success, error) แต่ `POST /api/quote` ยังตอบ 503 ให้ลูกค้าโทร | ยังไม่มีช่องทางรับคำขอ ห้ามให้ลูกค้าเข้าใจว่าส่งสำเร็จ |
| 7 | ข้อมูลที่ยังไม่ยืนยัน | ใส่ตาม prototype ไว้ก่อน | ต้องยืนยันก่อนขึ้นจริง (ดูด้านล่าง) |
| 8 | ธีม | มี dark theme (ดีไซน์ไม่มี คิดสีจากเขียวแบรนด์) ตาม `prefers-color-scheme` + hotkey `d` เดิม | |

## Implementation notes

* Brand tokens อยู่ใน `packages/ui/src/styles/globals.css` (light = ค่าจากดีไซน์, dark = ค่าที่คิดเพิ่ม)
* ฟอนต์ Anuphan (หัวข้อ, `--font-heading`) + IBM Plex Sans Thai (เนื้อหา, `--font-sans`) ผ่าน `next/font`
* FAQ ใช้ `<details name>` (native) ได้ single-open โดยไม่มี JS และคำตอบอยู่ใน DOM ตลอดตาม requirement SEO
* ฟีเจอร์ใน `apps/web/features/`: `site`, `home`, `services`, `areas`, `quote`, `blog` — การ์ดบริการอยู่ใน `services` แล้วส่งเข้าหน้า home/area ผ่าน slot prop จาก route (ไม่ import ข้ามฟีเจอร์)
* Component ใหม่ใน `@workspace/ui`: `faq-list`, `check-list`, `image-placeholder`, `info-table` + shadcn `input`, `textarea`, `native-select`, `label`, `sheet`; `button` เพิ่ม variant `call`, `call-outline`, `soft`, `on-dark` และ size `cta`, `cta-sm`, `nav`
* ตัดป้าย "Service · /services/hotel-water" และ "Area · /areas/phuket" ออก เพราะเป็นป้ายอธิบายของ prototype
* ปุ่มหน้าหลัก "ดูหน้าพื้นที่ทั้งหมด" เปลี่ยนเป็น "ดูหน้าพื้นที่ภูเก็ต" เพราะยังไม่มีหน้ารวมพื้นที่
* SEO title / meta description ของหน้า area, quote, blog เป็นร่างที่เรียบเรียงจากเนื้อหาในดีไซน์ ควรให้เจ้าของตรวจ

## SEO layer (เพิ่ม 2026-09-14)

* `NEXT_PUBLIC_SITE_URL` ตรวจด้วย zod ใน `apps/web/lib/env.ts` ค่า default คือโดเมนจริง `https://apirakwater.com` (Developer ยืนยัน 2026-09-15 · เดิมเป็นโดเมนตัวอย่าง `apirakwater.co.th` จาก prototype)
* ทุกหน้า: `metadataBase`, canonical, Open Graph (`apps/web/lib/metadata.ts`) และ JSON-LD `WebSite` + `LocalBusiness` จาก layout
* ต่อหน้า: home `FAQPage` · service `Service` + `FAQPage` · area `Service` (areaServed + zones) + `FAQPage` · article `Article` · ทุกหน้าที่มี breadcrumb ได้ `BreadcrumbList` จาก component `Breadcrumbs`
* JSON-LD builders อยู่ใน `packages/shared/src/jsonld.ts` (admin ใช้ตรวจ Structured Data ได้), render ด้วย `@workspace/ui/components/json-ld` ซึ่ง escape `<`
* `app/sitemap.ts` สร้างจากหน้าที่มีเนื้อหาจริง, `app/robots.ts` กัน `/api/`, favicon/apple-icon ใช้โลโก้ (ลบ favicon default ของ Next ใน web)

## ต้องยืนยันกับเจ้าของก่อนขึ้นจริง

* ~~โดเมนจริง~~ `apirakwater.com` (ยืนยันแล้ว), ที่อยู่ + พิกัด (Google ต้องใช้ `address` สำหรับ LocalBusiness rich result), รูปปกบทความ (Article rich result ต้องมี `image`), OG image 1200×630
* ~~LINE ID~~ ยืนยันแล้ว 2026-09-15: ลิงก์ `https://lin.ee/QIz0w65` (ID `@789oxtwd`, ค่าเดิม `@0874181199` ผิด) พร้อม WhatsApp, Facebook, YouTube, TikTok (`packages/shared/src/site.ts`)
* ตัวเลข trust 10+ / 1,000+ และรีวิวลูกค้า 3 รายการ (ตัวเลข "12 พื้นที่" ขัดกับรายการพื้นที่ 8 แห่ง จึงเปลี่ยนเป็น "2 จังหวัด ภูเก็ต · พังงา" ตามข้อมูลที่ยืนยันแล้ว 2026-09-15) (`packages/shared/src/home.ts`)
* รูปจริงทุกช่อง (ตอนนี้เป็น `ImagePlaceholder`) และ Google Maps
* ช่องทางรับคำขอใบเสนอราคา (อีเมล / LINE / database)

## ยังไม่ได้ทำ (Next steps)

1. ต่อช่องทางรับคำขอใน `apps/web/app/api/quote/route.ts` (จุดที่มีคอมเมนต์ `ponytail:`) แล้วคืน `{ ok: true, reference }` + reCAPTCHA + GA4 `generate_lead`
2. ~~SEO layer~~ ทำแล้ว (ดูหัวข้อ SEO layer) เหลือ: redirects, OG image, validate กับ Google Rich Results Test หลังได้โดเมนจริง
3. แทน placeholder ด้วย `next/image` เมื่อได้รูป, favicon/OG image จากโลโก้
4. เนื้อหาหน้า service/area อื่น (เขียนใหม่ทุกหน้า) — เพิ่มใน `servicePages` / `areaPages` แล้วลิงก์จะเปลี่ยนจาก `/quote` เป็นหน้าจริงเอง
5. Admin (`apps/admin`): Landing Pages list, Page Builder, SEO panel ตามดีไซน์
6. ยังไม่มี test runner ในโปรเจกต์ — logic ที่ควรมี test แรก: `quoteRequestSchema` (เบอร์โทร, วันที่ย้อนหลัง) และ `resolveRef`

## Verification ที่ทำแล้ว

* `pnpm --filter web typecheck`, `lint`, `build` ผ่าน (ทุกหน้าเป็น static ยกเว้น `/api/quote`)
* `@workspace/ui` typecheck และ `@workspace/shared` typecheck/lint ผ่าน
* `next start` แล้วเช็ก: 6 หน้าได้ 200, `/services/pool-water` ได้ 404; `POST /api/quote` ข้อมูลผิด → 400 พร้อมข้อความไทย, ข้อมูลถูก → 503
* Screenshot ด้วย Chrome headless: desktop 1280 / mobile 390 ทุกหน้า, dark mode หน้า home และ service, เปิดเมนูมือถือ, กดส่งฟอร์มว่าง (error ใต้ field) และส่งฟอร์มที่ถูกต้อง (แถบ error 503 และข้อมูลที่กรอกยังอยู่)
* SEO layer: build แล้วดึง HTML จริงทุกหน้า — H1 = 1 ต่อหน้า, canonical/og:url ถูก path, JSON-LD parse ได้ทุกก้อน, `/robots.txt` `/sitemap.xml` `/icon.jpg` ได้ 200
* ยังไม่ได้ทดสอบ: Safari/Firefox จริง, screen reader, Lighthouse/Core Web Vitals, Google Rich Results Test (ต้องมี URL สาธารณะ)
