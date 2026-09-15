# Metrics

# ตัวชี้วัด

## Rules / กฎ

Every metric has seven parts: Metric, Purpose, Definition, Data source, Calculation, Interpretation, Decision supported. A metric that supports no engineering decision is not defined here, even if it is easy to measure.

ทุกตัวชี้วัดมีเจ็ดส่วน: ชื่อ วัตถุประสงค์ นิยาม แหล่งข้อมูล วิธีคำนวณ การตีความ และการตัดสินใจที่รองรับ ตัวชี้วัดที่ไม่ช่วยตัดสินใจเชิงวิศวกรรมจะไม่ถูกกำหนดไว้ที่นี่ แม้จะวัดง่าย

The data source is always the Evidence block defined in `evaluation/evidence.md`. Show counts next to every rate. Groups with fewer than 10 tasks are reported as insufficient evidence.

แหล่งข้อมูลคือ Evidence block ตาม `evaluation/evidence.md` เสมอ แสดงจำนวนดิบคู่กับทุกอัตรา กลุ่มที่มีน้อยกว่า 10 Task ให้รายงานว่าหลักฐานไม่พอ

Outcome and Quality are hard constraints. Efficiency and Autonomy are optimized only when the constraints hold. See `evaluation/framework.md` section 16.

Outcome และ Quality เป็นข้อจำกัดที่ต้องผ่านก่อน Efficiency และ Autonomy ปรับปรุงได้เมื่อข้อจำกัดยังคงอยู่ ดู `evaluation/framework.md` หัวข้อ 16

When a metric judges an improvement, the baseline is the report that was current when the improvement was accepted. Define no new metric for an improvement; use one of these. See `evaluation/improvement.md` section 8.

เมื่อใช้ Metric ตัดสินผลของ Improvement ค่าเปรียบเทียบคือ Report ที่เป็นปัจจุบันตอนที่ Improvement ได้รับการยอมรับ ห้ามกำหนด Metric ใหม่เพื่อ Improvement ให้ใช้ตัวที่มีอยู่ ดู `evaluation/improvement.md` หัวข้อ 8

---

## Minimal Set / ชุด Minimal

Five metrics. Every Project at the Minimal level reports these.

ห้าตัวชี้วัด ทุก Project ที่ระดับ Minimal ต้องรายงาน

### 1. Task Success Rate (Outcome)

| | |
| --- | --- |
| Purpose / วัตถุประสงค์ | The primary measure: is the loop delivering acceptable results / ตัวชี้วัดหลัก: Loop ส่งมอบผลลัพธ์ที่ยอมรับได้หรือไม่ |
| Definition / นิยาม | Share of tasks whose final decision is PASS / สัดส่วน Task ที่การตัดสินใจสุดท้ายคือ PASS |
| Data source / แหล่งข้อมูล | `decision.final` |
| Calculation / วิธีคำนวณ | tasks with `PASS` ÷ all tasks in scope |
| Interpretation / การตีความ | Report separately per `task.risk`. A drop against the previous report is investigated before anything else / รายงานแยกตามความเสี่ยง ถ้าลดลงจาก Report ก่อนหน้าให้สอบสวนก่อนเรื่องอื่น |
| Decision supported / การตัดสินใจ | Accept the loop as the way of working; change the workflow / ยอมรับ Loop เป็นวิธีทำงาน หรือเปลี่ยน Workflow |

### 2. Verification Pass Rate (Quality)

| | |
| --- | --- |
| Purpose / วัตถุประสงค์ | Are results meeting the gate, independent of whether the task closed / ผลลัพธ์ผ่านเกณฑ์หรือไม่ โดยไม่ขึ้นกับว่างานปิดหรือยัง |
| Definition / นิยาม | Share of tasks whose final verification has every check at `pass`, `baseline`, or `none`; a `fail` or `not-run` anywhere means the gate did not pass / สัดส่วน Task ที่การตรวจสอบรอบสุดท้ายทุกช่องเป็น `pass`, `baseline` หรือ `none` ถ้ามี `fail` หรือ `not-run` ที่ใดถือว่าเกณฑ์ไม่ผ่าน |
| Data source / แหล่งข้อมูล | `verification.*` |
| Calculation / วิธีคำนวณ | passing tasks ÷ all tasks. Also report the tasks with no gate: all four commands `none` (acceptance criteria do not count as a gate) / Task ที่ผ่าน ÷ Task ทั้งหมด และรายงานจำนวน Task ที่ไม่มีเกณฑ์ คือคำสั่งทั้งสี่เป็น `none` (acceptance criteria ไม่นับเป็นเกณฑ์) |
| Interpretation / การตีความ | Lower than Task Success Rate means tasks are closed as PASS with a failing gate, which must not happen. Many `none` means the gate is too thin to trust the number / ต่ำกว่า Task Success Rate แปลว่าปิดงานเป็น PASS ทั้งที่เกณฑ์ไม่ผ่าน ซึ่งห้ามเกิด `none` มากแปลว่าเกณฑ์บางเกินกว่าจะเชื่อตัวเลข |
| Decision supported / การตัดสินใจ | Strengthen the Verification Commands; add tests / เสริมคำสั่งตรวจสอบ เพิ่ม Test |

### 3. Average Attempts (Efficiency)

| | |
| --- | --- |
| Purpose / วัตถุประสงค์ | How much iteration a task needs / Task ต้องวนซ้ำมากแค่ไหน |
| Definition / นิยาม | Mean of attempts over tasks in scope / ค่าเฉลี่ยของจำนวนรอบ |
| Data source / แหล่งข้อมูล | `execution.attempts` |
| Calculation / วิธีคำนวณ | sum of attempts ÷ tasks. Also report the tasks at the cap: `attempts` ≥ `execution.attempt_cap`, or ≥ 3 when the cap was not recorded / ผลรวมจำนวนรอบ ÷ จำนวน Task และรายงาน Task ที่ถึงจำนวนรอบสูงสุด คือ `attempts` ≥ `execution.attempt_cap` หรือ ≥ 3 เมื่อไม่ได้บันทึก |
| Interpretation / การตีความ | 1.0 means every task passed first time. Rising values with a stable success rate mean the verification signal is weak or tasks are too large. Never lower it by lowering the gate / 1.0 คือผ่านรอบแรกทุกงาน ค่าที่สูงขึ้นขณะอัตราสำเร็จคงที่แปลว่าสัญญาณจากการตรวจสอบอ่อน หรือ Task ใหญ่เกินไป ห้ามลดค่านี้ด้วยการลดเกณฑ์ |
| Decision supported / การตัดสินใจ | Change the attempt cap; split tasks; improve the gate's error messages / เปลี่ยนจำนวนรอบสูงสุด แบ่ง Task ปรับข้อความ Error ของเกณฑ์ |

### 4. Failures by Category (Quality, diagnosis)

| | |
| --- | --- |
| Purpose / วัตถุประสงค์ | Where the loop breaks, so the right thing gets fixed / Loop พังตรงไหน เพื่อแก้ให้ถูกจุด |
| Definition / นิยาม | Count of tasks per `failure.category` / จำนวน Task ต่อหมวด Failure |
| Data source / แหล่งข้อมูล | `failure.occurred`, `failure.category` |
| Calculation / วิธีคำนวณ | group by category, including `none`, so the counts add up to the tasks in scope; list the top three failure categories with their task ids / จัดกลุ่มตามหมวด รวม `none` ด้วย เพื่อให้ผลรวมเท่ากับจำนวน Task แสดงหมวด Failure สามอันดับแรกพร้อม id ของ Task |
| Interpretation / การตีความ | Use `evaluation/failure-taxonomy.md`: each category points to a kind of change. A category that repeats across reports is a pattern, not an accident / ใช้ `evaluation/failure-taxonomy.md` แต่ละหมวดชี้ไปที่การเปลี่ยนแปลงแบบหนึ่ง หมวดที่ซ้ำข้าม Report คือ Pattern ไม่ใช่เหตุบังเอิญ |
| Decision supported / การตัดสินใจ | What to change first: requirements, docs, gate, tools, or task size / จะเปลี่ยนอะไรก่อน |

### 5. Human Intervention Rate (Reliability and appropriate autonomy)

| | |
| --- | --- |
| Purpose / วัตถุประสงค์ | Is human involvement appropriate for the risk / การมีส่วนร่วมของคนเหมาะกับความเสี่ยงหรือไม่ |
| Definition / นิยาม | Share of tasks with an intervention, split by `human.type` and by `task.risk` / สัดส่วน Task ที่มีการแทรกแซง แยกตามประเภทและความเสี่ยง |
| Data source / แหล่งข้อมูล | `human.intervention`, `human.type`, `task.risk` |
| Calculation / วิธีคำนวณ | tasks with `intervention: true` ÷ all tasks; and separately `unexpected` + `emergency` ÷ all tasks / คำนวณรวม และแยกเฉพาะ `unexpected` + `emergency` |
| Interpretation / การตีความ | Expected approval on high-risk tasks is by design. Unexpected intervention on low-risk tasks is a loop problem. Any emergency is investigated / การอนุมัติที่คาดไว้ในงานความเสี่ยงสูงเป็นไปตามการออกแบบ การแทรกแซงที่ไม่คาดในงานความเสี่ยงต่ำคือปัญหาของ Loop Emergency ทุกกรณีต้องสอบสวน |
| Decision supported / การตัดสินใจ | Add or remove approval for a task type; fix the cause of unexpected interventions / เพิ่มหรือลดการอนุมัติสำหรับ Task บางประเภท แก้สาเหตุของการแทรกแซงที่ไม่คาด |

---

## Standard Set / ชุด Standard

Optional. Added when the Project adopts the Standard level. Same seven parts, shown compactly.

ไม่บังคับ เพิ่มเมื่อ Project ใช้ระดับ Standard เจ็ดส่วนเหมือนกัน แสดงแบบย่อ

| Metric | Purpose / วัตถุประสงค์ | Definition and calculation / นิยามและวิธีคำนวณ | Interpretation / การตีความ | Decision / การตัดสินใจ |
| --- | --- | --- | --- | --- |
| First-Pass Success Rate (Reliability) | Consistency of the loop / ความสม่ำเสมอของ Loop | `PASS` with `attempts: 1` ÷ all tasks | Low with a high success rate means the loop works but relies on retries / ต่ำแต่อัตราสำเร็จสูงแปลว่า Loop ทำงานได้แต่พึ่ง Retry | Improve context and docs before touching the cap / ปรับ Context และเอกสารก่อนแตะจำนวนรอบ |
| Retry Rate (Efficiency) | How often the first attempt fails / รอบแรกไม่ผ่านบ่อยแค่ไหน | tasks with `attempts > 1` ÷ all tasks | Compare per `task.type` / เทียบตามประเภทงาน | Task sizing; gate messages / ขนาด Task และข้อความของเกณฑ์ |
| No-Progress Rate (Efficiency) | Loops that spin / Loop ที่วนโดยไม่ไปไหน | `failure.category: no-progress` ÷ all tasks | Above a few percent, the cap or the escalation rule is wrong / เกินไม่กี่เปอร์เซ็นต์แปลว่าจำนวนรอบหรือกฎการส่งต่อผิด | Escalate to HUMAN earlier; smaller tasks / ส่งต่อ HUMAN เร็วขึ้น Task เล็กลง |
| Time to Completion (Efficiency) | Cost in time / ต้นทุนเวลา | median of `execution.duration_minutes`, per type and risk | An estimate; trends matter more than single values / เป็นค่าประมาณ ดูแนวโน้มมากกว่าค่าเดี่ยว | Where to invest tooling / ควรลงทุนเครื่องมือตรงไหน |
| Regression Rate (Quality) | Existing behavior broken / พฤติกรรมเดิมพัง | tasks with `regression: true` or `failure.category: regression` ÷ all tasks | Any value above zero is investigated / มากกว่าศูนย์ต้องสอบสวน | Tests for the affected area; Baseline discipline / เพิ่ม Test ในส่วนที่กระทบ และวินัยเรื่อง Baseline |
| Version Comparison (Baseline) | Did the last Standard version help / Standard version ล่าสุดช่วยหรือไม่ | Each Minimal metric per `standard_version`, with counts | improvement / regression / no meaningful change / insufficient evidence | Keep, revert, or adjust the version / คง ย้อน หรือปรับ Version |

---

## Not Defined Here / สิ่งที่ไม่กำหนดที่นี่

Escaped defect rate, token cost trends, and statistical significance belong to the Advanced level and need instrumentation this Standard does not require. Define them in the Project when that level is adopted.

Escaped defect rate แนวโน้มต้นทุน Token และนัยสำคัญทางสถิติอยู่ในระดับ Advanced และต้องมีการเก็บข้อมูลที่ Standard นี้ไม่บังคับ ให้กำหนดใน Project เมื่อใช้ระดับนั้น
