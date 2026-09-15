# Architecture Standard

# มาตรฐานด้าน Architecture

## 1. Purpose / วัตถุประสงค์

This document defines the architecture principles for AI-assisted development of web applications, backends, APIs, and other applications, independent of any technology stack.

เอกสารนี้กำหนดหลักการด้าน Architecture สำหรับการพัฒนาร่วมกับ AI ใช้ได้กับ Web Application, Backend, API และ Application อื่น โดยไม่ผูกกับ Technology stack ใด

It does not prescribe an architecture pattern or a framework. Each Project's architecture is Project knowledge and lives in the Project:

เอกสารนี้ไม่กำหนด Architecture pattern หรือ Framework Architecture ของแต่ละ Project เป็นความรู้ของ Project และเก็บไว้ใน Project:

| Location / ตำแหน่ง | Holds / เก็บ |
| --- | --- |
| `docs/architecture/` | How this Project is built: structure, boundaries, data flow, `folder-structure.md` / Project นี้สร้างอย่างไร: โครงสร้าง ขอบเขต การไหลของข้อมูล |
| `docs/decisions/` | Why this Project is built that way: one record per architecture decision, section 5 / ทำไมจึงสร้างแบบนั้น: หนึ่ง Record ต่อหนึ่ง Decision ดูหัวข้อ 5 |

When `docs/architecture/` is empty, the existing code is the architecture.

ถ้า `docs/architecture/` ยังว่าง ให้ถือว่า Code ที่มีอยู่คือ Architecture

The Developer owns architecture decisions, as stated in `standards/development.md`.

Developer เป็นเจ้าของ Architecture decision ตามที่ระบุใน `standards/development.md`

---

## 2. Principles / หลักการ

1. **Prefer the simplest architecture that satisfies current requirements.** / เลือก Architecture ที่ง่ายที่สุดที่ตอบ Requirement ปัจจุบันได้
2. **Respect the existing project architecture.** / เคารพ Architecture เดิมของ Project
3. **Respect existing architecture decisions.** / เคารพ Architecture decision ที่บันทึกไว้
4. **Avoid unnecessary abstraction.** An abstraction needs more than one real use. / หลีกเลี่ยง Abstraction ที่ไม่จำเป็น Abstraction ต้องมีการใช้งานจริงมากกว่าหนึ่งที่
5. **Avoid premature optimization.** Optimize for measured or stated needs. / หลีกเลี่ยงการ Optimize ก่อนเวลา ทำเมื่อมีการวัดหรือมี Requirement ระบุ
6. **Major architectural changes explain reason, impact, and trade-offs.** / การเปลี่ยน Architecture ครั้งใหญ่ต้องอธิบายเหตุผล ผลกระทบ และ Trade-off
7. **Architecture evolves when requirements justify it.** Not before, and not never. / Architecture เปลี่ยนได้เมื่อ Requirement มีเหตุผลรองรับ ไม่ใช่เปลี่ยนล่วงหน้า และไม่ใช่ห้ามเปลี่ยนเลย

---

## 3. What to Consider / สิ่งที่ต้องพิจารณา

Apply these when a change adds, moves, or connects parts of the system. A change inside one existing part usually needs only section 2.

ใช้เมื่อการเปลี่ยนแปลงเพิ่ม ย้าย หรือเชื่อมส่วนต่าง ๆ ของระบบ ถ้าแก้ภายในส่วนเดิมส่วนเดียว โดยทั่วไปใช้แค่หัวข้อ 2

### Separation of concerns / การแยกหน้าที่

Each part has one reason to change. Keep presentation, business rules, and data access apart in whatever way the Project already does.

แต่ละส่วนมีเหตุผลในการเปลี่ยนเพียงเรื่องเดียว แยกการแสดงผล Business rule และการเข้าถึงข้อมูลออกจากกัน ตามวิธีที่ Project ใช้อยู่

### Module and feature boundaries / ขอบเขตของ Module และ Feature

A module or feature exposes a small public surface and hides the rest. Other parts use that surface, not its internals. Put new code in the module that owns the behavior; create a new module only when no existing one owns it.

Module หรือ Feature เปิดส่วนที่ให้ภายนอกใช้ให้น้อย และซ่อนส่วนที่เหลือ ส่วนอื่นใช้ผ่านส่วนที่เปิดไว้ ไม่เข้าไปใช้ข้างใน วาง Code ใหม่ใน Module ที่เป็นเจ้าของพฤติกรรมนั้น สร้าง Module ใหม่เฉพาะเมื่อไม่มี Module เดิมเป็นเจ้าของ

### Dependency direction / ทิศทางของ Dependency

Dependencies point toward the more stable, more general parts. Shared code does not depend on features. No cycles between modules. When two modules need each other, the shared part moves down, it does not become a cycle.

Dependency ชี้ไปหาส่วนที่เสถียรกว่าและทั่วไปกว่า Code ที่ใช้ร่วมกันไม่พึ่ง Feature ห้ามมีวงวนระหว่าง Module ถ้าสอง Module ต้องใช้กันและกัน ให้ย้ายส่วนที่ใช้ร่วมลงไปชั้นล่าง ไม่ใช่ปล่อยให้เป็นวงวน

### API and service boundaries / ขอบเขตของ API และ Service

A boundary between modules, services, or systems is a contract: its inputs, outputs, errors, and who calls it. Contracts are Project knowledge and are documented in the Project. Changing a contract that other parts or systems use is an architecture decision.

ขอบเขตระหว่าง Module, Service หรือระบบ คือสัญญา: Input, Output, Error และผู้เรียกใช้ สัญญาเป็นความรู้ของ Project และบันทึกไว้ใน Project การเปลี่ยนสัญญาที่ส่วนอื่นหรือระบบอื่นใช้อยู่ถือเป็น Architecture decision

### Data ownership / ความเป็นเจ้าของข้อมูล

Each kind of data has one owner that writes it and enforces its rules. Other parts read or change it through the owner. Two owners writing the same data is an architecture decision, not an implementation detail.

ข้อมูลแต่ละประเภทมีเจ้าของเดียวที่เขียนและบังคับกฎของข้อมูลนั้น ส่วนอื่นอ่านหรือแก้ผ่านเจ้าของ การมีเจ้าของสองที่เขียนข้อมูลเดียวกันเป็น Architecture decision ไม่ใช่รายละเอียดของ Implementation

### Maintainability / การดูแลรักษา

A Developer new to the Project can find where a behavior lives from `docs/architecture/` and the names in the code. Follow existing naming and placement over personal preference.

Developer ที่ไม่เคยเห็น Project หาได้ว่าพฤติกรรมหนึ่งอยู่ที่ไหน จาก `docs/architecture/` และชื่อใน Code ให้ใช้การตั้งชื่อและตำแหน่งแบบเดิมของ Project มากกว่าความชอบส่วนตัว

### Scalability / การรองรับการขยาย

Design for the load and data size the requirements state or the Project measures. When a simpler design has a known limit, write the limit and what would trigger a change, instead of building for a scale nobody asked for.

ออกแบบตามปริมาณงานและขนาดข้อมูลที่ Requirement ระบุหรือที่ Project วัดได้ ถ้า Design ที่ง่ายกว่ามีขีดจำกัดที่รู้อยู่ ให้เขียนขีดจำกัดนั้นและสิ่งที่จะเป็นเหตุให้ต้องเปลี่ยน แทนการสร้างเผื่อ Scale ที่ไม่มีใครขอ

---

## 4. When a Change Is Architectural / เมื่อใดถือว่าเป็นการเปลี่ยน Architecture

A change is architectural when it is hard to reverse or when later work must follow it. Examples:

การเปลี่ยนแปลงถือเป็นเรื่อง Architecture เมื่อย้อนกลับได้ยาก หรือเมื่องานต่อจากนี้ต้องทำตาม ตัวอย่าง:

* A new or removed module, service, or layer / เพิ่มหรือลบ Module, Service หรือ Layer
* A changed dependency direction or boundary / เปลี่ยนทิศทาง Dependency หรือขอบเขต
* A changed contract that other parts or systems use / เปลี่ยนสัญญาที่ส่วนอื่นหรือระบบอื่นใช้
* A new data store, or a change of data ownership / เพิ่มที่เก็บข้อมูล หรือเปลี่ยนเจ้าของข้อมูล
* A framework, platform, or infrastructure dependency the rest of the code will build on / Framework, Platform หรือ Infrastructure ที่ Code ส่วนอื่นจะสร้างต่อยอด
* A cross-cutting approach: authentication, authorization, error handling, state, caching, messaging / แนวทางที่ใช้ทั้งระบบ: Authentication, Authorization, Error handling, State, Caching, Messaging
* A deviation from `docs/architecture/` or from a recorded decision / การทำต่างจาก `docs/architecture/` หรือจาก Decision ที่บันทึกไว้

Not architectural: a local implementation choice that stays inside one part and can be undone within a task.

ไม่ถือเป็นเรื่อง Architecture: การเลือกวิธี Implement ภายในส่วนเดียว ที่ย้อนกลับได้ภายใน Task

For an architectural change, AI proposes and the Developer decides. The proposal states the reason, impact, trade-offs, and alternatives considered: in the plan of `workflows/feature.md` step 3, the Diagnose step of `workflows/bug-fix.md`, or the Assess Impact step of `workflows/change.md`. If the need appears during a verify loop, the decision is HUMAN, per `workflows/verify-loop.md`.

สำหรับการเปลี่ยน Architecture AI เป็นผู้เสนอ Developer เป็นผู้ตัดสินใจ ข้อเสนอต้องระบุเหตุผล ผลกระทบ Trade-off และทางเลือกที่พิจารณา ใน Plan ของ `workflows/feature.md` ขั้นที่ 3 ขั้น Diagnose ของ `workflows/bug-fix.md` หรือขั้น Assess Impact ของ `workflows/change.md` ถ้าความจำเป็นเกิดขึ้นระหว่าง Verify loop การตัดสินใจคือ HUMAN ตาม `workflows/verify-loop.md`

---

## 5. Architecture Decisions / การบันทึก Architecture Decision

Record a decision in `docs/decisions/` when the Developer accepts an architectural change from section 4. Do not record local implementation choices, and do not record a decision an existing record already covers.

บันทึก Decision ใน `docs/decisions/` เมื่อ Developer ยอมรับการเปลี่ยน Architecture ตามหัวข้อ 4 ไม่ต้องบันทึกการเลือกวิธี Implement ภายในส่วนเดียว และไม่บันทึกซ้ำกับ Record ที่มีอยู่แล้ว

One file per decision, `docs/decisions/<YYYY-MM-DD>-<decision-slug>.md`, short, with:

หนึ่งไฟล์ต่อหนึ่ง Decision ชื่อ `docs/decisions/<YYYY-MM-DD>-<decision-slug>.md` เขียนสั้น ๆ โดยมี:

* **Status / สถานะ**: proposed, accepted, or superseded by `<file>` / proposed, accepted หรือ superseded by `<file>`
* **Context / บริบท**: the requirement or problem that forced a choice / Requirement หรือปัญหาที่ทำให้ต้องเลือก
* **Decision / การตัดสินใจ**: what was chosen / เลือกอะไร
* **Alternatives / ทางเลือก**: what else was considered and why not / พิจารณาทางเลือกอะไรอีก และทำไมไม่เลือก
* **Consequences / ผลที่ตามมา**: impact, trade-offs, known limits, and what would trigger a revisit / ผลกระทบ Trade-off ขีดจำกัดที่รู้ และสิ่งที่จะเป็นเหตุให้ต้องทบทวน

A decision is changed by a new record that supersedes it. The old record stays, marked superseded. Only the Developer marks a record accepted.

การเปลี่ยน Decision ทำโดยเขียน Record ใหม่ที่ Supersede ของเดิม Record เดิมยังเก็บไว้และระบุว่า Superseded มีเพียง Developer ที่ระบุว่า Record ใด Accepted

When the decision changes how the Project is built, update `docs/architecture/` in the same change.

ถ้า Decision เปลี่ยนวิธีที่ Project ถูกสร้าง ให้แก้ `docs/architecture/` ในการเปลี่ยนแปลงเดียวกัน

---

## 6. AI Behavior / พฤติกรรมของ AI

### AI SHOULD / AI ควร

* Read `docs/architecture/` and `docs/decisions/` before a change that adds, moves, or connects parts / อ่าน `docs/architecture/` และ `docs/decisions/` ก่อนการเปลี่ยนแปลงที่เพิ่ม ย้าย หรือเชื่อมส่วนต่าง ๆ
* Place new code where the existing architecture says it belongs / วาง Code ใหม่ในตำแหน่งที่ Architecture เดิมกำหนด
* Say when a task conflicts with the existing architecture or a recorded decision, before implementing / แจ้งเมื่อ Task ขัดกับ Architecture เดิมหรือ Decision ที่บันทึกไว้ ก่อนเริ่ม Implement
* Draft the decision record for the Developer when section 5 applies / ร่าง Decision record ให้ Developer เมื่อเข้าหัวข้อ 5

### AI MUST NOT / AI ห้าม

* Introduce an architecture pattern, layer, or abstraction the task does not need / เพิ่ม Architecture pattern, Layer หรือ Abstraction ที่ Task ไม่ต้องการ
* Make an architectural change from section 4 without Developer approval / เปลี่ยน Architecture ตามหัวข้อ 4 โดยไม่ได้รับอนุมัติจาก Developer
* Work around a recorded decision silently / หลบเลี่ยง Decision ที่บันทึกไว้โดยไม่แจ้ง
* Mark a decision record accepted / ระบุว่า Decision record เป็น Accepted เอง

---

## Core Principle / หลักการสำคัญ

> **The simplest architecture that meets today's requirements, changed on purpose and on record.**

> **Architecture ที่ง่ายที่สุดที่ตอบ Requirement วันนี้ เปลี่ยนเมื่อมีเหตุผล และมีบันทึก**
