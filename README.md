# AphirakWater

> เว็บไซต์ SEO-first ของ หจก.อภิรักษ์บริการน้ำ (รถส่งน้ำ ภูเก็ต–พังงา) พร้อมฟอร์มขอใบเสนอราคา และหลังบ้าน CMS จัดการเนื้อหา

---

## Tech Stack / เทคโนโลยี

Detected at project initialization. Update this table when the stack changes.

ตรวจพบตอนสร้าง Project แก้ไขตารางนี้เมื่อ Stack เปลี่ยน

| Area / ด้าน | Technology / เทคโนโลยี |
| --- | --- |
| Frontend | Next.js 16 (App Router, React 19) + Tailwind CSS 4 + shadcn/ui (`base-nova`, Base UI) |
| Backend | TBD — ยังไม่มี backend framework ติดตั้ง (Next.js Route Handlers พร้อมใช้ได้ทันที) |
| Database | TBD — ยังไม่ได้เลือก |
| Testing | TBD — ยังไม่ได้ติดตั้ง test runner |

---

## Getting Started / การเริ่มต้นใช้งาน

```bash
# Install / ติดตั้ง
pnpm install

# Run / รัน
pnpm dev            # ทั้ง web และ admin
pnpm --filter web dev    # เฉพาะ web
pnpm --filter admin dev  # เฉพาะ admin (http://localhost:3001)

# Test / ทดสอบ
pnpm --filter @workspace/shared test   # self-check: quote schema, links, SEO score
pnpm typecheck && pnpm lint

# Build
pnpm build

# Deploy apps/web → Cloudflare Workers (build บน Linux เท่านั้น ดู docs/decisions/0011)
pnpm --filter web run deploy   # ต้องมี run: `pnpm deploy` เป็นคำสั่งในตัวของ pnpm
```

Configure the required environment variables before running. Do not commit secrets or credentials.

กำหนด Environment Variables ที่จำเป็นก่อนรัน ห้าม Commit Secret หรือ Credential ลง Repository

ตัวแปรของ `apps/web` อยู่ใน `apps/web/.env.example` ให้คัดลอกเป็น `apps/web/.env.local`

---

## Workspaces / โครงสร้าง Monorepo

pnpm workspace + Turborepo

| Workspace | Package | Purpose / หน้าที่ |
| --- | --- | --- |
| `apps/web` | `web` | เว็บไซต์ลูกค้า: หน้าหลัก, `/services/[slug]`, `/areas/[slug]`, `/quote`, `/blog` |
| `apps/admin` | `admin` | หลังบ้าน CMS โหมดตัวอย่าง (port 3001): Dashboard, `/pages`, `/pages/[id]/edit` — ยังไม่มี login/บันทึก ห้าม deploy |
| `packages/ui` | `@workspace/ui` | shadcn/ui components + brand tokens (`globals.css`) ที่ทั้งสอง app ใช้ร่วมกัน |
| `packages/shared` | `@workspace/shared` | zod schema, type และเนื้อหาเว็บ (static จนกว่าจะมี CMS) |
| `packages/eslint-config` | `@workspace/eslint-config` | ESLint config กลาง |
| `packages/typescript-config` | `@workspace/typescript-config` | TypeScript config กลาง |

ภายในแต่ละ app จัดโครงแบบ feature-based: `apps/<app>/features/<feature>/` โดย `app/` เก็บเฉพาะ route ดูกฎเต็มใน `CLAUDE.md` และ `apps/<app>/features/README.md`

Each app is organized by feature: `apps/<app>/features/<feature>/`, with `app/` holding routes only. Full rules in `CLAUDE.md` and `apps/<app>/features/README.md`.

---

## Documentation / เอกสาร

| Documentation / เอกสาร | Location / ตำแหน่ง | Purpose / หน้าที่ |
| --- | --- | --- |
| Requirements | `docs/requirements/` | What the project should do / Project ต้องทำอะไร |
| Architecture | `docs/architecture/` | How the project is built / Project สร้างอย่างไร |
| Decisions | `docs/decisions/` | Why important decisions were made / ทำไมจึงเลือกแนวทางนั้น |

Goals, scope, deployment, and license are documented under `docs/` as the project evolves.

Goals, Scope, Deployment และ License บันทึกไว้ใน `docs/` เมื่อ Project พัฒนาไป

---

## Development / การพัฒนา

This project follows the **AI Development Standard**. See `CLAUDE.md` and the vendored copy under `.ai-standard/`.

Project นี้ใช้ **AI Development Standard** ดู `CLAUDE.md` และสำเนาที่เก็บไว้ใน `.ai-standard/`

Workflow: **Understand → Analyze → Plan → Implement → Verify → Handoff**

**ทำความเข้าใจ → วิเคราะห์ → วางแผน → พัฒนา → ตรวจสอบ → ส่งมอบ**
