# 0005 — Motion แบบ SEO-friendly และ performance-first

วันที่: 2026-09-14 · สถานะ: Implemented (ยังไม่ commit) · ต่อจาก [0004](0004-photos-depth-interactive-services.md)

## หลักการ (คำขอ Developer)

เนื้อหาสำคัญทั้งหมดต้อง render ฝั่ง server และ crawler อ่านได้ ส่วน motion ใช้แบบ scroll-driven เบาๆ และ micro-interaction เพื่อความพรีเมียม

## กฎที่ใช้ในโปรเจกต์ (ให้ยึดต่อ)

1. **เนื้อหาอยู่ใน HTML เสมอ** — ห้าม render เนื้อหาเฉพาะหลังคลิก/หลัง JS; ส่วน interactive ให้ render ทุกสถานะจาก server แล้วซ่อนด้วย `hidden` (เช่น FAQ ใช้ `<details>`, ตัวเลือกบริการ render ครบ 6 panel)
2. **Motion เป็น CSS** — scroll-driven animations (`animation-timeline`) ใน `packages/ui/src/styles/globals.css` ไม่มี scroll listener / animation library
3. **Animate เฉพาะ `opacity` / `translate` / `scale`** — ไม่ขยับ layout (CLS)
4. **Fallback ต้องเป็นหน้าปกติ** — ห่อด้วย `@supports` และ `prefers-reduced-motion: no-preference`; เบราว์เซอร์ที่ไม่รองรับหรือผู้ใช้ที่ลด motion เห็นเนื้อหาครบ
5. **JS ฝั่ง client เฉพาะที่จำเป็น** — หน้าหลักมี client component: mobile nav, ตัวเลือกบริการ, scrollspy (IntersectionObserver); ที่เหลือเป็น server component
6. **รูปผ่าน `next/image`** — กำหนดขนาด/aspect เสมอ, hero `loading="eager"` + `fetchPriority="high"`, ที่เหลือ lazy
7. กรอบที่มีภาพ animate ใช้ `overflow-clip` ไม่ใช่ `overflow-hidden` (hidden ทำให้ scroll timeline ค้าง); decor ที่ล้นขอบถูก clip ที่ `<main>`

## สิ่งที่แก้ในรอบนี้

* **ตัวเลือกบริการ (SEO):** เดิม HTML มีรายละเอียดเฉพาะบริการที่เลือก (โรงแรม) อีก 5 บริการต้องคลิกก่อน → เปลี่ยนเป็น render ครบ 6 panel ครั้งเดียว (ไม่ซ้ำ desktop/mobile) ด้วย CSS grid วาง panel ใต้การ์ดบนมือถือ และซ้อนใน cell ด้านขวาแบบ sticky บน desktop; ปุ่มใช้ `aria-expanded` + `aria-controls`, panel เป็น `role="region"`
* **Hero ลอย (feedback Developer):** วัดจุดที่ยางแตะพื้นจาก alpha channel ของรูป — มุมกล้องต่ำ 3/4 ทำให้ยางแต่ละล้ออยู่คนละความสูง (หลัง ~y898/922, หน้าใกล้ ~y1020, หน้าไกล ~y994) เงาวงรีแนวนอนจึงทำให้ล้อหลังลอย → เปลี่ยนเป็นเงา SVG ในพิกัดรูป (เงาใต้ยางแต่ละล้อ + เงา footprint ตามพื้นเอียง) และให้ฉากสีเขียวรองใต้รถทั้งคัน ไม่มีขอบตัดผ่านตัวรถ
* **หน้าย่อย:** เพิ่ม `motion-rise` ให้ตำบลที่ให้บริการและการ์ดบริการ (หน้า area), การ์ดขั้นตอน (หน้า service) และลูกศรขยับเมื่อ hover; เนื้อหาบทความไม่ใส่ motion เพื่อการอ่าน

## Verification

* HTML จาก server (ไม่มี JS): มีรายละเอียดของทุกบริการ (เช่น "ขนาดและความลึกของสระ", "ทางเข้าไซต์งานสำหรับรถขนาดใหญ่"), คำอธิบายขั้นตอน, คำตอบ FAQ ที่ปิดอยู่, caption แกลเลอรี, รีวิว, รายชื่อพื้นที่, label ของ scrollspy; H1 = 1; panel ที่ซ่อน 5/6; JSON-LD 4 ก้อน
* Web Vitals ใน Chrome จริง (production build, เลื่อนทั้งหน้าระหว่างวัด):
  * มือถือ 390px · CPU ช้า 4x · Slow 4G: **LCP 1.28s** (รูปรถ hero) · **CLS 0.000** · long task 3 · TBT ≈ 275ms
  * Desktop 1440px ไม่จำกัด: **LCP 0.11s** · **CLS 0.000** · TBT 0
  * ส่งจริง: HTML 34KB · JS 262KB · CSS 17KB · ฟอนต์ 119KB · รูปทั้งหน้า ~660–710KB (หลัง lazy load ครบ)
* ตัวเลือกบริการหลังแก้: desktop เปลี่ยน panel ถูกต้อง, มือถือ panel อยู่ใต้การ์ดทันที (12px) และการ์ดเลื่อนมาใต้ header
* `pnpm typecheck`, `pnpm lint`, `pnpm build`, shared self-check ผ่าน

## ข้อจำกัด / งานต่อ

* TBT บนมือถือช้า ~275ms มาจาก hydration ของ React + client components — ถ้าต้องการลดต่อ: โหลด scrollspy แบบ lazy หรือเปลี่ยนตัวเลือกบริการเป็น `<details>` ล้วน (แลกกับ UX แบบ panel sticky)
* ยังไม่ได้วัดด้วย Lighthouse / PageSpeed Insights บน URL จริง และยังไม่ได้ทดสอบ Safari/Firefox จริง
