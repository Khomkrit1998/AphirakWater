# Feedback and Improvement

# Feedback และการปรับปรุง

## Purpose / วัตถุประสงค์

This document closes the loop. `evaluation/metrics.md` turns evidence into numbers and `workflows/evaluate.md` produces a report; this file says how a finding in that report becomes a decision, a change, and a measured result.

เอกสารนี้ปิดวงรอบ `evaluation/metrics.md` เปลี่ยนหลักฐานเป็นตัวเลข และ `workflows/evaluate.md` สร้าง Report ส่วนไฟล์นี้กำหนดว่าสิ่งที่พบใน Report จะกลายเป็นการตัดสินใจ การเปลี่ยนแปลง และผลที่วัดได้อย่างไร

It adds no new framework. Feedback comes from the Evidence blocks that already exist, diagnosis uses `evaluation/failure-taxonomy.md` unchanged, measurement uses `evaluation/metrics.md` unchanged, and a change to the loop is released through `standards/versioning.md`.

ไฟล์นี้ไม่ได้สร้าง Framework ใหม่ Feedback มาจาก Evidence block ที่มีอยู่แล้ว การวินิจฉัยใช้ `evaluation/failure-taxonomy.md` ตามเดิม การวัดใช้ `evaluation/metrics.md` ตามเดิม และการเปลี่ยน Loop ออกเป็น Version ใหม่ตาม `standards/versioning.md`

> **Improve only when evidence justifies improvement.**

> **ปรับปรุงเมื่อหลักฐานมีเหตุผลเพียงพอเท่านั้น**

---

## 1. The Loop / วงรอบ

```text
TASK → EXECUTION → VERIFICATION → DECISION → EVIDENCE      workflows/verify-loop.md
                                                 │
        ═════════════════════════════════════════╪═══   runtime above, improvement below
                                                 │
                                            EVALUATION    workflows/evaluate.md
                                                 ▼
                                             FEEDBACK     section 2, 3
                                                 ▼
                                            DIAGNOSIS     evaluation/failure-taxonomy.md
                                                 ▼
                                             DECISION     section 5: NO_ACTION / MONITOR / ADJUST / IMPROVE / ESCALATE
                                                 ▼
                                           IMPROVEMENT    section 6, 7: one hypothesis, one component
                                                 ▼
                                           NEW VERSION    standards/versioning.md
                                                 ▼
                                      BASELINE COMPARISON section 8, 9
                                                 ▼
                                         MEASURE AGAIN    back to EVALUATION
```

Everything below the line runs outside any task, on accumulated evidence. Nothing in this document is performed during execution.

ทุกอย่างใต้เส้นทำนอก Task บนหลักฐานที่สะสมไว้ ไม่มีส่วนใดในเอกสารนี้ที่ทำระหว่างการทำงาน

---

## 2. Feedback Sources / แหล่งที่มาของ Feedback

Feedback is read, not collected again. Every source below already exists.

Feedback ได้จากการอ่าน ไม่ใช่การเก็บใหม่ ทุกแหล่งด้านล่างมีอยู่แล้ว

| Source / แหล่ง | Where it already lives / อยู่ที่ไหนแล้ว |
| --- | --- |
| Verification results, failed commands / ผลการตรวจสอบ คำสั่งที่ไม่ผ่าน | `verification.*` in the Evidence block |
| Acceptance criteria failures / Acceptance criteria ไม่ผ่าน | `verification.acceptance_criteria` |
| Retries and no progress / การวนซ้ำและการไม่คืบหน้า | `execution.attempts`, `failure.category` |
| Repeated failures / Failure ที่เกิดซ้ำ | Failures by Category across reports / หมวด Failure ข้าม Report |
| Regression / พฤติกรรมเดิมพัง | `regression`, `failure.category: regression` |
| Human intervention / การแทรกแซงของคน | `human.type`, `human.reason` |
| Efficiency and reliability / ประสิทธิภาพและความน่าเชื่อถือ | Metrics in `evaluation/metrics.md` |
| Developer review, user reports, production incidents / การ Review ของ Developer รายงานผู้ใช้ เหตุการณ์ใน Production | Recorded as a Handoff or a note in `docs/decisions/`, then cited as evidence / บันทึกเป็น Handoff หรือใน `docs/decisions/` แล้วอ้างเป็นหลักฐาน |

Rules:

กฎ:

* Prefer observable and reproducible evidence: a command result, a count, a recorded decision / ให้ความสำคัญกับหลักฐานที่สังเกตและทำซ้ำได้ ได้แก่ ผลคำสั่ง จำนวน และการตัดสินใจที่บันทึกไว้
* Feedback from people is accepted, but it must be written down as evidence before it drives a change / Feedback จากคนรับได้ แต่ต้องบันทึกเป็นหลักฐานก่อนจึงจะใช้ขับเคลื่อนการเปลี่ยนแปลง
* AI self-assessment is supplementary. It MUST NOT override a command result or a count / การประเมินตนเองของ AI เป็นข้อมูลเสริม ห้าม Override ผลคำสั่งหรือจำนวนที่นับได้
* No new field is added to the Evidence block for feedback. If a source cannot be expressed with the existing fields, cite the file that holds it / ห้ามเพิ่มช่องใหม่ใน Evidence block เพื่อเก็บ Feedback ถ้าแหล่งใดแสดงด้วยช่องเดิมไม่ได้ ให้อ้างไฟล์ที่เก็บข้อมูลนั้น

---

## 3. Feedback Classification / การจัดประเภท Feedback

Seven classes. They are derived during evaluation from evidence that already exists; they are never recorded per task.

เจ็ดประเภท จำแนกตอนประเมินจากหลักฐานที่มีอยู่แล้ว ไม่ต้องบันทึกต่อ Task

| Class / ประเภท | Derived from / ได้จาก |
| --- | --- |
| `success` | `decision.final: PASS` with `failure.occurred: false` |
| `failure` | `decision.final: STOP`, or any `failure.occurred: true` / `decision.final: STOP` หรือมี `failure.occurred: true` |
| `regression` | `regression: true` or `failure.category: regression` |
| `inefficiency` | `attempts` above the report average, or a rising Average Attempts with a flat success rate / จำนวนรอบสูงกว่าค่าเฉลี่ยของ Report หรือ Average Attempts สูงขึ้นขณะอัตราสำเร็จคงที่ |
| `human-intervention` | `human.type: unexpected` or `emergency` |
| `no-progress` | `failure.category: no-progress` |
| `improvement-opportunity` | A pattern with no single failing task: many `none` in the gate, slow commands, repeated manual steps / รูปแบบที่ไม่มี Task ใดล้มเหลวชัดเจน เช่น `none` จำนวนมากในเกณฑ์ คำสั่งช้า หรือขั้นตอนที่ต้องทำมือซ้ำ |

Do not add a class unless it changes an engineering decision.

ห้ามเพิ่มประเภท เว้นแต่ประเภทนั้นเปลี่ยนการตัดสินใจเชิงวิศวกรรม

---

## 4. Diagnosis / การวินิจฉัย

For a meaningful or recurring finding, name the likely root cause using `evaluation/failure-taxonomy.md`. Do not define a second taxonomy.

สำหรับสิ่งที่พบซึ่งมีนัยสำคัญหรือเกิดซ้ำ ให้ระบุสาเหตุรากโดยใช้ `evaluation/failure-taxonomy.md` ห้ามสร้าง Taxonomy ชุดที่สอง

Diagnosis answers five questions, one line each:

การวินิจฉัยตอบห้าคำถาม ข้อละหนึ่งบรรทัด

1. What happened? / เกิดอะไรขึ้น
2. Where in the loop? Understand, Plan, Act, Verify, or outside the loop / เกิดที่ขั้นไหนของ Loop: Understand, Plan, Act, Verify หรือนอก Loop
3. Why? / ทำไมจึงเกิด
4. Is it recurring, and how many times in which reports? / เกิดซ้ำหรือไม่ กี่ครั้ง ใน Report ใดบ้าง
5. What should change? / ควรเปลี่ยนอะไร

Do not run a root-cause analysis for every successful or trivial task. Diagnose what the decision rules in section 5 select.

ห้ามทำ Root Cause Analysis กับทุก Task ที่สำเร็จหรือปัญหาเล็กน้อย ให้วินิจฉัยเฉพาะสิ่งที่กฎในหัวข้อ 5 คัดเลือกไว้

---

## 5. Improvement Decision / การตัดสินใจ

Every finding gets exactly one decision. The rules are meant to be checked, not judged. `n` is the number of occurrences in the period; a "repeat across reports" means the same failure category or the same metric moving the wrong way in two consecutive reports.

ทุกสิ่งที่พบได้การตัดสินใจหนึ่งข้อ กฎออกแบบให้ตรวจสอบได้ ไม่ใช่ใช้ดุลยพินิจ `n` คือจำนวนครั้งในช่วงเวลานั้น ส่วน "ซ้ำข้าม Report" หมายถึงหมวด Failure เดิมหรือ Metric เดิมที่ขยับผิดทางใน Report สองฉบับติดกัน

| Decision | When / เมื่อ | Action / ทำอะไร | Version |
| --- | --- | --- | --- |
| `NO_ACTION` | `n` = 1, the cause is already fixed or is external and explained / เกิดครั้งเดียว สาเหตุถูกแก้แล้วหรืออยู่ภายนอกและอธิบายได้ | Record one line in the report. Nothing else / บันทึกหนึ่งบรรทัดใน Report ไม่ทำอะไรต่อ | None |
| `MONITOR` | `n` = 1 and the cause is plausible but unconfirmed / เกิดครั้งเดียว สาเหตุเป็นไปได้แต่ยังไม่ยืนยัน | Name what would confirm it and re-check in the next report / ระบุสิ่งที่จะยืนยันได้ แล้วตรวจซ้ำใน Report ถัดไป | None |
| `ADJUST` | `n` ≥ 2 in one period, contained in the Project: docs, context, a command, a configuration value / เกิดตั้งแต่ 2 ครั้งในช่วงเดียว และอยู่ในขอบเขต Project ได้แก่ เอกสาร Context คำสั่ง หรือค่า Configuration | Change the Project. Write an Improvement Record / เปลี่ยนใน Project เขียน Improvement Record | Project only / เฉพาะ Project |
| `IMPROVE` | Repeated across reports, or the change is to the loop itself: a workflow, the gate definition, a rule, a template / ซ้ำข้าม Report หรือเป็นการเปลี่ยน Loop เอง ได้แก่ Workflow นิยามของเกณฑ์ กฎ หรือ Template | Write an Improvement Record, get Developer approval, release a new Standard version / เขียน Improvement Record ขออนุมัติจาก Developer แล้วออก Standard version ใหม่ | New Standard version / Version ใหม่ |
| `ESCALATE` | A critical failure, an `emergency` intervention, a regression that repeats, or a security or data issue / Critical failure การแทรกแซงแบบ `emergency` Regression ที่เกิดซ้ำ หรือปัญหา Security หรือข้อมูล | Stop and bring it to the Developer now, outside the report cycle / หยุดแล้วแจ้ง Developer ทันที ไม่ต้องรอรอบ Report | Developer decides / Developer ตัดสิน |

Rules:

กฎ:

* A group with fewer than 10 tasks cannot produce `IMPROVE` on a rate alone. A rate from too few tasks is insufficient evidence, per `evaluation/metrics.md`. A single critical or security finding may still be `ESCALATE` / กลุ่มที่มีน้อยกว่า 10 Task ใช้อัตราเพียงอย่างเดียวสรุปเป็น `IMPROVE` ไม่ได้ เพราะหลักฐานไม่พอตาม `evaluation/metrics.md` แต่สิ่งที่พบซึ่งเป็น Critical หรือ Security ครั้งเดียวยังเป็น `ESCALATE` ได้
* AI MUST NOT change the Standard on `MONITOR` or `NO_ACTION` / AI ห้ามเปลี่ยน Standard เมื่อการตัดสินใจเป็น `MONITOR` หรือ `NO_ACTION`
* When two decisions could apply, choose the lower one and say what evidence would justify the higher / ถ้าเข้าได้สองแบบ ให้เลือกแบบที่เบากว่า และระบุว่าหลักฐานแบบใดจะรองรับแบบที่หนักกว่า

---

## 6. Improvement Scope / ขอบเขตของการปรับปรุง

One improvement changes one component. The component is recorded as `affected_component`.

หนึ่ง Improvement เปลี่ยนหนึ่ง Component บันทึกไว้ในช่อง `affected_component`

| Component | Means / หมายถึง | Lives in / อยู่ที่ |
| --- | --- | --- |
| `requirement` | How requirements and acceptance criteria are written / วิธีเขียน Requirement และ Acceptance criteria | `docs/requirements/`, `workflows/feature.md` step 1 |
| `workflow` | A step, its order, or its completion criteria / ขั้นตอน ลำดับ หรือเงื่อนไขการจบ | `workflows/` |
| `gate` | Verification Commands, tests, Baseline, acceptance checks / คำสั่งตรวจสอบ Test Baseline การตรวจ Acceptance | Project `CLAUDE.md`, `workflows/verify-loop.md` |
| `prompt` | Instructions or rules that steer AI behavior / Instruction หรือกฎที่กำหนดพฤติกรรมของ AI | `CLAUDE.md`, `standards/development.md` |
| `context` | Project knowledge the AI reads / ความรู้ของ Project ที่ AI อ่าน | `docs/architecture/`, folder-structure docs |
| `tool` | A command, script, plugin, or environment setup / คำสั่ง Script Plugin หรือการตั้งค่า Environment | Project tooling, `plugins/` |
| `docs` | Documentation and Handoff quality / คุณภาพเอกสารและ Handoff | `docs/`, `templates/handoff.md` |
| `config` | Project configuration values / ค่า Configuration ของ Project | Project files |
| `approval` | Which task types need Developer approval / Task ประเภทใดต้องให้ Developer อนุมัติ | `workflows/verify-loop.md`, Project rules |

Rules:

กฎ:

* Change the smallest component that the diagnosis points at / เปลี่ยน Component ที่เล็กที่สุดตามที่การวินิจฉัยชี้
* Do not change unrelated components in one improvement. Two causes are two records / ห้ามเปลี่ยนหลาย Component ที่ไม่เกี่ยวข้องกันใน Improvement เดียว สองสาเหตุคือสองรายการ
* A change to the Project stays in the Project. A change to the loop goes through `standards/versioning.md` / การเปลี่ยนที่ Project ทำใน Project การเปลี่ยน Loop ทำผ่าน `standards/versioning.md`
* Never change a metric definition to make a number look better. See `evaluation/framework.md` section 16 / ห้ามแก้นิยาม Metric เพื่อให้ตัวเลขดูดีขึ้น ดู `evaluation/framework.md` หัวข้อ 16

---

## 7. Improvement Hypothesis / สมมติฐาน

Every `ADJUST` and `IMPROVE` has one hypothesis, in six lines:

ทุก `ADJUST` และ `IMPROVE` ต้องมีสมมติฐานหนึ่งข้อ หกบรรทัด

```text
Problem     what is wrong, one line
Evidence    counts, task ids, which reports
Root cause  a category from evaluation/failure-taxonomy.md plus one line
Hypothesis  if <change>, then <metric> moves in <direction>
Change      the component from section 6 and the exact files
Measure     which metric, over which period, compared with which baseline
```

Example:

ตัวอย่าง:

```text
Problem     Acceptance criteria are missed.
Evidence    acceptance_criteria: fail in 8 of 30 tasks, reports 2026-08-31 and 2026-09-14.
Root cause  requirement: criteria are not turned into checks before Act.
Hypothesis  If the workflow requires writing acceptance criteria as checks in step 1,
            Verification Pass Rate rises and failure.category requirement falls.
Change      workflow: workflows/feature.md step 1, templates/handoff.md.
Measure     Verification Pass Rate and requirement failures, next 30 tasks,
            compared with report 2026-09-14.
```

A hypothesis that cannot name a metric and a baseline is not ready. Either find the measurement or lower the decision to `MONITOR`.

สมมติฐานที่ระบุ Metric และ Baseline ไม่ได้ถือว่ายังไม่พร้อม ให้หาวิธีวัด หรือลดการตัดสินใจลงเป็น `MONITOR`

---

## 8. Baseline and Measurement / ค่าเปรียบเทียบและการวัด

Use the metrics already defined in `evaluation/metrics.md`. Do not define new ones for an improvement.

ใช้ Metric ที่กำหนดไว้แล้วใน `evaluation/metrics.md` ห้ามกำหนด Metric ใหม่เพื่อ Improvement

| The change targets / การเปลี่ยนแปลงมุ่งที่ | Measure with / วัดด้วย |
| --- | --- |
| Outcome | Task Success Rate |
| Quality | Verification Pass Rate, Failures by Category, Regression Rate |
| Efficiency | Average Attempts, Retry Rate, No-Progress Rate, Time to Completion |
| Autonomy | Human Intervention Rate, unexpected + emergency, First-Pass Success |

The baseline is the report that was current when the improvement was accepted, named by its report id, or the Standard version in use then. Record it once, in `baseline`, and do not change it afterwards.

Baseline คือ Report ที่เป็นปัจจุบันตอนที่ Improvement ได้รับการยอมรับ ระบุด้วย report id หรือ Standard version ที่ใช้อยู่ตอนนั้น บันทึกครั้งเดียวในช่อง `baseline` แล้วห้ามแก้ภายหลัง

Rules:

กฎ:

* The simplest sufficient measurement wins. Counts and rates with their denominators are enough / ใช้วิธีวัดที่ง่ายที่สุดเท่าที่เพียงพอ จำนวนและอัตราพร้อมตัวหารก็พอ
* No statistical analysis is required. It belongs to the Advanced level of `evaluation/README.md` / ไม่บังคับให้ทำ Statistical Analysis เพราะอยู่ในระดับ Advanced ของ `evaluation/README.md`
* Outcome and Quality must not fall while Efficiency or Autonomy improves. An improvement that trades them away is a regression / Outcome และ Quality ต้องไม่ลดลงขณะที่ Efficiency หรือ Autonomy ดีขึ้น Improvement ที่แลกกันเช่นนั้นถือเป็น Regression

---

## 9. Validation / การยืนยันผล

After the change is applied, the next evaluation that has enough tasks compares against the recorded baseline and closes the record with one of four results, the same four used in `evaluation/framework.md` section 9:

หลังนำการเปลี่ยนแปลงไปใช้ การประเมินรอบถัดไปที่มี Task พอ ให้เทียบกับ Baseline ที่บันทึกไว้ แล้วปิดรายการด้วยผลหนึ่งในสี่แบบ ซึ่งเป็นสี่แบบเดียวกับ `evaluation/framework.md` หัวข้อ 9

| Result / ผล | Meaning / ความหมาย | Then / จากนั้น |
| --- | --- | --- |
| `improvement` | The named metric moved in the expected direction, and no other metric got worse / Metric ที่ระบุขยับตามที่คาด และไม่มี Metric อื่นแย่ลง | Keep the change. Close the record / คงการเปลี่ยนแปลงไว้ ปิดรายการ |
| `no-meaningful-change` | The metric did not move / Metric ไม่ขยับ | Keep or revert; either way, state why, and do not retry the same hypothesis / จะคงไว้หรือย้อนกลับก็ได้ แต่ต้องระบุเหตุผล และห้ามลองสมมติฐานเดิมซ้ำ |
| `regression` | The metric moved the wrong way, or another metric got worse / Metric ขยับผิดทาง หรือ Metric อื่นแย่ลง | Revert, or raise a new record with the new evidence / ย้อนกลับ หรือเปิดรายการใหม่พร้อมหลักฐานใหม่ |
| `insufficient-evidence` | Fewer than 10 tasks since the change / มี Task น้อยกว่า 10 ตั้งแต่เปลี่ยน | Keep measuring. Do not claim a result / วัดต่อ ห้ามสรุปผล |

AI MUST NOT report an improvement as successful without a baseline comparison. "It should be better" is not a result.

AI ห้ามรายงานว่า Improvement สำเร็จโดยไม่มีการเทียบ Baseline คำว่า "น่าจะดีขึ้น" ไม่ใช่ผลลัพธ์

A record that has been measuring for two reports without reaching 10 tasks is closed as `insufficient-evidence`, with a note. Do not leave records open indefinitely.

รายการที่วัดผลมาแล้วสอง Report แต่ยังไม่ถึง 10 Task ให้ปิดเป็น `insufficient-evidence` พร้อมหมายเหตุ ห้ามค้างรายการไว้ไม่มีกำหนด

---

## 10. Versioning / การจัดการ Version

An `IMPROVE` changes the loop, so it is released as a new Standard version under `standards/versioning.md`. The evidence records `standard_version`, so the next report compares versions on the same metrics.

`IMPROVE` เปลี่ยน Loop จึงต้องออกเป็น Standard version ใหม่ตาม `standards/versioning.md` หลักฐานบันทึก `standard_version` ไว้ Report ถัดไปจึงเทียบ Version ด้วย Metric เดียวกันได้

| Improvement / การปรับปรุง | Version |
| --- | --- |
| A new rule, workflow, template, or check, backward-compatible / กฎ Workflow Template หรือการตรวจใหม่ ที่ไม่กระทบของเดิม | MINOR |
| Wording or a correction that does not change how anyone works / การแก้ถ้อยคำที่ไม่เปลี่ยนวิธีทำงาน | PATCH |
| A change that existing projects must adopt / การเปลี่ยนที่ Project เดิมต้องปรับตาม | MAJOR |
| `ADJUST` inside one Project / `ADJUST` ภายใน Project เดียว | No Standard version. The Project records it in `docs/decisions/` / ไม่ออก Version ของ Standard ให้ Project บันทึกใน `docs/decisions/` |

One version may carry several improvements. List their record ids in the version `CHANGELOG.md`.

หนึ่ง Version บรรจุได้หลาย Improvement ให้ระบุ id ของรายการไว้ใน `CHANGELOG.md` ของ Version นั้น

---

## 11. Automation Levels / ระดับ Automation

These match the adoption levels in `evaluation/README.md`. Minimal is the default and needs nothing built.

ระดับเหล่านี้ตรงกับระดับการนำไปใช้ใน `evaluation/README.md` ค่าเริ่มต้นคือ Minimal ซึ่งไม่ต้องสร้างอะไรเพิ่ม

| Level / ระดับ | Flow / ขั้นตอน |
| --- | --- |
| **Minimal** (default) | Evidence → human review → improvement / หลักฐาน → คนตรวจ → ปรับปรุง |
| **Standard** | Evidence → evaluation → pattern detection → improvement proposal → Developer approval / หลักฐาน → ประเมิน → หา Pattern → เสนอ → Developer อนุมัติ |
| **Advanced** | Evidence → evaluation → automated pattern detection → improvement experiment → baseline comparison → version update / เพิ่มการหา Pattern อัตโนมัติ การทดลอง และการเทียบ Baseline |

Advanced is optional and MUST stay optional. AI MUST NOT modify the development Standard autonomously at any level; a new version always requires Developer approval, per `standards/versioning.md` section 15.

Advanced เป็นทางเลือกและต้องเป็นทางเลือกเสมอ AI ห้ามแก้ Development Standard เองโดยอัตโนมัติในทุกระดับ การออก Version ใหม่ต้องได้รับอนุมัติจาก Developer ตาม `standards/versioning.md` หัวข้อ 15

---

## 12. Human Role / บทบาทของคน

Human involvement is proportional to risk, not minimized.

การมีส่วนร่วมของคนเป็นไปตามความเสี่ยง ไม่ใช่ทำให้น้อยที่สุด

| Decision / การตัดสินใจ | Who / ใคร |
| --- | --- |
| `NO_ACTION`, `MONITOR` | AI records it; the Developer may overrule / AI บันทึกได้ Developer เปลี่ยนได้ |
| `ADJUST` | Developer approves before the change is applied / Developer อนุมัติก่อนนำไปใช้ |
| `IMPROVE` | Developer approves the hypothesis and the new Standard version / Developer อนุมัติทั้งสมมติฐานและ Version ใหม่ |
| `ESCALATE` | Developer decides, immediately / Developer ตัดสินทันที |
| Ambiguous root cause / สาเหตุรากไม่ชัด | Developer resolves it, or the decision stays `MONITOR` / Developer เป็นผู้ชี้ขาด หรือคงไว้เป็น `MONITOR` |
| Closing a record as `improvement` / ปิดรายการเป็น `improvement` | AI computes; the Developer confirms / AI คำนวณ Developer ยืนยัน |

> **Appropriate autonomy for the risk of the change.**

> **ความเป็นอิสระที่เหมาะกับความเสี่ยงของการเปลี่ยนแปลง**

---

## 13. Improvement Record / บันทึกการปรับปรุง

One file per `ADJUST` or `IMPROVE`, saved in the Project as `docs/evaluation/improvements/IMP-<YYYY-MM-DD>-<slug>.md`, from `templates/improvement-record.md`. `NO_ACTION` and `MONITOR` need no file; one line in the report is enough.

หนึ่งไฟล์ต่อหนึ่ง `ADJUST` หรือ `IMPROVE` บันทึกใน Project ที่ `docs/evaluation/improvements/IMP-<YYYY-MM-DD>-<slug>.md` จาก `templates/improvement-record.md` ส่วน `NO_ACTION` และ `MONITOR` ไม่ต้องมีไฟล์ ใช้หนึ่งบรรทัดใน Report ก็พอ

Fields are defined in `evaluation/evaluation-schema.yaml`, section `improvement`:

ความหมายของแต่ละช่องอยู่ใน `evaluation/evaluation-schema.yaml` หัวข้อ `improvement`

```yaml
improvement:
  id:                  # IMP-YYYY-MM-DD-slug, equals the file name
  source:              # report id, task ids, or where the feedback came from
  problem:             # one line
  evidence:            # counts and ids, not opinion
  root_cause:          # failure-taxonomy slug plus one line
  hypothesis:          # if <change>, then <metric> moves in <direction>
  affected_component:  # section 6
  proposed_change:     # the files and what changes in them
  decision:            # NO_ACTION | MONITOR | ADJUST | IMPROVE | ESCALATE
  status:              # proposed | accepted | rejected | deferred | applied | measuring | closed
  baseline:            # report id or standard version, recorded once
  measure:             # which metric, over which period
  result:              # improvement | no-meaningful-change | regression | insufficient-evidence
  version:             # Standard version that carries it, or "project-only"
  owner:               # who is responsible
```

Status moves in one direction: `proposed` → `accepted` / `rejected` / `deferred` → `applied` → `measuring` → `closed`. Only a Developer moves a record past `proposed`.

สถานะเดินไปทางเดียว: `proposed` → `accepted` / `rejected` / `deferred` → `applied` → `measuring` → `closed` เฉพาะ Developer เท่านั้นที่เลื่อนสถานะพ้น `proposed`

The schema may grow. No database or platform is prescribed; files in the Project are sufficient at Minimal.

Schema เพิ่มเติมได้ในอนาคต ไม่กำหนด Database หรือแพลตฟอร์มใด ระดับ Minimal ใช้ไฟล์ใน Project ก็เพียงพอ

---

## 14. Output / ผลลัพธ์

| Form / รูปแบบ | For / สำหรับ | Where / ที่ไหน |
| --- | --- | --- |
| **Improvement Record** | One improvement / หนึ่งรายการ | `docs/evaluation/improvements/`, from `templates/improvement-record.md` |
| **Improvement Report** | A period or a set of improvements / ช่วงเวลาหรือหลายรายการ | The "Improvement Hypotheses" and "Improvement Validation" sections of `templates/evaluation-report.md`. No separate report / อยู่ในหัวข้อ "Improvement Hypotheses" และ "Improvement Validation" ของ `templates/evaluation-report.md` ไม่มี Report แยก |
| **Machine-readable data** | CI, analytics, dashboards, other agents / CI การวิเคราะห์ Dashboard Agent อื่น | The YAML block in each record and in each report, per `evaluation/evaluation-schema.yaml` / Block YAML ในแต่ละรายการและแต่ละ Report ตาม `evaluation/evaluation-schema.yaml` |

The output model is the one that already exists: a human-readable document whose YAML block is the machine-readable form. Nothing is written twice.

รูปแบบผลลัพธ์เป็นแบบเดิม คือเอกสารที่คนอ่านได้ และมี Block YAML เป็นรูปแบบที่เครื่องอ่านได้ในไฟล์เดียวกัน ไม่ต้องเขียนซ้ำ

---

## 15. Runtime Cost / ต้นทุนขณะทำงาน

Normal execution stays Task → Plan → Execute → Verify → Decision. This document adds nothing to it.

การทำงานปกติยังเป็น Task → Plan → Execute → Verify → Decision เอกสารนี้ไม่เพิ่มอะไรให้ขั้นตอนนั้น

* Feedback analysis happens post-run, in batches, periodically, or at a version review / การวิเคราะห์ Feedback ทำหลังงาน เป็นชุด ตามรอบ หรือตอนทบทวน Version
* AI MUST NOT perform an improvement analysis after every task / AI ห้ามทำการวิเคราะห์ Improvement หลังทุก Task
* The Evidence block remains the whole runtime cost of the framework / Evidence block ยังเป็นต้นทุนทั้งหมดของกรอบนี้ขณะทำงาน
* An improvement never runs inside `workflows/verify-loop.md` / Improvement ไม่ทำภายใน `workflows/verify-loop.md`

---

## 16. Anti-Overengineering / กันการออกแบบเกินจำเป็น

Not allowed:

ห้าม:

* More metrics than `evaluation/metrics.md` defines / เพิ่ม Metric เกินที่ `evaluation/metrics.md` กำหนด
* More feedback classes or failure categories than sections 3 and 4 define / เพิ่มประเภท Feedback หรือหมวด Failure เกินที่หัวข้อ 3 และ 4 กำหนด
* Full evaluation or full root-cause analysis on every task / ประเมินเต็มรูปแบบหรือหาสาเหตุรากเต็มรูปแบบทุก Task
* Changing anything without evidence / เปลี่ยนแปลงโดยไม่มีหลักฐาน
* A database, a dashboard, or statistics as a requirement / บังคับให้มี Database Dashboard หรือสถิติ
* A second framework, a second taxonomy, or a second report / สร้าง Framework Taxonomy หรือ Report ชุดที่สอง
* Verification that duplicates the gate / การตรวจสอบที่ซ้ำกับเกณฑ์
* An improvement loop with no closing condition / Improvement Loop ที่ไม่มีเงื่อนไขปิด
* An open record with no owner and no measurement / รายการที่ค้างไว้โดยไม่มีผู้รับผิดชอบและไม่มีการวัด

---

## 17. Self-Review / ตรวจสอบตนเอง

Use this before releasing a change to this document or before adopting it in a Project. Every answer must be yes; otherwise simplify first.

ใช้ก่อนออกการเปลี่ยนแปลงของเอกสารนี้ หรือก่อนที่ Project จะนำไปใช้ ทุกข้อต้องตอบว่าใช่ ถ้าไม่ใช่ให้ลดความซับซ้อนก่อน

* Feedback is evidence-driven and comes from the existing Evidence blocks / Feedback อิงหลักฐานและมาจาก Evidence block ที่มีอยู่
* Diagnosis reuses `evaluation/failure-taxonomy.md`, with no second taxonomy / การวินิจฉัยใช้ `evaluation/failure-taxonomy.md` ไม่มี Taxonomy ชุดที่สอง
* Every `ADJUST` and `IMPROVE` has one hypothesis, one component, one metric, one baseline / ทุก `ADJUST` และ `IMPROVE` มีสมมติฐาน Component Metric และ Baseline อย่างละหนึ่ง
* Baseline comparison closes every record with one of the four results / การเทียบ Baseline ปิดทุกรายการด้วยผลหนึ่งในสี่แบบ
* A loop change goes through `standards/versioning.md` / การเปลี่ยน Loop ทำผ่าน `standards/versioning.md`
* Runtime overhead is unchanged / ต้นทุนขณะทำงานไม่เปลี่ยน
* Human approval matches the risk of the change; automation stays optional / การอนุมัติของคนเหมาะกับความเสี่ยง และ Automation ยังเป็นทางเลือก
* No duplicate framework, metric, or document was created / ไม่มี Framework Metric หรือเอกสารซ้ำซ้อน
* The Standard remains coherent: `evaluation/` still has one model, one schema, one report / Standard ยังสอดคล้องกัน `evaluation/` ยังมีโมเดลเดียว Schema เดียว และ Report เดียว

---

## Core Principle / หลักการสำคัญ

**Evidence decides whether to change. The change names one component, one metric, and one baseline. The next report says whether it worked.**

**หลักฐานเป็นตัวตัดสินว่าจะเปลี่ยนหรือไม่ การเปลี่ยนระบุ Component เดียว Metric เดียว และ Baseline เดียว แล้ว Report ถัดไปบอกว่าได้ผลหรือไม่**
