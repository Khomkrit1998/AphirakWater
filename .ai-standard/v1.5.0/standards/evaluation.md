# Evaluation Standard

# มาตรฐานการประเมินผลลัพธ์

## 1. Purpose / วัตถุประสงค์

This document defines how to evaluate whether an output meets its requirement and goal.

เอกสารนี้กำหนดวิธีประเมินว่าผลลัพธ์ที่สร้างขึ้นตอบ Requirement และเป้าหมายจริงหรือไม่

Three questions, answered in three places:

สามคำถาม ตอบในสามที่:

| | Quality / คุณภาพ | Evaluation / การประเมินผลลัพธ์ | Loop evaluation / การประเมิน Loop |
| --- | --- | --- | --- |
| Question / คำถาม | Is it built correctly? / สร้างถูกต้องหรือไม่ | Did we build the right thing? / สร้างสิ่งที่ถูกต้องหรือไม่ | Is the way we work effective? / วิธีทำงานมีประสิทธิผลหรือไม่ |
| Looks at / ดูที่ | Implementation / Implementation | One output against its requirement or goal / ผลลัพธ์หนึ่งชิ้นเทียบกับ Requirement หรือเป้าหมาย | Evidence across many tasks / หลักฐานจากหลาย Task |
| When / เมื่อใด | Inside the task / ภายใน Task | End of the task; after release for outcomes that need time / ท้าย Task และหลัง Release สำหรับผลที่ต้องใช้เวลา | Periodically, outside tasks / เป็นรอบ นอก Task |
| Defined in / กำหนดใน | `standards/quality.md` | This document / เอกสารนี้ | `evaluation/`, `workflows/evaluate.md` |

This standard does not repeat quality checks. An output can pass every quality check and still be the wrong thing.

Standard นี้ไม่ทำการตรวจคุณภาพซ้ำ ผลลัพธ์อาจผ่านการตรวจคุณภาพทุกข้อ แต่ยังไม่ใช่สิ่งที่ต้องการก็ได้

---

## 2. Place in the Loop / ตำแหน่งใน Loop

Evaluation is part of the existing development loop. It adds no workflow.

Evaluation เป็นส่วนหนึ่งของ Loop การพัฒนาเดิม ไม่เพิ่ม Workflow ใหม่

```text
Build       workflows/feature.md, bug-fix.md, change.md
  ↓
Validate    standards/quality.md, workflows/verify-loop.md
  ↓
Evaluate    this document, recorded in the Handoff
  ↓
Measure     workflows/evaluate.md, evaluation/metrics.md
  ↓
Improve     evaluation/improvement.md (the loop) · docs/requirements/ (the product)
  ↺
```

Evaluate is the last check before the Handoff in each workflow: `workflows/feature.md` step 5, `workflows/bug-fix.md` step 7, `workflows/change.md` step 5. Measure and Improve are the existing Evaluation Framework.

Evaluate คือการตรวจสุดท้ายก่อน Handoff ในแต่ละ Workflow: `workflows/feature.md` ขั้นที่ 5, `workflows/bug-fix.md` ขั้นที่ 7, `workflows/change.md` ขั้นที่ 5 ส่วน Measure และ Improve คือ Evaluation Framework ที่มีอยู่แล้ว

---

## 3. Evaluate Against What / ประเมินเทียบกับอะไร

Evaluate against what was explicitly asked: the requirement, the acceptance criteria, and the goal identified in the first step of the workflow in use, or in `docs/requirements/`. For a bug fix, the requirement is the expected behavior.

ประเมินเทียบกับสิ่งที่ถูกขออย่างชัดเจน: Requirement, Acceptance criteria และเป้าหมายที่ระบุในขั้นแรกของ Workflow ที่ใช้ หรือใน `docs/requirements/` สำหรับการแก้ Bug Requirement คือพฤติกรรมที่ควรเป็น

When no requirement or goal is explicit, the output cannot be evaluated. Say so. For medium and high risk, ask the Developer for acceptance criteria before building, not after.

ถ้าไม่มี Requirement หรือเป้าหมายที่ชัดเจน ผลลัพธ์จะประเมินไม่ได้ ให้แจ้งเช่นนั้น สำหรับความเสี่ยง Medium และ High ให้ขอ Acceptance criteria จาก Developer ก่อนเริ่มสร้าง ไม่ใช่หลังสร้างเสร็จ

---

## 4. What Evaluation May Consider / สิ่งที่อาจประเมิน

Use only the dimensions the requirement or goal speaks to.

ใช้เฉพาะมิติที่ Requirement หรือเป้าหมายกล่าวถึง

| Dimension / มิติ | Question / คำถาม | Typical evidence / หลักฐานที่ใช้บ่อย |
| --- | --- | --- |
| Requirement satisfaction | Is each requirement and acceptance criterion met, partly met, or not met? / แต่ละ Requirement และ Acceptance criterion ผ่าน ผ่านบางส่วน หรือไม่ผ่าน | The acceptance criteria result, observed behavior / ผล Acceptance criteria และพฤติกรรมที่สังเกตได้ |
| User experience | Can the intended user complete the intended task? / ผู้ใช้เป้าหมายทำงานที่ตั้งใจได้สำเร็จหรือไม่ | A walk-through of the user flow, user feedback / การไล่ใช้งานตาม User flow และ Feedback จากผู้ใช้ |
| Technical outcome | Was the technical goal reached, for example a migration completed or a dependency removed? / ถึงเป้าหมายทางเทคนิคหรือไม่ เช่น Migration เสร็จ หรือเอา Dependency ออกได้ | The state after the change / สถานะหลังการเปลี่ยนแปลง |
| Product or business outcome | Did the change move the goal it was built for? / การเปลี่ยนแปลงทำให้เป้าหมายที่ตั้งไว้ขยับหรือไม่ | A measure the Project already has, after release / ตัววัดที่ Project มีอยู่แล้ว หลัง Release |
| Performance | Does it meet the target the requirement states? / ถึงเป้าที่ Requirement ระบุหรือไม่ | Measurement before and after / การวัดก่อนและหลัง |
| Regression | Is behavior the requirement says to keep still kept? / พฤติกรรมที่ Requirement ให้คงไว้ยังคงอยู่หรือไม่ | Existing tests, before and after comparison / Test เดิม และการเทียบก่อนหลัง |
| AI output quality | When the product generates content with AI, does that content meet its criteria? / เมื่อ Product ใช้ AI สร้างเนื้อหา เนื้อหานั้นผ่านเกณฑ์หรือไม่ | A set of real outputs checked against written criteria / ชุดผลลัพธ์จริงที่ตรวจเทียบกับเกณฑ์ที่เขียนไว้ |

Performance and regression in `standards/quality.md` ask "did we make it worse". Here they ask "did we reach the stated target".

Performance และ Regression ใน `standards/quality.md` ถามว่า "ทำให้แย่ลงหรือไม่" ส่วนที่นี่ถามว่า "ถึงเป้าที่ระบุหรือไม่"

---

## 5. Principles / หลักการ

1. **Evaluate against explicit requirements or goals.** / ประเมินเทียบกับ Requirement หรือเป้าหมายที่ชัดเจน
2. **Prefer measurable evidence when useful.** / ใช้หลักฐานที่วัดได้เมื่อมีประโยชน์
3. **Do not invent metrics without a meaningful purpose.** A metric exists only when a decision depends on it. / อย่าสร้าง Metric ที่ไม่มีจุดประสงค์ชัดเจน Metric มีได้เมื่อมีการตัดสินใจที่ขึ้นกับมันเท่านั้น
4. **Small changes may use lightweight evaluation.** Observing the requested behavior once is enough. / งานเล็กประเมินแบบเบาได้ การเห็นพฤติกรรมที่ขอหนึ่งครั้งก็เพียงพอ
5. **High-impact changes should have stronger evidence.** Criteria written before building, measured results, and the Developer confirms the outcome. / งานที่มีผลกระทบสูงควรมีหลักฐานที่หนักแน่นกว่า เขียนเกณฑ์ก่อนสร้าง มีผลการวัด และ Developer ยืนยันผล
6. **Evaluation results should inform future improvements.** / ผลการประเมินควรนำไปสู่การปรับปรุงในอนาคต

---

## 6. Recording Results / การบันทึกผล

No new document is needed. Record where the result is already read:

ไม่ต้องสร้างเอกสารใหม่ บันทึกในที่ที่มีคนอ่านอยู่แล้ว:

| Result / ผล | Where / ที่ไหน |
| --- | --- |
| Requirement satisfaction for a task / การตอบ Requirement ของหนึ่ง Task | The Handoff: "What Was Requested", `acceptance_criteria` in the Evidence block, and any gap under Known Issues / Handoff: "What Was Requested", `acceptance_criteria` ใน Evidence block และส่วนที่ยังไม่ครบใน Known Issues |
| An outcome measured after release / ผลที่วัดหลัง Release | Next to the requirement or goal in `docs/requirements/` / ข้าง Requirement หรือเป้าหมายใน `docs/requirements/` |
| A result that changes direction / ผลที่ทำให้ต้องเปลี่ยนทิศทาง | A new requirement, or a decision per `standards/architecture.md` when architectural / Requirement ใหม่ หรือ Decision ตาม `standards/architecture.md` เมื่อเป็นเรื่อง Architecture |
| How well the loop works / Loop ทำงานได้ดีเพียงใด | `evaluation/` and `workflows/evaluate.md` |

A requirement gap becomes the next requirement or task. A repeated loop problem becomes an improvement per `evaluation/improvement.md`.

ส่วนที่ยังไม่ตอบ Requirement กลายเป็น Requirement หรือ Task ถัดไป ปัญหาของ Loop ที่เกิดซ้ำกลายเป็นการปรับปรุงตาม `evaluation/improvement.md`

---

## 7. AI Behavior / พฤติกรรมของ AI

### AI SHOULD / AI ควร

* State, per requirement, whether it is met, partly met, or not met / ระบุต่อ Requirement ว่าผ่าน ผ่านบางส่วน หรือไม่ผ่าน
* Report what could not be evaluated, and why / รายงานสิ่งที่ประเมินไม่ได้ และเหตุผล

### AI MUST NOT / AI ห้าม

* Report a requirement as met without evidence / รายงานว่า Requirement ผ่านโดยไม่มีหลักฐาน
* Round a partial result up to done / ปัดผลที่ผ่านบางส่วนให้เป็นเสร็จ
* Change acceptance criteria to fit the result, per `workflows/verify-loop.md` section 5 / แก้ Acceptance criteria ให้เข้ากับผลลัพธ์ ตาม `workflows/verify-loop.md` หัวข้อ 5
* Invent a requirement, metric, or target to evaluate against / สร้าง Requirement, Metric หรือเป้าขึ้นเองเพื่อใช้ประเมิน
* Treat its own assessment as evidence when an observable result is available, per `evaluation/framework.md` section 8 / ถือการประเมินตนเองเป็นหลักฐาน เมื่อมีผลที่สังเกตได้ ตาม `evaluation/framework.md` หัวข้อ 8

---

## Core Principle / หลักการสำคัญ

> **Built correctly is not enough. Check it against what was asked, with evidence.**

> **สร้างถูกต้องยังไม่พอ ต้องเทียบกับสิ่งที่ถูกขอ พร้อมหลักฐาน**
