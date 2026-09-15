# Quality Standard

# มาตรฐานด้านคุณภาพ

## 1. Purpose / วัตถุประสงค์

This document defines the minimum bar for when work is done. It applies to every Project and every technology.

เอกสารนี้กำหนดมาตรฐานขั้นต่ำว่าเมื่อใดงานจึงถือว่าเสร็จ ใช้ได้กับทุก Project และไม่ผูกกับ Technology

Quality answers one question:

Quality ตอบคำถามเดียว:

> **Is it built correctly?**
>
> **สร้างถูกต้องหรือไม่?**

Whether it is the right thing is answered by `standards/evaluation.md`. How the automated checks run, retry, and stop is defined in `workflows/verify-loop.md`. This standard decides which checks are relevant; it adds no step to that loop.

คำถามว่าสร้างสิ่งที่ถูกต้องหรือไม่ ตอบโดย `standards/evaluation.md` วิธีรัน รันซ้ำ และหยุดการตรวจอัตโนมัติ กำหนดใน `workflows/verify-loop.md` Standard นี้กำหนดว่าการตรวจใดเกี่ยวข้อง และไม่เพิ่มขั้นตอนให้ Loop นั้น

---

## 2. Definition of Done / เงื่อนไขว่างานเสร็จ

> **Work is considered complete when the implementation satisfies the requirements and passes the quality checks relevant to its scope and risk.**
>
> **งานถือว่าเสร็จเมื่อ Implementation ตอบ Requirement และผ่านการตรวจคุณภาพที่เกี่ยวข้องกับขอบเขตและความเสี่ยงของงาน**

What must be reported at completion is listed in the Completion Criteria of `standards/development.md` and recorded in the Handoff.

สิ่งที่ต้องรายงานเมื่องานเสร็จอยู่ใน Completion Criteria ของ `standards/development.md` และบันทึกใน Handoff

---

## 3. Principles / หลักการ

1. **Quality is proportional to risk.** / คุณภาพที่ต้องการเป็นสัดส่วนกับความเสี่ยง
2. **Small changes may require lightweight validation.** / งานเล็กตรวจแบบเบาได้
3. **High-risk changes require stronger validation.** / งานความเสี่ยงสูงต้องตรวจเข้มขึ้น
4. **AI-generated code must be validated before completion.** / Code ที่ AI สร้างต้องผ่านการตรวจก่อนถือว่าเสร็จ
5. **Respect existing project tests and quality standards.** / เคารพ Test และมาตรฐานคุณภาพที่ Project มีอยู่
6. **Fix relevant issues before marking work complete.** / แก้ปัญหาที่เกี่ยวข้องก่อนระบุว่างานเสร็จ
7. **Do not over-test trivial changes.** / อย่าทดสอบเกินจำเป็นกับงานเล็กน้อย
8. **Do not skip validation for high-risk changes.** / ห้ามข้ามการตรวจสำหรับงานความเสี่ยงสูง

---

## 4. Quality Checks / การตรวจคุณภาพ

Pick the checks the change can affect. Not every check applies to every task.

เลือกการตรวจที่การเปลี่ยนแปลงอาจส่งผล ไม่ต้องตรวจทุกหัวข้อในทุก Task

| Check / การตรวจ | Ask / คำถาม | Relevant when / เกี่ยวข้องเมื่อ |
| --- | --- | --- |
| Functional correctness | Does it do what was requested, including edge and error cases? / ทำงานตามที่ขอ รวมถึงกรณีขอบและกรณีผิดพลาดหรือไม่ | Any behavior change / เปลี่ยนพฤติกรรมใด ๆ |
| Code quality | Does it follow the Project's patterns, with no dead code, duplication, or needless complexity? / ใช้ Pattern ของ Project ไม่มี Code ที่ไม่ใช้ ซ้ำ หรือซับซ้อนเกินจำเป็นหรือไม่ | Any code change / แก้ Code ใด ๆ |
| Error handling | Are failures handled or surfaced, never silently swallowed? / Failure ถูกจัดการหรือแจ้งออกมา ไม่ถูกกลืนเงียบหรือไม่ | Input, I/O, external calls, new failure paths / Input, I/O, การเรียกระบบภายนอก, เส้นทาง Failure ใหม่ |
| Security | Is input validated at trust boundaries, access checked, secrets and personal data protected? / ตรวจ Input ที่ขอบเขตความเชื่อถือ ตรวจสิทธิ์ ปกป้อง Secret และข้อมูลส่วนบุคคลหรือไม่ | Authentication, authorization, user input, data exposure, dependencies / Authentication, Authorization, Input จากผู้ใช้, การเปิดเผยข้อมูล, Dependency |
| Testing | Is the changed behavior covered by a test the Project can run? A bug fix has a test that fails without the fix, where the Project has tests / พฤติกรรมที่เปลี่ยนมี Test ที่ Project รันได้หรือไม่ การแก้ Bug มี Test ที่ไม่ผ่านถ้าไม่มีการแก้ เมื่อ Project มี Test | Behavior change or bug fix / เปลี่ยนพฤติกรรมหรือแก้ Bug |
| UX/UI | Do the relevant states work: loading, empty, error, success, responsive? / สถานะที่เกี่ยวข้องทำงานหรือไม่: Loading, Empty, Error, Success, Responsive | User-visible change / เปลี่ยนสิ่งที่ผู้ใช้เห็น |
| Accessibility | Is it usable by keyboard, labeled for assistive technology, readable in contrast? / ใช้ด้วย Keyboard ได้ มี Label สำหรับเทคโนโลยีช่วยเหลือ และ Contrast อ่านได้หรือไม่ | User-visible UI / UI ที่ผู้ใช้เห็น |
| Performance | Does it avoid obvious waste: repeated queries, unbounded loops or payloads? Does it meet any stated limit? / หลีกเลี่ยงความสิ้นเปลืองที่เห็นชัด เช่น Query ซ้ำ Loop หรือ Payload ไม่จำกัด และอยู่ในขีดจำกัดที่ระบุหรือไม่ | Hot paths, large data, a stated limit / เส้นทางที่ถูกเรียกบ่อย ข้อมูลขนาดใหญ่ มีขีดจำกัดระบุไว้ |
| Regression impact | Does existing behavior still work where the change touches shared code, contracts, data, or configuration? / พฤติกรรมเดิมยังทำงานหรือไม่ เมื่อแตะ Code ที่ใช้ร่วม สัญญา ข้อมูล หรือ Configuration | Shared code, contracts, data, configuration / Code ที่ใช้ร่วม สัญญา ข้อมูล Configuration |

Feature-level checklists that apply these checks are in `workflows/feature.md` step 5.

รายการตรวจระดับ Feature ที่นำหัวข้อเหล่านี้ไปใช้ อยู่ใน `workflows/feature.md` ขั้นที่ 5

---

## 5. Depth by Risk / ความลึกตามความเสี่ยง

Risk is set in the first step of each workflow, as defined in `workflows/feature.md` step 1. The verification each risk level requires, and when Developer approval is needed, is the table in `workflows/verify-loop.md` section 1. Within that:

ความเสี่ยงกำหนดในขั้นแรกของแต่ละ Workflow ตามนิยามใน `workflows/feature.md` ขั้นที่ 1 การตรวจที่แต่ละระดับต้องทำ และเมื่อใดต้องให้ Developer อนุมัติ อยู่ในตารางของ `workflows/verify-loop.md` หัวข้อ 1 ภายใต้ตารางนั้น:

* **Trivial** (typo, comment, documentation): only the commands the change can affect. No new tests / **เล็กน้อย** (คำผิด Comment เอกสาร): รันเฉพาะคำสั่งที่อาจได้รับผลกระทบ ไม่ต้องเพิ่ม Test
* **Low**: the Verification Commands and the checks in section 4 the change directly touches / **Low**: Verification Commands และการตรวจในหัวข้อ 4 ที่การเปลี่ยนแปลงแตะโดยตรง
* **Medium**: add the acceptance criteria and every relevant check in section 4 / **Medium**: เพิ่ม Acceptance criteria และทุกการตรวจในหัวข้อ 4 ที่เกี่ยวข้อง
* **High**: every relevant check with recorded evidence, manual checks where automation cannot reach, and Developer approval / **High**: ทุกการตรวจที่เกี่ยวข้องพร้อมหลักฐานที่บันทึก ตรวจด้วยมือในส่วนที่อัตโนมัติไปไม่ถึง และให้ Developer อนุมัติ

Security and data-loss checks are never skipped when relevant, whatever the risk level. When in doubt, choose the higher level.

การตรวจ Security และการสูญหายของข้อมูล ห้ามข้ามเมื่อเกี่ยวข้อง ไม่ว่าความเสี่ยงระดับใด ถ้าไม่แน่ใจให้เลือกระดับที่สูงกว่า

---

## 6. Validating AI-Generated Code / การตรวจ Code ที่ AI สร้าง

AI-generated code is checked like any other code, and also for failures typical of generated code:

Code ที่ AI สร้างตรวจเหมือน Code อื่น และตรวจเพิ่มสำหรับปัญหาที่พบบ่อยใน Code ที่ถูกสร้างขึ้น:

* APIs, imports, options, or files that do not exist / API, Import, Option หรือไฟล์ที่ไม่มีอยู่จริง
* A new helper that duplicates one the Project already has / Helper ใหม่ที่ซ้ำกับของที่ Project มีอยู่แล้ว
* Errors caught and ignored / Error ที่ถูกจับแล้วเพิกเฉย
* Tests that assert nothing, or mock the code under test / Test ที่ไม่ได้ตรวจอะไร หรือ Mock ส่วนที่กำลังทดสอบ
* Code that is plausible but was never run / Code ที่ดูสมเหตุสมผลแต่ไม่เคยถูกรัน

Plausible is not verified. A command result is evidence; a description of the code is not.

ดูสมเหตุสมผลไม่ได้แปลว่าตรวจแล้ว ผลของคำสั่งคือหลักฐาน คำอธิบาย Code ไม่ใช่หลักฐาน

---

## 7. Project Quality Standards / มาตรฐานคุณภาพของ Project

The Project's Verification Commands, test suites, linters, and conventions are the Project's quality gate. This standard does not replace them. A stricter Project rule wins, per the Source of Truth in `standards/development.md`.

Verification Commands, Test suite, Linter และ Convention ของ Project คือเกณฑ์คุณภาพของ Project Standard นี้ไม่ได้มาแทน กฎของ Project ที่เข้มกว่ามีผลเหนือกว่า ตาม Source of Truth ใน `standards/development.md`

A gate is never weakened to pass, per `workflows/verify-loop.md` section 5.

ห้ามลดเกณฑ์เพื่อให้ผ่าน ตาม `workflows/verify-loop.md` หัวข้อ 5

---

## 8. Issues Found / ปัญหาที่พบ

| Issue / ปัญหา | Action / สิ่งที่ทำ |
| --- | --- |
| Caused by or inside the change / เกิดจากหรืออยู่ในการเปลี่ยนแปลง | Fix before completion / แก้ก่อนปิดงาน |
| Pre-existing and unrelated / มีอยู่ก่อนและไม่เกี่ยวข้อง | Report under Known Issues in the Handoff; do not fix unasked, per `standards/development.md` principle 6 / รายงานใน Known Issues ของ Handoff ไม่แก้เองถ้าไม่ได้สั่ง ตาม `standards/development.md` หลักการที่ 6 |
| Cannot be fixed within the task / แก้ไม่ได้ภายใน Task | Report with evidence; the decision is HUMAN or STOP, per `workflows/verify-loop.md` / รายงานพร้อมหลักฐาน การตัดสินใจคือ HUMAN หรือ STOP ตาม `workflows/verify-loop.md` |

Quality evidence goes in the Handoff's Verification section and Evidence block. No other record is needed.

หลักฐานด้านคุณภาพบันทึกในหัวข้อ Verification และ Evidence block ของ Handoff ไม่ต้องมีบันทึกอื่น

---

## Core Principle / หลักการสำคัญ

> **Check what the change can break, as deeply as its risk requires, and report evidence.**

> **ตรวจสิ่งที่การเปลี่ยนแปลงอาจทำให้เสีย ลึกเท่าที่ความเสี่ยงต้องการ และรายงานด้วยหลักฐาน**
