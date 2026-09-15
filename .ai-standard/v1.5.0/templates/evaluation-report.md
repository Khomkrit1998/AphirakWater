# Evaluation Report

# รายงานการประเมิน Loop

Save this file in the Project as `docs/evaluation/reports/<YYYY-MM-DD>.md`. Produced by `workflows/evaluate.md`. Metric definitions are in `evaluation/metrics.md`; show counts next to every rate. Delete these instruction lines when filling in.

บันทึกไฟล์นี้ใน Project ที่ `docs/evaluation/reports/<YYYY-MM-DD>.md` สร้างตาม `workflows/evaluate.md` นิยามของ Metric อยู่ใน `evaluation/metrics.md` แสดงจำนวนดิบคู่กับทุกอัตรา ลบบรรทัดคำอธิบายนี้เมื่อกรอกเสร็จ

## Scope / ขอบเขต

* **Period / ช่วงเวลา:** [YYYY-MM-DD to YYYY-MM-DD]
* **Standard version / Version:** [X.Y.Z, or list]
* **Tasks in scope / จำนวน Task:** [n]
* **Tasks without evidence / Task ที่ไม่มีหลักฐาน:** [n] — [file names]
* **Evidence source / แหล่งหลักฐาน:** `docs/evaluation/tasks/`

## Outcome / ผลลัพธ์

| Metric | Value / ค่า | Count / จำนวน | Previous / ก่อนหน้า |
| --- | --- | --- | --- |
| Task Success Rate | [x %] | [passed / total] | [x %] |
| by risk / ตามความเสี่ยง | low [x %] · medium [x %] · high [x %] | [counts] | |

## Quality / คุณภาพ

| Metric | Value / ค่า | Count / จำนวน | Previous / ก่อนหน้า |
| --- | --- | --- | --- |
| Verification Pass Rate | [x %] | [no-fail / total] | [x %] |
| Tasks with no gate (all `none`) / Task ที่ไม่มีเกณฑ์ | [n] | | |
| Regression Rate (Standard level / ระดับ Standard) | [x % / not measured] | | |

## Efficiency / ประสิทธิภาพ

| Metric | Value / ค่า | Count / จำนวน | Previous / ก่อนหน้า |
| --- | --- | --- | --- |
| Average Attempts | [x.x] | [sum / total] | [x.x] |
| Tasks at the cap / Task ที่ถึงจำนวนรอบสูงสุด | [n] | | |
| Retry Rate, No-Progress Rate, Time to Completion (Standard level / ระดับ Standard) | [values / not measured] | | |

## Reliability and Autonomy / ความน่าเชื่อถือและความเป็นอิสระ

| Metric | Value / ค่า | Count / จำนวน | Previous / ก่อนหน้า |
| --- | --- | --- | --- |
| Human Intervention Rate | [x %] | [intervened / total] | [x %] |
| Unexpected + Emergency | [x %] | [n] | |
| by risk / ตามความเสี่ยง | low [x %] · medium [x %] · high [x %] | | |
| First-Pass Success (Standard level / ระดับ Standard) | [x % / not measured] | | |

## Failures by Category / Failure ตามหมวด

| Category / หมวด | Count / จำนวน | Task ids | Points to / ชี้ไปที่ |
| --- | --- | --- | --- |
| [slug] | [n] | [ids] | [change per `evaluation/failure-taxonomy.md`] |

## Baseline Comparison / การเทียบกับค่าเปรียบเทียบ

* **Compared to / เทียบกับ:** [previous report id / Standard version / none]
* **Result / ผล:** [improvement / regression / no-meaningful-change / insufficient-evidence]
* **What moved / อะไรขยับ:** [metric: from → to]

Insufficient evidence when a group has fewer than 10 tasks. Say so; do not extrapolate.

หลักฐานไม่พอเมื่อกลุ่มมีน้อยกว่า 10 Task ให้ระบุเช่นนั้น ห้ามอนุมานเกินหลักฐาน

## Diagnosis / การวินิจฉัย

* **Pattern / รูปแบบ:** [what repeats: category, file, task type]
* **Root cause / สาเหตุราก:** [why]

## Improvement Decisions / การตัดสินใจปรับปรุง

One action per finding, per `evaluation/improvement.md` section 5. `ADJUST` and `IMPROVE` also get a record in `docs/evaluation/improvements/`; `NO_ACTION` and `MONITOR` live only in this table. Write `(nothing repeated)` when there is no action to take.

หนึ่งการตัดสินใจต่อหนึ่งสิ่งที่พบ ตาม `evaluation/improvement.md` หัวข้อ 5 `ADJUST` และ `IMPROVE` ต้องมีไฟล์ใน `docs/evaluation/improvements/` ด้วย ส่วน `NO_ACTION` และ `MONITOR` อยู่ในตารางนี้อย่างเดียว ถ้าไม่มีอะไรต้องทำให้เขียนว่า `(nothing repeated)`

| Id | Hypothesis / สมมติฐาน | Component / เปลี่ยนที่ | Expected effect / ผลที่คาด | Action / การตัดสินใจ | Developer | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| [IMP-YYYY-MM-DD-slug / none] | [if <change>, then <metric> moves <direction>] | [requirement / workflow / gate / prompt / context / tool / docs / config / approval] | [which metric should move] | [NO_ACTION / MONITOR / ADJUST / IMPROVE / ESCALATE] | [accepted / rejected / deferred / pending] | [who] |

## Improvement Validation / การยืนยันผลการปรับปรุง

Every record at status `measuring` is compared with the baseline it recorded, per `evaluation/improvement.md` section 9. A record measuring for two reports without reaching 10 tasks is closed as `insufficient-evidence`. Write `(none open)` when there is nothing to validate.

ทุก Record ที่สถานะเป็น `measuring` ให้เทียบกับ Baseline ที่บันทึกไว้ ตาม `evaluation/improvement.md` หัวข้อ 9 Record ที่วัดผลมาสอง Report แล้วยังไม่ถึง 10 Task ให้ปิดเป็น `insufficient-evidence` ถ้าไม่มีรายการให้ยืนยันให้เขียนว่า `(none open)`

| Id | Baseline | Metric | From to / จาก เป็น | Result / ผล | Kept or reverted / คงไว้หรือย้อนกลับ |
| --- | --- | --- | --- | --- | --- |
| [IMP-YYYY-MM-DD-slug] | [report id / X.Y.Z] | [metric] | [x % (n) to x % (n)] | [improvement / no-meaningful-change / regression / insufficient-evidence] | [kept / reverted] |

## Developer Decisions / การตัดสินใจของ Developer

* [Decision and reason. A change to the loop itself becomes a new Standard version per `standards/versioning.md`. Only a Developer moves an improvement record past `proposed`]

## Machine-Readable / แบบเครื่องอ่านได้

Fields per `evaluation/evaluation-schema.yaml`, section `evaluation`.

ช่องข้อมูลตาม `evaluation/evaluation-schema.yaml` หัวข้อ `evaluation`

```yaml
evaluation:
  report_id: "[YYYY-MM-DD]"
  period: { from: "[YYYY-MM-DD]", to: "[YYYY-MM-DD]" }
  standard_version: "[X.Y.Z]"
  tasks: [n]
  tasks_without_evidence: [n]
  outcome:
    task_success_rate: [0.00]
  quality:
    verification_pass_rate: [0.00]
    tasks_with_no_gate: [n]
  efficiency:
    average_attempts: [0.0]
    tasks_at_cap: [n]
  autonomy:
    human_intervention_rate: [0.00]
    unexpected_intervention_rate: [0.00]
  failures:
    by_category: { [slug]: [n] }
  baseline:
    compared_to: "[report id | X.Y.Z | none]"
    result: "[improvement | regression | no-meaningful-change | insufficient-evidence]"
  improvements:
    - id: "[IMP-YYYY-MM-DD-slug | none]"
      hypothesis: "[text]"
      change: "[requirement | workflow | gate | prompt | context | tool | docs | config | approval]"
      expected_effect: "[text]"
      action: "[NO_ACTION | MONITOR | ADJUST | IMPROVE | ESCALATE]"
      decision: "[accepted | rejected | deferred | pending]"
  improvement_validation:
    - id: "[IMP-YYYY-MM-DD-slug]"
      baseline: "[report id | X.Y.Z]"
      result: "[improvement | no-meaningful-change | regression | insufficient-evidence]"
```
