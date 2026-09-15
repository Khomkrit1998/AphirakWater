---
target: landing page (apps/web home page)
total_score: 25
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 3
timestamp: 2026-09-15T13-38-41Z
slug: apps-web-features-home-components-home-page-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector + browser sub-agent)

# Critique: หน้าหลัก apps/web (2026-09-15)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | เกจบทขั้นตอนเขียน "ปริมาณน้ำต่อเที่ยว 20,000 ลิตร" แต่แสดงความคืบหน้าการเลื่อน |
| 2 | Match System / Real World | 3 | เมนู "ราคา" ไปฟอร์มที่ไม่มีราคา; "เสนอราคาเป็นรายงาน" กำกวม |
| 3 | User Control and Freedom | 3 | ปุ่ม `d` สลับธีมทุกที่ |
| 4 | Consistency and Standards | 2 | CTA ไป /quote มี 5 ข้อความ 2 สี (เขียว/แดง) |
| 5 | Error Prevention | 3 | pre-fill ดี; จำนวนพื้นที่ขัดกัน 12/8/ทุกอำเภอ |
| 6 | Recognition Rather Than Recall | 3 | คำอธิบายการ์ดมือถือ line-clamp-1 ตัดกลางคำ |
| 7 | Flexibility and Efficiency | 3 | โทรทุกจอ, sticky bar, deep link |
| 8 | Aesthetic and Minimalist Design | 2 | 11 section ~13.7 จอมือถือ ขนาดรถซ้ำ 4 ที่ |
| 9 | Error Recovery | n/a | หน้าหลักไม่มี input |
| 10 | Help and Documentation | 3 | FAQ + รายการเตรียมข้อมูลต่อบริการ |
| **Total** | | **25/36** | Acceptable (69%) |

## Design Specificity Verdict
ผิวเฉพาะธุรกิจ (รถจริง ทะเบียน 81-2267, ภาพงานจริง, ลิตร, จังหวัด) แต่โครง section เป็นแม่แบบ local service ทั่วไป ขาดคำสัญญาความเร็ว (หน้าภูเก็ตมี "2–4 ชม." แต่หน้าหลักไม่มี)
Detector: CLI 0 findings; browser desktop 15 / mobile 11 — จริง: low-contrast stats label (hero.tsx:147), line-length FAQ (faq-list.tsx:62), undersized tagline 10.5px (brand.tsx:25); false positive: WaterGlow (ตั้งใจตาม 0004), overflow-x-clip บน main (ตั้งใจ), text-occlusion (label ของ detector เอง). Headless จึงไม่มี overlay

## What's Working
1. ภาพจริงจัด stage พร้อมเงาต่อล้อ ธีมมืดรอด
2. ดูหน้า = กรอกฟอร์มครึ่งหนึ่ง (quoteHref service/volume + prepare list)
3. SEO/mobile basics: server-render 6 panel, <details>, sticky CTA, focus ring, CLS 0, alt ครบ

## Priority Issues
- [P1] CTA ขอราคาใช้สีแดง call — sections.tsx:273, service-explorer.tsx:119; รวมเป็นเขียว ข้อความ "ขอราคาน้ำ" → polish
- [P1] มือถือจอแรก: ปุ่มโทร hero (y788–846) ถูก sticky bar (y775+) บังทั้งปุ่ม; ปุ่มขอราคาเขียว 3 อัน; sticky h-12 (48px) vs spec 56px; ไม่มีข้อความ reassurance → adapt
- [P1] Contrast: stats label 3.9:1 (dark 3.58), ดาว text-star 2.17:1, ขั้นตอน opacity 0.35 ≈1.8:1; เกจ label ลิตรทำให้เข้าใจผิด; มือถือ progress 2 เส้น → clarify + audit
- [P2] หน้ายาว พื้นที่เริ่ม ~4,500px; ขนาดรถซ้ำ 4 ที่; process 1,568px/~60 คำ → distill + layout
- [P2] ความน่าเชื่อถือขัดกัน: 12 (home.ts:86) vs 8 (area.ts:13-22) vs ทุกอำเภอ; map placeholder ใน footer (site-footer.tsx:64); รีวิว 5★ ไม่มีที่มา → harden

## Persona Red Flags
- Jordan: "ราคา" ไม่มีราคา; explorer เปิดที่โรงแรม; เกจ 20,000 ลิตรเหมือนขั้นต่ำ; "เป็นรายงาน"
- Riley: `d` สลับธีม; 12/8/ทุกอำเภอ; 5 แถวภูเก็ตลิงก์หน้าเดียว; 1,000+ เที่ยว/ปี ≈3/วัน; quote API 503
- Casey: ปุ่มโทร hero ถูกบัง; พื้นที่ 5.5 จอ; chip 36px, "ดูรายละเอียดบริการ" 23px, footer link 24px; scrollIntoView ดึงหน้า

## Minor Observations
- tracking 0.1em บนอักษรไทย (sections.tsx:26)
- ตัดบรรทัด Pool/Villa, สระว่าย/น้ำ — text-wrap: balance
- BigWord "24 ชม." ทะลุปุ่ม on-dark ใน CTA band
- FAQ ~98 ตัวอักษร/บรรทัดที่ 1440
- hint ตัวเลือกบริการลอยขวา; chip white/45 ≈3.4:1; เบอร์ header หาย 900–1279; "ราคา"/"ติดต่อเรา" ไป /quote ทั้งคู่; lead hero ในกล่องมีขอบ

## Questions to Consider
1. ระหว่าง /api/quote ตอบ 503 ควรให้โทร/LINE เป็น CTA หลักไหม
2. ใช้พื้นที่เกจ 1,568px แสดงภาพรถ 3 ขนาดเทียบกันดีกว่าไหม
3. หน้าบอกไหมว่ารถมาถึงเมื่อไร
4. explorer เปิดที่โรงแรมตั้งใจไหม ลูกค้าบ้านพักเสียอะไร
