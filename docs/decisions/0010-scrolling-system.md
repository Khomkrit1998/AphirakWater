# 0010 — ระบบการเลื่อนหน้า (smooth scroll และระยะใต้ header)

วันที่: 2026-09-16 · สถานะ: Implemented · ต่อจาก [0005](0005-seo-performance-first-motion.md), [0009](0009-night-hero-and-gallery-marquee.md) · รายละเอียดงาน: [handoff](../evaluation/tasks/2026-09-16-smooth-scrolling-system.md)

ที่มา: Developer ขอ "ปรับ Smooth Scrolling และทำให้เข้ากับระบบ"

## กฎที่ใช้ต่อ

1. **Smooth scroll แบบ native (CSS) ไม่ใช้ library เลื่อนแบบมีแรงเฉื่อย (เช่น Lenis)** ตาม 0005 ข้อ 2 · `motion-safe:scroll-smooth` บน `<html>` (reduced motion = กระโดด) และ `data-scroll-behavior="smooth"` ให้ Next.js 16 ปิด smooth ชั่วคราวตอนเปลี่ยนหน้า (เปลี่ยนหน้าแล้วขึ้นบนสุดทันที ไม่ไหลยาว)
2. **ความสูง header มีที่เดียว** ตั้งบน `<html>` ใน `apps/web/app/layout.tsx`:
   * `--header-h`: 65px, 69px จาก `sm` (ต้องตรงกับความสูงจริงของ header ตาม 0006)
   * `--sticky-top`: `calc(var(--header-h) + 1.5rem)` ใช้เป็นทั้ง `scroll-padding-top` ของหน้า และ `top` ของคอลัมน์ sticky (`top-(--sticky-top)`)
   * ของที่ติดชิด header พอดีใช้ `top-(--header-h)` (แถบความคืบหน้าบทขั้นตอน, เส้น reading progress, ฉากตรึง)
   * **ห้ามเขียน 65px / 69px / 92px / `scroll-mt-*` เพื่อหลบ header อีก**
3. **ลิงก์ `#section` ต้องพาหัวข้อไปอยู่ที่ `--sticky-top`** (24px ใต้ header) ไม่ใช่ขอบบนที่ว่างของ section: padding บนของ section คู่กับ scroll margin ติดลบเท่ากัน (`gapTop`, `bandScroll` ใน `sections.tsx`) · ฉากตรึง `#why-us` หยุดที่ขอบ header พอดี (ลบเพิ่ม 1.5rem) เพราะเป็นจุดที่เริ่มตรึง
4. **JS ที่เลื่อนหน้าไม่ต้องเลือก behavior เอง** เรียก `scrollIntoView({ block: "start" })` เฉยๆ แล้วให้ CSS ตัดสินทั้งความนุ่ม (reduced motion) และระยะใต้ header
5. **ข้อยกเว้นที่รู้แล้ว:** section ท้ายหน้า (`#contact` บน desktop) เลื่อนขึ้นไปถึง `--sticky-top` ไม่ได้เพราะหน้าหมด หยุดต่ำกว่า ~116px
6. `apps/admin` ไม่อยู่ในระบบนี้ (ใช้ `globals.css` ร่วมกัน จึงตั้งค่าไว้ที่ layout ของ web เท่านั้น)
