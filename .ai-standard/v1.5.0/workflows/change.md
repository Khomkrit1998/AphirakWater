# Change Workflow

# กระบวนการเปลี่ยนแปลงอื่น ๆ

## Purpose / วัตถุประสงค์

A standard workflow for changes that are neither a Feature nor a bug fix:

กระบวนการมาตรฐานสำหรับการเปลี่ยนแปลงที่ไม่ใช่ Feature และไม่ใช่การแก้ Bug:

* Refactoring / การ Refactor
* Dependency updates / การอัปเดต Dependency
* Configuration changes / การเปลี่ยน Configuration
* Documentation changes / การแก้เอกสาร
* Small technical improvements / การปรับปรุงทางเทคนิคเล็กน้อย
* Maintenance / งานดูแลรักษา

New or changed behavior uses `workflows/feature.md`. A defect uses `workflows/bug-fix.md`. If a change here turns out to need a behavior change, stop and ask; it has become a Feature.

พฤติกรรมใหม่หรือพฤติกรรมที่เปลี่ยนใช้ `workflows/feature.md` Defect ใช้ `workflows/bug-fix.md` ถ้างานในนี้กลายเป็นต้องเปลี่ยนพฤติกรรม ให้หยุดและถาม เพราะงานนั้นกลายเป็น Feature แล้ว

```text
Understand → Assess Impact → Change → Validate → Evaluate → Complete
```

---

## 1. Understand / ทำความเข้าใจ

Identify:

ระบุ:

* **Goal / เป้าหมาย**: the outcome that shows the change is done, for example "no dependency below version X" or "module Y has no duplicated logic" / ผลลัพธ์ที่แสดงว่างานเสร็จ เช่น "ไม่มี Dependency ต่ำกว่า Version X" หรือ "Module Y ไม่มี Logic ซ้ำ"
* **Scope / ขอบเขต**: what is in, and what is explicitly out / อะไรอยู่ในขอบเขต และอะไรอยู่นอกขอบเขตอย่างชัดเจน
* **Risk level / ระดับความเสี่ยง**: as defined in `workflows/feature.md` step 1 / ตามนิยามใน `workflows/feature.md` ขั้นที่ 1

---

## 2. Assess Impact / ประเมินผลกระทบ

Assess in proportion to the risk. A typo fix needs a glance; a major dependency upgrade needs a read of its breaking changes.

ประเมินตามสัดส่วนความเสี่ยง แก้คำผิดดูครั้งเดียวพอ แต่อัปเกรด Dependency ครั้งใหญ่ต้องอ่าน Breaking changes

| Change / การเปลี่ยนแปลง | Ask / คำถาม |
| --- | --- |
| Refactoring | Is current behavior covered by tests, or how else will you show it is unchanged? Who calls the code? / พฤติกรรมเดิมมี Test ครอบคลุมหรือไม่ ถ้าไม่มีจะแสดงอย่างไรว่าไม่เปลี่ยน ใครเรียกใช้ Code นี้ |
| Dependency update | What do the release notes say breaks? Does it change other dependencies? Is it needed, per `standards/development.md` principle 5? / Release notes ระบุว่าอะไรเสีย กระทบ Dependency อื่นหรือไม่ จำเป็นหรือไม่ ตาม `standards/development.md` หลักการที่ 5 |
| Configuration | Which environments does it affect? Can it be reverted? Does it expose a secret? / กระทบ Environment ใด ย้อนกลับได้หรือไม่ เปิดเผย Secret หรือไม่ |
| Documentation | Does it match the current code and decisions? / ตรงกับ Code และ Decision ปัจจุบันหรือไม่ |
| Technical improvement, maintenance | What can it break, and how will you notice? / ทำให้อะไรเสียได้บ้าง และจะรู้ได้อย่างไร |

If the change is architectural, as defined in `standards/architecture.md` section 4, propose it with reason, impact, and trade-offs, and wait for Developer approval.

ถ้าการเปลี่ยนแปลงเป็นเรื่อง Architecture ตามนิยามใน `standards/architecture.md` หัวข้อ 4 ให้เสนอพร้อมเหตุผล ผลกระทบ และ Trade-off แล้วรอ Developer อนุมัติ

---

## 3. Change / ลงมือเปลี่ยน

* Make only the changes the goal needs / เปลี่ยนเท่าที่เป้าหมายต้องการ
* Keep to the scope from step 1. Report anything else found under Known Issues or Next Steps instead of doing it / อยู่ในขอบเขตจากขั้นที่ 1 สิ่งอื่นที่พบให้รายงานใน Known Issues หรือ Next Steps แทนการทำเอง
* Do not refactor unrelated code, per `standards/development.md` principle 6 / ไม่ Refactor Code ที่ไม่เกี่ยวข้อง ตาม `standards/development.md` หลักการที่ 6
* Do not mix kinds: a refactor does not also change behavior, and a dependency update does not also refactor / ไม่ปนประเภทงาน Refactor ไม่เปลี่ยนพฤติกรรมไปด้วย และอัปเดต Dependency ไม่ Refactor ไปด้วย

---

## 4. Validate / ตรวจสอบ

Run the Verification Commands and record one decision, per `workflows/verify-loop.md`. Pick the other checks and their depth from `standards/quality.md`; a documentation-only change is "trivial" there.

รัน Verification Commands และบันทึกการตัดสินใจหนึ่งข้อ ตาม `workflows/verify-loop.md` เลือกการตรวจอื่นและความลึกจาก `standards/quality.md` การแก้เฉพาะเอกสารถือเป็น "เล็กน้อย" ในนั้น

---

## 5. Evaluate / ประเมินผลลัพธ์

Check the goal from step 1, per `standards/evaluation.md`: is it met, partly met, or not met? For a refactor, the goal includes "behavior unchanged".

ตรวจเป้าหมายจากขั้นที่ 1 ตาม `standards/evaluation.md` ว่าผ่าน ผ่านบางส่วน หรือไม่ผ่าน สำหรับการ Refactor เป้าหมายรวมถึง "พฤติกรรมไม่เปลี่ยน"

---

## 6. Complete / ปิดงาน

* For meaningful changes, write the Handoff with task type `refactor`, `chore`, or `docs`, per `workflows/feature.md` step 6 / สำหรับการเปลี่ยนแปลงที่มีสาระสำคัญ เขียน Handoff ประเภท `refactor`, `chore` หรือ `docs` ตาม `workflows/feature.md` ขั้นที่ 6
* Update documentation the change made wrong. Do not create documentation without lasting value / แก้เอกสารที่การเปลี่ยนแปลงทำให้ไม่ถูกต้อง ไม่สร้างเอกสารที่ไม่มีประโยชน์ระยะยาว

---

## Completion Criteria / เงื่อนไขการจบ Workflow

* [ ] Goal and scope are stated / ระบุเป้าหมายและขอบเขตแล้ว
* [ ] Impact was assessed in proportion to risk / ประเมินผลกระทบตามสัดส่วนความเสี่ยงแล้ว
* [ ] Only in-scope changes were made / เปลี่ยนเฉพาะสิ่งที่อยู่ในขอบเขต
* [ ] Relevant validation passes / การตรวจที่เกี่ยวข้องผ่าน
* [ ] The goal is met, or the gap is reported / ถึงเป้าหมายแล้ว หรือรายงานส่วนที่ขาดแล้ว
* [ ] Affected documentation is updated / แก้เอกสารที่ได้รับผลกระทบแล้ว
* [ ] Handoff is saved with its Evidence block when required / บันทึก Handoff พร้อม Evidence block เมื่อจำเป็นแล้ว

---

## Core Principle / หลักการสำคัญ

**Clear scope. Only what is needed. Checked as deeply as the risk requires.**

**ขอบเขตชัด → เปลี่ยนเท่าที่จำเป็น → ตรวจลึกเท่าที่ความเสี่ยงต้องการ**
