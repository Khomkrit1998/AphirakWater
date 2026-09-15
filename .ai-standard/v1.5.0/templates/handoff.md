# Development Handoff

# สรุปการส่งต่องาน

Save this file in the Project as `docs/evaluation/tasks/<YYYY-MM-DD>-<task-slug>.md`. Fill the Evidence block at the end once, when the task ends. `workflows/evaluate.md` reads it. Delete these two instruction lines when filling in.

บันทึกไฟล์นี้ใน Project ที่ `docs/evaluation/tasks/<YYYY-MM-DD>-<task-slug>.md` กรอก Evidence block ท้ายไฟล์ครั้งเดียวเมื่อ Task จบ `workflows/evaluate.md` จะอ่านไฟล์นี้ ลบสองบรรทัดคำอธิบายนี้เมื่อกรอกเสร็จ

## Task / งาน

[feature / fix / refactor / chore / docs]: [title]

Risk / ความเสี่ยง: [low / medium / high]

## What Was Requested / สิ่งที่ได้รับมอบหมาย

[Short description of the requirement or requested work]
[คำอธิบายสั้น ๆ ของ Requirement หรืองานที่ได้รับมอบหมาย]

## What Changed / สิ่งที่เปลี่ยนแปลง

* [Change]
* [Change]

## Why / เหตุผล

[Why this implementation or approach was chosen]
[เหตุผลที่เลือก Implementation หรือแนวทางนี้]

## Files Changed / ไฟล์ที่แก้ไข

* `[path/to/file]`
* `[path/to/file]`

## Architecture / Data Impact

### Architecture Impact / ผลกระทบต่อ Architecture

[None / Describe impact]

### API Impact / ผลกระทบต่อ API

[None / Describe endpoint, contract, request/response changes]

### Database / Data Impact / ผลกระทบต่อ Database / Data

[None / Describe schema, migration, data structure, or data flow changes]

## Verification / การตรวจสอบ

### Verification Commands / คำสั่งตรวจสอบ

From the Project `CLAUDE.md`. Attempts count full runs of the whole table, see `workflows/verify-loop.md`. Results are those of the last run.

จาก `CLAUDE.md` ของ Project จำนวนรอบนับการรันตารางครบชุด ดู `workflows/verify-loop.md` ผลคือผลของการรันครั้งสุดท้าย

Attempts / จำนวนรอบ: [n]

| Command / คำสั่ง | Result / ผล |
| --- | --- |
| [typecheck command or none] | [pass / fail / baseline / none / not-run] |
| [lint command or none] | [pass / fail / baseline / none / not-run] |
| [test command or none] | [pass / fail / baseline / none / not-run] |
| [build command or none] | [pass / fail / baseline / none / not-run] |

Baseline: [None / Command and the recorded Baseline]

### Tests / การทดสอบ

* [Test performed]
* [Test performed]

### Result / ผลการทดสอบ

* [Passed / Failed]
* [Verification details]

### Verification Limitations / ข้อจำกัดในการตรวจสอบ

[None / Describe what could not be verified and why]

## Decision / การตัดสินใจ

* **Decision:** [PASS / HUMAN / STOP]
* **Reason / เหตุผล:** [Why this decision, per `workflows/verify-loop.md`]
* **Human intervention / การแทรกแซงของ Developer:** [none / expected-approval / expected-review / unexpected / emergency] — [Reason]

## Known Issues / ปัญหาที่ทราบ

* [None / Known issue]
* [Issue and impact]

## Important Decisions / Decision สำคัญ

* **Decision:** [Decision]

  * **Reason:** [Reason]

* **Decision:** [Decision]

  * **Reason:** [Reason]

## Debug / Continue

### วิธี Debug / ตรวจสอบปัญหา

1. [First place to check]
2. [Second place to check]
3. [Relevant command / flow]

### Next Steps / งานที่ต้องทำต่อ

1. [Next task]
2. [Next task]
3. [Optional follow-up]

## Developer Understanding

## สิ่งที่ Developer ต้องเข้าใจ

The Developer should be able to explain:

Developer ต้องสามารถอธิบายได้ว่า:

* **What changed / เปลี่ยนอะไร**
* **Why it changed / ทำไมเปลี่ยน**
* **How it works / ทำงานอย่างไร**
* **How to test it / ทดสอบอย่างไร**
* **How to debug it / Debug อย่างไร**
* **What risks or limitations exist / มีความเสี่ยงหรือข้อจำกัดอะไร**
* **What should happen next / งานต่อไปคืออะไร**

## Handoff Status / สถานะการส่งต่องาน

* [ ] Implementation completed / Implementation เสร็จแล้ว
* [ ] Tests run and results recorded / รัน Test และบันทึกผลแล้ว
* [ ] Verification completed / ตรวจสอบแล้ว
* [ ] Known issues documented / ระบุปัญหาที่ทราบแล้ว
* [ ] Important decisions documented / บันทึก Decision สำคัญแล้ว
* [ ] Next steps documented / ระบุงานต่อแล้ว
* [ ] Verification Commands run / รันคำสั่งตรวจสอบแล้ว
* [ ] Evidence block filled / กรอก Evidence block แล้ว
* [ ] Developer can continue independently / Developer สามารถทำงานต่อได้

## Evidence / หลักฐาน

Machine-readable summary of this task. Fields are defined in `evaluation/evaluation-schema.yaml`. Fill it once, when the task ends. Estimates are allowed where noted; never leave a claim in place of a result.

สรุปแบบเครื่องอ่านได้ของ Task นี้ ความหมายของแต่ละช่องอยู่ใน `evaluation/evaluation-schema.yaml` กรอกครั้งเดียวเมื่อ Task จบ ช่องที่ระบุว่าประมาณได้ให้ประมาณ แต่ห้ามใส่คำกล่าวอ้างแทนผลลัพธ์

```yaml
evidence:
  task:
    id: "[YYYY-MM-DD-task-slug]"
    type: "[feature | fix | refactor | chore | docs]"
    risk: "[low | medium | high]"
    status: "[pass | human | stop]"
  standard_version: "[X.Y.Z]"
  execution:
    attempts: [n]
    duration_minutes: [n]  # estimated, when not measured
  verification:
    typecheck: "[pass | fail | baseline | none | not-run]"
    lint: "[pass | fail | baseline | none | not-run]"
    test: "[pass | fail | baseline | none | not-run]"
    build: "[pass | fail | baseline | none | not-run]"
    acceptance_criteria: "[pass | fail | none | not-run]"
  decision:
    final: "[PASS | HUMAN | STOP]"
    reason: "[short reason]"
  failure:
    occurred: [true | false]
    category: "[none | requirement | planning | implementation | verification | tool | context | state | environment | regression | no-progress | human-dependency]"
    reason: "[short reason or none]"
  human:
    intervention: [true | false]
    type: "[none | expected-approval | expected-review | unexpected | emergency]"
    reason: "[short reason or none]"
```
