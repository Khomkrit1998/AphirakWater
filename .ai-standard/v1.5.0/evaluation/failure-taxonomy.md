# Failure Taxonomy

# การจำแนก Failure

## Purpose / วัตถุประสงค์

A failure category answers four questions: what failed, where in the loop, why, and what change would prevent it. The category is recorded once per task in the Evidence block (`failure.category`) and counted in `workflows/evaluate.md`.

หมวดของ Failure ตอบสี่คำถาม: อะไรล้มเหลว ล้มเหลวที่ขั้นไหนของ Loop เพราะอะไร และการเปลี่ยนแปลงแบบใดจะป้องกันได้ บันทึกครั้งเดียวต่อ Task ใน Evidence block (`failure.category`) และนับใน `workflows/evaluate.md`

Prefer the category that leads to an actionable change over the one that sounds most precise.

เลือกหมวดที่นำไปสู่การเปลี่ยนแปลงที่ทำได้จริง มากกว่าหมวดที่ฟังดูแม่นยำที่สุด

---

## Categories / หมวด

| Slug | What failed, where / อะไร ที่ไหน | Signals / สัญญาณ | Improvement to consider / การปรับปรุงที่ควรพิจารณา |
| --- | --- | --- | --- |
| `none` | Nothing failed: PASS on the first attempt without intervention / ไม่มีอะไรล้มเหลว: PASS ในรอบแรกโดยไม่มีการแทรกแซง | Every command passes on attempt 1 / ทุกคำสั่งผ่านในรอบแรก | Nothing / ไม่ต้องเปลี่ยน |
| `requirement` | The task was understood wrongly or was unclear, in Understand / เข้าใจ Task ผิดหรือ Task ไม่ชัด ในขั้น Understand | HUMAN for an unclear requirement; rework after review; acceptance criteria missing / HUMAN เพราะ Requirement ไม่ชัด ทำใหม่หลัง Review ไม่มี Acceptance criteria | Write acceptance criteria before Act; ask earlier; document in `docs/requirements/` / เขียน Acceptance criteria ก่อนลงมือ ถามให้เร็วขึ้น บันทึกใน `docs/requirements/` |
| `planning` | The approach was wrong, in Plan / แนวทางผิด ในขั้น Plan | Attempts change direction; large diffs; the plan was not reviewed for a medium or high risk task / รอบต่อรอบเปลี่ยนทิศ Diff ใหญ่ ไม่ได้ Review Plan ในงานความเสี่ยงกลางหรือสูง | Review the plan before Act for medium and high risk; smaller steps / Review Plan ก่อนลงมือสำหรับความเสี่ยงกลางและสูง แบ่งขั้นให้เล็กลง |
| `implementation` | A defect in the change itself, in Act / ข้อบกพร่องในงานที่ทำ ในขั้น Act | typecheck or test fails and is fixed within the cap / typecheck หรือ Test ไม่ผ่านและแก้ได้ภายในจำนวนรอบ | Follow existing patterns; smaller changes; better error messages from the gate / ทำตาม Pattern เดิม เปลี่ยนให้เล็กลง ข้อความ Error ของเกณฑ์ที่ดีขึ้น |
| `verification` | The gate was missing, wrong, or weak, in Verify / เกณฑ์ขาด ผิด หรืออ่อน ในขั้น Verify | Passed the gate but a defect was found later; a flaky test; `none` in the table where a command should exist / ผ่านเกณฑ์แต่พบข้อบกพร่องภายหลัง Test ไม่นิ่ง มี `none` ในตารางทั้งที่ควรมีคำสั่ง | Add or fix the Verification Commands; add tests for the area; fix flaky tests / เพิ่มหรือแก้คำสั่งตรวจสอบ เพิ่ม Test ในส่วนนั้น แก้ Test ที่ไม่นิ่ง |
| `tool` | A tool, command, or plugin misbehaved / เครื่องมือ คำสั่ง หรือ Plugin ทำงานผิด | Command errors unrelated to the change; version drift / คำสั่ง Error โดยไม่เกี่ยวกับการเปลี่ยนแปลง Version เลื่อน | Pin versions; fix the script; record in `docs/decisions/` / ตรึง Version แก้ Script บันทึกใน `docs/decisions/` |
| `context` | The AI lacked or misread Project knowledge / AI ขาดหรืออ่านความรู้ของ Project ผิด | Violates a documented pattern or the folder structure; reinvents an existing utility / ทำผิด Pattern หรือโครงสร้างโฟลเดอร์ที่บันทึกไว้ สร้างสิ่งที่มีอยู่แล้วซ้ำ | Improve `docs/architecture/`, `CLAUDE.md` rules, and folder-structure docs / ปรับปรุง `docs/architecture/` กฎใน `CLAUDE.md` และเอกสารโครงสร้างโฟลเดอร์ |
| `state` | Memory or state was lost or stale across sessions / ความจำหรือสถานะหายหรือล้าสมัยข้ามSession | Work repeated; a Handoff was missing or outdated; the wrong branch or version / ทำงานซ้ำ Handoff ขาดหรือล้าสมัย Branch หรือ Version ผิด | Handoff quality; record next steps; check state before starting / คุณภาพ Handoff บันทึกงานถัดไป ตรวจสถานะก่อนเริ่ม |
| `environment` | The environment could not run the work / Environment รันงานไม่ได้ | Missing dependency, database down, network, permissions / Dependency ขาด ฐานข้อมูลล่ม เครือข่าย สิทธิ์ | Setup docs; reproducible environment; CI / เอกสารการตั้งค่า Environment ที่สร้างซ้ำได้ CI |
| `regression` | Existing behavior broke / พฤติกรรมเดิมพัง | A test that used to pass fails; a Baseline count rises; a user report / Test ที่เคยผ่านไม่ผ่าน จำนวนใน Baseline เพิ่ม รายงานจากผู้ใช้ | Tests for the affected area; Baseline discipline; narrower changes / Test ในส่วนที่กระทบ วินัยเรื่อง Baseline เปลี่ยนให้แคบลง |
| `no-progress` | Attempts stopped making progress / รอบต่อรอบไม่คืบหน้า | Same failure twice; STOP at the cap without a change in the error / Failure เดิมสองครั้ง STOP ที่จำนวนรอบสูงสุดโดย Error ไม่เปลี่ยน | Escalate to HUMAN earlier; smaller tasks; check the gate's signal / ส่งต่อ HUMAN เร็วขึ้น Task เล็กลง ตรวจสัญญาณของเกณฑ์ |
| `human-dependency` | The task could not proceed without a Developer decision / Task ไปต่อไม่ได้โดยไม่มีการตัดสินใจของ Developer | HUMAN for a decision outside the AI's authority; waiting on approval / HUMAN เพราะต้องตัดสินใจนอกอำนาจของ AI รอการอนุมัติ | Decide earlier; record decisions in `docs/decisions/`; adjust the approval rule for that task type / ตัดสินใจให้เร็วขึ้น บันทึกใน `docs/decisions/` ปรับกฎการอนุมัติของ Task ประเภทนั้น |

---

## How to Classify / วิธีจำแนก

1. Use `none` when the task reached PASS on the first attempt with no intervention / ใช้ `none` เมื่อ Task ผ่านรอบแรกโดยไม่มีการแทรกแซง
2. Otherwise pick exactly one primary category: the earliest cause in the chain Understand → Plan → Act → Verify. A test failure caused by a misunderstood requirement is `requirement`, not `implementation` / ไม่เช่นนั้นเลือกหมวดหลักหนึ่งหมวด คือสาเหตุที่เกิดก่อนสุดในลำดับ Understand → Plan → Act → Verify Test ไม่ผ่านเพราะเข้าใจ Requirement ผิดคือ `requirement` ไม่ใช่ `implementation`
3. `no-progress` takes precedence over the earlier categories when the same failure persisted for two attempts, whatever its origin: what needs fixing is the loop, not only the code. Use `human-dependency` only when no other category explains the outcome / `no-progress` มาก่อนหมวดอื่นเมื่อ Failure เดิมค้างอยู่สองรอบ ไม่ว่าต้นเหตุจะเป็นอะไร เพราะสิ่งที่ต้องแก้คือ Loop ไม่ใช่แค่ Code ส่วน `human-dependency` ใช้เมื่อไม่มีหมวดอื่นอธิบายผลได้
4. A task that passed after retries still records the category of the failure that caused the retries / Task ที่ผ่านหลัง Retry ยังต้องบันทึกหมวดของ Failure ที่ทำให้ต้อง Retry
5. Put the detail in `failure.reason`, one line. The category is for counting, the reason is for reading / รายละเอียดใส่ใน `failure.reason` หนึ่งบรรทัด หมวดมีไว้นับ เหตุผลมีไว้อ่าน

---

## From Category to Change / จากหมวดสู่การเปลี่ยนแปลง

| Repeated category / หมวดที่ซ้ำ | Change the / เปลี่ยนที่ |
| --- | --- |
| `requirement`, `planning`, `human-dependency` | Workflow: Understand and Plan steps, approval rules / Workflow ขั้น Understand และ Plan กฎการอนุมัติ |
| `implementation`, `no-progress` | Task size, attempt cap, gate messages / ขนาด Task จำนวนรอบสูงสุด ข้อความของเกณฑ์ |
| `verification`, `regression` | Gate: Verification Commands, tests, Baseline / เกณฑ์: คำสั่งตรวจสอบ Test และ Baseline |
| `context`, `state` | Documentation and Handoff / เอกสารและ Handoff |
| `tool`, `environment` | Tooling and environment setup / เครื่องมือและการตั้งค่า Environment |

A change to the Project goes into the Project. A change to the loop itself goes through `standards/versioning.md`.

การเปลี่ยนที่ Project ทำใน Project การเปลี่ยน Loop เองทำผ่าน `standards/versioning.md`
