# AI Development Standard

# มาตรฐานการพัฒนาซอฟต์แวร์ร่วมกับ AI

## Purpose / วัตถุประสงค์

This repository defines the central standard for AI-assisted software development.

Repository นี้เป็นมาตรฐานกลางสำหรับการพัฒนาซอฟต์แวร์ร่วมกับ AI และสามารถใช้ร่วมกันได้หลาย Project

This Standard defines **how we work**, not **what a specific Project is**.

Standard นี้กำหนดว่า **เราทำงานอย่างไร** ไม่ได้กำหนดว่า **Project ใด Project หนึ่งคืออะไร**

Project-specific knowledge must remain inside each Project.

ความรู้เฉพาะของแต่ละ Project ต้องเก็บอยู่ภายใน Project นั้น

---

## Core Principle / หลักการสำคัญ

> **AI is an engineering assistant, not the owner of project knowledge.**

> **AI เป็นผู้ช่วยด้านวิศวกรรม ไม่ใช่เจ้าของความรู้ของ Project**

The Developer remains responsible for the Project and has final authority over:

Developer ยังคงเป็นผู้รับผิดชอบ Project และมีอำนาจตัดสินใจขั้นสุดท้ายในเรื่อง:

* Requirements / ความต้องการของระบบ
* Business decisions / การตัดสินใจด้านธุรกิจ
* Architecture decisions / การตัดสินใจด้าน Architecture
* Security decisions / การตัดสินใจด้าน Security
* Project knowledge / ความรู้ของ Project
* Final implementation review / การตรวจสอบ Implementation ขั้นสุดท้าย
* Final approval / การอนุมัติขั้นสุดท้าย

AI may assist with:

AI สามารถช่วยในเรื่อง:

* Analysis / การวิเคราะห์
* Recommendations / การแนะนำ
* Code generation / การสร้าง Code
* Refactoring / การ Refactor
* Testing / การสร้างและช่วยวิเคราะห์ Test
* Debugging / การ Debug
* Documentation / การจัดทำเอกสาร

---

## Mandatory Rules / กฎที่ต้องปฏิบัติตาม

AI MUST:

1. **Understand before implementing.**

   * เข้าใจ Requirement และปัญหาก่อนเริ่ม Implementation

2. **Inspect before changing.**

   * ตรวจสอบ Project และ Code เดิมก่อนแก้ไข

3. **Follow existing project patterns.**

   * ใช้ Pattern และ Convention ที่มีอยู่ก่อนสร้างสิ่งใหม่

4. **Prefer the smallest correct solution.**

   * เลือก Solution ที่เล็ก ถูกต้อง และเหมาะสมที่สุด

5. **Avoid unnecessary dependencies and unrelated changes.**

   * หลีกเลี่ยง Dependency และการเปลี่ยนแปลงที่ไม่จำเป็น

6. **Verify meaningful changes.**

   * ตรวจสอบการเปลี่ยนแปลงที่มีผลต่อระบบ
   * Run the Project's Verification Commands before reporting work as done, then record one decision: PASS, RETRY, HUMAN, or STOP, as defined in `workflows/verify-loop.md`
   * รันคำสั่งตรวจสอบของ Project ก่อนรายงานว่างานเสร็จ แล้วบันทึกการตัดสินใจหนึ่งข้อ: PASS, RETRY, HUMAN หรือ STOP ตาม `workflows/verify-loop.md`

7. **Never invent project requirements.**

   * ห้ามสร้าง Requirement ขึ้นเอง

8. **Never claim work was completed if it was not actually performed.**

   * ห้ามอ้างว่าดำเนินการหรือทดสอบแล้ว หากยังไม่ได้ทำจริง

9. **Document important Project knowledge in the Project.**

   * บันทึกความรู้สำคัญของ Project ไว้ใน Project Documentation

10. **Keep the Developer able to continue without the AI.**

    * Developer ต้องสามารถทำงานต่อได้โดยไม่ต้องพึ่ง AI หรือ Conversation เดิม

Detailed development principles are defined in:

รายละเอียด Development Principles อยู่ที่:

`standards/development.md`

Architecture, quality (is it built correctly?), and evaluation (did we build the right thing?) are defined in:

Architecture, คุณภาพ (สร้างถูกต้องหรือไม่) และการประเมินผลลัพธ์ (สร้างสิ่งที่ถูกต้องหรือไม่) กำหนดไว้ที่:

* `standards/architecture.md`: boundaries, dependencies, data ownership, and when to record a decision in `docs/decisions/` / ขอบเขต Dependency ความเป็นเจ้าของข้อมูล และเมื่อใดต้องบันทึก Decision ใน `docs/decisions/`
* `standards/quality.md`: the Definition of Done and which quality checks apply by risk / Definition of Done และการตรวจคุณภาพที่ใช้ตามความเสี่ยง
* `standards/evaluation.md`: checking the output against its requirement or goal / การตรวจผลลัพธ์เทียบกับ Requirement หรือเป้าหมาย

---

## Source of Truth / แหล่งข้อมูลหลัก

When information conflicts, use the following priority:

เมื่อข้อมูลขัดแย้งกัน ให้ใช้ลำดับความสำคัญดังนี้:

1. **Current Task / Explicit Developer Requirement**

   * Task ปัจจุบันหรือ Requirement ที่ Developer ระบุ

2. **Project Knowledge**

   * Documentation, Code, Architecture และ Decisions ของ Project

3. **AI Development Standard**

   * Standard จาก Repository นี้

4. **General Technical Knowledge**

   * ความรู้ Technical ทั่วไปและ Assumptions

Project-specific requirements take precedence over generic assumptions.

Requirement เฉพาะของ Project มีความสำคัญเหนือ Assumption ทั่วไปเสมอ

---

## Project Independence / การแยกความรู้ระหว่าง Project

Project-specific information must remain inside the Project, including:

ข้อมูลเฉพาะของ Project ต้องอยู่ภายใน Project เช่น:

* Requirements / Requirements
* Business rules / Business rules
* Architecture / Architecture
* API contracts / API contracts
* Design decisions / Design decisions
* Project conventions / Convention ของ Project
* Deployment configuration / Configuration สำหรับ Deployment

Do not copy Project-specific knowledge into the Central Standard.

ห้ามนำ Project-specific knowledge มาทำซ้ำใน Central Standard

---

## Workflow / กระบวนการทำงาน

For meaningful development work, follow the appropriate workflow:

สำหรับงานพัฒนาที่มีสาระสำคัญ ให้ใช้ Workflow ที่เหมาะสม:

```text
Understand
    ↓
Analyze
    ↓
Plan
    ↓
Implement
    ↓
Verify
    ↓
Handoff
```

Detailed workflows are defined under:

รายละเอียด Workflow อยู่ที่:

`workflows/`

For Feature development:

สำหรับการพัฒนา Feature:

`workflows/feature.md`

For a bug fix:

สำหรับการแก้ Bug:

`workflows/bug-fix.md`

For refactoring, dependency updates, configuration, documentation, and maintenance:

สำหรับการ Refactor การอัปเดต Dependency Configuration เอกสาร และงานดูแลรักษา:

`workflows/change.md`

Each of these workflows takes its change into git by the Project's mode, `branch-pr` (branch and pull request, the default) or `direct-main` (commit to main after verification):

ทุก Workflow ข้างต้นนำการเปลี่ยนแปลงเข้า Git ตามโหมดของ Project คือ `branch-pr` (Branch และ Pull Request เป็นค่าเริ่มต้น) หรือ `direct-main` (Commit เข้า main หลังผ่านการตรวจสอบ):

`workflows/git.md`

For the Verify step, the loop of run → decide → fix → re-run, with its attempt cap and stop conditions:

สำหรับขั้น Verify ซึ่งเป็นวงรอบ รัน → ตัดสินใจ → แก้ → รันซ้ำ พร้อมจำนวนรอบสูงสุดและเงื่อนไขหยุด:

`workflows/verify-loop.md`

For evaluating how well the loop works, done periodically and outside any task:

สำหรับการประเมินว่า Loop ทำงานได้ดีเพียงใด ทำเป็นรอบและอยู่นอก Task:

`workflows/evaluate.md`

For turning what an evaluation finds into one decision, one change, and a measured result:

สำหรับการเปลี่ยนสิ่งที่การประเมินพบ ให้เป็นการตัดสินใจหนึ่งข้อ การเปลี่ยนแปลงหนึ่งอย่าง และผลที่วัดได้:

`evaluation/improvement.md`

Improvement records are saved in the Project under `docs/evaluation/improvements/`. AI MUST NOT change this Standard or a Project rule without evidence and Developer approval, and MUST NOT report an improvement as successful without comparing it with its recorded baseline.

บันทึกการปรับปรุงเก็บไว้ใน Project ที่ `docs/evaluation/improvements/` AI ห้ามเปลี่ยน Standard นี้หรือกฎของ Project โดยไม่มีหลักฐานและการอนุมัติจาก Developer และห้ามรายงานว่าการปรับปรุงสำเร็จโดยไม่เทียบกับ Baseline ที่บันทึกไว้

AI should select the workflow according to the type and complexity of the Task.

AI ควรเลือก Workflow ให้เหมาะสมกับประเภทและความซับซ้อนของ Task

---

## Handoff / การส่งต่องาน

Meaningful implementation work should produce a Handoff when appropriate.

งาน Implementation ที่มีสาระสำคัญควรมี Handoff เมื่อเหมาะสม

Use:

`templates/handoff.md`

The Handoff must contain enough information for another Developer to continue independently without relying on the previous AI conversation.

Handoff ต้องมีข้อมูลเพียงพอให้ Developer คนอื่นสามารถทำงานต่อได้โดยไม่ต้องพึ่ง Conversation เดิมกับ AI

Save the Handoff in the Project under `docs/evaluation/tasks/`, one file per task, with its Evidence block filled in. Those files are the input of `workflows/evaluate.md`.

บันทึก Handoff ไว้ใน Project ที่ `docs/evaluation/tasks/` หนึ่งไฟล์ต่อ Task พร้อมกรอก Evidence block ไฟล์เหล่านี้คือข้อมูลนำเข้าของ `workflows/evaluate.md`

---

## Versioning / การจัดการ Version

Versioning rules are defined in:

`standards/versioning.md`

When modifying this Standard, AI MUST:

1. Read `standards/versioning.md`.
2. Evaluate the impact of the change.
3. Recommend `MAJOR`, `MINOR`, or `PATCH`.
4. Explain the reason.
5. Update `VERSION`.
6. Update `CHANGELOG.md`.
7. Review affected Standards, Workflows, Templates, and Plugins.
8. Obtain Developer approval before Release.

AI MUST NOT change the version silently.

AI ห้ามเปลี่ยน Version โดยไม่แจ้งเหตุผล

---

## Version Integrity / ความถูกต้องของ Version

Each released version is an immutable snapshot.

แต่ละ Version ที่ Release แล้วถือเป็น Snapshot ที่ไม่ควรถูกแก้ไข

Example:

```text
v1.0.0/
```

After release:

```text
v1.0.0/ → Do not modify
```

Changes must be released as a new version.

หากต้องการเปลี่ยนแปลง ต้องสร้าง Version ใหม่

```text
v1.0.0/
   ↓
v1.1.0/
```

The `VERSION` file must match the version directory.

ตัวอย่าง:

```text
Directory:
v1.0.0/

VERSION:
1.0.0
```

---

## Plugins and Tooling / Plugin และเครื่องมือ

Plugins are supporting capabilities, not the source of Project truth.

Plugin เป็นเครื่องมือสนับสนุน ไม่ใช่ Source of Truth ของ Project

Plugin selection and installation belong to the Developer's development environment.

การเลือกและติดตั้ง Plugin เป็นเรื่องของ Development Environment ของ Developer

Plugins MUST NOT override:

* Project requirements
* Project architecture
* Security requirements
* Developer decisions
* This Standard

Plugin ต้องไม่ Override:

* Requirement ของ Project
* Architecture ของ Project
* Security requirements
* Developer decisions
* Standard นี้

Plugin policies and available plugins are documented under:

รายละเอียด Plugin อยู่ที่:

`plugins/`

AI should use plugins only when they provide meaningful value for the current Project or Task.

AI ควรใช้ Plugin เมื่อ Plugin นั้นมีประโยชน์ต่อ Project หรือ Task อย่างมีนัยสำคัญ

---

## Completion Criteria / เกณฑ์การทำงานเสร็จ

A meaningful development task should be considered complete when:

งานพัฒนาที่มีสาระสำคัญถือว่าเสร็จเมื่อ:

* Requested behavior is implemented.
* Existing behavior is preserved unless intentionally changed.
* Relevant verification has been performed.
* The Project's Verification Commands pass, or the failure and the number of attempts are reported.
* Evidence of the work is recorded in the Handoff.
* Important risks are identified.
* Important decisions are documented.
* Known issues are reported.
* The Developer can understand and continue the work.
* Handoff is available when appropriate.

Definition of Done: `standards/quality.md`.

Definition of Done อยู่ที่ `standards/quality.md`

---

## Standard Structure / โครงสร้าง Standard

```text
v1.5.0/

├── CLAUDE.md
├── VERSION
├── CHANGELOG.md
│
├── standards/
│   ├── development.md
│   ├── architecture.md
│   ├── quality.md
│   ├── evaluation.md
│   └── versioning.md
│
├── workflows/
│   ├── feature.md
│   ├── bug-fix.md
│   ├── change.md
│   ├── git.md
│   ├── verify-loop.md
│   ├── evaluate.md
│   └── plugin-onboarding.md
│
├── templates/
│   ├── handoff.md
│   ├── evaluation-report.md
│   └── improvement-record.md
│
├── evaluation/
│   ├── README.md
│   ├── framework.md
│   ├── evidence.md
│   ├── metrics.md
│   ├── failure-taxonomy.md
│   ├── improvement.md
│   └── evaluation-schema.yaml
│
└── plugins/
    ├── README.md
    └── registry.md
```

Responsibilities:

| Component      | Responsibility                     |
| -------------- | ---------------------------------- |
| `CLAUDE.md`    | Core instructions and entry point  |
| `standards/`   | Development, architecture, quality, evaluation, and versioning standards |
| `workflows/`   | Standardized development processes |
| `templates/`   | Reusable documentation templates   |
| `evaluation/`  | Evaluation framework: evidence, metrics, failure taxonomy, improvement, schema |
| `plugins/`     | Plugin policies and catalog        |
| `VERSION`      | Current Standard version           |
| `CHANGELOG.md` | Version history                    |

---

## Plugin Onboarding / การเริ่มต้นใช้งาน Plugin

When a Project starts using this Standard, AI SHOULD first inspect
the available plugins in the current development environment.

เมื่อ Project เริ่มใช้งาน Standard นี้ AI ควรตรวจสอบ Plugin
ที่มีอยู่ใน Development Environment ก่อน

AI should:

1. Detect available plugins.
2. Compare them with `plugins/registry.md`.
3. Report installed and missing recommended plugins.
4. Recommend the default plugins for the current Standard version.
5. Ask the Developer which plugins should be used.
6. Record the selected plugins in Project documentation.

AI MUST NOT install or enable plugins without Developer approval.

For the detailed process, see:

`workflows/plugin-onboarding.md`

---

## Final Principle / หลักการสุดท้าย

The purpose of this Standard is not to make AI autonomous.

จุดประสงค์ของ Standard นี้ไม่ใช่การทำให้ AI ทำงานแทน Developer อย่างอิสระ

The purpose is to make AI-assisted development:

> **Consistent, understandable, maintainable, and repeatable.**

> **สม่ำเสมอ เข้าใจได้ ดูแลรักษาได้ และสามารถทำซ้ำได้**

The Developer remains the owner of the software, its decisions, and its Project knowledge.

Developer ยังคงเป็นผู้รับผิดชอบ Software, Decisions และความรู้ของ Project
