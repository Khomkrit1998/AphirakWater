import Link from "next/link"

import { areaLinks, listPageDocs, seoChecks, seoScore } from "@workspace/shared"

const card = "min-w-0 rounded-[18px] border bg-card p-[22px]"

export function DashboardView({ siteUrl }: { siteUrl: string }) {
  const pages = listPageDocs().map((doc) => {
    const checks = seoChecks(doc, siteUrl)
    return { doc, checks, score: seoScore(checks) }
  })
  const count = (type: string) => pages.filter((p) => p.doc.type === type).length
  const average = pages.length
    ? Math.round(pages.reduce((sum, p) => sum + p.score, 0) / pages.length)
    : 0
  const phuket = areaLinks.filter((a) => a.province === "ภูเก็ต").length

  const stats = [
    {
      value: pages.length,
      label: "Landing Page ที่เผยแพร่",
      note: `บริการ ${count("service")} · พื้นที่ ${count("area")} · บทความ ${count("blog")}`,
    },
    { value: average, label: "คะแนน SEO เฉลี่ย", note: `จาก ${pages.length} หน้า` },
    { value: "—", label: "คำขอใบเสนอราคา", note: "ยังไม่เปิดรับออนไลน์" },
    {
      value: areaLinks.length,
      label: "พื้นที่ให้บริการ",
      note: `ภูเก็ต ${phuket} · พังงา ${areaLinks.length - phuket}`,
    },
  ]

  const tasks = pages.flatMap(({ doc, checks }) =>
    checks
      .filter((c) => !c.ok)
      .map((c) => ({
        key: `${doc.id}-${c.key}`,
        href: c.field ? `/pages/${doc.id}/edit#${c.field}` : "/pages",
        text: `${doc.path} · ${c.label}: ${c.detail}`,
      }))
  )

  return (
    <div className="grid gap-5 p-5 md:px-7 md:py-[26px]">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4">
        {stats.map((s) => (
          <li key={s.label} className={card}>
            <p className="font-heading text-[30px] leading-[1.1] font-bold">{s.value}</p>
            <p className="mt-2 text-[14.5px] font-semibold text-ink-700">{s.label}</p>
            <p className="mt-[3px] text-[13px] text-muted-foreground">{s.note}</p>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-start gap-5">
        <section aria-labelledby="tasks" className={card}>
          <h2 id="tasks" className="mb-1.5 text-[16.5px] font-bold">
            งานที่ควรทำต่อ
          </h2>
          <p className="mb-4 text-[13.5px] text-muted-foreground">
            SEO check ที่ยังไม่ผ่าน {tasks.length} รายการ จากทุกหน้า
          </p>
          <ul className="grid gap-3">
            {tasks.slice(0, 6).map((t) => (
              <li key={t.key}>
                <Link
                  href={t.href}
                  className="flex items-start gap-[11px] rounded-[12px] border border-line-soft bg-input-bg px-[15px] py-[13px] transition-colors hover:border-primary hover:bg-tint"
                >
                  <span aria-hidden="true" className="mt-[7px] size-[9px] shrink-0 rounded-full bg-star" />
                  <span className="text-[14.5px] leading-[1.6] text-ink-700 [overflow-wrap:anywhere]">
                    {t.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {tasks.length > 6 && (
            <Link href="/pages" className="mt-4 inline-block text-sm font-semibold text-brand">
              ดูทั้งหมดในหน้า Landing Pages →
            </Link>
          )}
        </section>

        <section aria-labelledby="activity" className={card}>
          <h2 id="activity" className="mb-4 text-[16.5px] font-bold">
            กิจกรรมล่าสุด
          </h2>
          <p className="rounded-[12px] bg-tint px-4 py-6 text-center text-sm leading-[1.6] text-muted-foreground">
            ยังไม่มีบันทึกกิจกรรม
            <br />
            จะแสดงเมื่อมีระบบ login และการบันทึกข้อมูล
          </p>
        </section>
      </div>
    </div>
  )
}
