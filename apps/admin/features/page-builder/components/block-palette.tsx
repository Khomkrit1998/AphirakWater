"use client"

import { blockLabels, blockTypes } from "@workspace/shared"

import { useBuilderStore } from "../store"

export function BlockPalette() {
  const add = useBuilderStore((s) => s.add)
  return (
    <section aria-labelledby="palette" className="rounded-[18px] border bg-card p-[18px]">
      <h2 id="palette" className="mb-3 text-[15px] font-bold">
        เพิ่ม Section
      </h2>
      <div className="grid gap-1.5">
        {blockTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => add(type)}
            className="rounded-[10px] border border-line-soft bg-input-bg px-3 py-2.5 text-left text-[13.5px] font-medium text-ink-700 transition-colors hover:border-primary hover:bg-soft"
          >
            + {blockLabels[type]}
          </button>
        ))}
      </div>
    </section>
  )
}
