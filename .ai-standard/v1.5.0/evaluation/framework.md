# Evaluation Framework: Architecture and Principles

# กรอบการประเมิน: สถาปัตยกรรมและหลักการ

## 1. Architecture / สถาปัตยกรรม

```text
                         TASK
                          │
                          ▼
                    ┌───────────┐
                    │   PLAN    │   workflows/feature.md
                    └─────┬─────┘
                          ▼
                    ┌───────────┐
                    │    ACT    │
                    └─────┬─────┘
                          ▼
                    ┌───────────┐
                    │  VERIFY   │   workflows/verify-loop.md
                    └─────┬─────┘
                          ▼
                    ┌───────────┐
                    │ DECISION  │   PASS / RETRY / HUMAN / STOP
                    └─────┬─────┘
                          ▼
                       EVIDENCE      templates/handoff.md → docs/evaluation/tasks/
                          │
              ════════════╪════════════   runtime above, evaluation below
                          │
                          ▼
                     EVALUATION      workflows/evaluate.md
                          │
                   ┌──────┼──────┐
                   ▼      ▼      ▼
                METRICS BASELINE TRENDS   evaluation/metrics.md
                   └──────┼──────┘
                          ▼
                       FEEDBACK      evaluation/improvement.md sections 2, 3
                          ▼
                      DIAGNOSIS      evaluation/failure-taxonomy.md
                          ▼
                       DECISION      NO_ACTION / MONITOR / ADJUST / IMPROVE / ESCALATE
                          ▼
                     IMPROVEMENT     one component, one hypothesis, one baseline
                          ▼
                      NEW VERSION    standards/versioning.md
                          ▼
                BASELINE COMPARISON  evaluation/improvement.md section 9
                          │
                          └────→ Measure again

Output:  Task report (Handoff)  ·  Evaluation report  ·  Improvement record  ·  Machine-readable data (YAML blocks)
```

The line in the middle is the most important part. Everything above it runs inside a task and must stay light. Everything below it runs later, on accumulated evidence.

เส้นกลางคือส่วนสำคัญที่สุด ทุกอย่างเหนือเส้นทำงานภายใน Task และต้องเบา ทุกอย่างใต้เส้นทำภายหลังบนหลักฐานที่สะสมไว้

---

## 2. Core Principles / หลักการ

1. **Outcome over activity** / ผลลัพธ์สำคัญกว่ากิจกรรม
2. **Evidence over claims** / หลักฐานสำคัญกว่าคำกล่าวอ้าง
3. **Verification before completion** / ตรวจสอบก่อนถือว่าเสร็จ
4. **Quality before efficiency** / คุณภาพก่อนประสิทธิภาพ
5. **Explicit decision and stop conditions** / การตัดสินใจและเงื่อนไขหยุดต้องชัดเจน
6. **Risk-appropriate verification** / ตรวจสอบลึกตามความเสี่ยง
7. **Appropriate human intervention** / คนแทรกแซงเท่าที่เหมาะสม
8. **Baseline before optimization** / มี Baseline ก่อนปรับปรุง
9. **Automate measurement** / วัดอัตโนมัติเมื่อทำได้
10. **Evaluation drives improvement** / การประเมินต้องนำไปสู่การปรับปรุง
11. **Runtime first** / งานจริงมาก่อน
12. **Keep evaluation out of the critical runtime path** / การประเมินอยู่นอกเส้นทางการทำงานหลัก
13. **Observable evaluation output** / ผลการประเมินต้องดูและใช้ต่อได้
14. **Tool-agnostic by design** / ไม่ผูกกับเครื่องมือ
15. **Improve only when evidence justifies it** / ปรับปรุงเมื่อหลักฐานมีเหตุผลเพียงพอเท่านั้น

---

## 3. Verification and Evaluation / การตรวจสอบกับการประเมิน

| | Verification / การตรวจสอบ | Evaluation / การประเมิน |
| --- | --- | --- |
| Question / คำถาม | Is this result acceptable for this task? / ผลลัพธ์นี้ยอมรับได้สำหรับ Task นี้หรือไม่ | How effective is the loop at producing acceptable results? / Loop ผลิตผลลัพธ์ที่ยอมรับได้มีประสิทธิผลเพียงใด |
| When / เมื่อใด | Inside every task, every attempt / ในทุก Task ทุกรอบ | After runs, in batches, on a schedule, when investigating / หลังงานเสร็จ เป็นชุด ตามรอบ หรือเมื่อสอบสวน |
| Examples / ตัวอย่าง | Tests, build, lint, acceptance criteria, schema validity, security checks / Test, Build, Lint, Acceptance criteria, Schema, การตรวจ Security | Success rate, attempts, failure categories, intervention rate, trend, baseline comparison / อัตราสำเร็จ จำนวนรอบ หมวด Failure อัตราแทรกแซง แนวโน้ม การเทียบ Baseline |
| Defined in / กำหนดใน | `workflows/verify-loop.md` | `workflows/evaluate.md`, `evaluation/metrics.md` |

Evaluation MUST NOT block normal execution.

การประเมินห้ามขวางการทำงานปกติ

Evaluation in this framework means evaluation of the loop. Evaluating one output against its requirement is part of the task, defined in `standards/evaluation.md`.

Evaluation ในกรอบนี้หมายถึงการประเมิน Loop ส่วนการประเมินผลลัพธ์หนึ่งชิ้นเทียบกับ Requirement เป็นส่วนหนึ่งของ Task กำหนดใน `standards/evaluation.md`

---

## 4. Execution Loop and Decisions / วงรอบและการตัดสินใจ

The runtime loop is Plan → Act → Verify → Decision, with four decisions: PASS, RETRY, HUMAN, STOP. It is defined once, in `workflows/verify-loop.md`, together with the quality gate (the Verification Commands), the attempt cap, and the stop conditions. This framework only consumes what that loop records; it adds no step to it.

วงรอบขณะทำงานคือ Plan → Act → Verify → Decision มีการตัดสินใจสี่แบบ: PASS, RETRY, HUMAN, STOP กำหนดไว้ที่เดียวใน `workflows/verify-loop.md` พร้อมเกณฑ์คุณภาพ (Verification Commands) จำนวนรอบสูงสุด และเงื่อนไขหยุด กรอบนี้ใช้เฉพาะสิ่งที่วงรอบนั้นบันทึกไว้ ไม่เพิ่มขั้นตอนให้วงรอบ

---

## 5. Risk Model / ความเสี่ยง

Verification depth follows task risk, as set in the Understand step and applied in `workflows/verify-loop.md`:

ความลึกของการตรวจสอบเป็นไปตามความเสี่ยงของ Task ที่กำหนดในขั้น Understand และใช้ใน `workflows/verify-loop.md`:

| Risk / ความเสี่ยง | Verification / การตรวจสอบ | Human / คน |
| --- | --- | --- |
| low | Verification Commands / คำสั่งตรวจสอบ | Report only / รายงานเท่านั้น |
| medium | + acceptance criteria | Report only / รายงานเท่านั้น |
| high | + manual checks / + การตรวจด้วยมือ | Approval before completion / อนุมัติก่อนปิดงาน |

Risk is recorded per task in the evidence. That lets evaluation separate "many interventions on high-risk tasks", which is by design, from "many interventions on low-risk tasks", which is a loop problem.

ความเสี่ยงถูกบันทึกต่อ Task ในหลักฐาน ทำให้การประเมินแยกได้ระหว่าง "แทรกแซงมากใน Task ความเสี่ยงสูง" ซึ่งเป็นไปตามการออกแบบ กับ "แทรกแซงมากใน Task ความเสี่ยงต่ำ" ซึ่งเป็นปัญหาของ Loop

---

## 6. Quality Gates / เกณฑ์คุณภาพ

A task is complete only when:

Task ถือว่าเสร็จเมื่อ:

```text
Acceptance criteria PASS  (or none required for low risk)
        AND
Required verification PASS  (Verification Commands, within Baseline)
        AND
No critical failure
        ↓
      PASS
```

Efficiency never compensates for a failed gate. A task that "passed" in one attempt by skipping a test is a failure, not a success.

ประสิทธิภาพชดเชยเกณฑ์ที่ไม่ผ่านไม่ได้ Task ที่ "ผ่าน" ในรอบเดียวเพราะข้าม Test คือความล้มเหลว ไม่ใช่ความสำเร็จ

---

## 7. Human Intervention / การแทรกแซงของคน

Human involvement is part of the design. Four kinds of intervention are distinguished in the evidence, plus `none` when nobody had to step in:

การมีส่วนร่วมของคนเป็นส่วนหนึ่งของการออกแบบ หลักฐานแยกการแทรกแซงไว้สี่แบบ บวก `none` เมื่อไม่มีใครต้องเข้ามา:

| Type / ประเภท | Meaning / ความหมาย | Counts as a loop problem? / นับเป็นปัญหาของ Loop? |
| --- | --- | --- |
| `none` | No intervention during the task / ไม่มีการแทรกแซงระหว่าง Task | No / ไม่ |
| `expected-approval` | Approval the workflow requires, for example high risk / การอนุมัติที่ Workflow กำหนด เช่น ความเสี่ยงสูง | No / ไม่ |
| `expected-review` | Review that was planned / การ Review ที่วางแผนไว้ | No / ไม่ |
| `unexpected` | The Developer had to step in where the loop should have coped / Developer ต้องเข้ามาในจุดที่ Loop ควรจัดการเองได้ | Yes / ใช่ |
| `emergency` | Intervention to stop damage / เข้ามาเพื่อหยุดความเสียหาย | Yes, investigate / ใช่ ต้องสอบสวน |

Less intervention is not automatically better. The goal is appropriate autonomy for the task risk.

การแทรกแซงน้อยลงไม่ได้แปลว่าดีขึ้นเสมอ เป้าหมายคือความเป็นอิสระที่เหมาะกับความเสี่ยงของ Task

When several kinds happened in one task, the evidence records the most severe (`emergency` > `unexpected` > `expected-review` > `expected-approval`) and names the others in its reason.

ถ้าเกิดหลายแบบใน Task เดียว หลักฐานบันทึกแบบที่รุนแรงที่สุด (`emergency` > `unexpected` > `expected-review` > `expected-approval`) และระบุแบบอื่นในเหตุผล

---

## 8. Evidence over Claims / หลักฐานมาก่อนคำกล่าวอ้าง

```text
Bad:   "Implementation is high quality."
Good:  typecheck pass · lint baseline · test pass · build pass · acceptance pass · attempts 2
```

Self-assessment by the Agent may be supplementary. It MUST NOT be treated as authoritative when a command result is available.

การประเมินตนเองของ Agent ใช้เสริมได้ แต่ห้ามถือเป็นหลักเมื่อมีผลจากคำสั่งจริง

---

## 9. Baseline / ค่าเปรียบเทียบ

Evaluation compares against a baseline: the previous report, the previous Standard version, an alternative workflow, or a human-only baseline when one exists.

การประเมินต้องเทียบกับค่าเปรียบเทียบ: Report ก่อนหน้า Standard version ก่อนหน้า Workflow ทางเลือก หรือค่าที่คนทำโดยไม่มี AI ถ้ามี

Every comparison ends in one of four results: **improvement**, **regression**, **no meaningful change**, **insufficient evidence**. Fewer than 10 tasks in a group is insufficient evidence. Say so instead of claiming improvement from anecdotes.

ผลการเปรียบเทียบมีสี่แบบ: **Improvement**, **Regression**, **No meaningful change**, **Insufficient evidence** กลุ่มที่มีน้อยกว่า 10 Task ถือว่าหลักฐานไม่พอ ให้ระบุเช่นนั้นแทนการอ้างว่าดีขึ้นจากตัวอย่างไม่กี่กรณี

---

## 10. Evaluation Levels / ระดับการประเมิน

| Level / ระดับ | Scope / ขอบเขต | Where / ที่ไหน |
| --- | --- | --- |
| **1. Runtime evidence** | One task: status, attempts, command results, decision, failure, intervention / หนึ่ง Task | Evidence block in the Handoff, written once / Evidence block ใน Handoff เขียนครั้งเดียว |
| **2. Post-run evaluation** | One task, when investigating: outcome, quality, efficiency, failure classification / หนึ่ง Task เมื่อสอบสวน | `workflows/evaluate.md` on one file |
| **3. Periodic evaluation** | Many tasks: trends, baseline, failure patterns, regression, version comparison / หลาย Task | `workflows/evaluate.md` on a period, report in `docs/evaluation/reports/` |

Levels 2 and 3 are outside the runtime path.

ระดับ 2 และ 3 อยู่นอกเส้นทางการทำงานหลัก

---

## 11. Frequency / ความถี่

| What / อะไร | Default / ค่าเริ่มต้น |
| --- | --- |
| Runtime evidence / หลักฐานขณะทำงาน | Every meaningful task / ทุก Task ที่มีสาระสำคัญ |
| Post-run evaluation / ประเมินหลังงาน | On failure, or for selected tasks / เมื่อล้มเหลว หรือ Task ที่เลือก |
| Periodic evaluation / ประเมินตามรอบ | Weekly, at each Standard version change, or every 20 tasks, whichever comes first / ทุกสัปดาห์ ทุกครั้งที่ Standard version เปลี่ยน หรือทุก 20 Task แล้วแต่อะไรถึงก่อน |

The frequency is configurable per Project and recorded in `docs/decisions/`. High-cost evaluation never runs automatically for every task.

ความถี่ตั้งค่าได้ต่อ Project และบันทึกใน `docs/decisions/` การประเมินที่มีต้นทุนสูงไม่ทำอัตโนมัติทุก Task

---

## 12. Output / ผลลัพธ์

| Form / รูปแบบ | For / สำหรับ | Where / ที่ไหน |
| --- | --- | --- |
| **A. Task report** / รายงาน Task | Inspecting one task / ดูงานเดียว | The Handoff, `templates/handoff.md` |
| **B. Evaluation report** / รายงานการประเมิน | A period or a workflow / ช่วงเวลาหรือ Workflow | `templates/evaluation-report.md` |
| **C. Improvement record** / บันทึกการปรับปรุง | One accepted improvement and its measured result / หนึ่งการปรับปรุงที่รับไว้และผลที่วัดได้ | `templates/improvement-record.md`, rules in `evaluation/improvement.md` |
| **D. Machine-readable data** / ข้อมูลแบบเครื่องอ่านได้ | Scripts, CI, dashboards, other agents / Script, CI, Dashboard, Agent อื่น | The Evidence block (YAML) in each Handoff and the block in each report and record, per `evaluation/evaluation-schema.yaml` |

Every document above is a human-readable file whose YAML block is its machine-readable form, so nothing is written twice.

ทุกเอกสารข้างต้นเป็นไฟล์ที่คนอ่านได้ และมี Block YAML เป็นรูปแบบที่เครื่องอ่านได้ในไฟล์เดียวกัน จึงไม่ต้องเขียนซ้ำ

---

## 13. Observability and Storage / การเข้าถึงและการจัดเก็บ

```text
Data collection → Data storage → Evaluation → Output → Visualization / Consumption
```

| Adoption / ระดับ | Storage / จัดเก็บ | Consumption / ใช้ผล |
| --- | --- | --- |
| Minimal | Files in the Project: `docs/evaluation/tasks/`, `docs/evaluation/reports/` / ไฟล์ใน Project | Any text tool, the repository history / เครื่องมืออ่านข้อความใดก็ได้ และประวัติใน Repository |
| Standard | Same files plus structured data extracted by a script / ไฟล์เดิมบวกข้อมูลที่ Script สกัดออกมา | CI report, version comparison / Report ใน CI และการเทียบ Version |
| Advanced | Database, observability platform / ฐานข้อมูล แพลตฟอร์ม Observability | Dashboard, alerts, statistics / Dashboard การแจ้งเตือน สถิติ |

Storage at every level must keep history per Standard version, be reproducible from the files, and be auditable when required. The schema does not change between levels, so a dashboard can be added later without changing the framework.

ทุกระดับต้องเก็บประวัติแยกตาม Standard version สร้างซ้ำได้จากไฟล์ และตรวจสอบย้อนหลังได้เมื่อจำเป็น Schema ไม่เปลี่ยนตามระดับ จึงเพิ่ม Dashboard ภายหลังได้โดยไม่ต้องแก้กรอบ

---

## 14. Continuous Improvement and Versioning / การปรับปรุงต่อเนื่องและ Version

```text
Execution → Evidence → Evaluation → Pattern → Root cause → Hypothesis
    → Change (workflow / gate / prompt / tool) → New Standard version → Measure again
```

A loop version is a Standard version. Evidence records `standard_version`, so two versions can be compared on the same metrics. A change to the loop goes through `standards/versioning.md`; the report after the change says whether it improved anything.

Version ของ Loop คือ Version ของ Standard หลักฐานบันทึก `standard_version` ทำให้เทียบสอง Version ด้วย Metric เดียวกันได้ การเปลี่ยน Loop ทำผ่าน `standards/versioning.md` และ Report หลังการเปลี่ยนจะบอกว่าดีขึ้นจริงหรือไม่

Prefer repeated patterns and meaningful evidence over isolated anecdotes.

ให้น้ำหนักกับ Pattern ที่ซ้ำและหลักฐานที่มีนัยสำคัญ มากกว่ากรณีเดี่ยว

The procedure, the five decisions (`NO_ACTION`, `MONITOR`, `ADJUST`, `IMPROVE`, `ESCALATE`), the record, and the baseline comparison are defined in `evaluation/improvement.md`. That file is the only place that turns a finding into a change; this section states the principle, not the procedure.

ขั้นตอน การตัดสินใจห้าแบบ (`NO_ACTION`, `MONITOR`, `ADJUST`, `IMPROVE`, `ESCALATE`) รูปแบบบันทึก และการเทียบ Baseline กำหนดไว้ใน `evaluation/improvement.md` ซึ่งเป็นที่เดียวที่เปลี่ยนสิ่งที่พบให้เป็นการเปลี่ยนแปลง หัวข้อนี้ระบุเฉพาะหลักการ ไม่ใช่ขั้นตอน

---

## 15. Performance Constraint / ข้อจำกัดด้านประสิทธิภาพ

Mandatory. The framework MUST NOT unnecessarily increase runtime duration, token usage, compute cost, context usage, reasoning overhead, or redundant verification.

บังคับ กรอบนี้ห้ามเพิ่มเวลาทำงาน การใช้ Token ต้นทุนการประมวลผล การใช้ Context ภาระการคิด หรือการตรวจสอบซ้ำซ้อนโดยไม่จำเป็น

1. Runtime performs only the required verification / ขณะทำงานทำเฉพาะการตรวจสอบที่จำเป็น
2. Evidence collection is automatic whenever practical / เก็บหลักฐานอัตโนมัติเมื่อทำได้
3. Metrics are calculated outside Agent reasoning whenever possible / คำนวณ Metric นอกการคิดของ Agent เมื่อทำได้
4. Detailed evaluation happens post-run or asynchronously / การประเมินละเอียดทำหลังงานหรือแบบ Asynchronous
5. Periodic analysis operates on accumulated evidence / การวิเคราะห์ตามรอบใช้หลักฐานที่สะสมไว้
6. No detailed self-evaluation after every task; the Evidence block is the whole runtime cost / ไม่ต้องประเมินตนเองละเอียดทุก Task Evidence block คือต้นทุนทั้งหมดขณะทำงาน
7. No duplicate verification / ไม่ตรวจสอบซ้ำซ้อน
8. No evaluation loop inside the execution loop unless explicitly justified / ไม่ใส่ Loop การประเมินไว้ใน Loop การทำงาน เว้นแต่มีเหตุผลชัดเจน

> **Evaluation should observe the loop, not become another expensive loop inside the loop.**

> **การประเมินควรเฝ้าดู Loop ไม่ใช่กลายเป็น Loop ราคาแพงอีกชั้นซ้อนอยู่ข้างใน**

---

## 16. Metric Gaming / การเล่นกับตัวชี้วัด

| Optimizing / ถ้าไล่ตัวเลข | Produces / จะได้ |
| --- | --- |
| Fewer attempts / รอบน้อยลง | Stopping too early / หยุดเร็วเกินไป |
| Less time / เวลาน้อยลง | Skipped verification / ข้ามการตรวจสอบ |
| Less human intervention / คนแทรกแซงน้อยลง | Inappropriate autonomous decisions / ตัดสินใจเองในจุดที่ไม่ควร |
| Higher success rate / อัตราสำเร็จสูงขึ้น | A lower definition of success / ลดนิยามของความสำเร็จ |

Therefore:

ดังนั้น:

```text
Outcome + Quality        →  hard constraints, never traded
        ↓
Efficiency + Autonomy    →  optimized only after the constraints hold
```

Metrics never replace the engineering objective. The Gate Rule in `workflows/verify-loop.md` is the runtime side of this principle.

ตัวชี้วัดไม่มีวันแทนที่เป้าหมายทางวิศวกรรม กฎของเกณฑ์ใน `workflows/verify-loop.md` คือด้านขณะทำงานของหลักการนี้

---

## 17. Decisions Evaluation Supports / การตัดสินใจที่การประเมินรองรับ

Evaluation is successful only when it supports decisions such as:

การประเมินสำเร็จก็ต่อเมื่อช่วยตัดสินใจเรื่องเหล่านี้ได้:

* Should this loop be accepted as the way of working? / ควรยอมรับ Loop นี้เป็นวิธีทำงานหรือไม่
* Should retry behavior or the attempt cap change? / ควรเปลี่ยนพฤติกรรม Retry หรือจำนวนรอบสูงสุดหรือไม่
* Should verification be strengthened, for example more tests or a new command in the table? / ควรเสริมการตรวจสอบ เช่น เพิ่ม Test หรือคำสั่งในตารางหรือไม่
* Should human approval be added, or removed, for a task type? / ควรเพิ่มหรือลดการอนุมัติของคนสำหรับ Task บางประเภทหรือไม่
* Should the workflow change? / ควรเปลี่ยน Workflow หรือไม่
* Did the latest Standard version improve anything? / Standard version ล่าสุดทำให้อะไรดีขึ้นหรือไม่
* Did the latest change introduce a regression? / การเปลี่ยนล่าสุดทำให้เกิด Regression หรือไม่
* Is the loop efficient enough for its outcome and quality? / Loop มีประสิทธิภาพพอสำหรับ Outcome และ Quality ที่ได้หรือไม่

---

## 18. Self-Review / ตรวจสอบตนเอง

Use this checklist when changing this framework or when adopting it in a Project. Every answer must be yes.

ใช้รายการนี้เมื่อแก้กรอบนี้หรือเมื่อ Project นำไปใช้ ทุกข้อต้องตอบว่าใช่

**Architecture / สถาปัตยกรรม**

* Execution is separated from Verification, and Verification from Evaluation / Execution แยกจาก Verification และ Verification แยกจาก Evaluation
* Decisions and stop conditions are explicit / การตัดสินใจและเงื่อนไขหยุดชัดเจน
* Risk is considered / พิจารณาความเสี่ยง

**Evidence / หลักฐาน**

* Evidence is observable, collectable without judgment, and separated from metrics / หลักฐานสังเกตได้ เก็บได้โดยไม่ต้องใช้ดุลยพินิจ และแยกจาก Metric

**Evaluation / การประเมิน**

* Outcome and Quality are primary; Efficiency, Reliability, and appropriate intervention are measurable / Outcome และ Quality เป็นหลัก Efficiency, Reliability และการแทรกแซงที่เหมาะสมวัดได้
* A baseline comparison and regression detection are possible / เทียบ Baseline และตรวจจับ Regression ได้

**Output / ผลลัพธ์**

* A developer can inspect one task, a team can evaluate many, tools can consume the data, history is kept, and a dashboard can be added without changing the core / คนดูงานเดียวได้ ทีมดูหลายงานได้ เครื่องมืออ่านข้อมูลได้ เก็บประวัติได้ และเพิ่ม Dashboard ได้โดยไม่แก้แกนกลาง

**Performance / ประสิทธิภาพ**

* Normal tasks run without full evaluation; runtime overhead is minimal; heavy analysis is outside the critical path; nothing is evaluated twice / Task ปกติทำงานได้โดยไม่ต้องประเมินเต็มรูปแบบ ภาระขณะทำงานน้อยที่สุด การวิเคราะห์หนักอยู่นอกเส้นทางหลัก ไม่ประเมินซ้ำ

**Improvement / การปรับปรุง**

* Failures lead to actionable changes; loop versions can be compared; improvements can be validated with evidence / Failure นำไปสู่การเปลี่ยนที่ทำได้จริง เทียบ Version ของ Loop ได้ และยืนยันการปรับปรุงด้วยหลักฐานได้

**Simplicity / ความเรียบง่าย**

* Every metric supports a decision; the framework is small enough for real projects, tool-agnostic, and needs no extra infrastructure at Minimal / ทุก Metric ใช้ตัดสินใจได้ กรอบเล็กพอสำหรับ Project จริง ไม่ผูกเครื่องมือ และระดับ Minimal ไม่ต้องมีโครงสร้างพื้นฐานเพิ่ม
