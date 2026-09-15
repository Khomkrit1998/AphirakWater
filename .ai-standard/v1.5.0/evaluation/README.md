# Evaluation Framework

# กรอบการประเมิน

## Purpose / วัตถุประสงค์

This folder defines how a team finds out whether its AI engineering loop works: whether tasks reach their outcome, whether results meet the quality gates, how much iteration and human intervention they need, and whether the loop improves over time.

โฟลเดอร์นี้กำหนดวิธีที่ทีมใช้ดูว่าวงรอบการพัฒนาด้วย AI ทำงานได้ดีหรือไม่: งานถึงผลลัพธ์ที่ต้องการหรือไม่ ผลลัพธ์ผ่านเกณฑ์คุณภาพหรือไม่ ต้องวนซ้ำและให้คนแทรกแซงมากเพียงใด และวงรอบดีขึ้นตามเวลาหรือไม่

It is tool-agnostic. It defines concepts, minimum fields, and procedures. Any tool may implement them; none is required.

ไม่ผูกกับเครื่องมือ กำหนดเฉพาะแนวคิด ช่องข้อมูลขั้นต่ำ และขั้นตอน เครื่องมือใดก็นำไปทำได้ และไม่บังคับให้มีเครื่องมือ

---

## Core Model / โมเดลหลัก

Six things that must not be confused:

หกสิ่งที่ห้ามปนกัน:

```text
Execution      the Agent does the task                      workflows/feature.md, bug-fix.md, change.md
    ↓
Verification   the result is checked against the gate       workflows/verify-loop.md
    ↓
Evidence       observable data from both, recorded once     evidence.md, templates/handoff.md
    ↓
Evaluation     analysis of evidence across tasks            workflows/evaluate.md, metrics.md
    ↓
Output         the result, readable by people and tools     templates/evaluation-report.md, evaluation-schema.yaml
    ↓
Improvement    a change decided from the output, then measured  improvement.md, templates/improvement-record.md
```

Verification answers "is this result acceptable for this task?" and runs inside every task. Evaluation answers "how effective is the loop?" and runs outside tasks, on accumulated evidence.

Verification ตอบว่า "ผลลัพธ์นี้ยอมรับได้สำหรับ Task นี้หรือไม่" และทำภายในทุก Task ส่วน Evaluation ตอบว่า "Loop มีประสิทธิผลเพียงใด" และทำนอก Task บนหลักฐานที่สะสมไว้

Improvement answers "what do we change, and did it work?" It runs on the output of evaluation, never inside a task.

Improvement ตอบว่า "จะเปลี่ยนอะไร และได้ผลหรือไม่" ทำบนผลลัพธ์ของการประเมิน ไม่ทำภายใน Task

This folder evaluates the loop. Whether one output is the right thing, against its requirement, is defined in `standards/evaluation.md`.

โฟลเดอร์นี้ประเมิน Loop ส่วนการประเมินว่าผลลัพธ์หนึ่งชิ้นตอบ Requirement หรือไม่ กำหนดใน `standards/evaluation.md`

---

## Files / ไฟล์

| File / ไฟล์ | Answers / ตอบคำถาม |
| --- | --- |
| `framework.md` | Architecture, principles, risk, human intervention, evaluation levels, frequency, output, storage, improvement, performance rules, metric gaming, the decisions evaluation supports, self-review / สถาปัตยกรรม หลักการ ความเสี่ยง การแทรกแซงของคน ระดับและความถี่การประเมิน ผลลัพธ์ การจัดเก็บ การปรับปรุง กฎด้านประสิทธิภาพ การเล่นกับตัวชี้วัด การตัดสินใจที่การประเมินรองรับ และการตรวจสอบตนเอง |
| `evidence.md` | What is recorded per task, by whom, where / บันทึกอะไรต่อ Task ใครบันทึก เก็บที่ไหน |
| `metrics.md` | How evidence becomes numbers that support a decision / หลักฐานกลายเป็นตัวเลขที่ใช้ตัดสินใจได้อย่างไร |
| `failure-taxonomy.md` | How to classify what went wrong and what to change / จำแนกสิ่งที่ผิดพลาดและสิ่งที่ควรเปลี่ยนอย่างไร |
| `improvement.md` | How a finding becomes one decision, one change, and a measured result / สิ่งที่พบกลายเป็นการตัดสินใจหนึ่งข้อ การเปลี่ยนแปลงหนึ่งอย่าง และผลที่วัดได้อย่างไร |
| `evaluation-schema.yaml` | The data model, in one place / โครงสร้างข้อมูลทั้งหมดในที่เดียว |

Related: `workflows/verify-loop.md` (the runtime loop), `workflows/evaluate.md` (the evaluation procedure), `templates/handoff.md` (task report and evidence), `templates/evaluation-report.md` (evaluation report), `templates/improvement-record.md` (improvement record).

ที่เกี่ยวข้อง: `workflows/verify-loop.md` (วงรอบขณะทำงาน), `workflows/evaluate.md` (ขั้นตอนการประเมิน), `templates/handoff.md` (รายงาน Task และหลักฐาน), `templates/evaluation-report.md` (รายงานการประเมิน), `templates/improvement-record.md` (บันทึกการปรับปรุง)

---

## Adoption Levels / ระดับการนำไปใช้

| Level / ระดับ | Use / ใช้ | Needs / ต้องมี |
| --- | --- | --- |
| **Minimal** (default) | Outcome, Quality, Attempts, Failure category, Human intervention, Task report / Outcome, Quality, จำนวนรอบ, หมวด Failure, การแทรกแซงของคน, รายงาน Task | Handoff files in `docs/evaluation/tasks/`, reports in `docs/evaluation/reports/`, improvement records in `docs/evaluation/improvements/`, a person or an AI session running `workflows/evaluate.md` / ไฟล์ Handoff, ไฟล์ Report, ไฟล์ Improvement Record และคนหรือ AI session ที่ทำตาม `workflows/evaluate.md` |
| **Standard** | Adds Baseline, Efficiency, Reliability, failure trends, version comparison, structured data, CI or report output / เพิ่ม Baseline, Efficiency, Reliability, แนวโน้ม Failure, การเทียบ Version, ข้อมูลแบบมีโครงสร้าง, ผลลัพธ์ผ่าน CI หรือ Report | A script that reads the Evidence blocks, CI integration / Script ที่อ่าน Evidence block และการเชื่อมกับ CI |
| **Advanced** | Adds automated instrumentation, batch evaluation, trend and regression detection, statistics, dashboard, observability, improvement experiments / เพิ่มการเก็บข้อมูลอัตโนมัติ การประเมินเป็นชุด การตรวจจับแนวโน้มและ Regression สถิติ Dashboard Observability และการทดลองปรับปรุง | An evaluation platform / แพลตฟอร์มสำหรับการประเมิน |

Minimal must stay usable without building anything. Start there. The schema does not change between levels, so evidence collected at Minimal stays valid later.

Minimal ต้องใช้ได้โดยไม่ต้องสร้างอะไรเพิ่ม ให้เริ่มที่ระดับนี้ Schema ไม่เปลี่ยนตามระดับ หลักฐานที่เก็บตอน Minimal จึงยังใช้ได้ในระดับถัดไป

---

## Implementation Guidance / แนวทางการนำไปใช้

1. Every meaningful task ends with a Handoff saved in `docs/evaluation/tasks/`, Evidence block filled. This is the only runtime cost / ทุก Task ที่มีสาระสำคัญจบด้วย Handoff ใน `docs/evaluation/tasks/` พร้อม Evidence block นี่คือต้นทุนเดียวขณะทำงาน
2. On a schedule, or when the Standard version changes, run `workflows/evaluate.md` and save the report in `docs/evaluation/reports/` / ตามรอบ หรือเมื่อ Standard version เปลี่ยน ทำตาม `workflows/evaluate.md` แล้วบันทึก Report ใน `docs/evaluation/reports/`
3. Compare with the previous report. Give each finding one action with `improvement.md` section 5, and write a record for every `ADJUST` and `IMPROVE`. Change the workflow, the gate, the prompts, or the tools, never the metric / เทียบกับ Report ก่อนหน้า ให้การตัดสินใจหนึ่งข้อต่อหนึ่งสิ่งที่พบตาม `improvement.md` หัวข้อ 5 และเขียน Record ให้ทุก `ADJUST` และ `IMPROVE` เปลี่ยน Workflow เกณฑ์ Prompt หรือเครื่องมือ ไม่ใช่เปลี่ยนตัวชี้วัด
4. Add tooling only when the manual procedure is too slow. Keep the schema unchanged so old evidence stays comparable / เพิ่มเครื่องมือเมื่อขั้นตอนด้วยมือช้าเกินไปเท่านั้น คง Schema ไว้เพื่อให้หลักฐานเก่ายังเทียบได้
5. Improvement follows the same three levels. At Minimal it is evidence, human review, change. See `improvement.md` section 11 / การปรับปรุงใช้สามระดับเดียวกัน ระดับ Minimal คือ หลักฐาน คนตรวจ แล้วเปลี่ยน ดู `improvement.md` หัวข้อ 11

---

## Core Principle / หลักการสำคัญ

> **Evaluation observes the loop. It is not another loop inside the loop.**

> **การประเมินเฝ้าดู Loop ไม่ใช่ Loop อีกชั้นซ้อนอยู่ข้างใน**
