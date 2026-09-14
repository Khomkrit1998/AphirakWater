# AphirakWater

> ระบบสั่งซื้อและจัดส่งน้ำดื่ม สำหรับลูกค้าสั่งน้ำผ่านเว็บ และหลังบ้านจัดการออเดอร์กับการจัดส่ง

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
pnpm --filter admin dev  # เฉพาะ admin

# Test / ทดสอบ
# TBD — ยังไม่มี test script

# Build
pnpm build
```

Configure the required environment variables before running. Do not commit secrets or credentials.

กำหนด Environment Variables ที่จำเป็นก่อนรัน ห้าม Commit Secret หรือ Credential ลง Repository

---

## Workspaces / โครงสร้าง Monorepo

pnpm workspace + Turborepo

| Workspace | Package | Purpose / หน้าที่ |
| --- | --- | --- |
| `apps/web` | `web` | Next.js app ฝั่งลูกค้า สั่งซื้อน้ำดื่ม |
| `apps/admin` | `admin` | Next.js app หลังบ้าน จัดการออเดอร์และการจัดส่ง |
| `packages/ui` | `@workspace/ui` | shadcn/ui components ที่ทั้งสอง app ใช้ร่วมกัน |
| `packages/shared` | `@workspace/shared` | zod schema และ type ที่ใช้ร่วมกัน |
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
