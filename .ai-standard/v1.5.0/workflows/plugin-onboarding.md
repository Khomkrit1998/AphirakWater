# Plugin Onboarding Workflow

# กระบวนการตรวจสอบและเลือก Plugin

## Purpose / วัตถุประสงค์

This workflow defines how a Project discovers, reviews, and selects plugins when adopting the AI Development Standard.

Workflow นี้กำหนดวิธีที่ Project ตรวจสอบ Review และเลือก Plugin เมื่อนำ AI Development Standard มาใช้งาน

Plugins are optional capabilities. The Developer remains responsible for selecting and installing plugins.

Plugin เป็นความสามารถเสริม โดย Developer ยังคงเป็นผู้รับผิดชอบในการเลือกและติดตั้ง Plugin

---

## 1. Load Plugin Policy / อ่าน Plugin Policy

Read:

```text
plugins/README.md
plugins/registry.md
```

อ่าน Policy และ Registry ก่อนตรวจสอบ Plugin

The registry defines the plugins known to the Standard and their recommended status.

Registry เป็นรายการ Plugin ที่ Standard รู้จักและสถานะคำแนะนำของแต่ละ Plugin

---

## 2. Detect Available Plugins / ตรวจสอบ Plugin ที่มีอยู่

Inspect the current development environment to identify available or installed plugins.

ตรวจสอบ Development Environment ปัจจุบันเพื่อค้นหา Plugin ที่มีหรือถูกติดตั้งอยู่

The AI should identify:

- Plugin name
- Availability / installation status
- Relevant scope when available
- Whether the plugin exists in the Standard registry

AI ควรตรวจสอบ:

- ชื่อ Plugin
- สถานะว่ามีหรือติดตั้งอยู่หรือไม่
- Scope ที่เกี่ยวข้อง หากสามารถตรวจสอบได้
- Plugin นั้นมีอยู่ใน Standard Registry หรือไม่

Do not assume a plugin is installed without checking.

ห้ามสมมติว่า Plugin ถูกติดตั้งแล้วโดยไม่ตรวจสอบ

---

## 3. Compare with Standard Registry / เปรียบเทียบกับ Registry

Compare detected plugins with:

```text
plugins/registry.md
```

Classify plugins as:

### Standard Plugin

Plugin ที่มีอยู่ใน Standard Registry

### Available but Unregistered

Plugin ที่มีอยู่ใน Environment แต่ไม่มีใน Registry

### Recommended but Missing

Plugin ที่ Standard แนะนำ แต่ยังไม่พบใน Environment

---

## 4. Report Detected Plugins / รายงาน Plugin ที่พบ

Before starting meaningful development work, report the detected plugin status to the Developer.

ก่อนเริ่มงานพัฒนาที่มีสาระสำคัญ ให้รายงานสถานะ Plugin ที่ตรวจพบให้ Developer ทราบ

Example:

```text
Plugin Status

Standard Plugin (available, in registry):
- frontend-design
- ui-ux-pro-max

Recommended but Missing:
- (none)

Available but Unregistered:
- example-plugin
```

The AI should not claim that a plugin is unavailable unless the environment was actually checked.

AI ห้ามระบุว่า Plugin ไม่มี หากยังไม่ได้ตรวจสอบ Environment จริง

---

## 5. Recommend Default Plugins / แนะนำ Default Plugin

The default recommended plugins are the plugins marked **Recommended** in `plugins/registry.md`.

Default Plugin คือ Plugin ที่มี Status เป็น **Recommended** ใน `plugins/registry.md`

Do not maintain a separate default list in this workflow. The registry is the single source of truth.

ไม่ต้องเก็บรายการ Default แยกไว้ใน Workflow นี้ ให้ใช้ Registry เป็นแหล่งข้อมูลเดียว

For Standard version `v1.5.0`, the registry resolves to:

```text
Recommended (default):
- ponytail
- frontend-design

Optional (suggest only when relevant to the Project):
- ui-ux-pro-max
- superpowers
```

These are recommendations, not mandatory dependencies.

Plugin เหล่านี้เป็นคำแนะนำเริ่มต้น ไม่ใช่ Dependency ที่ทุก Project ต้องมี

The AI should explain which recommended plugins are:

- Already available
- Missing
- Relevant to the current Project
- Optional for the current Project

---

## 6. Ask Developer for Selection / สอบถาม Developer

The AI should ask the Developer which available or recommended plugins should be used for the Project.

AI ควรถาม Developer ว่าต้องการใช้ Plugin ใดกับ Project

The AI should present a concise summary instead of asking the Developer to manually inspect the environment.

AI ควรสรุปข้อมูลให้ Developer ตัดสินใจได้ง่าย โดยไม่ให้ Developer ต้องตรวจสอบ Environment เองทั้งหมด

Example:

```text
Recommended plugins for this Project:

✓ ponytail — available (Recommended)
✓ frontend-design — available (Recommended)
○ ui-ux-pro-max — available (Optional)
✗ superpowers — not detected (Optional)

Which available plugins should this Project use?
```

The Developer may:

- Accept the recommendations
- Select specific plugins
- Use additional plugins
- Use no plugins
- Request installation. AI installs only after this explicit approval, using the install commands recorded in the registry

---

## 7. Developer Approval / Developer เป็นผู้อนุมัติ

The Developer decides which plugins are used by the Project.

Developer เป็นผู้ตัดสินใจขั้นสุดท้ายว่า Project จะใช้ Plugin ใด

AI MUST NOT:

- Automatically install plugins
- Enable plugins without approval
- Treat recommended plugins as mandatory
- Replace Developer decisions

AI ห้าม:

- ติดตั้ง Plugin เองโดยอัตโนมัติ
- เปิดใช้งาน Plugin โดยไม่ได้รับอนุมัติ
- ถือว่า Recommended Plugin เป็น Plugin ที่บังคับ
- ตัดสินใจแทน Developer

With the Developer's explicit approval, AI may run the install commands recorded in `plugins/registry.md` and report the result.

เมื่อ Developer อนุมัติอย่างชัดเจน AI สามารถรันคำสั่งติดตั้งที่บันทึกไว้ใน `plugins/registry.md` และรายงานผลได้

---

## 8. Record Project Plugin Selection / บันทึก Plugin ของ Project

Selected plugins should be recorded in the Project's own documentation.

Plugin ที่เลือกใช้ควรถูกบันทึกไว้ใน Project Documentation

Project documentation should contain at least:

```text
Plugin
Purpose
Reason for selection
Scope
Important configuration
```

Project-specific plugin selection must not be stored only in the Central Standard.

ข้อมูลการเลือก Plugin ของ Project ต้องไม่ถูกเก็บไว้เฉพาะใน Central Standard

---

## 9. Continue Development / ดำเนินการพัฒนาต่อ

After plugin selection is complete, continue with the appropriate development workflow.

หลังจากเลือก Plugin เสร็จแล้ว ให้เข้าสู่ Development Workflow ที่เหมาะสม

For Feature work:

```text
Plugin Onboarding
        ↓
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

---

## Core Principle / หลักการสำคัญ

> **Detect first. Recommend second. Ask the Developer. Then use.**

> **ตรวจสอบก่อน → แนะนำ → ให้ Developer เลือก → จึงนำไปใช้**

Plugins enhance the development workflow but do not define Project requirements or Developer decisions.

Plugin ช่วยเพิ่มความสามารถให้ Workflow แต่ไม่ใช่ผู้กำหนด Requirement หรือ Decision ของ Project