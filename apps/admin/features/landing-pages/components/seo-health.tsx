import Link from "next/link"
import { CheckIcon } from "lucide-react"

import type { SeoCheck } from "@workspace/shared"
import { cn } from "@workspace/ui/lib/utils"

export function SeoHealth({
  pageId,
  path,
  score,
  checks,
}: {
  pageId: string
  path: string
  score: number
  checks: SeoCheck[]
}) {
  return (
    <section aria-labelledby="seo-health" className="rounded-[18px] border bg-card p-[22px]">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <h2 id="seo-health" className="text-[16.5px] font-bold">
          SEO Health
        </h2>
        <span className="font-heading text-[15px] font-bold text-brand-strong">
          {score}/100
        </span>
      </div>
      <p className="mb-4 text-[13.5px] text-muted-foreground [overflow-wrap:anywhere]">
        หน้า {path} · ผ่าน {checks.filter((c) => c.ok).length} จาก {checks.length} ข้อ
        แก้ตามรายการที่ยังไม่ผ่านเพื่อให้หน้านี้พร้อมจัดอันดับ
      </p>
      <ul className="grid gap-3">
        {checks.map((check) => (
          <li key={check.key} className="flex items-start gap-[11px]">
            <span
              aria-hidden="true"
              className={cn(
                "grid size-[22px] shrink-0 place-items-center rounded-full text-xs font-bold",
                check.ok ? "bg-check text-brand-strong" : "bg-call-soft text-call-text"
              )}
            >
              {check.ok ? <CheckIcon className="size-3" strokeWidth={3} /> : "!"}
            </span>
            <span className="min-w-0">
              <span className="block text-[14.5px] font-semibold text-foreground">
                {check.label}
                <span className="sr-only">{check.ok ? " ผ่าน" : " ไม่ผ่าน"}</span>
              </span>
              <span className="mt-0.5 block text-[13px] leading-[1.55] text-muted-foreground [overflow-wrap:anywhere]">
                {check.detail}
              </span>
              {!check.ok && check.field && (
                <Link
                  href={`/pages/${pageId}/edit#${check.field}`}
                  className="mt-1 inline-block text-[13px] font-semibold text-brand hover:text-brand-strong"
                >
                  แก้ไขช่องนี้ →
                </Link>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
