# Plugins

# Plugin และเครื่องมือเสริม

## Purpose / วัตถุประสงค์

This directory defines the policy and catalog for plugins and supporting tools that may be used with the AI Development Standard.

Directory นี้ใช้กำหนด Policy และ Catalog สำหรับ Plugin และเครื่องมือเสริมที่สามารถใช้ร่วมกับ AI Development Standard

Plugins provide additional capabilities to support development workflows.

Plugin มีหน้าที่เพิ่มความสามารถให้กับ AI เพื่อสนับสนุนกระบวนการพัฒนา

Plugins are **optional capabilities**, not mandatory dependencies of this Standard.

Plugin เป็น **ความสามารถเสริม** ไม่ใช่ Dependency ที่ทุก Project ต้องติดตั้ง

---

## Plugin Philosophy / หลักการเกี่ยวกับ Plugin

The Standard defines **how we work**.

Standard กำหนดว่า **เราทำงานอย่างไร**

Plugins provide additional capabilities to help execute that work.

Plugin ช่วยเพิ่มความสามารถในการทำงานตาม Standard

```text
AI Development Standard
        │
        ├── Standards
        ├── Workflows
        └── Templates
              │
              ↓
           Plugins
       Supporting Capabilities
```

Plugins must not become the source of truth for Project requirements, architecture, or decisions.

Plugin ต้องไม่กลายเป็น Source of Truth ของ Requirement, Architecture หรือ Decision ของ Project

---

## Plugin Policy / Policy การใช้ Plugin

### 1. Optional by Default / Optional เป็นค่าเริ่มต้น

Plugins are optional unless explicitly standardized as required Developer Tooling.

Plugin เป็น Optional เว้นแต่จะมีการกำหนดอย่างเป็นทางการว่าเป็น Developer Tooling ที่จำเป็น

A Project may use:

* No plugins
* One plugin
* Multiple plugins

Project สามารถใช้:

* ไม่ใช้ Plugin
* ใช้ Plugin เดียว
* ใช้หลาย Plugin

---

### 2. Project-Level Selection / เลือกตาม Project

Plugins should be selected based on the needs of the Project and Task.

ควรเลือก Plugin ตามความต้องการของ Project และ Task

Do not install plugins simply because they are listed in the registry.

ไม่ควรติดตั้ง Plugin เพียงเพราะมีชื่ออยู่ใน Registry

---

### 3. No Tool Lock-in / ไม่ผูกกับ Tool เดียว

The Standard should not depend on a specific plugin when an equivalent workflow can be performed without it.

Standard ไม่ควรผูกกับ Plugin ใด Plugin หนึ่ง หาก Workflow เดียวกันสามารถทำได้โดยไม่ใช้ Plugin นั้น

Equivalent tools may be used when they provide the required capability.

สามารถใช้ Tool อื่นที่มีความสามารถเทียบเท่าได้

---

### 4. Plugins Must Not Override the Standard

Plugins must not override:

* Project requirements
* Project architecture
* Security requirements
* Developer decisions
* AI Development Standard

Plugin ต้องไม่ Override:

* Requirement ของ Project
* Architecture ของ Project
* Security requirements
* Developer decisions
* AI Development Standard

---

### 5. Prefer the Smallest Useful Set / ใช้ Plugin เท่าที่จำเป็น

Use the smallest set of plugins that provides meaningful value.

ควรใช้ Plugin เท่าที่จำเป็นและสร้างประโยชน์อย่างชัดเจน

Avoid installing overlapping plugins without a clear reason.

หลีกเลี่ยงการติดตั้ง Plugin ที่มีความสามารถซ้ำกันโดยไม่มีเหตุผลที่ชัดเจน

---

## Plugin Status / สถานะของ Plugin

Plugins in the registry use the following status:

| Status           | Meaning                                                     |
| ---------------- | ----------------------------------------------------------- |
| **Recommended**  | Recommended for common development workflows                |
| **Optional**     | Useful for specific Projects or Tasks                       |
| **Experimental** | New or insufficiently validated                             |
| **Deprecated**   | Still available but should not be selected for new Projects |
| **Retired**      | No longer recommended or supported                          |

### Recommended

Plugin ที่แนะนำสำหรับ Workflow ทั่วไปและผ่านการพิจารณาว่ามีประโยชน์

### Optional

Plugin ที่มีประโยชน์ในบาง Project หรือบาง Task แต่ไม่จำเป็นสำหรับทุก Project

### Experimental

Plugin ที่ยังอยู่ในช่วงทดลองหรือยังมีข้อมูลไม่เพียงพอสำหรับการแนะนำทั่วไป

### Deprecated

Plugin ที่ยังสามารถใช้งานได้ แต่ไม่ควรเลือกใช้กับ Project ใหม่

### Retired

Plugin ที่ไม่ควรใช้งานอีกต่อไป

---

## Plugin Scope / ขอบเขตการติดตั้ง

A plugin may be installed at different scopes depending on the development environment.

Plugin สามารถติดตั้งใน Scope ที่แตกต่างกันตาม Development Environment

Typical scopes include:

* **Global / User** — Available across Projects
* **Project** — Available only within a specific Project
* **Workspace / Local** — Available only within a specific development environment

The installation scope is an environment decision and is not defined by this Standard.

Scope ของการติดตั้งเป็นการตัดสินใจของ Development Environment และไม่ได้ถูกกำหนดโดย Standard นี้

---

## Plugin Selection Guidelines / แนวทางการเลือก Plugin

Before adopting a plugin, consider:

ก่อนเลือกใช้ Plugin ควรพิจารณา:

1. Does it solve a real problem?

   * แก้ปัญหาที่มีอยู่จริงหรือไม่

2. Does it improve the workflow?

   * ทำให้ Workflow ดีขึ้นหรือไม่

3. Does it introduce unnecessary complexity?

   * เพิ่ม Complexity ที่ไม่จำเป็นหรือไม่

4. Does it overlap with an existing tool?

   * มีความสามารถซ้ำกับ Tool เดิมหรือไม่

5. Is it compatible with the Project?

   * เข้ากับ Project หรือไม่

6. Is it maintained and trustworthy?

   * มีการดูแลและน่าเชื่อถือหรือไม่

7. Can the workflow still be understood without the plugin?

   * หากไม่มี Plugin แล้ว Developer ยังเข้าใจ Workflow ได้หรือไม่

---

## Project Documentation / การบันทึก Plugin ใน Project

When a Project intentionally depends on a plugin, the Project should document the plugin in its own project documentation.

เมื่อ Project ตั้งใจพึ่งพา Plugin ใด Plugin หนึ่ง ควรบันทึก Plugin นั้นไว้ใน Project Documentation ของตัวเอง

The Project should document at least:

* Plugin name
* Purpose
* Why it is used
* Relevant scope
* Important configuration
* Any limitations or dependencies

Project ควรบันทึกอย่างน้อย:

* ชื่อ Plugin
* วัตถุประสงค์
* เหตุผลที่เลือกใช้
* Scope ที่เกี่ยวข้อง
* Configuration ที่สำคัญ
* ข้อจำกัดหรือ Dependency ที่เกี่ยวข้อง

Project-specific plugin usage must not be stored only in this central repository.

การใช้งาน Plugin เฉพาะของ Project ต้องไม่ถูกเก็บไว้เฉพาะใน Central Repository

---

## Security and Trust / Security และความน่าเชื่อถือ

Plugins may affect how AI interacts with the Project and development environment.

Plugin อาจมีผลต่อวิธีที่ AI เข้าถึง Project และ Development Environment

Before using a plugin, consider:

* Permissions
* Data access
* External services
* Code execution capabilities
* Maintenance status
* Trustworthiness
* Security implications

Developer approval is required when a plugin introduces meaningful security or access risks.

หาก Plugin มีผลกระทบด้าน Security หรือ Access อย่างมีนัยสำคัญ ต้องได้รับการพิจารณาและอนุมัติจาก Developer

---

## Registry / Plugin Registry

The available plugin catalog is maintained in:

Plugin Catalog ถูกจัดเก็บไว้ที่:

`plugins/registry.md`

The registry describes:

* Plugin name
* Category
* Status
* Purpose
* Recommended use cases
* Alternatives
* Relevant notes

---

## Core Principle / หลักการสำคัญ

> **Plugins enhance the workflow; they do not define the workflow.**

> **Plugin ช่วยเพิ่มความสามารถให้ Workflow แต่ไม่ได้เป็นผู้กำหนด Workflow**

The Standard must remain understandable, maintainable, and usable even when a specific plugin is unavailable.

Standard ต้องยังคงเข้าใจได้ ดูแลได้ และใช้งานได้ แม้ไม่มี Plugin ใด Plugin หนึ่ง
