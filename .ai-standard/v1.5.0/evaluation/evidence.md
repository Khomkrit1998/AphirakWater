# Evidence

# หลักฐาน

## What Evidence Is / หลักฐานคืออะไร

Evidence is observable data produced by execution and verification: what was run, what happened, what was decided. It is not a judgment. Metrics are computed from evidence later, in `evaluation/metrics.md`; the two must stay separate.

หลักฐานคือข้อมูลที่สังเกตได้จากการทำงานและการตรวจสอบ: รันอะไร เกิดอะไร ตัดสินใจอะไร ไม่ใช่ความเห็น Metric คำนวณจากหลักฐานภายหลังตาม `evaluation/metrics.md` และสองอย่างนี้ต้องแยกจากกัน

---

## When and Who / เมื่อไรและใคร

Once per meaningful task, at the end, in the Evidence block of the Handoff (`templates/handoff.md`). Written by whoever closes the task, normally the AI, from the actual command results of the last attempt.

ครั้งเดียวต่อ Task ที่มีสาระสำคัญ ตอนจบงาน ใน Evidence block ของ Handoff (`templates/handoff.md`) เขียนโดยผู้ปิดงาน ซึ่งปกติคือ AI จากผลคำสั่งจริงของรอบสุดท้าย

Automatic collection by a script or other automation is preferred when the environment offers it. Until then the AI fills the block by hand and marks estimates as estimates.

ถ้า Environment มี Script หรือระบบเก็บอัตโนมัติให้ใช้ ไม่เช่นนั้น AI กรอกเอง และระบุค่าที่ประมาณว่าเป็นค่าประมาณ

Never written during the task. Never rewritten afterwards, except to correct a factual error, with a note saying what changed.

ห้ามเขียนระหว่าง Task ห้ามแก้ภายหลัง เว้นแต่แก้ข้อเท็จจริงที่ผิด พร้อมหมายเหตุว่าแก้อะไร

---

## Where / ที่เก็บ

`docs/evaluation/tasks/<YYYY-MM-DD>-<task-slug>.md` in the Project, one file per task. The file is both the Task Report for people and, through its YAML block, the evidence for tools.

`docs/evaluation/tasks/<YYYY-MM-DD>-<task-slug>.md` ใน Project หนึ่งไฟล์ต่อ Task ไฟล์เดียวเป็นทั้งรายงาน Task สำหรับคน และผ่าน YAML block เป็นหลักฐานสำหรับเครื่องมือ

---

## Required Fields / ช่องที่ต้องมี

| Field / ช่อง | Values / ค่า | Meaning / ความหมาย |
| --- | --- | --- |
| `task.id` | `YYYY-MM-DD-task-slug` | Same as the file name / ตรงกับชื่อไฟล์ |
| `task.type` | `feature`, `fix`, `refactor`, `chore`, `docs` | Kind of task / ประเภทงาน |
| `task.risk` | `low`, `medium`, `high` | From the Understand step / จากขั้น Understand |
| `task.status` | `pass`, `human`, `stop` | `decision.final` in lower case. When the two differ, `decision.final` is the source / `decision.final` แบบตัวพิมพ์เล็ก ถ้าต่างกันให้ยึด `decision.final` |
| `standard_version` | `X.Y.Z` | Standard version the task ran under, which is the loop version / Version ของ Standard ที่ใช้ ซึ่งคือ Version ของ Loop |
| `execution.attempts` | integer, at least 1 | Full runs of the Verification Commands / จำนวนครั้งที่รันคำสั่งตรวจสอบครบชุด |
| `execution.duration_minutes` | integer; add a `# estimated` comment when estimated | From the first action on the task to the Handoff / จากการกระทำแรกจนถึง Handoff ใส่ comment `# estimated` เมื่อเป็นค่าประมาณ |
| `verification.typecheck`, `.lint`, `.test`, `.build` | `pass`, `fail`, `baseline`, `none`, `not-run` | Result of the last run. `baseline` = within the recorded Baseline. `none` = no command in the table. `not-run` = the loop stopped before this command could run / ผลรอบสุดท้าย `baseline` = อยู่ใน Baseline ที่บันทึก `none` = ไม่มีคำสั่งในตาราง `not-run` = Loop หยุดก่อนที่คำสั่งนี้จะได้รัน |
| `verification.acceptance_criteria` | `pass`, `fail`, `none`, `not-run` | `none` when no criteria were defined; `not-run` when the loop stopped before they were checked / `none` เมื่อไม่มี criteria `not-run` เมื่อ Loop หยุดก่อนได้ตรวจ |
| `decision.final` | `PASS`, `HUMAN`, `STOP` | Per `workflows/verify-loop.md` / ตาม `workflows/verify-loop.md` |
| `decision.reason` | text | One line / หนึ่งบรรทัด |
| `failure.occurred` | `true`, `false` | Any attempt failed, or the decision was not PASS / มีรอบที่ไม่ผ่าน หรือการตัดสินใจไม่ใช่ PASS |
| `failure.category` | a slug from `evaluation/failure-taxonomy.md`, or `none` | The primary cause / สาเหตุหลัก |
| `failure.reason` | text or `none` | One line / หนึ่งบรรทัด |
| `human.intervention` | `true`, `false` | The Developer had to act during the task / Developer ต้องเข้ามาระหว่าง Task |
| `human.type` | `none`, `expected-approval`, `expected-review`, `unexpected`, `emergency` | See `evaluation/framework.md` section 7. When more than one kind happened, record the most severe: `emergency` > `unexpected` > `expected-review` > `expected-approval`, and mention the others in `reason` / ดู `evaluation/framework.md` หัวข้อ 7 ถ้าเกิดหลายแบบ ให้บันทึกแบบที่รุนแรงที่สุดตามลำดับ `emergency` > `unexpected` > `expected-review` > `expected-approval` และระบุแบบอื่นใน `reason` |
| `human.reason` | text or `none` | One line / หนึ่งบรรทัด |

---

## Optional Fields / ช่องเสริม

`execution.attempt_cap` (the cap that applied, when it is not the default 3), `execution.tokens`, `files_changed`, `regression` (`true` when existing behavior broke), `baseline.compared_to`. Add them when useful; the Standard level uses them. Unknown optional values are omitted, not invented.

`execution.attempt_cap` (จำนวนรอบสูงสุดที่ใช้ เมื่อไม่ใช่ค่าเริ่มต้น 3), `execution.tokens`, `files_changed`, `regression` (`true` เมื่อพฤติกรรมเดิมพัง), `baseline.compared_to` เพิ่มเมื่อมีประโยชน์ ระดับ Standard ใช้ค่าเหล่านี้ ค่าเสริมที่ไม่รู้ให้ละไว้ ไม่ใช่แต่งขึ้น

---

## Rules / กฎ

* One Evidence block per task / หนึ่ง Evidence block ต่อ Task
* Results come from command output, not from memory or intention / ผลมาจาก Output ของคำสั่ง ไม่ใช่จากความจำหรือความตั้งใจ
* `none` means there was no command; `fail` means the command ran and failed. Never write `none` for a command that failed / `none` แปลว่าไม่มีคำสั่ง `fail` แปลว่ารันแล้วไม่ผ่าน ห้ามใส่ `none` ให้คำสั่งที่ไม่ผ่าน
* Estimates say so, in a `# estimated` comment next to the value or in the Handoff text / ค่าประมาณต้องระบุว่าประมาณ ด้วย comment `# estimated` ข้างค่า หรือในข้อความของ Handoff
* Never guess. Every required value is observable when the task ends: the results of the last run, the decision that was recorded, the intervention that happened. A check that did not get to run is `not-run`, not `fail` and not `none` / ห้ามเดา ทุกค่าที่ต้องมีสังเกตได้ตอนจบ Task: ผลรอบสุดท้าย การตัดสินใจที่บันทึก และการแทรกแซงที่เกิดขึ้น การตรวจที่ไม่ได้รันให้ใส่ `not-run` ไม่ใช่ `fail` และไม่ใช่ `none`
* Evidence describes what happened. It contains no rating, score, or opinion / หลักฐานบอกสิ่งที่เกิดขึ้น ไม่มีคะแนน การให้เกรด หรือความเห็น

---

## Example / ตัวอย่าง

```yaml
evidence:
  task:
    id: "2026-09-15-household-export"
    type: "feature"
    risk: "medium"
    status: "pass"
  standard_version: "1.5.0"
  execution:
    attempts: 2
    duration_minutes: 40
  verification:
    typecheck: "pass"
    lint: "baseline"
    test: "pass"
    build: "pass"
    acceptance_criteria: "pass"
  decision:
    final: "PASS"
    reason: "all commands green on attempt 2; lint within baseline"
  failure:
    occurred: true
    category: "implementation"
    reason: "attempt 1: missing null check found by the tests"
  human:
    intervention: false
    type: "none"
    reason: "none"
```
