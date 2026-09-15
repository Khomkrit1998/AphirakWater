# Git Workflow

# กระบวนการทำงานกับ Git

## Purpose / วัตถุประสงค์

A standard way to take a change into the Project's history, used by every task workflow: `workflows/feature.md`, `workflows/bug-fix.md`, and `workflows/change.md`.

วิธีมาตรฐานในการนำการเปลี่ยนแปลงเข้าสู่ History ของ Project ใช้กับทุก Workflow ของงาน ได้แก่ `workflows/feature.md`, `workflows/bug-fix.md` และ `workflows/change.md`

---

## 1. Modes / โหมด

Each Project chooses one mode:

แต่ละ Project เลือกหนึ่งโหมด:

| Mode / โหมด | Branch | Pull request | Choose when / เลือกเมื่อ |
| --- | --- | --- | --- |
| `branch-pr` (default) | Yes, for every change / ต้อง ทุกการเปลี่ยนแปลง | Yes, for every branch, when the Project has a remote / ต้อง ทุก Branch เมื่อ Project มี Remote | More than one person, CI, production users, or changes that should be reviewed / มีมากกว่าหนึ่งคน มี CI มีผู้ใช้บน Production หรืองานที่ควรมีการ Review |
| `direct-main` | No / ไม่ต้อง | No / ไม่ต้อง | One Developer and no review step: a prototype, a personal tool, a documentation repository / Developer คนเดียวและไม่มีขั้น Review เช่น Prototype เครื่องมือส่วนตัว Repository เอกสาร |

The mode is Project knowledge. It is recorded in the "Git Workflow" table of the Project `CLAUDE.md`, together with the integration branch. When the table is missing, the mode is `branch-pr` and the integration branch is `main`. The Developer changes the mode, outside a task.

โหมดเป็นความรู้ของ Project บันทึกในตาราง "Git Workflow" ใน `CLAUDE.md` ของ Project พร้อม Branch ที่รวมงาน ถ้าไม่มีตาราง โหมดคือ `branch-pr` และ Branch ที่รวมงานคือ `main` Developer เป็นผู้เปลี่ยนโหมด โดยเปลี่ยนนอก Task

* **Integration branch / Branch ที่รวมงาน**: where changes land. `main` unless the table names another, for example `dev` / Branch ที่การเปลี่ยนแปลงเข้าไปรวม คือ `main` เว้นแต่ตารางระบุ Branch อื่น เช่น `dev`
* **Long-lived branches / Branch หลัก**: `main` and the integration branch / `main` และ Branch ที่รวมงาน

Neither mode changes the task workflows, the verify loop, or the rule that AI commits and pushes only when the Developer asks.

ไม่ว่าโหมดใด Workflow ของงาน Verify loop และกฎว่า AI Commit และ Push เมื่อ Developer สั่งเท่านั้น ยังเหมือนเดิม

---

## 2. Mode `branch-pr` / โหมด `branch-pr`

```text
Update integration branch → Branch → Work → Verify → Pull Request → Review → Merge → Delete branch
```

Size does not remove either step. Size and risk only set how deep the review is, per `standards/quality.md` section 5.

ขนาดของงานไม่ได้ทำให้ข้ามขั้นใดได้ ขนาดและความเสี่ยงกำหนดเพียงความลึกของการ Review ตาม `standards/quality.md` หัวข้อ 5

### 2.1 Branches / Branch

* Nobody commits or pushes to a long-lived branch directly / ห้ามใคร Commit หรือ Push เข้า Branch หลักโดยตรง
* **One task, one branch, one pull request.** Do not put two tasks on one branch / **หนึ่ง Task หนึ่ง Branch หนึ่ง Pull Request** ห้ามรวมสอง Task ไว้ใน Branch เดียว
* Start from the latest integration branch. Delete the branch after it is merged / แตก Branch จาก Branch ที่รวมงานล่าสุด และลบ Branch หลัง Merge แล้ว

Name the branch `<prefix>/<short-slug>`, lowercase with hyphens, for example `feat/user-export`. The prefix follows the workflow and the Handoff task type:

ตั้งชื่อ Branch เป็น `<prefix>/<short-slug>` ตัวเล็กคั่นด้วยขีด เช่น `feat/user-export` Prefix เป็นไปตาม Workflow และประเภท Task ใน Handoff:

| Workflow | Handoff type | Branch prefix |
| --- | --- | --- |
| `workflows/feature.md` | `feature` | `feat/` |
| `workflows/bug-fix.md` | `fix` | `fix/` |
| `workflows/change.md` | `refactor`, `chore`, `docs` | `refactor/`, `chore/`, `docs/` |

### 2.2 Pull Requests / Pull Request

Open the pull request into the integration branch when the verify loop decision is PASS, per `workflows/verify-loop.md`. A draft pull request may be opened earlier to share work in progress.

เปิด Pull Request เข้า Branch ที่รวมงาน เมื่อการตัดสินใจของ Verify loop เป็น PASS ตาม `workflows/verify-loop.md` เปิดเป็น Draft ก่อนได้ เพื่อแบ่งปันงานที่ยังไม่เสร็จ

The description is taken from the Handoff; no separate template is needed:

คำอธิบาย Pull Request นำมาจาก Handoff ไม่ต้องมี Template แยก:

* What changed and why / เปลี่ยนอะไรและทำไม
* Workflow and risk level / Workflow และระดับความเสี่ยง
* Verification Commands results and the decision / ผลของ Verification Commands และการตัดสินใจ
* Known issues / ปัญหาที่ทราบ
* The path of the Handoff file, committed in the same branch / Path ของไฟล์ Handoff ที่ Commit อยู่ใน Branch เดียวกัน

### 2.3 Merge / การ Merge

Merge only when all are true:

Merge ได้เมื่อครบทุกข้อ:

* The Verification Commands pass, and CI passes when the Project has it / Verification Commands ผ่าน และ CI ผ่านเมื่อ Project มี CI
* The branch is up to date with the integration branch, and verification was re-run after resolving any conflict / Branch ตามทัน Branch ที่รวมงาน และรันการตรวจซ้ำหลังแก้ Conflict
* The pull request was reviewed: by the Developer, and by someone other than the author when the team has more than one person / Pull Request ผ่านการ Review: โดย Developer และโดยคนที่ไม่ใช่ผู้เขียนเมื่อทีมมีมากกว่าหนึ่งคน
* For high risk, the Developer's approval is recorded, per `workflows/verify-loop.md` section 1 / สำหรับความเสี่ยงสูง มีการบันทึกการอนุมัติของ Developer ตาม `workflows/verify-loop.md` หัวข้อ 1

The Developer merges. AI does not.

Developer เป็นผู้ Merge ไม่ใช่ AI

---

## 3. Mode `direct-main` / โหมด `direct-main`

```text
Update integration branch → Work → Verify → Commit → Push
```

* Commit on the integration branch / Commit บน Branch ที่รวมงาน
* Commit only after the verify loop decision is PASS. With no review step, the gate before the commit is the only check / Commit หลังการตัดสินใจของ Verify loop เป็น PASS เท่านั้น เมื่อไม่มีขั้น Review เกณฑ์ก่อน Commit คือการตรวจเพียงอย่างเดียว
* One task per commit, or per short series of commits. Do not mix two tasks in one commit / หนึ่ง Task ต่อหนึ่ง Commit หรือ Commit ชุดสั้น ๆ ห้ามรวมสอง Task ใน Commit เดียว
* Pull before pushing. Never force-push the integration branch / Pull ก่อน Push ห้าม Force-push Branch ที่รวมงาน
* A single high-risk task may still use a branch and a pull request, per section 2. The Developer decides / Task ความเสี่ยงสูงงานเดียวยังใช้ Branch และ Pull Request ตามหัวข้อ 2 ได้ Developer เป็นผู้ตัดสินใจ

---

## 4. Exceptions / ข้อยกเว้น

| Case / กรณี | Rule / กฎ |
| --- | --- |
| `branch-pr` with no remote / `branch-pr` แต่ไม่มี Remote | Still use a branch. The Developer reviews the diff and merges locally / ยังต้องใช้ Branch Developer Review Diff แล้ว Merge ในเครื่อง |
| Emergency in `branch-pr`, for example production is down / เหตุฉุกเฉินในโหมด `branch-pr` เช่น Production ล่ม | Still use a branch and a pull request. The Developer may merge before review finishes and reviews right after. Record human intervention `emergency` in the Handoff / ยังต้องใช้ Branch และ Pull Request Developer Merge ก่อน Review เสร็จได้ แล้ว Review ทันทีหลังจากนั้น บันทึก Human intervention เป็น `emergency` ใน Handoff |
| The Project uses another branching model / Project ใช้รูปแบบ Branch อื่น | The Project's documented rule wins, per the Source of Truth and Exceptions in `standards/development.md` / กฎที่ Project บันทึกไว้มีผลเหนือกว่า ตาม Source of Truth และ Exceptions ใน `standards/development.md` |

---

## 5. AI Behavior / พฤติกรรมของ AI

### AI SHOULD / AI ควร

* Read the mode from the Project `CLAUDE.md` before the first edit of a task / อ่านโหมดจาก `CLAUDE.md` ของ Project ก่อนแก้ไฟล์แรกของ Task
* In `branch-pr`, when on a long-lived branch, create the work branch locally, named per section 2.1 / ในโหมด `branch-pr` ถ้าอยู่บน Branch หลัก ให้สร้าง Branch งานในเครื่อง ตั้งชื่อตามหัวข้อ 2.1
* In `branch-pr`, draft the pull request description from the Handoff / ในโหมด `branch-pr` ร่างคำอธิบาย Pull Request จาก Handoff

### AI MUST NOT / AI ห้าม

* Commit, push, or open a pull request unless the Developer asks, per `workflows/verify-loop.md` section 10 / Commit, Push หรือเปิด Pull Request เว้นแต่ Developer สั่ง ตาม `workflows/verify-loop.md` หัวข้อ 10
* Change the mode, or use the other mode for a task, without the Developer / เปลี่ยนโหมด หรือใช้อีกโหมดกับ Task โดยไม่ผ่าน Developer
* In `branch-pr`: commit or push to a long-lived branch, or merge a pull request / ในโหมด `branch-pr`: Commit หรือ Push เข้า Branch หลัก หรือ Merge Pull Request
* In `direct-main`: commit before the verify loop decision is PASS / ในโหมด `direct-main`: Commit ก่อนการตัดสินใจของ Verify loop เป็น PASS
* Force-push, or rewrite history that was already pushed, unless the Developer asks / Force-push หรือแก้ History ที่ Push ไปแล้ว เว้นแต่ Developer สั่ง
* Bypass hooks or branch protection / ข้าม Hook หรือ Branch protection
* Mix two tasks in one branch or one commit / รวมสอง Task ใน Branch เดียวหรือ Commit เดียว

---

## Completion Criteria / เงื่อนไขการจบ Workflow

`branch-pr`:

* [ ] The work is on its own branch, named per section 2.1 / งานอยู่บน Branch ของตัวเอง ตั้งชื่อตามหัวข้อ 2.1
* [ ] A pull request is open with its description from the Handoff, or the Project has no remote / เปิด Pull Request พร้อมคำอธิบายจาก Handoff แล้ว หรือ Project ไม่มี Remote
* [ ] Merge conditions in section 2.3 are met before merging / ครบเงื่อนไข Merge ในหัวข้อ 2.3 ก่อน Merge
* [ ] The branch is deleted after merge / ลบ Branch หลัง Merge แล้ว

`direct-main`:

* [ ] The verify loop decision was PASS before the commit / การตัดสินใจของ Verify loop เป็น PASS ก่อน Commit
* [ ] The commits hold this task only / Commit มีเฉพาะ Task นี้
* [ ] Nothing was force-pushed / ไม่มีการ Force-push

---

## Core Principle / หลักการสำคัญ

**The Project picks the mode once. Every change follows it: reviewed through a pull request, or gated by verification before it reaches main.**

**Project เลือกโหมดครั้งเดียว ทุกการเปลี่ยนแปลงทำตามโหมดนั้น: ผ่านการ Review ด้วย Pull Request หรือผ่านเกณฑ์ตรวจสอบก่อนเข้า main**
