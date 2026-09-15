# 0008 — กันสแปมฟอร์มขอใบเสนอราคา (honeypot + เวลากรอก)

วันที่: 2026-09-15 · สถานะ: Implemented · ต่อจาก [0007](0007-quote-request-email.md)

## Decision

Developer เลือก honeypot + เวลากรอก จากตัวเลือก: honeypot, Cloudflare Turnstile, Google reCAPTCHA v3 (ตามที่ design handoff ระบุ), หรือ honeypot ก่อนแล้วเพิ่ม Turnstile ภายหลัง

เหตุผล: ไม่ต้องสมัครบัญชี ไม่มี script ภายนอก ไม่มี cookie และลูกค้าไม่ต้องทำอะไรเพิ่ม

## ทำงานอย่างไร

| สัญญาณ | ฝั่ง client (`quote-form.tsx`) | ฝั่ง server (`spamReason()` ใน `packages/shared/src/quote.ts`) |
| --- | --- | --- |
| `website` (honeypot) | ช่อง input ที่ซ่อนด้วย `sr-only` + `aria-hidden` + `tabIndex=-1` + `autoComplete="off"` คนมองไม่เห็น กด Tab ไม่ถึง screen reader ไม่อ่าน | มีค่า (ไม่นับช่องว่าง) → ปฏิเสธ |
| `elapsedMs` | เวลาตั้งแต่ฟอร์ม mount ถึงตอนกดส่ง (`performance.now()`) | น้อยกว่า `QUOTE_MIN_FILL_MS` (2000 ms) → ปฏิเสธ |

* ขาด field ใด field หนึ่ง (เช่น request ยิงตรงหรือหน้าเก่าก่อน deploy) → 400 "กรุณาโหลดหน้านี้ใหม่แล้วส่งอีกครั้ง"
* ถูกปฏิเสธจะตอบ **400 พร้อมข้อความจริง ไม่ตอบสำเร็จปลอม** เพราะถ้าจับลูกค้าจริงผิด ลูกค้าต้องรู้ว่าคำขอไม่ถึง
  * ส่งเร็วเกินไป: "กรุณารอสักครู่แล้วกดส่งอีกครั้ง" กดซ้ำก็ผ่าน เพราะเวลานับต่อจากตอนเปิดฟอร์ม
  * honeypot: "ส่งคำขอไม่สำเร็จ กรุณาโทรหาเราโดยตรง"
* ทุกครั้งที่ปฏิเสธ server log `quote rejected as spam: honeypot|too-fast` (ไม่มีข้อมูลลูกค้า)

## ข้อจำกัด

* ทั้งสองสัญญาณมาจากเบราว์เซอร์ bot ที่อ่าน JavaScript แล้วยิง API ตรงพร้อมค่าปลอมจะผ่านได้ → เพิ่ม Cloudflare Turnstile เมื่อเจอสแปมแบบนี้
* ถ้า log `too-fast` บ่อยและดูเป็นลูกค้าจริง (ใช้ autofill + ค่าที่เลือกจากหน้าหลัก) ให้ลด `QUOTE_MIN_FILL_MS`
* ยังไม่ได้ทดสอบว่า autofill ของเบราว์เซอร์/password manager เติมช่อง honeypot หรือไม่ (ถ้าเติม ลูกค้าจะเห็นข้อความให้โทร และ log เป็น `honeypot`)
* ไม่มี rate limit ต่อ IP
