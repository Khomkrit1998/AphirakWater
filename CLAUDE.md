# AphirakWater

เว็บไซต์ SEO-first ของ หจก.อภิรักษ์บริการน้ำ (รถส่งน้ำ ภูเก็ต–พังงา) ให้ลูกค้าดูบริการ/พื้นที่และขอใบเสนอราคา และหลังบ้าน CMS สำหรับจัดการเนื้อหาและ SEO ดีไซน์และ requirement อยู่ที่ `docs/requirements/design-handoff/`

---

## AI Development Standard / มาตรฐานการพัฒนาด้วย AI

This project follows the AI Development Standard. The Standard is vendored into this repository as an immutable snapshot.

Project นี้ใช้ AI Development Standard ซึ่ง copy ไว้ใน Repository นี้เป็น Snapshot ที่ไม่แก้ไข

| Item / รายการ | Value / ค่า |
| --- | --- |
| Standard version / เวอร์ชัน | `1.5.0` |
| Standard root / ตำแหน่ง | `.ai-standard/v1.5.0/` |

@.ai-standard/v1.5.0/CLAUDE.md

Paths mentioned inside the Standard (for example `workflows/feature.md` or `templates/handoff.md`) are relative to the Standard root above.

Path ที่ Standard อ้างถึง (เช่น `workflows/feature.md`) ให้เทียบจาก Standard root ด้านบน

Do not modify files under `.ai-standard/`. To upgrade, run `/project-init` again or copy a newer version directory from the central `ai-dev-standard` repository.

ห้ามแก้ไขไฟล์ใน `.ai-standard/` หากต้องการอัปเกรด ให้รัน `/project-init` อีกครั้ง หรือ copy Version ใหม่จาก Repository กลาง

---

## Source of Truth / แหล่งข้อมูลหลัก

When information conflicts, use the following priority:

เมื่อข้อมูลขัดแย้งกัน ให้ใช้ลำดับความสำคัญดังนี้:

1. Explicit Developer requirement / current task
   Requirement หรือ Task ที่ Developer ระบุโดยตรง
2. Project documentation (`docs/`) and existing code
   เอกสารของ Project (`docs/`) และ Code ที่มีอยู่
3. AI Development Standard (`.ai-standard/`)
   มาตรฐานการพัฒนาด้วย AI (`.ai-standard/`)
4. General technical knowledge
   ความรู้ทางเทคนิคทั่วไป

The Developer has final authority over requirements, architecture, security, and important project decisions.

Developer เป็นผู้มีอำนาจตัดสินใจขั้นสุดท้ายด้าน Requirement, Architecture, Security และการตัดสินใจสำคัญของ Project

---

## Project Documentation / เอกสารของ Project

| Location / ตำแหน่ง | Purpose / หน้าที่ |
| --- | --- |
| `docs/requirements/` | What the project should do / Project ต้องทำอะไร |
| `docs/architecture/` | How the project is built / Project สร้างอย่างไร |
| `docs/decisions/` | Why important decisions were made / ทำไมจึงเลือกแนวทางนั้น |
| `docs/evaluation/tasks/` | One Handoff per task, with its Evidence block. Written at the end of meaningful work / Handoff หนึ่งไฟล์ต่อ Task พร้อม Evidence block เขียนเมื่อจบงานสำคัญ |
| `docs/evaluation/reports/` | Evaluation reports of the loop, per `workflows/evaluate.md` / รายงานประเมิน Loop ตาม `workflows/evaluate.md` |
| `docs/evaluation/improvements/` | One record per accepted improvement, with its baseline and result, per `evaluation/improvement.md` / หนึ่งไฟล์ต่อหนึ่งการปรับปรุงที่รับไว้ พร้อม Baseline และผล ตาม `evaluation/improvement.md` |

AI SHOULD inspect relevant documentation before making implementation decisions.

AI ควรตรวจสอบเอกสารที่เกี่ยวข้องก่อนตัดสินใจด้าน Implementation

---

## Verification Commands / คำสั่งตรวจสอบ

AI runs these before reporting meaningful work as done. On failure it fixes and re-runs within the attempt cap, per `workflows/verify-loop.md`. `none` means there is no command for that check. Baseline records failures that existed before; the gate for that command is then "no new failures". Change this table only outside a loop.

AI รันคำสั่งเหล่านี้ก่อนรายงานว่างานสำคัญเสร็จ ถ้าไม่ผ่านจะแก้แล้วรันซ้ำภายในจำนวนรอบสูงสุด ตาม `workflows/verify-loop.md` `none` แปลว่าไม่มีคำสั่งสำหรับการตรวจนั้น Baseline บันทึก Failure ที่มีอยู่ก่อน เกณฑ์ของคำสั่งนั้นจึงเป็น "ไม่มี Failure ใหม่" แก้ตารางนี้เฉพาะนอก Loop

| Check / การตรวจ | Command / คำสั่ง | Baseline |
| --- | --- | --- |
| typecheck | pnpm typecheck | none |
| lint | pnpm lint | none |
| test | none | none |
| build | pnpm build | none |

---

## Git Workflow / การทำงานกับ Git

How changes enter git, per `workflows/git.md`. `branch-pr`: a branch and a pull request for every change. `direct-main`: commit to the integration branch after the Verification Commands pass. Change this table only outside a task.

วิธีนำการเปลี่ยนแปลงเข้า Git ตาม `workflows/git.md` `branch-pr`: ทุกการเปลี่ยนแปลงมี Branch และ Pull Request `direct-main`: Commit เข้า Branch ที่รวมงานหลังคำสั่งตรวจสอบผ่าน แก้ตารางนี้เฉพาะนอก Task

| Setting / การตั้งค่า | Value / ค่า |
| --- | --- |
| Mode / โหมด | direct-main |
| Integration branch / Branch ที่รวมงาน | main |

---

## Selected Plugins / Plugin ที่เลือกใช้

Recorded by the plugin onboarding workflow. Update this table when the selection changes.

บันทึกจาก Plugin Onboarding Workflow แก้ไขตารางนี้เมื่อมีการเปลี่ยนแปลง

| Plugin | Purpose / หน้าที่ | Reason / เหตุผล | Scope |
| --- | --- | --- | --- |
| `ponytail` | บังคับให้เลือกทางที่เล็กที่สุดที่ทำงานได้ กัน over-engineering | Recommended ใน registry และ Project นี้จะโตขึ้นเรื่อยๆ ต้องกันโค้ดบวม | user |
| `frontend-design` | ช่วยตัดสินใจด้าน UI และ frontend | Recommended ใน registry และงานหลักของ Project คือ UI สองฝั่ง (web, admin) | user |

---

## Project-Specific Rules / กฎเฉพาะของ Project

Add rules that apply only to this project. Do not duplicate the Standard here unless a project-specific exception or clarification is required.

เพิ่มเฉพาะกฎที่เป็นของ Project นี้ ไม่ต้อง copy กฎจาก Standard มาซ้ำ เว้นแต่ต้องกำหนด Exception หรือ Clarification

* Stack: Next.js (App Router) + Tailwind CSS + shadcn/ui, package manager pnpm, monorepo run by Turborepo. Do not introduce another framework, CSS approach, component library, or package manager.
  Stack: Next.js (App Router) + Tailwind CSS + shadcn/ui, package manager pnpm, monorepo ใช้ Turborepo ห้ามเพิ่ม framework, วิธีเขียน CSS, component library หรือ package manager ตัวอื่น
* Workspaces: `apps/web` (public SEO website + quote request), `apps/admin` (CMS back office for pages, content and SEO), `packages/ui` (shared shadcn components, `@workspace/ui`), `packages/shared` (shared zod schemas, types and, until a CMS exists, the site content, `@workspace/shared`), `packages/eslint-config`, `packages/typescript-config`. Add a new workspace only when code is genuinely shared by both apps.
  Workspace: `apps/web` (เว็บไซต์ SEO + ขอใบเสนอราคา), `apps/admin` (หลังบ้าน CMS จัดการหน้า เนื้อหา และ SEO), `packages/ui` (component ใช้ร่วม), `packages/shared` (zod schema, type และเนื้อหาเว็บจนกว่าจะมี CMS), `packages/eslint-config`, `packages/typescript-config` เพิ่ม workspace ใหม่เฉพาะเมื่อ code ถูกใช้ร่วมกันจริง
* Colors come from the brand tokens in `packages/ui/src/styles/globals.css` (e.g. `bg-primary`, `text-brand`, `bg-call`, `bg-tint`). Do not hard-code hex values in components; every token has a light and a dark value.
  สีต้องมาจาก token ใน `packages/ui/src/styles/globals.css` (เช่น `bg-primary`, `text-brand`, `bg-call`, `bg-tint`) ห้ามใส่ hex ตรงใน component ทุก token มีค่าทั้งโหมดสว่างและมืด
* A link to a service or area page goes through `resolveRef()` from `@workspace/shared`. Pages without their own content fall back to `/quote`; never publish template pages that only swap a keyword (duplicate content).
  ลิงก์ไปหน้าบริการหรือพื้นที่ต้องผ่าน `resolveRef()` จาก `@workspace/shared` หน้าที่ยังไม่มีเนื้อหาจะลิงก์ไป `/quote` ห้ามสร้างหน้าจากแม่แบบที่เปลี่ยนแค่คีย์เวิร์ด
* Inside an app, code is organized by feature, not by type: `apps/<app>/features/<feature>/{components,hooks,api,schemas}` with an `index.ts` as the feature's only public surface. `app/` holds routes only and imports from a feature's `index.ts`, never deeper. A feature never imports another feature's internals. See `apps/<app>/features/README.md`.
  ภายในแต่ละ app จัดโครงตามฟีเจอร์ ไม่ใช่ตามประเภทไฟล์: `apps/<app>/features/<feature>/{components,hooks,api,schemas}` และมี `index.ts` เป็นทางเข้าเดียว `app/` เก็บเฉพาะ route และ import จาก `index.ts` เท่านั้น ห้ามฟีเจอร์ import ไส้ในของฟีเจอร์อื่น ดู `apps/<app>/features/README.md`
* Validate every external input (form values, API request and response bodies, env variables) with a `zod` schema. No hand-written validation. Schemas used by both apps live in `@workspace/shared`.
  ตรวจสอบข้อมูลจากภายนอกทุกชนิด (ค่าจากฟอร์ม, request และ response ของ API, env) ด้วย `zod` ห้ามเขียน validation เอง schema ที่ทั้งสอง app ใช้ให้อยู่ใน `@workspace/shared`
* Server data goes through `@tanstack/react-query` queries and mutations. No manual `useEffect` fetching.
  ข้อมูลจากเซิร์ฟเวอร์ต้องผ่าน query และ mutation ของ `@tanstack/react-query` ห้าม fetch เองใน `useEffect`
* Forms use `react-hook-form` with `zodResolver`. No ad-hoc form state.
  ฟอร์มใช้ `react-hook-form` คู่กับ `zodResolver` ห้ามเก็บ state ของฟอร์มเอง
* Client state shared across components lives in `zustand` stores. Local state stays in `useState`. No Redux, Context-based stores, or other state libraries.
  State ฝั่ง client ที่หลาย component ใช้ร่วมกันให้อยู่ใน store ของ `zustand` state เฉพาะที่ใช้ `useState` ห้ามใช้ Redux, store ที่สร้างจาก Context หรือ library state ตัวอื่น
* Compose class names only with the `cn()` helper from `@workspace/ui/lib/utils`. Do not add `clsx` or `tailwind-merge` directly; the helper already provides that job.
  รวม class name ผ่าน `cn()` จาก `@workspace/ui/lib/utils` เท่านั้น ห้ามเรียก `clsx` หรือ `tailwind-merge` ตรงๆ เพราะ helper ทำหน้าที่นี้อยู่แล้ว
* UI components come from `@workspace/ui` (shadcn, `base-nova` style, built on Base UI). Add a component with `pnpm dlx shadcn@latest add <name> -c apps/web`, then use and extend it. Do not mix in a second component library or primitive set.
  Component UI มาจาก `@workspace/ui` (shadcn สไตล์ `base-nova` ซึ่งสร้างบน Base UI) เพิ่ม component ด้วย `pnpm dlx shadcn@latest add <name> -c apps/web` แล้วนำไปใช้หรือขยายต่อ ห้ามผสม component library หรือ primitive ชุดอื่น
* Theme switching uses `next-themes`. Icons come from `lucide-react`; brand logos (LINE, WhatsApp, Facebook, YouTube, TikTok) come from `simple-icons` through `BrandIcon` in `apps/web/features/site`. Do not add other theme or icon packages.
  การสลับธีมใช้ `next-themes` ไอคอนใช้ `lucide-react` ส่วนโลโก้แบรนด์ (LINE, WhatsApp, Facebook, YouTube, TikTok) ใช้ `simple-icons` ผ่าน `BrandIcon` ใน `apps/web/features/site` ห้ามเพิ่ม package ธีมหรือไอคอนตัวอื่น
