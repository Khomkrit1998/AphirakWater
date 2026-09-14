"use client"

import { blockBackgrounds, blockLabels } from "@workspace/shared"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"

import { useBuilderStore } from "../store"
import { control, selectWrapper } from "./field-styles"

export function BlockInspector() {
  const block = useBuilderStore((s) => s.blocks.find((b) => b.id === s.selectedId))
  const update = useBuilderStore((s) => s.update)

  return (
    <section aria-labelledby="inspector" className="rounded-[18px] border bg-card p-5">
      <p className="mb-2 text-[11.5px] font-bold tracking-[0.1em] text-ink-400">
        SECTION ที่เลือก
      </p>
      {block ? (
        <>
          <h2 id="inspector" className="mb-1 text-[17px] font-bold">
            {blockLabels[block.type]}
          </h2>
          <p className="mb-4 text-[13.5px] text-muted-foreground">{block.note}</p>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="block-heading" className="text-[13.5px] font-semibold text-ink-700">
                {block.type === "hero" ? "หัวข้อ (H1)" : "หัวข้อ (H2)"}
              </Label>
              <Input
                id="block-heading"
                value={block.heading}
                onChange={(e) => update(block.id, { heading: e.target.value })}
                className={control}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="block-bg" className="text-[13.5px] font-semibold text-ink-700">
                พื้นหลัง
              </Label>
              <NativeSelect
                id="block-bg"
                value={block.background}
                onChange={(e) =>
                  update(block.id, {
                    background: e.target.value as (typeof blockBackgrounds)[number]["value"],
                  })
                }
                className={selectWrapper}
              >
                {blockBackgrounds.map((o) => (
                  <NativeSelectOption key={o.value} value={o.value}>
                    {o.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <button
              type="button"
              disabled
              title="ต้องมีที่เก็บไฟล์ก่อน"
              className="rounded-[10px] border border-dashed border-input bg-input-bg p-[11px] text-[13.5px] font-semibold text-muted-foreground disabled:cursor-not-allowed"
            >
              อัปโหลดรูปภาพ (ยังไม่พร้อม)
            </button>
          </div>
        </>
      ) : (
        <p id="inspector" className="text-sm text-muted-foreground">
          เลือก Section จากรายการเพื่อแก้ไข
        </p>
      )}
    </section>
  )
}
