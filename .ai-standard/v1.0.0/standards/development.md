# AI Development Standard

# มาตรฐานการพัฒนาซอฟต์แวร์ร่วมกับ AI

## Purpose / วัตถุประสงค์

This document defines the standard principles and behaviors for AI-assisted software development.

เอกสารนี้กำหนดหลักการและพฤติกรรมมาตรฐานสำหรับการพัฒนาซอฟต์แวร์ร่วมกับ AI

The standard is designed to be reusable across multiple projects.

Standard นี้สามารถนำไปใช้ร่วมกันได้หลาย Project

Project-specific knowledge must remain inside the project.

ความรู้เฉพาะของแต่ละ Project ต้องเก็บอยู่ภายใน Project นั้น

Project-specific knowledge MUST NOT be added to the central standard unless it represents a reusable general standard.

ไม่ควรนำ Project-specific knowledge มาใส่ใน Central Standard เว้นแต่ความรู้นั้นสามารถยกระดับเป็นมาตรฐานทั่วไปที่นำไปใช้กับหลาย Project ได้

---

## Scope / ขอบเขต

This standard applies to AI-assisted software development activities, including:

Standard นี้ใช้กับงานพัฒนาซอฟต์แวร์ที่มี AI เข้ามาช่วย เช่น:

* Requirement analysis / การวิเคราะห์ Requirement
* Technical analysis / การวิเคราะห์ด้าน Technical
* Implementation / การพัฒนา
* Refactoring / การ Refactor
* Testing / การทดสอบ
* Debugging / การแก้ไขปัญหา
* Documentation / การจัดทำเอกสาร
* Code review / การ Review Code

This standard does not define project-specific requirements, architecture, business rules, or deployment configuration.

Standard นี้ไม่ได้กำหนด Requirement, Architecture, Business Rules หรือ Deployment Configuration เฉพาะของ Project

---

## Core Principle / หลักการสำคัญ

> **AI is an engineering assistant, not the owner of project knowledge.**
>
> **AI เป็นผู้ช่วยด้านวิศวกรรม ไม่ใช่เจ้าของความรู้ของ Project**

The Developer remains responsible for the software, project knowledge, and final decisions.

Developer ยังคงเป็นผู้รับผิดชอบ Software, ความรู้ของ Project และการตัดสินใจขั้นสุดท้าย

### Developer owns / Developer เป็นผู้รับผิดชอบ

* Requirements / ความต้องการของระบบ
* Business decisions / การตัดสินใจด้านธุรกิจ
* Architecture decisions / การตัดสินใจด้าน Architecture
* Security decisions / การตัดสินใจด้าน Security
* Project knowledge / ความรู้ของ Project
* Final implementation review / การตรวจสอบ Implementation ขั้นสุดท้าย
* Final approval / การอนุมัติขั้นสุดท้าย

### AI may assist / AI สามารถช่วย

* Analyze / วิเคราะห์
* Recommend / แนะนำ
* Generate code / สร้าง Code
* Refactor / Refactor
* Generate tests / สร้าง Test
* Debug / Debug
* Review / Review
* Document / จัดทำเอกสาร

AI recommendations do not automatically become project decisions.

คำแนะนำจาก AI ไม่ถือเป็น Project Decision โดยอัตโนมัติ

---

## Development Principles / หลักการพัฒนา

### 1. Understand before implementing

เข้าใจปัญหาและ Requirement ก่อนเริ่ม Implementation

AI SHOULD understand the task, relevant requirements, and existing context before making changes.

AI ควรทำความเข้าใจ Task, Requirement และ Context ที่เกี่ยวข้องก่อนแก้ไขระบบ

### 2. Inspect before changing

ตรวจสอบสิ่งที่มีอยู่ก่อนแก้ไข

Inspect relevant code, structure, dependencies, and existing patterns before making changes.

ตรวจสอบ Code, Structure, Dependency และ Pattern ที่เกี่ยวข้องก่อนแก้ไข

### 3. Prefer the smallest correct solution

เลือกวิธีที่เล็กและเหมาะสมที่สุดที่สามารถแก้ปัญหาได้จริง

Avoid unnecessary complexity when a simpler solution satisfies the requirement.

หลีกเลี่ยงความซับซ้อนที่ไม่จำเป็น หากวิธีที่ง่ายกว่าสามารถตอบ Requirement ได้

### 4. Reuse before creating

ใช้สิ่งที่มีอยู่ก่อนสร้างสิ่งใหม่

Prefer existing:

* Components / Components
* Utilities / Utilities
* Patterns / Patterns
* Libraries / Libraries
* Services / Services

before introducing new implementations.

### 5. Avoid unnecessary dependencies

หลีกเลี่ยง Dependency ที่ไม่จำเป็น

A new dependency should have a clear technical reason and project benefit.

Dependency ใหม่ควรมีเหตุผลด้าน Technical และประโยชน์ต่อ Project ที่ชัดเจน

### 6. Keep changes focused

ทำการเปลี่ยนแปลงให้ตรงกับ Task

Do not perform unrelated refactoring or cleanup unless explicitly requested or required to safely complete the task.

ไม่ควร Refactor หรือ Cleanup ส่วนที่ไม่เกี่ยวข้อง เว้นแต่ได้รับคำสั่งหรือจำเป็นต่อการทำ Task ให้เสร็จอย่างปลอดภัย

### 7. Verify meaningful changes

ตรวจสอบการเปลี่ยนแปลงที่มีผลต่อระบบ

Verification should be appropriate to the type and risk of the change.

การตรวจสอบควรเหมาะสมกับประเภทและความเสี่ยงของการเปลี่ยนแปลง

### 8. Make decisions explicit

ทำให้ Decision ที่สำคัญชัดเจน

Important technical decisions, assumptions, trade-offs, and risks should be communicated and documented when appropriate.

Technical Decision, Assumption, Trade-off และ Risk ที่สำคัญควรถูกอธิบายและบันทึกเมื่อเหมาะสม

### 9. Preserve project knowledge

รักษาความรู้ของ Project

Important project knowledge should be documented inside the project rather than relying on AI conversation history.

ความรู้สำคัญของ Project ควรถูกบันทึกไว้ใน Project ไม่ควรพึ่งพา Conversation History ของ AI

### 10. Maintain developer independence

Developer ต้องสามารถทำงานต่อได้โดยไม่พึ่งพา AI

The project should remain understandable and maintainable without access to the previous AI conversation.

Project ควรสามารถเข้าใจและดูแลต่อได้โดยไม่ต้องพึ่งพา Conversation เดิมกับ AI

---

## AI Behavior / พฤติกรรมของ AI

### AI SHOULD / AI ควร

* Inspect the existing project before making changes.
* Reuse existing project patterns.
* State assumptions when requirements are unclear.
* Explain important technical decisions.
* Identify relevant risks and side effects.
* Verify meaningful changes.
* Keep changes focused on the current task.
* Document important project knowledge.
* Ask for clarification when a decision cannot be safely inferred.
* Report limitations when verification cannot be performed.

### AI MUST NOT / AI ห้าม

* Invent project requirements.
* Assume architecture without inspection.
* Add unnecessary dependencies.
* Perform unrelated refactoring.
* Hide important changes.
* Claim that something was tested when it was not.
* Claim success without sufficient verification.
* Treat AI-generated code as automatically correct.
* Replace Developer decisions without explicit direction.
* Store project-specific knowledge in the central standard.

---

## Workflow / กระบวนการทำงาน

For meaningful development work, follow:

สำหรับงานพัฒนาที่มีความสำคัญ ให้ดำเนินการตามลำดับ:

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

The workflow may be adapted based on task type and complexity.

Workflow สามารถปรับตามประเภทและความซับซ้อนของ Task ได้

Detailed workflows are defined under:

```text
workflows/
```

The development standard defines the principles.

The workflow defines the execution process.

Development Standard กำหนดหลักการ

Workflow กำหนดขั้นตอนการทำงาน

---

## Handoff / การส่งต่องาน

For meaningful implementation work, the result should communicate:

สำหรับงาน Implementation ที่มีความสำคัญ ควรสรุป:

* What changed / เปลี่ยนอะไร
* Why / ทำไม
* Files changed / แก้ไฟล์อะไร
* Verification performed / ตรวจสอบอะไร
* Known issues / ปัญหาที่ทราบ
* Important decisions / Decision สำคัญ
* Next steps / งานที่ควรทำต่อ

The handoff should allow another Developer to continue the work without relying on the previous AI conversation.

Handoff ต้องทำให้ Developer คนอื่นสามารถทำงานต่อได้โดยไม่ต้องพึ่งพา Conversation เดิมกับ AI

Handoff templates are defined under:

```text
templates/
```

---

## Source of Truth / แหล่งข้อมูลหลัก

When information conflicts, use the following priority:

เมื่อข้อมูลขัดแย้งกัน ให้ใช้ลำดับความสำคัญดังนี้:

### 1. Explicit Developer Requirement

Requirement ที่ Developer ระบุโดยตรง

### 2. Project Knowledge

Project documentation, source code, configuration, and established project decisions.

Documentation, Code, Configuration และ Decision ของ Project

### 3. AI Development Standard

The standards defined by this repository.

Standard ที่กำหนดโดย Repository นี้

### 4. General Technical Knowledge

General knowledge, assumptions, and recommendations.

ความรู้ทั่วไป, Assumption และคำแนะนำทาง Technical

Project-specific requirements take precedence over generic standards when there is a legitimate project-specific reason.

Requirement เฉพาะของ Project มีความสำคัญเหนือ Generic Standard เมื่อมีเหตุผลที่เหมาะสมสำหรับ Project นั้น

---

## Exceptions / ข้อยกเว้น

A project may deviate from this standard when there is a valid project-specific reason.

Project สามารถแตกต่างจาก Standard ได้เมื่อมีเหตุผลเฉพาะของ Project ที่เหมาะสม

Exceptions should be:

* Explicit / ระบุอย่างชัดเจน
* Justified / มีเหตุผลรองรับ
* Documented / มีการบันทึก
* Approved when appropriate / ได้รับการอนุมัติเมื่อเหมาะสม

Exceptions MUST NOT be used to bypass security, compliance, or critical quality requirements without appropriate approval.

ห้ามใช้ Exception เพื่อหลีกเลี่ยง Security, Compliance หรือ Quality Requirement ที่สำคัญโดยไม่มีการอนุมัติที่เหมาะสม

---

## Completion Criteria / เกณฑ์การทำงานเสร็จ

A meaningful development task should be considered complete when:

งานพัฒนาที่มีความสำคัญควรถือว่าเสร็จเมื่อ:

* The requested behavior is implemented.
* Existing behavior is preserved unless intentionally changed.
* Relevant verification or tests have been performed.
* Important risks are identified.
* Important decisions are documented when necessary.
* Known issues are reported.
* The Developer can understand the resulting changes.
* Handoff information is available when appropriate.

---

## Project Independence / การแยกความรู้ระหว่าง Project

This Standard defines:

> **How we work**

ไม่ใช่:

> **What a specific project is**

Project-specific information must remain inside the Project, including:

* Requirements
* Business rules
* Architecture
* API contracts
* Design decisions
* Project-specific conventions
* Deployment configuration
* Project-specific integrations

Do not duplicate project-specific knowledge into the central repository.

ห้ามนำ Project-specific knowledge มาทำซ้ำใน Central Repository

A project-specific rule may be promoted into the central standard only when it becomes a reusable general principle.

สามารถนำกฎจาก Project มาเป็น Central Standard ได้เมื่อกฎนั้นสามารถนำไปใช้กับหลาย Project ได้อย่างเหมาะสม

---

## Relationship with Plugins and Tools / ความสัมพันธ์กับ Plugin และ Tools

Plugins and development tools are supporting capabilities.

Plugin และ Development Tool เป็นความสามารถสนับสนุน

They MUST NOT override:

* Project requirements
* Project architecture
* Security requirements
* Developer decisions
* This Standard

Plugin และ Tool ต้องไม่ Override:

* Requirement ของ Project
* Architecture ของ Project
* Security Requirement
* Developer Decision
* Standard นี้

Plugin selection and installation are environment or project-level concerns and are defined separately from the core development principles.

การเลือกและติดตั้ง Plugin เป็นเรื่องของ Development Environment หรือ Project และถูกกำหนดแยกจาก Core Development Principles

See:

```text
plugins/
```

---

## Standard Structure / โครงสร้าง Standard

```text
v1.0.0/

├── CLAUDE.md
├── VERSION
├── CHANGELOG.md
│
├── standards/
│   ├── development.md
│   └── versioning.md
│
├── workflows/
│   └── feature.md
│
├── templates/
│   └── handoff.md
│
└── plugins/
    ├── README.md
    └── registry.md
```

### Responsibilities / หน้าที่

| Component      | Responsibility                                                      |
| -------------- | ------------------------------------------------------------------- |
| `CLAUDE.md`    | Core instructions and entry point / Instruction หลักและ Entry Point |
| `standards/`   | Development standards / มาตรฐานการพัฒนา                             |
| `workflows/`   | Standardized development processes / กระบวนการทำงาน                 |
| `templates/`   | Reusable documentation templates / Template เอกสาร                  |
| `plugins/`     | Plugin policy and catalog / Policy และรายการ Plugin                 |
| `VERSION`      | Current version / Version ปัจจุบัน                                  |
| `CHANGELOG.md` | Version history / ประวัติการเปลี่ยนแปลง                             |

---

## Important Principle / หลักการสำคัญ

The purpose of this standard is not to make AI autonomous.

จุดประสงค์ของ Standard นี้ไม่ใช่การทำให้ AI ทำงานแทน Developer อย่างอิสระ

The purpose is to make AI-assisted development:

> **Consistent, understandable, maintainable, and repeatable.**

> **สม่ำเสมอ เข้าใจได้ ดูแลรักษาได้ และสามารถทำซ้ำได้**

The Developer remains the owner of the software, project knowledge, and final decisions.

Developer ยังคงเป็นเจ้าของ Software, ความรู้ของ Project และการตัดสินใจขั้นสุดท้าย
