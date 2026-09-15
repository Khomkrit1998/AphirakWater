# Improvement Record

# บันทึกการปรับปรุง

Save this file in the Project as `docs/evaluation/improvements/IMP-<YYYY-MM-DD>-<slug>.md`. One file per `ADJUST` or `IMPROVE`. `NO_ACTION` and `MONITOR` need no file; one line in the evaluation report is enough. Rules are in `evaluation/improvement.md`; fields are in `evaluation/evaluation-schema.yaml`. Delete these instruction lines when filling in.

บันทึกไฟล์นี้ใน Project ที่ `docs/evaluation/improvements/IMP-<YYYY-MM-DD>-<slug>.md` หนึ่งไฟล์ต่อหนึ่ง `ADJUST` หรือ `IMPROVE` ส่วน `NO_ACTION` และ `MONITOR` ไม่ต้องมีไฟล์ ใช้หนึ่งบรรทัดใน Report ก็พอ กฎอยู่ใน `evaluation/improvement.md` ช่องข้อมูลอยู่ใน `evaluation/evaluation-schema.yaml` ลบบรรทัดคำอธิบายนี้เมื่อกรอกเสร็จ

## Identity / รายการ

* **Id:** [IMP-YYYY-MM-DD-slug, equals the file name / ตรงกับชื่อไฟล์]
* **Source / ที่มา:** [report id, task ids, or where the feedback came from / report id, task id หรือแหล่งของ Feedback]
* **Owner / ผู้รับผิดชอบ:** [who]
* **Opened / เปิดเมื่อ:** [YYYY-MM-DD]

## Problem / ปัญหา

[One line. What is wrong.]
[หนึ่งบรรทัด อะไรผิดปกติ]

## Evidence / หลักฐาน

Counts and task ids, not opinion. Say which reports the pattern appears in.

จำนวนและ id ของ Task ไม่ใช่ความเห็น ระบุด้วยว่า Pattern ปรากฏใน Report ใดบ้าง

* [metric or count: value, denominator]
* [task ids]
* [reports]

## Diagnosis / การวินิจฉัย

Five answers, one line each, per `evaluation/improvement.md` section 4.

ห้าคำตอบ ข้อละหนึ่งบรรทัด ตาม `evaluation/improvement.md` หัวข้อ 4

1. **What happened / เกิดอะไรขึ้น:** [ ]
2. **Where / เกิดที่ไหน:** [Understand / Plan / Act / Verify / outside the loop]
3. **Why / ทำไม:** [ ]
4. **Recurring / เกิดซ้ำหรือไม่:** [n times, in which reports / กี่ครั้ง ใน Report ใด]
5. **What should change / ควรเปลี่ยนอะไร:** [ ]

* **Root cause category / หมวดสาเหตุราก:** [slug from `evaluation/failure-taxonomy.md`]

## Hypothesis / สมมติฐาน

If [change], then [metric] moves [direction].

ถ้า [การเปลี่ยนแปลง] แล้ว [Metric] จะขยับไปทาง [ทิศทาง]

## Change / การเปลี่ยนแปลง

* **Affected component / Component ที่เปลี่ยน:** [requirement / workflow / gate / prompt / context / tool / docs / config / approval]
* **Proposed change / สิ่งที่จะเปลี่ยน:** [the files and what changes in them / ไฟล์และสิ่งที่เปลี่ยนในไฟล์นั้น]
* **Scope / ขอบเขต:** [Project only, or a new Standard version / เฉพาะ Project หรือออก Standard version ใหม่]

One improvement changes one component. Two causes are two records.

หนึ่ง Improvement เปลี่ยนหนึ่ง Component สองสาเหตุคือสองรายการ

## Decision / การตัดสินใจ

* **Decision / การตัดสินใจ:** [NO_ACTION / MONITOR / ADJUST / IMPROVE / ESCALATE]
* **Reason / เหตุผล:** [which rule in `evaluation/improvement.md` section 5 applies / กฎข้อใดในหัวข้อ 5]
* **Status / สถานะ:** [proposed / accepted / rejected / deferred / applied / measuring / closed]
* **Developer approval / การอนุมัติ:** [name and date, or pending / ชื่อและวันที่ หรือ pending]

## Measurement / การวัดผล

* **Baseline:** [report id or Standard version, recorded once and never changed / report id หรือ Standard version บันทึกครั้งเดียว ห้ามแก้]
* **Metric:** [from `evaluation/metrics.md`]
* **Period / ช่วงเวลา:** [next n tasks, or from YYYY-MM-DD]
* **Expected effect / ผลที่คาด:** [which direction, roughly how much / ทิศทาง และประมาณเท่าใด]

## Result / ผล

Filled by the evaluation that closes this record. Do not claim a result without a baseline comparison.

กรอกโดยการประเมินที่ปิดรายการนี้ ห้ามสรุปผลโดยไม่มีการเทียบ Baseline

* **Compared in report / เทียบใน Report:** [report id]
* **Result / ผล:** [improvement / no-meaningful-change / regression / insufficient-evidence]
* **What moved / อะไรขยับ:** [metric: from → to, with counts / Metric: จาก → เป็น พร้อมจำนวน]
* **Side effects / ผลข้างเคียง:** [None / which other metric changed]
* **Kept or reverted / คงไว้หรือย้อนกลับ:** [kept / reverted] — [reason]
* **Version / Version:** [Standard version that carries it, or `project-only`]
* **Closed / ปิดเมื่อ:** [YYYY-MM-DD]

## Machine-Readable / แบบเครื่องอ่านได้

Fields per `evaluation/evaluation-schema.yaml`, section `improvement`.

ช่องข้อมูลตาม `evaluation/evaluation-schema.yaml` หัวข้อ `improvement`

```yaml
improvement:
  id: "[IMP-YYYY-MM-DD-slug]"
  source: "[report id | task ids | where the feedback came from]"
  problem: "[one line]"
  evidence: "[counts and ids]"
  root_cause: "[failure-taxonomy slug]: [one line]"
  hypothesis: "[if <change>, then <metric> moves <direction>]"
  affected_component: "[requirement | workflow | gate | prompt | context | tool | docs | config | approval]"
  proposed_change: "[files and what changes]"
  decision: "[NO_ACTION | MONITOR | ADJUST | IMPROVE | ESCALATE]"
  status: "[proposed | accepted | rejected | deferred | applied | measuring | closed]"
  baseline: "[report id | X.Y.Z]"
  measure: "[metric, period]"
  result: "[improvement | no-meaningful-change | regression | insufficient-evidence | pending]"
  version: "[X.Y.Z | project-only]"
  owner: "[who]"
```
