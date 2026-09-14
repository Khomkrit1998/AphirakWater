# 0003 — หน้าหลักแบบ scroll-driven storytelling

วันที่: 2026-09-14 · สถานะ: Implemented (ยังไม่ commit) · ต่อจาก [0002](0002-admin-preview-and-home-composition.md)

## Decision

Developer ขอให้หน้าหลักเล่าเรื่องตามการเลื่อนหน้าจอพร้อม motion แบบนุ่มนวล ซึ่ง **ขัดกับ design handoff** (`docs/requirements/design-handoff/README.md` → "ไม่มี scroll animation, ไม่มี carousel, ไม่มี parallax" และ "ไม่มี animation library") ตาม Source of Truth คำขอของ Developer มาก่อน จึงทำตาม แต่รักษาเหตุผลของข้อห้ามเดิม (Core Web Vitals):

* ใช้ **CSS scroll-driven animations** (`animation-timeline: view()` / named timeline) ล้วน ไม่มี JavaScript, ไม่มี scroll listener, ไม่เพิ่ม dependency → ไม่กระทบ INP/TBT
* animate เฉพาะ `opacity` / `translate` / `scale` (และสีของวงกลมเลขขั้นตอน) → ไม่มี layout shift (CLS)
* `@supports` + `prefers-reduced-motion: no-preference` → เบราว์เซอร์ที่ไม่รองรับ (เช่น Firefox ปัจจุบัน) หรือผู้ใช้ที่ตั้งลด motion เห็นหน้าคงที่ครบทุกส่วน เนื้อหาอยู่ใน DOM ตลอดสำหรับ SEO

## Story

1. Hero — ภาพค่อยๆ ซูมเข้า (1 → 1.08) ขณะเลื่อนผ่าน
2. บริการ — แถวรายการเลื่อนขึ้นเข้าที่ทีละแถว
3. **เส้นทางการส่งน้ำ (บทใหม่, จุดเด่นเดียวของหน้า)** — 4 ขั้นตอนตาม handoff (แจ้งข้อมูล → ประเมินและเสนอราคา → กำหนดรอบส่ง → ส่งน้ำและออกเอกสาร); desktop: ถังน้ำ sticky มีขีด 5,000/10,000/20,000 ลิตร เติมขึ้นตามการเลื่อน; มือถือ: แถบความคืบหน้า sticky; แต่ละขั้นชัดขึ้นเมื่อถึงกลางจอ
4. ทำไมต้องเลือกเรา — ภาพเต็มความกว้างซูมออกช้าๆ
5. พื้นที่ให้บริการ — แถวรายการเลื่อนขึ้นเข้าที่
6. Interaction — คำตอบ FAQ เลื่อนเปิด/ปิด (`::details-content` + `interpolate-size`), ไอคอนหมุน, ลูกศรขยับเมื่อ hover

คำอธิบายขั้นตอน (`packages/shared/src/home.ts` → `process`) เป็นร่าง ควรให้เจ้าของตรวจ

## Implementation notes

* Utilities อยู่ใน `packages/ui/src/styles/globals.css`: `motion-rise`, `motion-zoom-in`, `motion-zoom-out`, `story-scope`, `story-track`, `story-fill-y`, `story-fill-x`, `story-step`, `story-step-mark`
* กรอบที่ครอบภาพที่มี motion ต้องใช้ `overflow-clip` **ไม่ใช่** `overflow-hidden` — `hidden` สร้าง scroll container ทำให้ view timeline ไม่ขยับ
* ใช้ `motion-rise` กับบล็อกที่เตี้ยกว่าหน้าจอเท่านั้น (ช่วง `entry` ของบล็อกที่สูงกว่าจอจะยาวจนดูจางค้าง)

## Verification

* `pnpm typecheck`, `pnpm lint`, `pnpm build`, shared self-check ผ่าน
* Chrome headless (1440×900): ระดับน้ำในถัง 0.24 → 0.62 → 1.0 ตามตำแหน่งเลื่อน, ขั้นตอนเปลี่ยน opacity 0.35 → 1 ตามลำดับ, ภาพ hero scale 1.08 หลังเลื่อนผ่าน, เลื่อนถึงท้ายหน้าไม่มีแถวค้างจาง
* `prefers-reduced-motion: reduce`: ไม่มี animation และทุกขั้นตอน opacity 1
* มือถือ 390px: แถบความคืบหน้า sticky ใต้ header ทำงาน; FAQ มี transition; ไม่มี console error
* ยังไม่ได้ทดสอบ: Safari/Firefox จริง, Lighthouse
