# 0004 — รูปจริง, background depth และ interactive service experience

วันที่: 2026-09-14 · สถานะ: Implemented (ยังไม่ commit) · ต่อจาก [0003](0003-scroll-storytelling-home.md)

คำขอของ Developer (ตามลำดับ):

1. นำรูปจาก `C:\Users\kchua\Desktop\งานพ่อ\images` มาใส่ใน landing page
2. พื้นหลังโล่งเกินไป → เพิ่ม depth ด้วยรูปทรงแนวน้ำ, gradient อ่อน, ตัวอักษรขนาดใหญ่, ลายคลื่นจางๆ โดยไม่รก
3. ทำหน้าเป็น interactive service experience — ให้ความสำคัญกับ usability และ conversion มากกว่า animation ตกแต่ง

## 1. รูปจริง

ไฟล์อยู่ที่ `apps/web/features/home/assets/` (static import → `next/image` สร้าง WebP/AVIF, ขนาดตาม `sizes`, blur placeholder, กัน CLS)

| ตำแหน่ง | ไฟล์ต้นทาง | ไฟล์ในโปรเจกต์ |
| --- | --- | --- |
| Hero (`loading="eager"`, `fetchPriority="high"`) | `24750_0.jpg` | `hero-truck.jpg` |
| แถบภาพเต็มจอ "ทำไมต้องเลือกเรา" | `34275_0.jpg` (รถ 3 คัน) | `fleet.jpg` |
| ส่วนใหม่ "ภาพจากงานจริง" | `24753_0`, `S__18620430_0`, `24754_0`, `S__18620428_0`, `34278_0` | `work-*.jpg` |

**ไม่ได้ใช้โดยตั้งใจ — ต้องถามเจ้าของ:**

* รถกระบะถังน้ำสีแดง (`24757`–`24762`) — ขัดกับ FAQ ที่บอกขั้นต่ำ 5,000 ลิตร ถ้ามีบริการรถเล็กจริงควรแก้ FAQ และเพิ่มบริการก่อน
* ภาพกลางคืนหน้าป้าย Wyndham Grand (`S__18972677`–`679`) — เห็นชื่อโรงแรม ต้องได้รับอนุญาตก่อนแสดง (ตาม design handoff)
* ภาพอื่นซ้ำมุมกัน

alt text และ caption ใน `packages/shared/src/home.ts` บรรยายสิ่งที่เห็นในภาพเท่านั้น ควรให้เจ้าของตรวจ

แก้เพิ่ม: โลโก้ใน header เลิกใช้ `priority` (deprecated ใน Next 16) เปลี่ยนเป็น `loading="eager"`

## 2. Background depth

Component ใน `apps/web/features/home/components/decor.tsx` (ทั้งหมด `aria-hidden`, `pointer-events-none`, อยู่หลังเนื้อหาด้วย `isolate` + `-z-10`):

* `WaveField` — ลายคลื่นจาก SVG mask บน `currentColor` (utility `wave-field` ใน `globals.css`) สีตามธีมทั้งสว่าง/มืด: ใต้ hero, ท้ายแถบพื้นที่ให้บริการ, แถบ CTA
* `WaterGlow` — radial gradient อ่อนมาก: หลัง hero, บริการ, FAQ
* `BigWord` — ตัวอักษรเส้นขอบขนาดใหญ่: "20,000" ใต้ขั้นตอนสุดท้าย (เลื่อนด้านข้างตาม scroll), "24 ชม." ในแถบ CTA
* บทขั้นตอนมีแถบ tint เต็มความกว้างแบบไล่จางขอบบน/ล่าง

วางไว้เฉพาะพื้นที่ว่าง ไม่ทับข้อความ (ตรวจด้วย screenshot แล้วย้ายตำแหน่ง "20,000" ออกจากหลังข้อความ)

## 3. Interactive service experience

* **ตัวเลือกบริการ** (`apps/web/features/services/components/service-explorer.tsx`, client): เลือกบริการ → panel sticky ด้านขวาแสดงขนาดรถที่เหมาะ (กดขนาดรถ = ไปฟอร์มพร้อมเลือกบริการ+ปริมาณ), รองรับสัญญารายเดือน, ข้อมูลที่ควรเตรียม, ปุ่มขอราคาบริการนั้น / โทร / ดูรายละเอียด (ถ้ามีหน้า); มือถือแสดงรายละเอียดใต้การ์ดและเลื่อนการ์ดขึ้นมาใต้ header
* **ตารางราคา**: แต่ละขนาดรถลิงก์ไป `/quote?volume=…`
* **ฟอร์มขอราคา**: อ่าน `?service=` / `?volume=` (ตรวจด้วย `quoteDefaultsSchema`, ค่าผิดถูกละทิ้ง) เลือกให้อัตโนมัติ และแสดง "เลือกไว้จากหน้าหลัก เปลี่ยนได้" จนกว่าจะเปลี่ยนค่า → `/quote` เป็น dynamic route แล้ว
* ข้อมูลขนาดรถ/สิ่งที่ควรเตรียมต่อบริการอยู่ใน `packages/shared/src/service.ts` (`volumes`, `monthlyContract`, `prepare`, `quoteType`) — **ร่าง** อิงจากตารางราคาหน้าหลักและตารางรถในหน้าโรงแรม ต้องยืนยันกับเจ้าของ
* `ServiceCards` เหลือแบบการ์ดสำหรับหน้าพื้นที่ (หน้าหลักใช้ explorer แทน)

## 4. Hero ใช้รูป cut-out (เพิ่มภายหลัง)

* ไฟล์ `C:\Users\kchua\Desktop\งานพ่อ\images\png\ChatGPT Image 14 ก.ย. 2569 23_00_08.png` → `apps/web/features/home/assets/hero-truck.png` (แทน `hero-truck.jpg`)
* ตรวจแล้ว: พื้นหลังโปร่งใส ตัวรถทึบ (alpha 249–254) ขอบกระจก/ล้อสะอาดทั้งพื้นขาวและเขียวเข้ม; ทะเบียน 81-2267 ตรงกับรูปจริง; ส่งจริงเป็น WebP ~91KB
* **ข้อสังเกต:** ชื่อไฟล์บอกว่าแต่งด้วย AI สีสดกว่ารูปจริง — ควรให้เจ้าของยืนยันว่าตรงกับรถจริง (แกลเลอรียังเป็นภาพจริงทั้งหมด)
* Composition: กล่องที่มีสัดส่วนเท่ารูป (1447:1087) → วงน้ำ (pool shape) และเงาใต้ล้ออิงสัดส่วนรถทุกขนาดจอ, ล้อยืนต่ำกว่าขอบล่างของวงน้ำเล็กน้อย, panel CTA กว้าง 6 คอลัมน์ไม่ทับรถ, เลื่อนหน้าแล้วรถขยับไปทางขวาเล็กน้อย (`motion-drive`)
* รอบแรกที่ให้ล้อ "จอด" บนแถบตัวเลขดูลอย/ไม่ได้สัดส่วน (feedback Developer) จึงเปลี่ยนเป็นแบบนี้

## 5. Scrollspy (เพิ่มภายหลัง)

`apps/web/features/home/components/scroll-spy.tsx`

* จอ ≥ 1360px: เส้นบาง 1px ด้านขวา (อยู่ใน gutter ≥ 128px ไม่ทับเนื้อหา) + ขีดสั้น 6 บท (ไม่ใช่จุด) — บทปัจจุบันขีดยาวสีแบรนด์และมี segment เลื่อนตาม, hover/focus แล้ว label ค่อยๆ ปรากฏ (label ไม่รับคลิก), คลิกแล้ว smooth scroll (ลด motion = กระโดดทันที) และอัปเดต hash, ซ่อนตัวตอนอยู่ hero และแถบ CTA
* จอเล็กกว่า: เส้น reading progress 2px ใต้ header (CSS `animation-timeline: scroll(root)` ไม่มี JS)
* ใช้ IntersectionObserver เส้นอ่านที่ 42% ของจอ; section ids: `top, services, process, why-us, areas, pricing, gallery, reviews, faq, contact`

## 6. แก้บั๊ก

* หน้าเลื่อนไปด้านข้างได้ 205px เพราะ decor ที่ล้นขอบขวา — `overflow-x-clip` บน `<body>` ไม่กันการ scroll ของ viewport จึงย้ายไปใส่ที่ `<main>` (clip ไม่สร้าง scroll container → sticky และ scroll timeline ยังทำงาน) ตรวจแล้ว `scrollX` = 0

## Verification

* `pnpm typecheck`, `pnpm lint`, `pnpm build`, shared self-check (เพิ่ม `quoteDefaultsSchema`, `quoteHref`) ผ่าน
* Chrome headless: รูปทุกใบโหลดผ่าน `/_next/image` สถานะ 200; เลือก "น้ำเติมสระว่ายน้ำ" แล้ว panel/ลิงก์เปลี่ยนเป็น `service=pool`; กด 20,000 ลิตร → `/quote?service=pool&volume=20000` ฟอร์มเลือกค่าให้และแสดง hint 2 จุด, เปลี่ยนปริมาณแล้ว hint หายเหลือ 1; `?service=spa&volume=abc` ไม่เลือกอะไร; มือถือแตะการ์ดแล้วการ์ดอยู่ใต้ header (top 120px) ทั้งแบบปกติและลด motion; ไม่มี console error
* Screenshot: hero/แถบภาพ/แกลเลอรี/บริการ/บทขั้นตอน/แถบพื้นที่/CTA ที่ 1440 และ 390px ทั้งธีมสว่างและมืด
* Hero cut-out: screenshot 1440 / 1024 / 390 และธีมมืด, ไม่มี horizontal scroll
* Scrollspy (Chrome 1440×900): บทปัจจุบันถูกต้องทุกบท (บริการ → คำถามที่พบบ่อย), ซ่อนที่ hero และ #contact, hover แล้ว label opacity 1 ทั้ง 6, คลิก "คำถามที่พบบ่อย" → hash `#faq` และ section อยู่ใต้ header (top 80px), จุดใต้ label ยังเป็นเนื้อหาหน้า (ไม่ถูกบัง), 1280px nav ซ่อน/เส้น progress ทำงาน, มือถือเส้น progress ทำงาน, ไม่มี console error
* ยังไม่ได้ทดสอบ: Safari/Firefox จริง, Lighthouse (ควรวัด LCP ของรูป hero)
