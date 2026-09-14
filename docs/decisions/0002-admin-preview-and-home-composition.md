# 0002 — Admin โหมดตัวอย่าง + ปรับ composition หน้าหลัก

วันที่: 2026-09-14 · สถานะ: Implemented (ยังไม่ commit) · ต่อจาก [0001](0001-website-phase-1.md)

## Decisions (Developer เป็นผู้เลือก)

| # | เรื่อง | ตัดสินใจ |
| --- | --- | --- |
| 1 | Admin รอบนี้ | ทำ UI ตามดีไซน์ อ่านเนื้อหาจริงจาก `@workspace/shared` ยังไม่บันทึก และยังไม่มี login — **ห้าม deploy apps/admin** |
| 2 | ขอบเขต Admin | Shell + Dashboard + Landing Pages + Page Builder; เมนูอื่นแสดงเป็น "เร็วๆ นี้" |
| 3 | ช่องทางรับคำขอใบเสนอราคา | ยังไม่ตัดสินใจ `POST /api/quote` คงตอบ 503 |
| 4 | หน้าหลัก | ปรับ composition เป็น Asymmetric + Overlap + Full-width Visual (คำขอ Developer) |

## Admin (`apps/admin`, port 3001)

* `features/shell` — sidebar ตามดีไซน์ (active ตาม route, มือถือเป็น Sheet), topbar, ป้าย "โหมดตัวอย่าง"
* `features/dashboard` — ตัวเลขจากเนื้อหาจริง, "งานที่ควรทำต่อ" = SEO check ที่ไม่ผ่านจริง, กิจกรรมล่าสุดเป็น empty state (ยังไม่มี login)
* `features/landing-pages` — ตาราง + ค้นหา/กรองแบบ live (client-side), SEO Health, Google Search Preview; ข้อที่แก้ได้ลิงก์ไปช่องใน builder (`#seoTitle`, `#metaDescription`)
* `features/page-builder` — บล็อกเริ่มต้นสร้างจากโครงหน้าจริงของแต่ละ template; เพิ่ม/เลื่อน/ซ่อน/ทำซ้ำ/ลบ (มี confirm dialog) ใน zustand store; Inspector แก้หัวข้อ/พื้นหลัง; ฟอร์ม SEO (react-hook-form + zod) พร้อมตัวนับและ preview สด; Publish ปิดไว้, Preview เปิดหน้าจริง
* `robots: noindex` ทั้งแอป, dev/start ใช้ port 3001 (web ใช้ 3000)

### SEO score (`packages/shared/src/seo.ts`)

คะแนน = check ที่ผ่าน / 9 × 100 ตามเกณฑ์ใน design handoff คำนวณจากเนื้อหาจริง ไม่ใช่ตัวเลขสมมติ:

* Title 30–65, Description 70–160, H1, Canonical absolute, OG image (ยังไม่มี → ไม่ผ่าน)
* Internal links: นับปลายทางที่เป็นหน้าเนื้อหาจริง ไม่นับ `/quote` และหน้าตัวเอง (ต้อง ≥ 3)
* ความยาว ≥ 800 คำ นับด้วย `Intl.Segmenter("th")` เพราะภาษาไทยไม่เว้นวรรค
* Structured data: ดูว่า JSON-LD builder ขาด key ที่ Google ต้องใช้หรือไม่ (Article ยังขาด `image`)
* Alt text: ภาพที่ยังเป็น placeholder นับว่าไม่ผ่าน

ผลตอนนี้: hotel-water 56, phuket 56, phuket-dry-season 44 (ไม่ผ่าน: OG image, internal links, ความยาว, alt; บทความขาด `image` ใน schema เพิ่ม) เพราะยังไม่มีรูปจริงและมีหน้าเนื้อหาน้อย — เป็นตัวเลขที่ถูกต้อง ไม่ใช่บั๊ก

`packages/shared/src/self-check.ts` (`pnpm --filter @workspace/shared test`) ตรวจ quote schema, `resolveRef`, การนับคำ และสูตรคะแนน

## หน้าหลัก (composition ใหม่)

* Hero: หัวข้อซ้าย, ภาพล้นไปขอบขวาของจอ (เริ่มที่กลางหน้า = คอลัมน์ 7) และห้อยลงทับแถบตัวเลข, กล่อง CTA กว้าง 7 คอลัมน์ทับขอบซ้ายของภาพ; มือถือ: ภาพเต็มจอแล้วกล่อง CTA ทับขอบล่าง
* แถบตัวเลขชิดซ้ายครึ่งหน้า (ภาพไม่บังตัวเลข)
* บริการ: หัวข้อ sticky ซ้าย 4/12, บริการที่มีหน้าจริงเป็นบล็อกเด่น ที่เหลือเป็นรายการ
* ทำไมต้องเลือกเรา: แถบภาพเต็มความกว้าง + panel เขียวเข้มดึงขึ้นทับฝั่งขวา; เปลี่ยนเลข 01–04 เป็นเครื่องหมายถูก (ไม่ใช่ลำดับขั้นตอน)
* พื้นที่ให้บริการ: แถบ tint เต็มความกว้าง แบ่งตามจังหวัด; ตารางราคาดึงขึ้นทับขอบล่างของแถบ
* รีวิว: รีวิวแรกใหญ่ อีกสองรายการในคอลัมน์ข้าง · FAQ: หัวข้อซ้าย คำถามขวา + ลิงก์โทร · CTA: แถบเต็มความกว้าง
* ตัดการ์ดลอย "1,000+" ออก (ซ้ำกับแถบตัวเลข), ตัด gradient ของ hero
* แก้บั๊กเดิม: header ที่ 900–1279px เมนูตกบรรทัด → ซ่อนเบอร์โทรช่วงนั้น (ยังมีใน sticky CTA/เมนู)

## Verification

* `pnpm typecheck`, `pnpm lint`, `pnpm build` (web + admin) ผ่าน, shared self-check ผ่าน
* Admin ใน Chrome headless: เพิ่ม/เลื่อน (ปุ่มขึ้น-ลงปิดที่หัว-ท้าย)/ซ่อน/ทำซ้ำ/ลบผ่าน dialog ทำงาน, ค้นหา "phuket" ได้ 2 แถว, ค้นหาไม่เจอแสดง empty state, SEO title สั้นแสดง error และ preview อัปเดต, ไม่มี console error; screenshot light/dark/390px
* หน้าหลัก: screenshot 1440 / 1024 / 390 และ dark, ไม่มี horizontal overflow, H1 = 1 และ JSON-LD ยังครบทุกหน้า

## Next steps

1. เลือก backend + login ก่อนเปิด admin ใช้งานจริง แล้วต่อ store ของ builder เข้า API (autosave, optimistic lock)
2. Search/filter ของ Landing Pages ย้ายไป server + sync ลง URL เมื่อมีหน้าเกิน ~50
3. Admin เมนูที่เหลือ (collection / settings / media / sitemap / navigation) ตาม pattern ใน prototype
4. เมื่อได้รูปจริง: ใส่ใน hero/แถบภาพเต็มจอ ด้วย `next/image` (hero ใช้ `priority`) และตรวจ contrast ของกล่องที่ทับภาพ
