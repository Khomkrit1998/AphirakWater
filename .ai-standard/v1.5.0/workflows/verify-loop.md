# Verify Loop Workflow

# กระบวนการตรวจสอบซ้ำจนผ่าน

## Purpose / วัตถุประสงค์

A standard loop for finishing a change: run the Project's Verification Commands, record one explicit decision, fix and re-run within a bounded number of attempts, and stop with evidence instead of claims.

กระบวนการมาตรฐานสำหรับปิดงาน: รันคำสั่งตรวจสอบของ Project บันทึกการตัดสินใจอย่างชัดเจนหนึ่งข้อ แก้แล้วรันซ้ำภายในจำนวนรอบที่จำกัด และหยุดพร้อมหลักฐาน ไม่ใช่คำกล่าวอ้าง

This workflow is the Verify step of `workflows/feature.md`, and the Validate step of `workflows/bug-fix.md` and `workflows/change.md`, made explicit. It does not replace those workflows.

Workflow นี้คือขั้น Verify ของ `workflows/feature.md` และขั้น Validate ของ `workflows/bug-fix.md` กับ `workflows/change.md` ที่เขียนให้ชัดเจนขึ้น ไม่ได้มาแทน Workflow เหล่านั้น

The Developer starts every loop and owns its stop condition. Autonomy inside the loop is bounded by the task risk and by this workflow, consistent with the Final Principle in `CLAUDE.md`: appropriate autonomy for the task, not autonomy for its own sake.

Developer เป็นผู้เริ่ม Loop ทุกครั้งและเป็นเจ้าของเงื่อนไขหยุด ความเป็นอิสระของ AI ภายใน Loop ถูกจำกัดด้วยระดับความเสี่ยงของ Task และ Workflow นี้ สอดคล้องกับ Final Principle ใน `CLAUDE.md` คือมีความเป็นอิสระเท่าที่เหมาะกับ Task ไม่ใช่เพื่อความเป็นอิสระเอง

---

## 1. When It Applies / ใช้เมื่อใด

Apply this workflow to every meaningful change: new behavior, changed behavior, refactoring, bug fixes, and anything that touches build, data, or configuration.

ใช้กับการเปลี่ยนแปลงที่มีสาระสำคัญทุกกรณี ได้แก่ พฤติกรรมใหม่ พฤติกรรมที่เปลี่ยน การ Refactor การแก้ Bug และทุกอย่างที่แตะ Build, Data หรือ Configuration

Verification depth follows the risk level identified in the first step of the workflow in use, as defined in `workflows/feature.md` step 1:

ความลึกของการตรวจสอบเป็นไปตามระดับความเสี่ยงที่ระบุไว้ในขั้นแรกของ Workflow ที่ใช้ ตามนิยามใน `workflows/feature.md` ขั้นที่ 1:

| Risk / ความเสี่ยง | Verification / การตรวจสอบ | Before completion / ก่อนปิดงาน |
| --- | --- | --- |
| low | Verification Commands / คำสั่งตรวจสอบ | Report / รายงาน |
| medium | Verification Commands + acceptance criteria / คำสั่งตรวจสอบ + acceptance criteria | Report / รายงาน |
| high | Verification Commands + acceptance criteria + the relevant manual checks in `workflows/feature.md` step 5 / คำสั่งตรวจสอบ + acceptance criteria + การตรวจด้วยมือที่เกี่ยวข้องตาม `workflows/feature.md` ขั้นที่ 5 | Developer approval, decision HUMAN / ต้องให้ Developer อนุมัติ (HUMAN) |

Risk considers impact, reversibility, security, data sensitivity, and production impact. When in doubt, choose the higher level.

ความเสี่ยงพิจารณาจากผลกระทบ การย้อนกลับได้ Security ความอ่อนไหวของข้อมูล และผลต่อ Production ถ้าไม่แน่ใจให้เลือกระดับที่สูงกว่า

A small, low-risk edit such as a typo, a comment, or documentation needs only the commands it can affect. Say which commands were skipped and why.

การแก้เล็กน้อยที่ความเสี่ยงต่ำ เช่น คำผิด Comment หรือเอกสาร รันเฉพาะคำสั่งที่อาจได้รับผลกระทบ และระบุว่าข้ามคำสั่งใดเพราะอะไร

---

## 2. Verification Commands / คำสั่งตรวจสอบ

The gate is the "Verification Commands" table in the Project `CLAUDE.md`: typecheck, lint, test, build. Each row is a command or `none`, with an optional Baseline.

เกณฑ์คือตาราง "Verification Commands" ใน `CLAUDE.md` ของ Project ได้แก่ typecheck, lint, test, build แต่ละแถวเป็นคำสั่งหรือ `none` และอาจมี Baseline

The table is Project knowledge. It is created when the Project adopts this Standard and maintained by the Developer. This Standard does not define its values.

ตารางนี้เป็นความรู้ของ Project สร้างขึ้นเมื่อ Project เริ่มใช้ Standard นี้ และ Developer เป็นผู้ดูแล Standard นี้ไม่ได้กำหนดค่าในตาราง

Rules:

กฎ:

* Run every command that is not `none`, in table order, from the Project root. Record each exit status and the relevant output / รันทุกคำสั่งที่ไม่ใช่ `none` ตามลำดับในตาราง จาก root ของ Project บันทึก exit status และ output ที่เกี่ยวข้องของแต่ละคำสั่ง
* The table alone defines the gate. Do not add commands during a task and do not skip listed ones / ตารางเท่านั้นที่กำหนดเกณฑ์ ห้ามเพิ่มคำสั่งระหว่าง Task และห้ามข้ามคำสั่งที่ระบุไว้
* If the table is missing, or every command is `none`, verify as in `workflows/feature.md` step 5 and state in the Handoff that no automated gate exists / ถ้าไม่มีตาราง หรือทุกคำสั่งเป็น `none` ให้ตรวจสอบตาม `workflows/feature.md` ขั้นที่ 5 และระบุใน Handoff ว่าไม่มีเกณฑ์อัตโนมัติ
* Change the table only outside a loop and with the Developer / แก้ตารางได้เฉพาะนอก Loop และร่วมกับ Developer

---

## 3. The Loop / วงรอบ

```text
Implement / Fix
      ↓
Run Verification Commands
      ↓
   Decision
 ┌────┼──────────┬──────────┐
 ▼    ▼          ▼          ▼
PASS RETRY     HUMAN      STOP
 │    │          │          │
 ▼    └→ Fix     ▼          ▼
Handoff        Ask the   Report and
               Developer  hand off
```

One pass through Implement → Run → Decision is one attempt.

หนึ่งรอบของ Implement → Run → Decision นับเป็นหนึ่ง Attempt

---

## 4. Decision / การตัดสินใจ

After every run, record exactly one decision. The rules below are meant to be checked, not judged.

หลังการรันทุกครั้ง ให้บันทึกการตัดสินใจหนึ่งข้อเท่านั้น กฎด้านล่างออกแบบให้ตรวจสอบได้ ไม่ใช่ใช้ดุลยพินิจ

| Decision | When / เมื่อ | Then / จากนั้น |
| --- | --- | --- |
| **PASS** | Every command passes or stays within its Baseline, and for medium and high risk the acceptance criteria pass / ทุกคำสั่งผ่านหรืออยู่ใน Baseline และสำหรับความเสี่ยง medium และ high acceptance criteria ผ่านด้วย | Write the Handoff / เขียน Handoff |
| **RETRY** | At least one command fails, attempts remain, and the last attempt made progress: fewer failures or a different failure / มีคำสั่งไม่ผ่านอย่างน้อยหนึ่ง ยังมีรอบเหลือ และรอบล่าสุดมีความคืบหน้า คือ Failure น้อยลงหรือเป็น Failure คนละแบบ | Fix the cause. Run all commands again / แก้ที่สาเหตุ แล้วรันทุกคำสั่งใหม่ |
| **HUMAN** | The fix needs a Developer decision: a requirement is unclear, an architecture or security choice is involved, the gate itself looks wrong, or the task is high risk and awaits approval / การแก้ต้องการการตัดสินใจของ Developer: Requirement ไม่ชัด เกี่ยวกับ Architecture หรือ Security เกณฑ์เองดูผิด หรือ Task ความเสี่ยงสูงรออนุมัติ | Stop. Ask, with the evidence so far / หยุด แล้วถามพร้อมหลักฐานที่มี |
| **STOP** | The attempt cap is reached, the last attempt made no progress against the one before it (the same failure twice), a critical failure appeared, or the environment cannot run the commands / ถึงจำนวนรอบสูงสุด รอบล่าสุดไม่คืบหน้าจากรอบก่อนหน้า (Failure เดิมซ้ำสองครั้ง) เกิด Critical failure หรือ Environment รันคำสั่งไม่ได้ | Stop. Report the raw output and hand off / หยุด รายงาน Output ดิบ และส่งต่องาน |

Critical failure means data loss, a security problem, or an environment broken by the change.

Critical failure หมายถึงข้อมูลสูญหาย ปัญหา Security หรือ Environment ที่พังเพราะการเปลี่ยนแปลง

HUMAN and STOP are normal outcomes, not failures of the workflow. Reporting them honestly is the requirement.

HUMAN และ STOP เป็นผลลัพธ์ปกติ ไม่ใช่ความล้มเหลวของ Workflow สิ่งที่ต้องทำคือรายงานตามจริง

---

## 5. Gate Rule / กฎของเกณฑ์

AI MUST NOT weaken the gate to make it pass:

AI ห้ามลดเกณฑ์เพื่อให้ผ่าน:

* Do not skip, disable, or delete tests or lint rules to get a green result / ห้ามข้าม ปิด หรือลบ Test หรือ Lint rule เพื่อให้ผ่าน
* Do not use bypass flags or ignore markers unless the Developer asked for them / ห้ามใช้ Flag ข้ามการตรวจหรือ Marker สำหรับ Ignore เว้นแต่ Developer สั่ง
* Do not edit the Verification Commands table or a Baseline during a loop / ห้ามแก้ตาราง Verification Commands หรือ Baseline ระหว่าง Loop
* Do not change acceptance criteria to fit the result / ห้ามแก้ Acceptance criteria ให้เข้ากับผลลัพธ์

If the gate is genuinely wrong, for example a broken test unrelated to the task or a rule the Project no longer wants, the decision is HUMAN.

ถ้าเกณฑ์ผิดจริง เช่น Test ที่พังอยู่แล้วและไม่เกี่ยวกับ Task หรือ Rule ที่ Project ไม่ต้องการแล้ว การตัดสินใจคือ HUMAN

---

## 6. Attempt Cap / จำนวนรอบสูงสุด

Default: **3 attempts**. The Developer may set another number for a task. The cap counts full runs of the commands, not individual edits.

ค่าเริ่มต้น: **3 รอบ** Developer กำหนดจำนวนอื่นสำหรับ Task ได้ จำนวนรอบนับจากการรันคำสั่งครบชุด ไม่ใช่จำนวนครั้งที่แก้ไฟล์

When the cap is reached, the decision is STOP. Do not start another attempt to "just try one more thing".

เมื่อถึงจำนวนรอบสูงสุด การตัดสินใจคือ STOP ห้ามเริ่มรอบเพิ่มเพื่อ "ลองอีกนิด"

---

## 7. Stop Conditions / เงื่อนไขหยุด

The loop ends when any of these is true:

Loop จบเมื่อข้อใดข้อหนึ่งเป็นจริง:

* Verification passed (PASS) / การตรวจสอบผ่าน (PASS)
* Attempt cap reached / ถึงจำนวนรอบสูงสุด
* No progress: the same failure in two consecutive attempts / ไม่คืบหน้า: Failure เดิมซ้ำสองรอบติดกัน
* Critical failure detected / พบ Critical failure
* Developer decision or approval required / ต้องการการตัดสินใจหรือการอนุมัติจาก Developer
* Environment unavailable: a command cannot run for reasons outside the change / Environment ใช้ไม่ได้: คำสั่งรันไม่ได้ด้วยเหตุที่ไม่เกี่ยวกับการเปลี่ยนแปลง
* The Developer cancels / Developer ยกเลิก

An explicit stop condition always exists. AI MUST NOT continue indefinitely.

เงื่อนไขหยุดที่ชัดเจนมีอยู่เสมอ AI ห้ามทำต่อไปเรื่อย ๆ โดยไม่มีที่สิ้นสุด

---

## 8. Baseline / ค่าตั้งต้น

A Baseline records failures that existed before the task, for one command. Example: `634 errors pre-existing, 2026-09-15`.

Baseline บันทึก Failure ที่มีอยู่ก่อน Task สำหรับคำสั่งหนึ่ง ตัวอย่าง: `634 errors pre-existing, 2026-09-15`

With a Baseline, the gate for that command is "no new failures":

เมื่อมี Baseline เกณฑ์ของคำสั่งนั้นคือ "ไม่มี Failure ใหม่":

1. Failures after the change must not exceed the Baseline count / จำนวน Failure หลังการเปลี่ยนแปลงต้องไม่เกินจำนวนใน Baseline
2. No failure may be in a file this change touched / ต้องไม่มี Failure ในไฟล์ที่การเปลี่ยนแปลงนี้แตะ

Record or change a Baseline only outside a loop, with the Developer. Lowering a Baseline is welcome. Raising it is a Developer decision.

บันทึกหรือแก้ Baseline ได้เฉพาะนอก Loop และร่วมกับ Developer การลด Baseline ทำได้เสมอ การเพิ่มเป็นการตัดสินใจของ Developer

---

## 9. Evidence / หลักฐาน

Evidence is written once, in the Handoff, when the loop ends. Do not evaluate the loop during the task. Record at least:

หลักฐานเขียนครั้งเดียวใน Handoff เมื่อ Loop จบ ห้ามประเมิน Loop ระหว่าง Task บันทึกอย่างน้อย:

* Each command and its result: pass, fail, baseline, none, or not-run when the loop stopped before it ran / แต่ละคำสั่งและผล: pass, fail, baseline, none หรือ not-run เมื่อ Loop หยุดก่อนได้รัน
* Number of attempts / จำนวนรอบ
* The final decision and its reason / การตัดสินใจสุดท้ายและเหตุผล
* Whether the Developer had to intervene, and why / Developer ต้องเข้ามาแทรกแซงหรือไม่ เพราะอะไร
* The failure category when any attempt failed or the decision was not PASS, from `evaluation/failure-taxonomy.md` / หมวดของ Failure เมื่อมีรอบใดไม่ผ่านหรือการตัดสินใจไม่ใช่ PASS ตาม `evaluation/failure-taxonomy.md`

The fields and their meaning are defined in `evaluation/evidence.md` and `evaluation/evaluation-schema.yaml`. The Handoff template already contains the block.

ความหมายของแต่ละช่องกำหนดไว้ใน `evaluation/evidence.md` และ `evaluation/evaluation-schema.yaml` Template ของ Handoff มี Block นี้อยู่แล้ว

---

## 10. Developer-Initiated Loops / Loop ที่ Developer สั่ง

The Developer may ask AI to keep going until the gate passes, for example "fix it until the tests pass". Such a request:

Developer อาจสั่งให้ AI ทำต่อจนกว่าเกณฑ์จะผ่าน เช่น "แก้จน Test ผ่าน" คำสั่งแบบนี้:

* Uses the Verification Commands as the stop condition unless the Developer names another / ใช้ Verification Commands เป็นเงื่อนไขหยุด เว้นแต่ Developer ระบุเงื่อนไขอื่น
* Keeps the attempt cap unless the Developer sets a different one / คงจำนวนรอบสูงสุดไว้ เว้นแต่ Developer กำหนดใหม่
* Never includes committing, pushing, deploying, or changing the gate unless the Developer says so explicitly / ไม่รวมการ Commit, Push, Deploy หรือแก้เกณฑ์ เว้นแต่ Developer สั่งอย่างชัดเจน
* Ends with the same decision and evidence as any other loop / จบด้วยการตัดสินใจและหลักฐานแบบเดียวกับ Loop อื่น

AI MUST NOT start a loop the Developer did not ask for, and MUST NOT extend a loop beyond the task it was given.

AI ห้ามเริ่ม Loop ที่ Developer ไม่ได้สั่ง และห้ามขยาย Loop เกินขอบเขต Task ที่ได้รับ

Time-based or event-driven loops, such as scheduled runs or automatic reactions to repository events, are Developer decisions. Record them in the Project's `docs/decisions/`. They are outside this workflow.

Loop ตามเวลาหรือตามเหตุการณ์ เช่น การรันตามตาราง หรือการตอบสนองอัตโนมัติต่อเหตุการณ์ใน Repository เป็นการตัดสินใจของ Developer ให้บันทึกใน `docs/decisions/` ของ Project และอยู่นอก Workflow นี้

---

## 11. What to Report / สิ่งที่ต้องรายงาน

On PASS: the Handoff per `templates/handoff.md`, including the Evidence block.

เมื่อ PASS: Handoff ตาม `templates/handoff.md` พร้อม Evidence block

On HUMAN or STOP: the raw output of the last run, trimmed to the relevant part; the attempts made and what each changed; the decision and its reason; and the Handoff so far. Never describe a failed run as a success, a partial success, or "mostly working".

เมื่อ HUMAN หรือ STOP: Output ดิบของการรันครั้งล่าสุด ตัดให้เหลือส่วนที่เกี่ยวข้อง รอบที่ทำและสิ่งที่แต่ละรอบเปลี่ยน การตัดสินใจและเหตุผล และ Handoff เท่าที่มี ห้ามอธิบายการรันที่ไม่ผ่านว่าสำเร็จ สำเร็จบางส่วน หรือ "ใช้ได้เกือบหมด"

---

## Completion Criteria / เงื่อนไขการจบ Workflow

* [ ] Verification Commands were run, or their absence was stated / รันคำสั่งตรวจสอบแล้ว หรือระบุแล้วว่าไม่มี
* [ ] One decision was recorded after the last run / บันทึกการตัดสินใจหนึ่งข้อหลังการรันครั้งสุดท้าย
* [ ] The gate was not weakened / ไม่ได้ลดเกณฑ์
* [ ] Attempts did not exceed the cap / จำนวนรอบไม่เกินที่กำหนด
* [ ] Evidence is in the Handoff / หลักฐานอยู่ใน Handoff
* [ ] On HUMAN or STOP, the raw output was reported / เมื่อ HUMAN หรือ STOP ได้รายงาน Output ดิบแล้ว

---

## Core Principle / หลักการสำคัญ

**Run the gate. Decide explicitly. Fix, do not weaken. Stop at the cap. Report evidence, not claims.**

**รันเกณฑ์ → ตัดสินใจให้ชัด → แก้ ไม่ลดเกณฑ์ → หยุดตามรอบ → รายงานหลักฐาน ไม่ใช่คำกล่าวอ้าง**
