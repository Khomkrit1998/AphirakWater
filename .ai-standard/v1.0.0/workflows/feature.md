# Feature Workflow

# กระบวนการพัฒนา Feature

## Purpose / วัตถุประสงค์

A standard workflow for implementing a new Feature or extending an existing Feature while keeping changes focused, verifiable, and maintainable.

กระบวนการมาตรฐานสำหรับพัฒนา Feature ใหม่หรือขยาย Feature เดิม โดยเน้นการเปลี่ยนแปลงที่เหมาะสม ตรวจสอบได้ และดูแลต่อได้ง่าย

---

## 1. Understand / ทำความเข้าใจ

Before implementation, identify:

ก่อนเริ่ม Implementation ต้องเข้าใจ:

* **Goal / เป้าหมาย**
* **User impact / ผลกระทบต่อผู้ใช้**
* **Requirements / Requirement**
* **Acceptance criteria / เงื่อนไขการยอมรับ**
* **Existing behavior / พฤติกรรมเดิม**
* **Constraints / ข้อจำกัด**
* **Definition of Done / เงื่อนไขว่างานถือว่าเสร็จ**

Do not assume unclear requirements.

อย่าคาดเดา Requirement ที่ไม่ชัดเจน

---

## 2. Analyze / วิเคราะห์

Inspect the existing project before deciding how to implement.

ตรวจสอบ Project ที่มีอยู่ก่อนตัดสินใจ Implementation

Inspect relevant:

* **Files / ไฟล์ที่เกี่ยวข้อง**
* **Architecture / Architecture เดิม**
* **Components / Components เดิม**
* **Utilities / Utilities เดิม**
* **API and data dependencies / API และ Data ที่เกี่ยวข้อง**
* **Existing patterns / Pattern ที่มีอยู่**
* **Potential side effects / ผลกระทบข้างเคียง**
* **Tests / Tests ที่เกี่ยวข้อง**

Prefer understanding and reusing existing patterns before introducing new ones.

ควรทำความเข้าใจและ Reuse Pattern เดิมก่อนสร้างสิ่งใหม่

---

## 3. Plan / วางแผน

Create a short implementation plan based on the analysis.

สร้าง Implementation Plan สั้น ๆ จากผลการวิเคราะห์

The plan should define:

1. **What will change / จะเปลี่ยนอะไร**
2. **Where it will change / จะเปลี่ยนที่ไหน**
3. **How it will work / จะทำงานอย่างไร**
4. **Why this approach / ทำไมเลือกวิธีนี้**
5. **Risks and assumptions / Risk และ Assumption**
6. **Tests and verification needed / Test และ Verification ที่ต้องทำ**

For large or high-impact Features, the plan should be reviewed before implementation begins.

สำหรับ Feature ที่มีขนาดใหญ่หรือมีผลกระทบสูง ควร Review Plan ก่อนเริ่ม Implementation

Do not start large implementation before the plan is sufficiently understood.

อย่าเริ่ม Implementation ขนาดใหญ่ก่อนที่ Plan จะชัดเจนเพียงพอ

---

## 4. Implement / ลงมือพัฒนา

Implement the smallest correct solution.

พัฒนา Solution ที่เล็กและถูกต้องที่สุด

* **Make the smallest correct change.**

  * แก้เฉพาะสิ่งที่จำเป็น

* **Follow existing project patterns.**

  * ใช้ Pattern เดิมของ Project

* **Reuse before creating.**

  * Reuse ก่อนสร้างใหม่

* **Avoid unnecessary dependencies.**

  * หลีกเลี่ยง Dependency ที่ไม่จำเป็น

* **Avoid unrelated changes.**

  * หลีกเลี่ยงการแก้สิ่งที่ไม่เกี่ยวข้อง

* **Preserve existing behavior unless the requirement explicitly changes it.**

  * รักษาพฤติกรรมเดิม เว้นแต่ Requirement ระบุให้เปลี่ยน

---

## 5. Verify / ตรวจสอบ

Verify that the Feature works as intended and does not introduce unacceptable regressions.

ตรวจสอบว่า Feature ทำงานตามที่ต้องการ และไม่สร้าง Regression ที่ยอมรับไม่ได้

Check relevant:

### Functional / การทำงาน

* Happy path
* Error state
* Empty state
* Loading state
* Edge cases
* Acceptance criteria

### UI / UX

* Responsive behavior
* Accessibility
* User interaction
* Relevant UI states

### Technical / ด้านเทคนิค

* Unit / Integration tests where appropriate
* API behavior
* Data behavior
* Error handling
* Regression risk

### Verification Result / ผลการตรวจสอบ

Record:

* What was tested / ทดสอบอะไร
* Result / ผลลัพธ์
* What could not be verified / สิ่งที่ยังตรวจสอบไม่ได้
* Known limitations / ข้อจำกัดที่พบ

Never claim a test or verification was completed if it was not actually performed.

ห้ามระบุว่าทดสอบหรือ Verify แล้ว หากยังไม่ได้ดำเนินการจริง

---

## 6. Handoff / ส่งต่องาน

Create a development handoff when the implementation is completed or transferred to another Developer.

สร้าง Development Handoff เมื่องาน Implementation เสร็จหรือจำเป็นต้องส่งต่อให้ Developer คนอื่น

Use:

`templates/handoff.md`

The Handoff should provide enough project knowledge for another Developer to continue independently without relying on the AI's previous context.

Handoff ต้องมีข้อมูลเพียงพอให้ Developer คนอื่นสามารถทำงานต่อได้โดยไม่ต้องพึ่ง Context เดิมของ AI

The Handoff should cover:

* What changed / เปลี่ยนอะไร
* Why / ทำไม
* Files changed / แก้ไฟล์อะไร
* Verification / ตรวจสอบอะไร
* Known issues / ปัญหาที่ทราบ
* Important decisions / Decision สำคัญ
* Debug / Continue / วิธี Debug และงานต่อ

---

## Completion Criteria / เงื่อนไขการจบ Workflow

A Feature workflow is complete when:

Feature ถือว่าจบ Workflow เมื่อ:

* [ ] Requirements are understood / เข้าใจ Requirement แล้ว
* [ ] Existing project has been inspected / ตรวจสอบ Project เดิมแล้ว
* [ ] Implementation plan is defined / มี Implementation Plan แล้ว
* [ ] Feature is implemented / พัฒนา Feature แล้ว
* [ ] Relevant verification is completed / ตรวจสอบที่เกี่ยวข้องแล้ว
* [ ] Known issues and limitations are documented / บันทึกปัญหาและข้อจำกัดแล้ว
* [ ] Handoff is completed when required / ทำ Handoff เมื่อจำเป็น
* [ ] Developer can continue independently / Developer สามารถทำงานต่อได้โดยไม่พึ่ง AI Context เดิม

---

## Core Principle / หลักการสำคัญ

**Understand → Analyze → Plan → Implement → Verify → Handoff**

**เข้าใจ → วิเคราะห์ → วางแผน → พัฒนา → ตรวจสอบ → ส่งต่องาน**

The goal is not to produce the most code. The goal is to make the smallest correct, verifiable, and maintainable change.

เป้าหมายไม่ใช่การเขียน Code ให้มากที่สุด แต่คือการสร้างการเปลี่ยนแปลงที่ถูกต้อง ตรวจสอบได้ และดูแลต่อได้ง่ายที่สุด
