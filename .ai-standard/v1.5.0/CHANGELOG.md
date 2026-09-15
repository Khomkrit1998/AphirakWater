# Changelog

# ประวัติการเปลี่ยนแปลง

## 1.5.0

Git workflow / กระบวนการทำงานกับ Git

Whether to create a branch and open a pull request is now a Project choice between two modes. `branch-pr`, the default, uses a branch and a pull request for every change. `direct-main` commits to the integration branch after the verify loop passes. The workflow reuses the Handoff for the pull request description and the verify loop for the merge or commit condition. No template or folder is added.

การสร้าง Branch และเปิด Pull Request เป็นตัวเลือกของ Project มีสองโหมด `branch-pr` เป็นค่าเริ่มต้น ใช้ Branch และ Pull Request ทุกการเปลี่ยนแปลง `direct-main` Commit เข้า Branch ที่รวมงานหลัง Verify loop ผ่าน Workflow นี้ใช้ Handoff เป็นคำอธิบาย Pull Request และใช้ Verify loop เป็นเงื่อนไขก่อน Merge หรือ Commit ไม่เพิ่ม Template หรือโฟลเดอร์

### Added / เพิ่ม

* `workflows/git.md`: two modes and when to choose each; the mode and integration branch recorded in the "Git Workflow" table of the Project `CLAUDE.md`, `branch-pr` and `main` when missing. `branch-pr`: a branch for every change and a pull request for every branch when a remote exists, one task per branch, prefixes from the workflow and Handoff type (`feat/`, `fix/`, `refactor/`, `chore/`, `docs/`), the pull request description from the Handoff, four merge conditions, merged by the Developer. `direct-main`: commit only after PASS, one task per commit, no force-push, a branch still allowed for a high-risk task. Exceptions for no remote, emergencies, and a Project's own branching model; AI behavior

### Changed / เปลี่ยนแปลง

* `CLAUDE.md`: Workflow section points to `workflows/git.md`; structure updated
* `standards/development.md`: structure updated
* `workflows/plugin-onboarding.md`, `evaluation/evidence.md`: version reference only

### Fixed / แก้ไข

* None

### Removed / ลบ

* None

### Breaking Changes / การเปลี่ยนแปลงที่กระทบของเดิม

* None. MINOR release. AI already committed and pushed only when asked; the mode decides where. A Project that commits directly to `main` keeps doing so by choosing `direct-main`

### Migration / การย้ายเวอร์ชัน

Optional. Without the "Git Workflow" table in the Project `CLAUDE.md`, the mode is `branch-pr` and the integration branch is `main`. To choose `direct-main`, or another integration branch such as `dev`, add the table from the project template. Tooling that initializes projects may ask for the mode when upgrading.

ไม่บังคับ ถ้า `CLAUDE.md` ของ Project ไม่มีตาราง "Git Workflow" โหมดคือ `branch-pr` และ Branch ที่รวมงานคือ `main` ถ้าต้องการ `direct-main` หรือ Branch รวมงานอื่นเช่น `dev` ให้เพิ่มตารางจาก Project template เครื่องมือที่ใช้เริ่มต้น Project อาจถามโหมดตอนอัปเกรด

## 1.4.0

Bug fix and change workflows / Workflow การแก้ Bug และการเปลี่ยนแปลงอื่น

Every kind of development task now has a workflow: a Feature, a bug fix, or any other change. The new workflows define steps only and point to the existing standards for architecture, quality, evaluation, and verification. No standard, template, agent, or Project folder is added.

งานพัฒนาทุกประเภทมี Workflow แล้ว: Feature, การแก้ Bug และการเปลี่ยนแปลงอื่น Workflow ใหม่กำหนดเฉพาะขั้นตอน และชี้ไปยัง Standard ที่มีอยู่สำหรับ Architecture คุณภาพ การประเมินผลลัพธ์ และการตรวจสอบ ไม่เพิ่ม Standard, Template, Agent หรือโฟลเดอร์ใน Project

### Added / เพิ่ม

* `workflows/bug-fix.md`: Report → Reproduce → Diagnose → Fix → Validate → Regression Check → Complete; reproduce before fixing, as a failing test where the Project has tests; state the root cause before fixing and check every caller; smallest fix at the cause, no unrelated refactoring; regression depth by risk; Handoff type `fix`
* `workflows/change.md`: Understand → Assess Impact → Change → Validate → Evaluate → Complete, for refactoring, dependency updates, configuration, documentation, small technical improvements, and maintenance; an impact question per kind of change; no scope creep and no mixing of kinds; stop and ask when behavior must change; Handoff type `refactor`, `chore`, or `docs`

### Changed / เปลี่ยนแปลง

* `CLAUDE.md`: Workflow section points to the two new workflows; structure updated
* `standards/development.md`: structure updated
* `standards/quality.md` section 5, `workflows/verify-loop.md` section 1: risk is set in the first step of each workflow, still defined in `workflows/feature.md` step 1
* `standards/evaluation.md` sections 2 and 3: Build and Evaluate name all three workflows; for a bug fix, the requirement is the expected behavior
* `standards/architecture.md` section 4: an architectural change is proposed in the plan, the Diagnose step, or the Assess Impact step
* `workflows/verify-loop.md` purpose: it is also the Validate step of the two new workflows
* `evaluation/README.md`: Execution lists the three workflows
* `workflows/plugin-onboarding.md`, `evaluation/evidence.md`: version reference only

### Fixed / แก้ไข

* None

### Removed / ลบ

* None

### Breaking Changes / การเปลี่ยนแปลงที่กระทบของเดิม

* None. MINOR release. The Handoff template and the Evidence schema already had the task types `fix`, `refactor`, `chore`, and `docs`

### Migration / การย้ายเวอร์ชัน

None required.

ไม่ต้อง Migration

## 1.3.0

Architecture, quality, and evaluation standards / มาตรฐานด้าน Architecture คุณภาพ และการประเมินผลลัพธ์

The core standards now cover the development cycle end to end: how the system is structured, when work is built correctly, and whether it is the right thing. Each standard defines principles and points to the existing workflows for execution. No workflow, template, agent, or Project folder is added.

Core Standards ครอบคลุมวงจรการพัฒนาครบ: ระบบถูกจัดโครงสร้างอย่างไร เมื่อใดงานสร้างถูกต้อง และเป็นสิ่งที่ถูกต้องหรือไม่ แต่ละ Standard กำหนดหลักการและชี้ไปยัง Workflow ที่มีอยู่สำหรับการทำงาน ไม่เพิ่ม Workflow, Template, Agent หรือโฟลเดอร์ใน Project

### Added / เพิ่ม

* `standards/architecture.md`: seven principles; separation of concerns, module and feature boundaries, dependency direction, API and service boundaries, data ownership, maintainability, scalability; when a change is architectural; when and how to record a decision in `docs/decisions/`; AI behavior. Technology-agnostic, no pattern or framework prescribed
* `standards/quality.md`: the Definition of Done; eight principles; nine quality checks with when each is relevant; depth by risk, reusing the risk levels of `workflows/feature.md` and `workflows/verify-loop.md`; validating AI-generated code; the Project's own gate; what to do with issues found
* `standards/evaluation.md`: Quality ("built correctly?") versus Evaluation ("the right thing?") versus loop evaluation (`evaluation/`); the place of Evaluate in the existing loop Build → Validate → Evaluate → Measure → Improve; seven evaluation dimensions; six principles; where results are recorded, all in existing locations; AI behavior

### Changed / เปลี่ยนแปลง

* `CLAUDE.md`: points to the three new standards and to `standards/quality.md` for the Definition of Done; structure updated
* `standards/development.md`: principle 7 points to `standards/quality.md` and `standards/evaluation.md`; principle 8 points to `standards/architecture.md`; Completion Criteria point to the Definition of Done; structure updated
* `workflows/feature.md`: step 2 reads `docs/architecture/` and `docs/decisions/`; step 3 requires approval and a decision record for an architectural change; step 5 takes check relevance from `standards/quality.md` and records requirement satisfaction per `standards/evaluation.md`
* `evaluation/README.md`, `evaluation/framework.md` section 3: state that this folder evaluates the loop, and that output evaluation is in `standards/evaluation.md`
* `workflows/plugin-onboarding.md`, `evaluation/evidence.md`: version reference only

### Fixed / แก้ไข

* None

### Removed / ลบ

* None

### Breaking Changes / การเปลี่ยนแปลงที่กระทบของเดิม

* None. MINOR release. The new standards add guidance within the existing workflows; no Project file, folder, or record format changes

### Migration / การย้ายเวอร์ชัน

None required. Architecture decisions go in `docs/decisions/`, which every Project created by `/project-init` already has.

ไม่ต้อง Migration Architecture decision บันทึกใน `docs/decisions/` ซึ่งทุก Project ที่สร้างด้วย `/project-init` มีอยู่แล้ว

## 1.2.0

Feedback and improvement loop / วงรอบ Feedback และการปรับปรุง

The Evaluation Framework closes. What a report finds becomes one decision, one change to one component, and a result measured against a recorded baseline. Nothing is added to the runtime path, and no second framework, taxonomy, metric set, or report is created.

Evaluation Framework ครบวงจร สิ่งที่ Report พบจะกลายเป็นการตัดสินใจหนึ่งข้อ การเปลี่ยนแปลงหนึ่ง Component และผลที่วัดเทียบกับ Baseline ที่บันทึกไว้ ไม่มีอะไรเพิ่มในเส้นทางการทำงาน และไม่มี Framework, Taxonomy, ชุด Metric หรือ Report ชุดที่สอง

### Added / เพิ่ม

* `evaluation/improvement.md`: feedback sources mapped to the existing Evidence fields, seven feedback classes, diagnosis reusing the existing Failure Taxonomy, five improvement decisions (`NO_ACTION`, `MONITOR`, `ADJUST`, `IMPROVE`, `ESCALATE`) with rules that can be checked rather than judged, improvement scope as nine components, the six-line hypothesis, baseline and measurement using the existing metrics, validation with the four existing comparison results, versioning, three automation levels, the human role by risk, the record, the output, the runtime constraint, anti-overengineering rules, and a self-review checklist
* `templates/improvement-record.md`: one record per `ADJUST` or `IMPROVE`, saved in the Project under `docs/evaluation/improvements/`, with a machine-readable block
* `evaluation/evaluation-schema.yaml`: the `improvement` document; `improvement_validation` in the `evaluation` document

### Changed / เปลี่ยนแปลง

* `workflows/evaluate.md`: eight steps, Collect, Compute, Classify, Compare, Diagnose and decide, Validate open improvements, Write the report, Developer decides; open improvement records added to the inputs; three new completion criteria
* `templates/evaluation-report.md`: "Improvement Hypotheses" becomes "Improvement Decisions", with a record id and the five-way action; new "Improvement Validation" section; machine-readable block extended
* `evaluation/evaluation-schema.yaml`: `improvements` entries gain `id` and `action`; `change` extends from five to nine components, the original five unchanged
* `evaluation/README.md`: Improvement added to the core model, the file list, and the adoption guidance
* `evaluation/framework.md`: the architecture diagram shows Feedback, Decision, and Baseline comparison; principle 15; the improvement record added to Output; section 14 points to `evaluation/improvement.md` for the procedure
* `evaluation/metrics.md`: one rule on using a metric to judge an improvement
* `CLAUDE.md`: Workflow section points to `evaluation/improvement.md` and to `docs/evaluation/improvements/`; structure updated
* `standards/development.md`: two new AI MUST NOT rules, on claiming an improvement without a baseline comparison and on changing a metric, a gate, or the Standard without evidence and approval; structure updated
* `standards/versioning.md`: a release lists the improvement record ids it carries

### Fixed / แก้ไข

* None

### Removed / ลบ

* None

### Breaking Changes / การเปลี่ยนแปลงที่กระทบของเดิม

* None. MINOR release. A Project that never writes an improvement record behaves as under 1.1.0

### Migration / การย้ายเวอร์ชัน

Optional. To use the improvement loop, create `docs/evaluation/improvements/` in the Project. Reports written under 1.1.0 stay valid; the next report adds the new sections. Tooling that initializes projects may create the folder when upgrading.

ไม่บังคับ ถ้าต้องการใช้ Improvement Loop ให้สร้าง `docs/evaluation/improvements/` ใน Project ส่วน Report ที่เขียนไว้ตอน 1.1.0 ยังใช้ได้ Report ถัดไปจึงเพิ่มหัวข้อใหม่ เครื่องมือที่ใช้เริ่มต้น Project อาจสร้างโฟลเดอร์ให้ตอนอัปเกรด

## 1.1.0

Verify loop and evaluation / วงรอบตรวจสอบและการประเมิน

The Verify step becomes an explicit, bounded loop with a project-defined gate, and a tool-agnostic Evaluation Framework lets a team see whether that loop works, from evidence recorded once per task.

ขั้น Verify กลายเป็นวงรอบที่ชัดเจนและมีขอบเขต โดยใช้เกณฑ์ที่ Project กำหนด และมี Evaluation Framework ที่ไม่ผูกกับเครื่องมือ ให้ทีมเห็นว่าวงรอบนั้นทำงานได้ดีหรือไม่ จากหลักฐานที่บันทึกครั้งเดียวต่อ Task

### Added / เพิ่ม

* `workflows/verify-loop.md`: the Verify step as a loop: run the Project's Verification Commands, record one decision (PASS / RETRY / HUMAN / STOP), fix and re-run within an attempt cap (default 3), never weaken the gate, Baseline for pre-existing failures, evidence recorded once in the Handoff
* `workflows/evaluate.md`: periodic evaluation of the loop from accumulated Handoff evidence, outside any task
* `evaluation/`: the Evaluation Framework: `README.md` (overview, adoption levels), `framework.md` (architecture, principles, risk model, evaluation levels, frequency, output, storage, continuous improvement, performance constraint, metric gaming, self-review), `evidence.md` (evidence model, required fields), `metrics.md` (metric definitions in four dimensions), `failure-taxonomy.md` (failure categories and the improvement each points to), `evaluation-schema.yaml` (conceptual data model)
* `templates/evaluation-report.md`: report for a set of tasks or a period

### Changed / เปลี่ยนแปลง

* `CLAUDE.md`: Mandatory Rule 6 requires running the Verification Commands and recording a decision; Workflow and Handoff sections point to the new workflows and to `docs/evaluation/tasks/`; Completion Criteria include the gate and the evidence; structure updated
* `standards/development.md`: principle 7 expanded with the gate, the attempt cap, and risk-based depth; three new AI MUST NOT rules (weaken a gate, start an unrequested loop, treat a claim as evidence); structure updated
* `workflows/feature.md`: step 1 adds the Risk level; step 5 starts with the Verification Commands; step 6 names where the Handoff is saved; completion checklist extended
* `templates/handoff.md`: adds the save location, Risk, the Verification Commands table, the Decision section, two Handoff Status items, and a machine-readable Evidence block
* `workflows/plugin-onboarding.md`: version reference only

### Fixed / แก้ไข

* `CLAUDE.md`, `standards/development.md`: the structure tree now lists `workflows/plugin-onboarding.md`

### Removed / ลบ

* None

### Breaking Changes / การเปลี่ยนแปลงที่กระทบของเดิม

* None. MINOR release. A Project without a Verification Commands table, or with every command `none`, behaves as under 1.0.0

### Migration / การย้ายเวอร์ชัน

Optional. To use the loop and the evaluation, add the "Verification Commands" table to the Project `CLAUDE.md` and create `docs/evaluation/tasks/` and `docs/evaluation/reports/`. Tooling that initializes projects may add both when upgrading.

ไม่บังคับ ถ้าต้องการใช้ Loop และการประเมิน ให้เพิ่มตาราง "Verification Commands" ใน `CLAUDE.md` ของ Project และสร้าง `docs/evaluation/tasks/` กับ `docs/evaluation/reports/` เครื่องมือที่ใช้เริ่มต้น Project อาจเพิ่มให้ตอนอัปเกรด

## 1.0.0

Initial release / Release แรก

### Added / เพิ่ม

* `CLAUDE.md`: core instructions and entry point
* `standards/development.md`: development principles and AI behavior
* `standards/versioning.md`: versioning rules for the Standard
* `workflows/feature.md`: Feature workflow (Understand → Analyze → Plan → Implement → Verify → Handoff)
* `workflows/plugin-onboarding.md`: plugin detection and selection workflow
* `templates/handoff.md`: handoff template
* `plugins/README.md`: plugin policy
* `plugins/registry.md`: plugin registry with `ponytail` (Recommended), `frontend-design` (Recommended), `ui-ux-pro-max` (Optional), `superpowers` (Optional)

### Changed / เปลี่ยนแปลง

* None (initial release)

### Fixed / แก้ไข

* None (initial release)

### Removed / ลบ

* None (initial release)

### Breaking Changes / การเปลี่ยนแปลงที่กระทบของเดิม

* None (initial release)
