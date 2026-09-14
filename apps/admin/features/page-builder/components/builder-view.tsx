"use client"

import { ExternalLinkIcon } from "lucide-react"
import { useState } from "react"

import { Button, buttonVariants } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import type { BuilderPage } from "../api/get-builder-page"
import { useBuilderStore } from "../store"
import { BlockInspector } from "./block-inspector"
import { BlockList } from "./block-list"
import { BlockPalette } from "./block-palette"
import { SeoForm } from "./seo-form"

// Render with key={page.id} so a new page always starts from its own blocks.
export function BuilderView({ page }: { page: BuilderPage }) {
  useState(() => useBuilderStore.getState().load(page.blocks))
  const dirty = useBuilderStore((s) => s.dirty)

  return (
    <div className="grid gap-5 p-5 md:px-7 md:py-[26px]">
      <p
        role="status"
        className="rounded-[12px] border border-warn-text/20 bg-warn-soft px-4 py-3 text-[13.5px] leading-[1.6] text-warn-text"
      >
        โหมดตัวอย่าง: แก้ไขได้แต่ยังไม่ถูกบันทึก และจะหายเมื่อรีเฟรชหน้า
        {dirty && " · มีการแก้ไขที่ยังไม่บันทึก"}
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(290px,100%),1fr))] items-start gap-5 xl:grid-cols-[230px_minmax(0,1fr)_minmax(300px,360px)]">
        <BlockPalette />

        <div className="grid min-w-0 gap-3.5">
          <div className="flex flex-wrap items-center gap-3 rounded-[18px] border bg-card px-5 py-[18px]">
            <div className="min-w-[200px] flex-1">
              <h2 className="text-[16.5px] font-bold">{page.title}</h2>
              <p className="mt-[3px] text-[13.5px] text-muted-foreground [overflow-wrap:anywhere]">
                {page.path} · Template: {page.template}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={page.liveUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-auto rounded-[10px] border-input px-[15px] py-2.5 text-[13.5px] font-semibold hover:bg-tint"
                )}
              >
                Preview
                <ExternalLinkIcon aria-hidden="true" />
              </a>
              <Button
                disabled
                title="ต้องมี backend ก่อน"
                className="h-auto rounded-[10px] px-[17px] py-2.5 text-[13.5px] font-semibold"
              >
                Publish
              </Button>
            </div>
          </div>
          <BlockList />
        </div>

        <div className="grid min-w-0 gap-3.5">
          <BlockInspector />
          <SeoForm defaultValues={page.seo} liveUrl={page.liveUrl} />
        </div>
      </div>
    </div>
  )
}
