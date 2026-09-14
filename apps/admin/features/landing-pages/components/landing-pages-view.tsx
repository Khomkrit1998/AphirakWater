"use client"

import Link from "next/link"
import { SearchIcon } from "lucide-react"
import { useState } from "react"

import type { PageType } from "@workspace/shared"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import { SerpPreview } from "@workspace/ui/components/serp-preview"
import { cn } from "@workspace/ui/lib/utils"

import type { PageRow } from "../api/get-page-rows"
import { SeoHealth } from "./seo-health"

const typeBadge = {
  service: { label: "Service", variant: "ok" },
  area: { label: "Area", variant: "warn" },
  blog: { label: "Blog", variant: "info" },
} as const satisfies Record<PageType, { label: string; variant: string }>

const control =
  "h-auto rounded-[11px] border-input bg-input-bg py-3 text-[14.5px] md:text-[14.5px] focus-visible:bg-background"
const selectWrapper =
  "[&>select]:h-auto [&>select]:rounded-[11px] [&>select]:bg-input-bg [&>select]:py-3 [&>select]:pl-3.5 [&>select]:text-[14.5px]"

export function LandingPagesView({ rows }: { rows: PageRow[] }) {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("all")
  const [status, setStatus] = useState("all")
  const [selectedId, setSelectedId] = useState(rows[0]?.id)

  // ponytail: client-side filter over a handful of static pages; move to
  // server-side search + pagination once pages come from a CMS (> 50 rows).
  const q = query.trim().toLowerCase()
  const visible = rows.filter(
    (r) =>
      (!q || r.title.toLowerCase().includes(q) || r.path.toLowerCase().includes(q)) &&
      (type === "all" || r.type === type) &&
      (status === "all" || r.status === status)
  )
  const selected = rows.find((r) => r.id === selectedId) ?? rows[0]

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-start gap-6 p-5 md:px-7 md:py-[26px] xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
      <div className="grid min-w-0 gap-[18px]">
        <div className="flex flex-wrap items-center gap-3 rounded-[18px] border bg-card p-[18px]">
          <div className="relative min-w-[200px] flex-1">
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาชื่อหน้า หรือ URL…"
              aria-label="ค้นหาหน้า"
              className={cn(control, "pl-10")}
            />
          </div>
          <NativeSelect
            aria-label="ประเภท"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={selectWrapper}
          >
            <NativeSelectOption value="all">ทุกประเภท</NativeSelectOption>
            <NativeSelectOption value="service">Service</NativeSelectOption>
            <NativeSelectOption value="area">Area</NativeSelectOption>
            <NativeSelectOption value="blog">Blog</NativeSelectOption>
          </NativeSelect>
          <NativeSelect
            aria-label="สถานะ"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={selectWrapper}
          >
            <NativeSelectOption value="all">ทุกสถานะ</NativeSelectOption>
            <NativeSelectOption value="published">เผยแพร่แล้ว</NativeSelectOption>
            <NativeSelectOption value="draft">ฉบับร่าง</NativeSelectOption>
            <NativeSelectOption value="scheduled">ตั้งเวลา</NativeSelectOption>
          </NativeSelect>
        </div>

        <div className="overflow-x-auto rounded-[18px] border bg-card">
          <table className="w-full min-w-[780px] border-collapse text-left">
            <colgroup>
              <col />
              <col className="w-[100px]" />
              <col className="w-[90px]" />
              <col className="w-[120px]" />
              <col className="w-[110px]" />
              <col className="w-[76px]" />
            </colgroup>
            <thead className="bg-tint text-[13px] font-semibold tracking-[0.02em] text-muted-foreground">
              <tr>
                <th scope="col" className="px-[18px] py-[13px] font-semibold">หน้า</th>
                <th scope="col" className="px-2.5 py-[13px] font-semibold">ประเภท</th>
                <th scope="col" className="px-2.5 py-[13px] font-semibold">SEO</th>
                <th scope="col" className="px-2.5 py-[13px] font-semibold">สถานะ</th>
                <th scope="col" className="px-2.5 py-[13px] font-semibold">อัปเดต</th>
                <th scope="col" className="px-2.5 py-[13px]">
                  <span className="sr-only">การทำงาน</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-t border-line-soft",
                    row.id === selected?.id ? "bg-tint" : "hover:bg-row-hover"
                  )}
                >
                  <td className="min-w-0 px-[18px] py-3.5">
                    <button
                      type="button"
                      onClick={() => setSelectedId(row.id)}
                      aria-pressed={row.id === selected?.id}
                      className="block text-left"
                    >
                      <span className="block text-[15px] font-semibold text-foreground">
                        {row.title}
                      </span>
                      <span className="mt-[3px] block text-[13px] text-muted-foreground [overflow-wrap:anywhere]">
                        {row.path}
                      </span>
                    </button>
                  </td>
                  <td className="px-2.5 py-3.5">
                    <Badge size="pill" variant={typeBadge[row.type].variant}>
                      {typeBadge[row.type].label}
                    </Badge>
                  </td>
                  <td className="px-2.5 py-3.5">
                    <Badge size="pill" variant={row.score >= 80 ? "ok" : "warn"}>
                      {row.score >= 80 ? "ดี" : "ควรปรับ"}
                    </Badge>
                  </td>
                  <td className="px-2.5 py-3.5">
                    <Badge size="pill" variant="ok">
                      เผยแพร่แล้ว
                    </Badge>
                  </td>
                  <td className="px-2.5 py-3.5 text-[13.5px] text-muted-foreground">
                    {row.updated}
                  </td>
                  <td className="px-2.5 py-3.5">
                    <Link
                      href={`/pages/${row.id}/edit`}
                      className="rounded-lg px-2 py-1.5 text-[13.5px] font-semibold text-brand hover:bg-soft"
                    >
                      แก้ไข
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visible.length === 0 && (
            <p className="border-t border-line-soft px-[18px] py-10 text-center text-sm text-muted-foreground">
              ไม่พบหน้าที่ค้นหา
            </p>
          )}
        </div>
      </div>

      {selected && (
        <div className="grid min-w-0 gap-[18px]">
          <SeoHealth
            pageId={selected.id}
            path={selected.path}
            score={selected.score}
            checks={selected.checks}
          />
          <section aria-labelledby="serp" className="rounded-[18px] border bg-card p-[22px]">
            <h2 id="serp" className="mb-3.5 text-[15.5px] font-bold">
              Google Search Preview
            </h2>
            <SerpPreview {...selected.serp} />
          </section>
        </div>
      )}
    </div>
  )
}
