# AphirakWater

ระบบสั่งซื้อและจัดส่งน้ำดื่ม สำหรับลูกค้าสั่งน้ำผ่านเว็บ และหลังบ้านจัดการออเดอร์กับการจัดส่ง

---

## AI Development Standard / มาตรฐานการพัฒนาด้วย AI

This project follows the AI Development Standard. The Standard is vendored into this repository as an immutable snapshot.

Project นี้ใช้ AI Development Standard ซึ่ง copy ไว้ใน Repository นี้เป็น Snapshot ที่ไม่แก้ไข

| Item / รายการ | Value / ค่า |
| --- | --- |
| Standard version / เวอร์ชัน | `1.0.0` |
| Standard root / ตำแหน่ง | `.ai-standard/v1.0.0/` |

@.ai-standard/v1.0.0/CLAUDE.md

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

AI SHOULD inspect relevant documentation before making implementation decisions.

AI ควรตรวจสอบเอกสารที่เกี่ยวข้องก่อนตัดสินใจด้าน Implementation

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
* Workspaces: `apps/web` (customer ordering), `apps/admin` (order and delivery back office), `packages/ui` (shared shadcn components, `@workspace/ui`), `packages/shared` (shared zod schemas and types, `@workspace/shared`), `packages/eslint-config`, `packages/typescript-config`. Add a new workspace only when code is genuinely shared by both apps.
  Workspace: `apps/web` (ลูกค้าสั่งน้ำ), `apps/admin` (หลังบ้านจัดการออเดอร์และการจัดส่ง), `packages/ui` (component ใช้ร่วม), `packages/shared` (zod schema และ type ใช้ร่วม), `packages/eslint-config`, `packages/typescript-config` เพิ่ม workspace ใหม่เฉพาะเมื่อ code ถูกใช้ร่วมกันจริง
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
* Theme switching uses `next-themes`. Icons come from `lucide-react`. Do not add other theme or icon packages.
  การสลับธีมใช้ `next-themes` ไอคอนใช้ `lucide-react` ห้ามเพิ่ม package ธีมหรือไอคอนตัวอื่น
