# Bug Fix Workflow

# กระบวนการแก้ Bug

## Purpose / วัตถุประสงค์

A standard workflow for investigating, fixing, and validating a defect: existing behavior that differs from what the Project requires.

กระบวนการมาตรฐานสำหรับตรวจสอบ แก้ไข และยืนยันผลการแก้ Defect คือพฤติกรรมเดิมที่ไม่ตรงกับที่ Project กำหนด

If the "bug" is really a request for new or different behavior, use `workflows/feature.md`. For other changes, use `workflows/change.md`.

ถ้า "Bug" นั้นแท้จริงคือการขอพฤติกรรมใหม่หรือพฤติกรรมที่ต่างจากเดิม ให้ใช้ `workflows/feature.md` ส่วนการเปลี่ยนแปลงอื่นให้ใช้ `workflows/change.md`

```text
Report → Reproduce → Diagnose → Fix → Validate → Regression Check → Complete
```

---

## 1. Report / รับรายงาน

Before investigating, identify:

ก่อนเริ่มตรวจสอบ ต้องระบุ:

* **Expected behavior / พฤติกรรมที่ควรเป็น**: from the requirement, the documentation, or the Developer. Not from a guess / จาก Requirement เอกสาร หรือ Developer ไม่ใช่จากการคาดเดา
* **Actual behavior / พฤติกรรมที่เกิดขึ้นจริง**: including error messages and logs / รวมถึงข้อความ Error และ Log
* **Where and when / เกิดที่ไหนและเมื่อใด**: steps, input, environment, version / ขั้นตอน Input Environment และ Version
* **Impact / ผลกระทบ**: who is affected and how badly / ใครได้รับผลกระทบและรุนแรงเพียงใด
* **Risk level / ระดับความเสี่ยง**: as defined in `workflows/feature.md` step 1. Data loss, security, and production incidents are high / ตามนิยามใน `workflows/feature.md` ขั้นที่ 1 ข้อมูลสูญหาย Security และปัญหาบน Production ถือเป็น high

When expected behavior is unclear, ask. Do not fix toward an assumed requirement.

ถ้าพฤติกรรมที่ควรเป็นยังไม่ชัด ให้ถาม ห้ามแก้ไปตาม Requirement ที่คาดเอาเอง

---

## 2. Reproduce / ทำให้เกิดซ้ำ

Reproduce the defect before fixing it, whenever possible.

ทำให้ Defect เกิดซ้ำก่อนแก้ ทุกครั้งที่ทำได้

* Find the smallest steps or input that trigger it / หาขั้นตอนหรือ Input ที่น้อยที่สุดที่ทำให้เกิด
* Where the Project has tests, capture the reproduction as a test that fails now, per the Testing check in `standards/quality.md` / ถ้า Project มี Test ให้เขียนการทำซ้ำเป็น Test ที่ตอนนี้ไม่ผ่าน ตามการตรวจ Testing ใน `standards/quality.md`
* Otherwise, record the exact steps, so step 5 can repeat them / ถ้าไม่มี ให้บันทึกขั้นตอนที่แน่นอน เพื่อให้ขั้นที่ 5 ทำซ้ำได้

If it cannot be reproduced, say so and report what was tried. Do not change code on a guess. For medium or high risk, the decision is HUMAN, per `workflows/verify-loop.md`.

ถ้าทำซ้ำไม่ได้ ให้แจ้งและรายงานสิ่งที่ลองแล้ว ห้ามแก้ Code จากการเดา สำหรับความเสี่ยง medium หรือ high การตัดสินใจคือ HUMAN ตาม `workflows/verify-loop.md`

---

## 3. Diagnose / หาสาเหตุ

Find the root cause, not only the place the symptom appears.

หาต้นเหตุ ไม่ใช่แค่จุดที่อาการปรากฏ

* Trace the failing path from the reproduction to the cause / ไล่เส้นทางที่ผิดจากการทำซ้ำไปจนถึงต้นเหตุ
* Check every caller of the code you plan to change. A fix where all callers pass through fixes them all; a fix in one caller leaves the others broken / ตรวจทุกจุดที่เรียก Code ที่จะแก้ การแก้ในจุดที่ทุกผู้เรียกผ่าน แก้ได้ทุกจุด การแก้ในผู้เรียกจุดเดียวทิ้งจุดอื่นให้ยังพัง
* State the cause in one or two sentences before fixing. If you cannot, the diagnosis is not done / สรุปต้นเหตุหนึ่งถึงสองประโยคก่อนแก้ ถ้าสรุปไม่ได้ แปลว่ายังหาสาเหตุไม่เสร็จ

If the root cause is a boundary, contract, or data-ownership problem, as defined in `standards/architecture.md` section 4, the Developer decides the fix.

ถ้าต้นเหตุเป็นปัญหาของขอบเขต สัญญา หรือความเป็นเจ้าของข้อมูล ตามนิยามใน `standards/architecture.md` หัวข้อ 4 Developer เป็นผู้ตัดสินใจวิธีแก้

---

## 4. Fix / แก้ไข

Make the smallest change that removes the root cause, per `standards/development.md` principles 3 and 6.

แก้ให้น้อยที่สุดที่ขจัดต้นเหตุได้ ตาม `standards/development.md` หลักการที่ 3 และ 6

* Fix the cause, not the symptom. Do not hide the error, add a special case for the reported input, or catch and ignore / แก้ที่ต้นเหตุ ไม่ใช่อาการ ห้ามซ่อน Error ห้ามเพิ่มกรณีพิเศษเฉพาะ Input ที่ถูกรายงาน และห้ามจับ Error แล้วเพิกเฉย
* No unrelated refactoring. Report other problems found under Known Issues / ไม่ Refactor สิ่งที่ไม่เกี่ยวข้อง ปัญหาอื่นที่พบให้รายงานใน Known Issues
* If the right fix is larger than the bug, propose it and let the Developer choose between it and a smaller fix / ถ้าวิธีแก้ที่ถูกต้องใหญ่กว่าตัว Bug ให้เสนอ และให้ Developer เลือกระหว่างวิธีนั้นกับวิธีที่เล็กกว่า

---

## 5. Validate / ยืนยันผล

* The reproduction from step 2 now passes / การทำซ้ำจากขั้นที่ 2 ตอนนี้ผ่าน
* Run the Verification Commands and record one decision, per `workflows/verify-loop.md` / รัน Verification Commands และบันทึกการตัดสินใจหนึ่งข้อ ตาม `workflows/verify-loop.md`
* Review the AI-generated change, per `standards/quality.md` section 6 / ตรวจการเปลี่ยนแปลงที่ AI สร้าง ตาม `standards/quality.md` หัวข้อ 6

---

## 6. Regression Check / ตรวจ Regression

Check that the fix did not break what worked, at the depth `standards/quality.md` section 5 sets for the risk level.

ตรวจว่าการแก้ไม่ทำให้สิ่งที่เคยทำงานเสีย ลึกตามที่ `standards/quality.md` หัวข้อ 5 กำหนดสำหรับระดับความเสี่ยง

Focus on what the fix touched: the callers found in step 3, shared code, contracts, data, and configuration. Keep the test from step 2 so the defect cannot return unnoticed.

เน้นสิ่งที่การแก้แตะ: ผู้เรียกที่พบในขั้นที่ 3 Code ที่ใช้ร่วม สัญญา ข้อมูล และ Configuration เก็บ Test จากขั้นที่ 2 ไว้ เพื่อไม่ให้ Defect กลับมาโดยไม่มีใครรู้

---

## 7. Complete / ปิดงาน

* State whether the defect is resolved, partly resolved, or not resolved, with evidence, per `standards/evaluation.md` / ระบุว่า Defect แก้แล้ว แก้บางส่วน หรือยังไม่ได้แก้ พร้อมหลักฐาน ตาม `standards/evaluation.md`
* Write the Handoff with task type `fix`, per `workflows/feature.md` step 6. Include the root cause under Why / เขียน Handoff ประเภท `fix` ตาม `workflows/feature.md` ขั้นที่ 6 ใส่ต้นเหตุไว้ในหัวข้อ Why
* Update documentation, or record a decision per `standards/architecture.md`, only when the fix changes what they say / แก้เอกสาร หรือบันทึก Decision ตาม `standards/architecture.md` เฉพาะเมื่อการแก้ทำให้สิ่งที่เขียนไว้เปลี่ยน

---

## Completion Criteria / เงื่อนไขการจบ Workflow

* [ ] Expected and actual behavior are stated / ระบุพฤติกรรมที่ควรเป็นและที่เกิดจริงแล้ว
* [ ] The defect was reproduced, or the attempts to reproduce it are reported / ทำซ้ำได้แล้ว หรือรายงานความพยายามทำซ้ำแล้ว
* [ ] The root cause is stated / ระบุต้นเหตุแล้ว
* [ ] The issue is resolved / แก้ปัญหาแล้ว
* [ ] Relevant validation passes / การตรวจที่เกี่ยวข้องผ่าน
* [ ] No significant regression is identified / ไม่พบ Regression ที่มีนัยสำคัญ
* [ ] Documentation or decisions are updated when necessary / แก้เอกสารหรือ Decision เมื่อจำเป็นแล้ว
* [ ] Handoff is saved with its Evidence block when required / บันทึก Handoff พร้อม Evidence block เมื่อจำเป็นแล้ว

---

## Core Principle / หลักการสำคัญ

**Reproduce it. Find the cause. Fix only that. Prove it is fixed and nothing else broke.**

**ทำให้เกิดซ้ำ → หาต้นเหตุ → แก้เฉพาะจุดนั้น → พิสูจน์ว่าแก้แล้วและไม่มีอะไรอื่นเสีย**
