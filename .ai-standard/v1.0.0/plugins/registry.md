# Plugin Registry

# รายการ Plugin

## Purpose / วัตถุประสงค์

This registry lists plugins that may provide useful capabilities for AI-assisted software development.

Registry นี้รวบรวม Plugin ที่อาจช่วยเพิ่มความสามารถในการพัฒนาซอฟต์แวร์ร่วมกับ AI

The registry is a reference, not a requirement.

Registry นี้เป็นข้อมูลอ้างอิง ไม่ใช่ข้อบังคับ

A Project does not need to install every plugin listed here.

Project ไม่จำเป็นต้องติดตั้ง Plugin ทุกตัวในรายการ

---

## Status Legend / ความหมายของ Status

| Status           | Meaning                          |
| ---------------- | -------------------------------- |
| **Recommended**  | Recommended for common workflows |
| **Optional**     | Useful for specific needs        |
| **Experimental** | Under evaluation                 |
| **Deprecated**   | Avoid for new Projects           |
| **Retired**      | No longer recommended            |

---

# UI / UX

## frontend-design

| Field            | Value                                                 |
| ---------------- | ----------------------------------------------------- |
| **Category**     | UI / UX                                               |
| **Status**       | Recommended                                           |
| **Purpose**      | Assist with frontend and UI implementation            |
| **Use when**     | Building or improving frontend interfaces             |
| **Alternatives** | Existing project design system, manual implementation |

### Recommended Use / แนะนำให้ใช้เมื่อ

* Building new UI
* Implementing frontend features
* Improving visual quality
* Working with established design requirements

### Notes / หมายเหตุ

Use according to the Project's existing design system and UI conventions.

ต้องใช้ร่วมกับ Design System และ UI Convention ของ Project

The plugin does not override Project requirements or design decisions.

Plugin ไม่สามารถ Override Requirement หรือ Design Decision ของ Project

Source: Anthropic, official marketplace. Install with `/plugin install frontend-design@claude-plugins-official`.

ที่มา: Anthropic marketplace ทางการ ติดตั้งด้วย `/plugin install frontend-design@claude-plugins-official`

---

## ui-ux-pro-max

| Field            | Value                                                    |
| ---------------- | -------------------------------------------------------- |
| **Category**     | UI / UX                                                  |
| **Status**       | Optional                                                 |
| **Purpose**      | Support UI/UX design and frontend design decisions       |
| **Use when**     | Projects require additional UI/UX guidance               |
| **Alternatives** | frontend-design, Project design system, manual UX review |

### Recommended Use / แนะนำให้ใช้เมื่อ

* Exploring UI/UX directions
* Improving interface consistency
* Generating design guidance
* Projects requiring stronger UI/UX assistance

### Notes / หมายเหตุ

Use only when the additional capability provides meaningful value.

ควรใช้เมื่อความสามารถเพิ่มเติมมีประโยชน์ต่อ Project อย่างชัดเจน

Avoid using multiple overlapping UI/UX plugins without a clear reason.

หลีกเลี่ยงการใช้ UI/UX Plugin หลายตัวที่มีความสามารถซ้ำกันโดยไม่มีเหตุผลที่ชัดเจน

Source: `nextlevelbuilder/ui-ux-pro-max-skill`. Install with `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` then `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill`.

ที่มา: `nextlevelbuilder/ui-ux-pro-max-skill` ติดตั้งด้วย `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` แล้ว `/plugin install ui-ux-pro-max@ui-ux-pro-max-skill`

---

# Development

## ponytail

| Field            | Value                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------- |
| **Category**     | Development Workflow                                                                     |
| **Status**       | Recommended                                                                              |
| **Purpose**      | Constrain the AI to the smallest working solution                                        |
| **Use when**     | Any implementation work where over-engineering is a risk                                 |
| **Alternatives** | Standard principle "Prefer the smallest correct solution" applied manually, code review  |

### Recommended Use / แนะนำให้ใช้เมื่อ

* Implementing features or fixes
* Reducing unnecessary dependencies, wrappers, and abstractions
* Keeping generated code short and reviewable

### Notes / หมายเหตุ

Source: `DietrichGebert/ponytail`. Install with `/plugin marketplace add DietrichGebert/ponytail` then `/plugin install ponytail@ponytail`. Intensity levels: `lite`, `full` (default), `ultra`.

ที่มา: `DietrichGebert/ponytail` ติดตั้งด้วย `/plugin marketplace add DietrichGebert/ponytail` แล้ว `/plugin install ponytail@ponytail` มีระดับความเข้ม `lite`, `full` (ค่าเริ่มต้น), `ultra`

The plugin reinforces the Standard's principle of the smallest correct solution. It does not override Project requirements. "Smallest" must never drop requested behavior or verification.

Plugin นี้เสริมหลัก "เลือกวิธีแก้ที่ถูกต้องและเล็กที่สุด" ของ Standard ไม่สามารถ Override Requirement ของ Project และ "เล็กที่สุด" ต้องไม่ตัดพฤติกรรมที่ร้องขอหรือการตรวจสอบออก

---

## superpowers

| Field            | Value                                                          |
| ---------------- | -------------------------------------------------------------- |
| **Category**     | Development Workflow                                           |
| **Status**       | Optional                                                       |
| **Purpose**      | Support structured software development workflows              |
| **Use when**     | Projects benefit from additional development workflow guidance |
| **Alternatives** | AI Development Standard workflows, manual development process  |

### Recommended Use / แนะนำให้ใช้เมื่อ

* Projects require more structured development assistance
* Complex implementation workflows
* Tasks benefit from additional development guidance

### Notes / หมายเหตุ

The plugin is supplementary to the AI Development Standard.

Plugin นี้เป็นเครื่องมือเสริมของ AI Development Standard

It must not replace the Standard's core development principles or Project-specific workflow.

ไม่ควรใช้แทน Development Principles หรือ Workflow เฉพาะของ Project

Source: `obra/superpowers`, available in the official marketplace. Install with `/plugin install superpowers@claude-plugins-official`.

ที่มา: `obra/superpowers` มีใน marketplace ทางการ ติดตั้งด้วย `/plugin install superpowers@claude-plugins-official`

---

# Registry Maintenance / การดูแล Registry

When adding a plugin:

เมื่อเพิ่ม Plugin ใหม่:

1. Define its category.

   * ระบุ Category

2. Assign an appropriate status.

   * กำหนด Status

3. Describe its purpose.

   * อธิบาย Purpose

4. Define recommended use cases.

   * ระบุ Use Cases

5. Identify reasonable alternatives.

   * ระบุ Alternatives ที่เหมาะสม

6. Consider compatibility and maintenance.

   * พิจารณา Compatibility และ Maintenance

7. Avoid adding plugins without a clear reason.

   * หลีกเลี่ยงการเพิ่ม Plugin โดยไม่มีเหตุผลที่ชัดเจน

8. Record the install commands in Notes, and add the plugin to `skills/project-init/plugins.txt` so the installers and `/project-init` can install it.

   * บันทึกคำสั่งติดตั้งใน Notes และเพิ่มลงใน `skills/project-init/plugins.txt` เพื่อให้ installer และ `/project-init` ติดตั้งได้

---

## Plugin Evaluation / การประเมิน Plugin

A plugin should be evaluated based on:

Plugin ควรได้รับการประเมินจาก:

* Usefulness / ประโยชน์
* Reliability / ความน่าเชื่อถือ
* Compatibility / ความเข้ากันได้
* Maintenance / การดูแลรักษา
* Security / Security
* Workflow impact / ผลกระทบต่อ Workflow
* Complexity / Complexity ที่เพิ่มขึ้น
* Availability of alternatives / ทางเลือกอื่น

---

## Versioning / การจัดการ Version

Changes to this registry follow the versioning rules defined in:

การเปลี่ยนแปลง Registry นี้ต้องปฏิบัติตามกฎ Versioning ที่กำหนดไว้ใน:

`standards/versioning.md`

Adding or removing a plugin from this registry may affect the Standard version depending on the impact of the change.

การเพิ่มหรือลบ Plugin ออกจาก Registry อาจส่งผลต่อ Version ของ Standard ตามระดับผลกระทบของการเปลี่ยนแปลง

Do not change the Standard version based only on the number of plugins changed.

อย่ากำหนด Version จากจำนวน Plugin ที่เปลี่ยนแปลงเพียงอย่างเดียว

Versioning is determined by impact.

การกำหนด Version ให้พิจารณาจากผลกระทบของการเปลี่ยนแปลง
