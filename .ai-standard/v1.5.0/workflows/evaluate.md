# Evaluation Workflow

# กระบวนการประเมิน Loop

## Purpose / วัตถุประสงค์

Find out whether the AI engineering loop is effective, from the evidence recorded in Handoffs, and turn what is found into a concrete change. The procedure answers:

ดูว่าวงรอบการพัฒนาด้วย AI มีประสิทธิผลหรือไม่ จากหลักฐานที่บันทึกไว้ใน Handoff แล้วเปลี่ยนสิ่งที่พบให้เป็นการปรับปรุงที่จับต้องได้ ขั้นตอนนี้ตอบว่า:

1. Did tasks achieve the expected outcome? / งานสำเร็จตาม Outcome หรือไม่
2. Are results correct and reliable enough? / ผลลัพธ์ถูกต้องและน่าเชื่อถือเพียงพอหรือไม่
3. Did results pass the quality gates? / ผ่าน Quality Gate หรือไม่
4. How many attempts and how much time did they need? / ใช้กี่รอบและเวลาเท่าไร
5. Was human intervention appropriate? / การแทรกแซงของคนเหมาะสมหรือไม่
6. Is the loop improving compared with the previous report or version? / Loop ดีขึ้นเมื่อเทียบกับ Report หรือ Version ก่อนหน้าหรือไม่
7. Can people and tools inspect the result? / คนและเครื่องมือตรวจดูผลได้หรือไม่
8. Did the improvements accepted earlier actually work? / การปรับปรุงที่รับไว้ก่อนหน้าได้ผลจริงหรือไม่

This workflow runs outside any task. It never runs inside `workflows/verify-loop.md`.

Workflow นี้ทำนอก Task ไม่ทำภายใน `workflows/verify-loop.md`

---

## 1. When / เมื่อใด

Run it periodically, not per task. Default: every week, or at every change of the Standard version, or after every 20 tasks, whichever comes first. Also run it for a single task when investigating a failure. The Project records its choice in `docs/decisions/`.

ทำเป็นรอบ ไม่ใช่ทุก Task ค่าเริ่มต้น: ทุกสัปดาห์ หรือทุกครั้งที่ Standard version เปลี่ยน หรือทุก 20 Task แล้วแต่อะไรถึงก่อน และทำสำหรับ Task เดียวเมื่อสอบสวน Failure Project บันทึกความถี่ที่เลือกไว้ใน `docs/decisions/`

---

## 2. Inputs / ข้อมูลนำเข้า

* Every Handoff in `docs/evaluation/tasks/` for the period, with its Evidence block / Handoff ทุกไฟล์ใน `docs/evaluation/tasks/` ของช่วงเวลานั้น พร้อม Evidence block
* The previous report in `docs/evaluation/reports/`, when one exists / Report ก่อนหน้าใน `docs/evaluation/reports/` ถ้ามี
* Every improvement record in `docs/evaluation/improvements/` that is not closed / Improvement Record ทุกไฟล์ใน `docs/evaluation/improvements/` ที่ยังไม่ปิด
* `evaluation/metrics.md`, `evaluation/failure-taxonomy.md`, and `evaluation/improvement.md` / นิยาม Metric, Taxonomy และกฎการปรับปรุง

A Handoff without an Evidence block is counted as "no evidence" and listed in the report. It is not guessed.

Handoff ที่ไม่มี Evidence block นับเป็น "ไม่มีหลักฐาน" และระบุไว้ใน Report ห้ามเดา

---

## 3. Steps / ขั้นตอน

### 1. Collect / รวบรวม

List the Handoffs in scope. Read each Evidence block. Note the Standard version of each task.

รวบรวม Handoff ในขอบเขต อ่าน Evidence block ของแต่ละไฟล์ บันทึก Standard version ของแต่ละ Task

### 2. Compute / คำนวณ

Compute the Minimal metrics from `evaluation/metrics.md`: Task Success Rate, Verification Pass Rate, Average Attempts, Failures by Category, Human Intervention Rate. Add Standard-level metrics when the Project has adopted them.

คำนวณ Metric ระดับ Minimal ตาม `evaluation/metrics.md` ได้แก่ Task Success Rate, Verification Pass Rate, Average Attempts, Failures by Category, Human Intervention Rate เพิ่ม Metric ระดับ Standard เมื่อ Project ใช้ระดับนั้น

Do the arithmetic outside AI reasoning when a script exists. Show the counts, not only the percentages.

ถ้ามี Script ให้คำนวณด้วย Script ไม่ใช่ให้ AI คิดในหัว แสดงจำนวนดิบ ไม่ใช่เฉพาะเปอร์เซ็นต์

### 3. Classify / จำแนก

Group every task with `failure.occurred: true` by failure category. This includes tasks that passed after a retry. Look for repeated categories, repeated files, repeated task types.

จัดกลุ่มทุก Task ที่ `failure.occurred: true` ตามหมวด Failure รวมถึง Task ที่ผ่านหลัง Retry มองหาหมวด ไฟล์ หรือประเภท Task ที่ซ้ำ

### 4. Compare / เปรียบเทียบ

Compare each metric with the previous report and, when the Standard version changed, per version. A group is whatever set is being compared: the whole scope, or a per-risk or per-version subset. Classify the result as `improvement`, `regression`, `no-meaningful-change`, or `insufficient-evidence`. Fewer than 10 tasks in a group is insufficient evidence. When there is no previous report and no other baseline, write `compared_to: none` and `insufficient-evidence`; this report becomes the baseline for the next one.

เทียบแต่ละ Metric กับ Report ก่อนหน้า และเมื่อ Standard version เปลี่ยน ให้เทียบแยกตาม Version กลุ่มคือชุดที่กำลังเทียบ ได้แก่ ทั้งขอบเขต หรือชุดย่อยตามความเสี่ยงหรือตาม Version จัดผลเป็น `improvement`, `regression`, `no-meaningful-change` หรือ `insufficient-evidence` กลุ่มที่มีน้อยกว่า 10 Task ถือว่าหลักฐานไม่พอ ถ้าไม่มี Report ก่อนหน้าและไม่มีค่าเปรียบเทียบอื่น ให้ใส่ `compared_to: none` และ `insufficient-evidence` แล้ว Report นี้จะเป็นค่าเปรียบเทียบของครั้งถัดไป

### 5. Diagnose and decide / วินิจฉัยและตัดสินใจ

Classify each finding with `evaluation/improvement.md` section 3. Diagnose the recurring and the meaningful ones with `evaluation/failure-taxonomy.md`, five answers of one line each. Then give each finding exactly one action: `NO_ACTION`, `MONITOR`, `ADJUST`, `IMPROVE`, or `ESCALATE`, by the rules in `evaluation/improvement.md` section 5. Do not diagnose successful or trivial tasks.

จำแนกแต่ละสิ่งที่พบตาม `evaluation/improvement.md` หัวข้อ 3 วินิจฉัยเฉพาะรายการที่เกิดซ้ำหรือมีนัยสำคัญด้วย `evaluation/failure-taxonomy.md` ตอบห้าข้อ ข้อละหนึ่งบรรทัด แล้วให้การตัดสินใจหนึ่งข้อต่อหนึ่งรายการ ได้แก่ `NO_ACTION`, `MONITOR`, `ADJUST`, `IMPROVE` หรือ `ESCALATE` ตามกฎใน `evaluation/improvement.md` หัวข้อ 5 ไม่ต้องวินิจฉัย Task ที่สำเร็จหรือปัญหาเล็กน้อย

Every `ADJUST` and `IMPROVE` needs a hypothesis in the six lines of `evaluation/improvement.md` section 7, naming one component, one metric, and one baseline, and gets its own file in `docs/evaluation/improvements/` from `templates/improvement-record.md`, at status `proposed`. `NO_ACTION` and `MONITOR` stay as one line in the report. A report may have no action at all when nothing repeated; say so.

ทุก `ADJUST` และ `IMPROVE` ต้องมีสมมติฐานหกบรรทัดตาม `evaluation/improvement.md` หัวข้อ 7 ระบุ Component เดียว Metric เดียว และ Baseline เดียว และต้องมีไฟล์ของตัวเองใน `docs/evaluation/improvements/` จาก `templates/improvement-record.md` สถานะ `proposed` ส่วน `NO_ACTION` และ `MONITOR` อยู่ใน Report บรรทัดเดียว Report อาจไม่มีรายการต้องทำเลยถ้าไม่มีอะไรซ้ำ ให้ระบุเช่นนั้น

### 6. Validate open improvements / ยืนยันผลการปรับปรุงที่ค้างอยู่

For every record at status `measuring`, compare the metric it named against the baseline it recorded, and close it with `improvement`, `no-meaningful-change`, `regression`, or `insufficient-evidence`, per `evaluation/improvement.md` section 9. A record measuring for two reports without reaching 10 tasks is closed as `insufficient-evidence`. Never report an improvement as successful without this comparison.

สำหรับทุก Record ที่สถานะ `measuring` ให้เทียบ Metric ที่ระบุไว้กับ Baseline ที่บันทึกไว้ แล้วปิดด้วยผล `improvement`, `no-meaningful-change`, `regression` หรือ `insufficient-evidence` ตาม `evaluation/improvement.md` หัวข้อ 9 Record ที่วัดผลมาสอง Report แล้วยังไม่ถึง 10 Task ให้ปิดเป็น `insufficient-evidence` ห้ามรายงานว่าการปรับปรุงสำเร็จโดยไม่มีการเทียบนี้

### 7. Write the report / เขียน Report

Fill `templates/evaluation-report.md` and save it as `docs/evaluation/reports/<YYYY-MM-DD>.md`, including the machine-readable block, the actions from step 5, and the validations from step 6.

กรอก `templates/evaluation-report.md` แล้วบันทึกเป็น `docs/evaluation/reports/<YYYY-MM-DD>.md` พร้อม Block แบบเครื่องอ่านได้ การตัดสินใจจากขั้นที่ 5 และผลการยืนยันจากขั้นที่ 6

### 8. Developer decides / Developer ตัดสินใจ

The Developer accepts, rejects, or defers each proposed improvement; until the Developer has reviewed it, its decision is `pending` and its record stays at `proposed`. `ESCALATE` goes to the Developer immediately, without waiting for the next report. A change to Project rules goes into the Project and is recorded in `docs/decisions/`. A change that affects this Standard goes through `standards/versioning.md` as a new version, so the next report can compare versions. Only a Developer moves a record past `proposed`.

Developer ยอมรับ ปฏิเสธ หรือเลื่อนแต่ละรายการที่เสนอ ระหว่างที่ Developer ยังไม่ได้พิจารณา ให้ใส่ `pending` และคง Record ไว้ที่ `proposed` ส่วน `ESCALATE` ให้แจ้ง Developer ทันทีโดยไม่ต้องรอ Report ถัดไป การเปลี่ยนกฎของ Project ทำใน Project และบันทึกใน `docs/decisions/` การเปลี่ยนที่กระทบ Standard นี้ให้ทำผ่าน `standards/versioning.md` เป็น Version ใหม่ เพื่อให้ Report ถัดไปเทียบ Version ได้ เฉพาะ Developer เท่านั้นที่เลื่อนสถานะ Record พ้น `proposed`

---

## Completion Criteria / เงื่อนไขการจบ Workflow

* [ ] Every Handoff in scope was read; those without evidence are listed / อ่าน Handoff ในขอบเขตครบ ระบุไฟล์ที่ไม่มีหลักฐาน
* [ ] Minimal metrics computed with counts shown / คำนวณ Metric ระดับ Minimal พร้อมแสดงจำนวนดิบ
* [ ] Failures classified with the taxonomy / จำแนก Failure ตาม Taxonomy
* [ ] Comparison result stated, including insufficient evidence / ระบุผลการเปรียบเทียบ รวมกรณีหลักฐานไม่พอ
* [ ] Report saved with its machine-readable block / บันทึก Report พร้อม Block แบบเครื่องอ่านได้
* [ ] Every finding has exactly one action from `evaluation/improvement.md` section 5 / ทุกสิ่งที่พบมีการตัดสินใจหนึ่งข้อตาม `evaluation/improvement.md` หัวข้อ 5
* [ ] Every `ADJUST` and `IMPROVE` has a record naming one component, one metric, and one baseline / ทุก `ADJUST` และ `IMPROVE` มี Record ที่ระบุ Component เดียว Metric เดียว และ Baseline เดียว
* [ ] Every record at `measuring` was compared with its baseline, then closed or carried forward with a reason / ทุก Record ที่ `measuring` ถูกเทียบ Baseline แล้วปิด หรือยกไปรอบหน้าพร้อมเหตุผล
* [ ] Each proposed improvement has a Developer decision, or is marked `pending` with an owner / ทุกรายการที่เสนอมีการตัดสินใจของ Developer หรือระบุ `pending` พร้อมผู้รับผิดชอบ

---

## Core Principle / หลักการสำคัญ

**Evaluation observes the loop. It is not another loop inside the loop.**

**การประเมินเฝ้าดู Loop ไม่ใช่ Loop อีกชั้นซ้อนอยู่ข้างใน**
