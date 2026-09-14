# Features / ฟีเจอร์

One folder per feature. Everything a feature owns lives inside its folder.

หนึ่งโฟลเดอร์ต่อหนึ่งฟีเจอร์ ทุกอย่างที่ฟีเจอร์นั้นเป็นเจ้าของอยู่ในโฟลเดอร์เดียวกัน

```text
features/
  orders/
    components/    # UI of this feature only / UI เฉพาะฟีเจอร์นี้
    hooks/         # react-query hooks, local hooks / hook ของฟีเจอร์นี้
    api/           # fetch / server actions / เรียก API
    schemas/       # zod schemas used only here / zod schema เฉพาะที่นี่
    store.ts       # zustand store, if the feature needs one / ถ้าต้องใช้
    index.ts       # the feature's public surface / ทางเข้าเดียวของฟีเจอร์
```

Rules / กฎ

* `app/` holds routes only. A route imports from a feature's `index.ts` and nothing deeper.
  `app/` เก็บเฉพาะ route ให้ import จาก `index.ts` ของฟีเจอร์เท่านั้น ห้าม import ลึกกว่านั้น
* A feature never imports from another feature's internals. Share through `@workspace/shared` or `@workspace/ui`.
  ฟีเจอร์ห้าม import ไส้ในของฟีเจอร์อื่น ถ้าต้องใช้ร่วมให้ย้ายไป `@workspace/shared` หรือ `@workspace/ui`
* Types and zod schemas used by both apps live in `@workspace/shared`.
  Type และ zod schema ที่ทั้งสอง app ใช้ ให้อยู่ใน `@workspace/shared`
* Reusable UI components live in `@workspace/ui`.
  Component UI ที่ใช้ซ้ำ ให้อยู่ใน `@workspace/ui`
