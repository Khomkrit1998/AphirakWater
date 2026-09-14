# Versioning Standard

# มาตรฐานการกำหนด Version

## 1. Purpose / วัตถุประสงค์

This document defines the rules for determining, creating, and releasing versions of `ai-dev-standard`.

เอกสารนี้กำหนดหลักเกณฑ์สำหรับการพิจารณา สร้าง และ Release Version ของ `ai-dev-standard`

`ai-dev-standard` follows Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
1.0.0
```

---

## 2. Version Structure / โครงสร้าง Version

Version consists of three numbers:

Version ประกอบด้วยตัวเลข 3 ส่วน:

```text
MAJOR.MINOR.PATCH
```

### MAJOR

Breaking changes that significantly change the existing way of working.

การเปลี่ยนแปลงที่กระทบวิธีการทำงานเดิมอย่างมีนัยสำคัญ และอาจทำให้ Project เดิมต้องปรับตัว

### MINOR

New capabilities or rules that are backward-compatible.

การเพิ่มความสามารถ กฎ Workflow หรือ Template ใหม่ โดยไม่ทำลายวิธีการทำงานเดิม

### PATCH

Corrections or improvements that do not change the meaning or existing way of working.

การแก้ไขหรือปรับปรุงที่ไม่เปลี่ยนความหมายหรือวิธีการทำงานเดิม

---

## 3. PATCH Version / การเพิ่ม PATCH

Increase the PATCH number when the change does not change the existing standard, rules, or workflow behavior.

เพิ่ม PATCH เมื่อการเปลี่ยนแปลงไม่มีผลต่อ Standard, Rule หรือ Workflow เดิม

Example:

```text
1.0.0 → 1.0.1
```

Use PATCH for:

* Typo fixes / แก้คำผิด
* Grammar fixes / แก้ไวยากรณ์
* Documentation corrections / แก้ไข Documentation
* Formatting changes / ปรับรูปแบบเอกสาร
* Fixing broken references / แก้ Reference ที่ผิด
* Clarifying wording without changing meaning / ปรับข้อความให้ชัดเจนขึ้นโดยไม่เปลี่ยนความหมาย
* Adding examples without changing existing rules / เพิ่มตัวอย่างโดยไม่เปลี่ยนกฎ

### Rule / หลักเกณฑ์

> **The existing meaning and way of working remain unchanged.**
>
> **ความหมายและวิธีการทำงานเดิมยังคงเหมือนเดิม**

If clarification changes how AI or Developers are expected to work, it is not a PATCH.

หากการปรับข้อความทำให้วิธีที่ AI หรือ Developer ต้องทำงานเปลี่ยนไป จะไม่ถือเป็น PATCH

---

## 4. MINOR Version / การเพิ่ม MINOR

Increase the MINOR number when adding new capabilities, standards, workflows, templates, or rules without breaking existing behavior.

เพิ่ม MINOR เมื่อมีการเพิ่มความสามารถ Standard Workflow Template หรือ Rule ใหม่ โดยไม่ทำลายวิธีการทำงานเดิม

Example:

```text
1.0.0 → 1.1.0
```

Use MINOR for:

* Adding a new standard / เพิ่ม Standard ใหม่
* Adding a new workflow / เพิ่ม Workflow ใหม่
* Adding a new template / เพิ่ม Template ใหม่
* Adding a new checklist / เพิ่ม Checklist ใหม่
* Adding optional guidelines / เพิ่มแนวทางแบบ Optional
* Adding backward-compatible rules / เพิ่มกฎที่ไม่กระทบของเดิม
* Adding new plugin recommendations / เพิ่ม Plugin Recommendation ใหม่
* Expanding an existing standard without changing existing requirements / ขยาย Standard เดิมโดยไม่เปลี่ยนข้อกำหนดเดิม

### Rule / หลักเกณฑ์

> **Existing projects can continue using the previous way of working.**
>
> **Project เดิมยังสามารถใช้วิธีการทำงานเดิมต่อได้**

---

## 5. MAJOR Version / การเพิ่ม MAJOR

Increase the MAJOR number when the change significantly changes or breaks the existing way of working.

เพิ่ม MAJOR เมื่อมีการเปลี่ยนแปลงที่กระทบหรือทำลายวิธีการทำงานเดิมอย่างมีนัยสำคัญ

Example:

```text
1.5.0 → 2.0.0
```

Use MAJOR for:

* Changing the core development workflow
  / เปลี่ยน Development Workflow หลัก

* Removing a required rule
  / ลบกฎที่เดิมเป็นข้อบังคับ

* Changing an existing rule in a breaking way
  / เปลี่ยนกฎเดิมในลักษณะที่ทำให้การใช้งานเดิมไม่สามารถทำต่อได้

* Changing the source-of-truth hierarchy
  / เปลี่ยนลำดับ Source of Truth

* Changing responsibilities between AI and Developer
  / เปลี่ยนขอบเขตความรับผิดชอบระหว่าง AI และ Developer

* Changing the required project structure
  / เปลี่ยนโครงสร้าง Project ที่เป็นข้อบังคับ

* Removing or replacing an essential workflow
  / ลบหรือแทนที่ Workflow ที่สำคัญ

* Introducing a requirement that existing projects must adopt
  / เพิ่มข้อกำหนดที่ทำให้ Project เดิมต้องนำไปใช้

* Any change that requires existing projects to significantly adapt
  / การเปลี่ยนแปลงที่ทำให้ Project เดิมต้องปรับตัวอย่างมีนัยสำคัญ

### Rule / หลักเกณฑ์

> **Existing projects or workflows must change to comply with the new standard.**
>
> **Project หรือ Workflow เดิมจำเป็นต้องเปลี่ยนเพื่อให้สอดคล้องกับ Standard ใหม่**

---

## 6. Decision Process / ขั้นตอนการพิจารณา Version

When changing `ai-dev-standard`, determine the version level based on impact.

เมื่อมีการเปลี่ยนแปลง `ai-dev-standard` ให้พิจารณาระดับ Version จากผลกระทบ

### Step 1 — Breaking Change?

Does the change break an existing rule, workflow, required behavior, or required project structure?

การเปลี่ยนแปลงทำให้กฎ Workflow พฤติกรรม หรือโครงสร้าง Project ที่เป็นข้อบังคับเดิมใช้งานไม่ได้หรือไม่?

```text
YES → MAJOR

NO → Continue
```

### Step 2 — New Capability?

Does the change add a new standard, workflow, template, rule, or capability without breaking existing behavior?

มีการเพิ่ม Standard Workflow Template Rule หรือความสามารถใหม่ โดยไม่กระทบของเดิมหรือไม่?

```text
YES → MINOR

NO → Continue
```

### Step 3 — Correction?

Is the change only a correction, clarification, formatting, or documentation improvement that does not change existing meaning or behavior?

เป็นเพียงการแก้ไข ปรับคำ Formatting หรือ Documentation โดยไม่เปลี่ยนความหมายหรือวิธีการทำงานเดิมหรือไม่?

```text
YES → PATCH
```

### Decision Flow / Flow การตัดสินใจ

```text
Change
  ↓
Does it break existing rules, workflows, or requirements?
  │
  ├── YES → MAJOR
  │
  └── NO
       ↓
Does it add a new capability or backward-compatible rule?
  │
  ├── YES → MINOR
  │
  └── NO
       ↓
Is it only a correction or clarification?
  │
  └── YES → PATCH
```

---

## 7. Multiple Changes / กรณีมีหลายการเปลี่ยนแปลง

If a release contains multiple types of changes, use the highest applicable version level.

หาก Release เดียวมีการเปลี่ยนแปลงหลายประเภท ให้ใช้ระดับ Version ที่สูงที่สุด

Priority:

```text
MAJOR > MINOR > PATCH
```

Example:

```text
Typo fix              → PATCH
New workflow          → MINOR
Core workflow change  → MAJOR
```

Therefore:

```text
1.2.3 → 2.0.0
```

---

## 8. Version Scope / ขอบเขตของ Version

The version applies to the entire `ai-dev-standard`.

Version จะใช้กับ `ai-dev-standard` ทั้งชุด

There are no independent versions for:

* `standards/`
* `workflows/`
* `templates/`
* `plugins/`
* `CLAUDE.md`

ไม่ต้องกำหนด Version แยกสำหรับแต่ละ Folder หรือ File

Example:

```text
ai-dev-standard v1.0.0
```

represents the complete standard, including:

* Standards
* Workflows
* Templates
* Plugins
* CLAUDE.md
* Supporting documentation

---

## 9. Version Directory / โครงสร้าง Folder ของ Version

Each released version is represented by its own version directory.

แต่ละ Version ที่ Release แล้วจะมี Folder ของตัวเอง

Example:

```text
ai-dev-standard/

└── standard/
    ├── v1.0.0/
    ├── v1.1.0/
    └── v2.0.0/
```

Each version directory is a complete and immutable snapshot after release.

แต่ละ Version Folder เป็น Snapshot ที่สมบูรณ์และไม่ควรถูกแก้ไขหลังจาก Release

Example:

```text
v1.0.0 → Released → Do not modify
```

Changes must be made in a new version.

การเปลี่ยนแปลงต้องสร้าง Version ใหม่แทนการแก้ Version ที่ Release แล้ว

---

## 10. VERSION File / ไฟล์ VERSION

Each version directory contains a `VERSION` file.

แต่ละ Version Folder ต้องมีไฟล์ `VERSION`

Example:

```text
v1.0.0/

└── VERSION
```

Content:

```text
1.0.0
```

The `VERSION` file must match the directory version.

ค่าใน `VERSION` ต้องตรงกับชื่อ Folder

```text
Folder:  v1.0.0
VERSION: 1.0.0
```

The `VERSION` file identifies the version of the AI Development Standard, not the version of a project using the standard.

ไฟล์ `VERSION` ใช้ระบุ Version ของ AI Development Standard ไม่ใช่ Version ของ Project ที่นำ Standard ไปใช้

---

## 11. CHANGELOG / ประวัติการเปลี่ยนแปลง

Each released version should contain a `CHANGELOG.md`.

แต่ละ Version ที่ Release ควรมี `CHANGELOG.md`

Example:

```text
v1.0.0/

├── VERSION
└── CHANGELOG.md
```

`CHANGELOG.md` records what changed in that version.

`CHANGELOG.md` ใช้บันทึกสิ่งที่เปลี่ยนแปลงใน Version นั้น

It should describe:

* Added / เพิ่ม
* Changed / เปลี่ยนแปลง
* Fixed / แก้ไข
* Removed / ลบ
* Breaking Changes / การเปลี่ยนแปลงที่กระทบของเดิม

The CHANGELOG should explain the impact of the release rather than reproduce the full contents of changed files.

CHANGELOG ควรอธิบายว่า Release นี้เปลี่ยนอะไรและมีผลอย่างไร ไม่ควรคัดลอกเนื้อหาทั้งหมดของไฟล์ที่แก้ไขมาไว้ใน Changelog

---

## 12. Release Requirements / ข้อกำหนดก่อน Release

Before releasing a new version:

ก่อน Release Version ใหม่ ต้องดำเนินการดังนี้:

1. Review the changes.
   / ตรวจสอบการเปลี่ยนแปลง

2. Determine MAJOR, MINOR, or PATCH using this standard.
   / พิจารณา MAJOR, MINOR หรือ PATCH ตาม Standard นี้

3. Create the new version directory.
   / สร้าง Version Folder ใหม่

4. Use the previous released version as the baseline.
   / ใช้ Version ก่อนหน้าเป็น Baseline

5. Apply the required changes.
   / ดำเนินการเปลี่ยนแปลง

6. Update `VERSION`.
   / แก้ไขไฟล์ `VERSION`

7. Update `CHANGELOG.md`.
   / แก้ไข `CHANGELOG.md`

8. Review related standards, workflows, templates, and plugins.
   / ตรวจสอบ Standards, Workflows, Templates และ Plugins ที่เกี่ยวข้อง

9. Verify affected workflows when applicable.
   / ตรวจสอบ Workflow ที่ได้รับผลกระทบเมื่อเหมาะสม

10. Get Developer approval before release.
    / ให้ Developer ตรวจสอบและอนุมัติก่อน Release

---

## 13. Migration and Compatibility / การรองรับ Version เดิม

A new version should identify whether existing projects require migration.

Version ใหม่ควรระบุว่า Project เดิมจำเป็นต้อง Migration หรือไม่

### PATCH

Normally requires no migration.

โดยทั่วไปไม่ต้อง Migration

### MINOR

Should normally remain backward-compatible.

โดยทั่วไปควรรองรับการทำงานเดิมได้

Migration may be optional.

อาจมี Migration แบบ Optional

### MAJOR

May require migration or changes to existing projects.

อาจจำเป็นต้อง Migration หรือแก้ไข Project เดิม

If migration is required, the release documentation should clearly describe:

หากจำเป็นต้อง Migration ควรระบุ:

* What must change / ต้องเปลี่ยนอะไร
* Why it must change / ทำไมต้องเปลี่ยน
* Who is affected / ใครได้รับผลกระทบ
* Recommended migration steps / ขั้นตอน Migration ที่แนะนำ

---

## 14. AI Responsibilities / หน้าที่ของ AI

When modifying `ai-dev-standard`, AI MUST:

เมื่อ AI แก้ไข `ai-dev-standard` AI ต้อง:

1. Read `standards/versioning.md`.
   / อ่าน `standards/versioning.md`

2. Identify the type and impact of the change.
   / ระบุประเภทและผลกระทบของการเปลี่ยนแปลง

3. Recommend MAJOR, MINOR, or PATCH.
   / เสนอ Version ที่เหมาะสม

4. Explain why the selected version applies.
   / อธิบายเหตุผลของ Version ที่เลือก

5. Check affected Standards, Workflows, Templates, and Plugins.
   / ตรวจสอบส่วนที่เกี่ยวข้อง

6. Prepare the new version directory when a release is requested.
   / เตรียม Version Folder ใหม่เมื่อได้รับคำสั่ง Release

7. Update `VERSION`.
   / แก้ไขไฟล์ `VERSION`

8. Update `CHANGELOG.md`.
   / แก้ไข `CHANGELOG.md`

9. Never modify a released version directly.
   / ห้ามแก้ไข Version ที่ Release แล้วโดยตรง

10. Never change the version silently.
    / ห้ามเปลี่ยน Version โดยไม่แจ้งเหตุผล

---

## 15. Developer Approval / การอนุมัติของ Developer

AI may recommend and prepare a version change.

AI สามารถวิเคราะห์และเตรียม Version Change ได้

The Developer is responsible for approving the final version before release.

Developer เป็นผู้รับผิดชอบในการตรวจสอบและอนุมัติ Version สุดท้ายก่อน Release

A version is not considered officially released until the Developer approves it.

Version จะถือว่า Release อย่างเป็นทางการเมื่อ Developer อนุมัติแล้วเท่านั้น

---

## 16. Important Principle / หลักการสำคัญ

Versioning is based on **impact**, not the number of files changed.

การกำหนด Version ให้พิจารณาจาก **ผลกระทบ** ไม่ใช่จำนวนไฟล์ที่เปลี่ยน

A one-line change can be MAJOR if it changes a core rule.

การแก้เพียง 1 บรรทัดก็สามารถเป็น MAJOR ได้ หากเป็นการเปลี่ยนกฎหลัก

A change to many files can be PATCH if it only fixes documentation.

การแก้หลายไฟล์ก็ยังเป็น PATCH ได้ หากเป็นเพียงการแก้ Documentation

The key question is:

> **Does this change affect how Developers or AI are expected to work?**

คำถามสำคัญคือ:

> **การเปลี่ยนแปลงนี้ส่งผลต่อวิธีที่ Developer หรือ AI ต้องทำงานหรือไม่?**
