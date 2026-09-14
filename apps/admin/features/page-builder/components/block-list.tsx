"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

import { blockLabels } from "@workspace/shared"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

import { useBuilderStore } from "../store"

const small =
  "h-[30px] rounded-lg border border-line-soft bg-card text-[12.5px] font-semibold text-ink-700 transition-colors hover:border-primary disabled:pointer-events-none disabled:opacity-40"

export function BlockList() {
  const { blocks, selectedId, select, move, toggle, duplicate, remove } =
    useBuilderStore()

  if (blocks.length === 0) {
    return (
      <p className="rounded-[14px] border border-dashed bg-card px-4 py-10 text-center text-sm text-muted-foreground">
        ยังไม่มี Section · เลือกจาก &ldquo;เพิ่ม Section&rdquo;
      </p>
    )
  }

  return (
    <ol className="grid gap-2.5">
      {blocks.map((b, i) => (
        <li
          key={b.id}
          className={cn(
            "flex flex-wrap items-center gap-x-3.5 gap-y-3 rounded-[14px] border-[1.5px] bg-card px-4 py-3.5",
            b.id === selectedId ? "border-primary" : "border-border",
            !b.visible && "opacity-55"
          )}
        >
          <button
            type="button"
            onClick={() => select(b.id)}
            aria-pressed={b.id === selectedId}
            className="flex min-w-[180px] flex-1 items-center gap-3.5 text-left"
          >
            <span className="w-[22px] shrink-0 font-heading text-[12.5px] font-bold text-ink-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block font-heading text-[15.5px] font-semibold text-foreground">
                {blockLabels[b.type]}
              </span>
              <span className="mt-0.5 block text-[13px] text-muted-foreground [overflow-wrap:anywhere]">
                {b.heading} · {b.note}
                {!b.visible && " · ซ่อนอยู่"}
              </span>
            </span>
          </button>
          <span className="flex flex-wrap justify-end gap-1">
            <button
              type="button"
              onClick={() => move(b.id, -1)}
              disabled={i === 0}
              aria-label="เลื่อนขึ้น"
              className={cn(small, "grid w-[30px] place-items-center")}
            >
              <ArrowUpIcon className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => move(b.id, 1)}
              disabled={i === blocks.length - 1}
              aria-label="เลื่อนลง"
              className={cn(small, "grid w-[30px] place-items-center")}
            >
              <ArrowDownIcon className="size-3.5" />
            </button>
            <button type="button" onClick={() => toggle(b.id)} className={cn(small, "px-2.5")}>
              {b.visible ? "ซ่อน" : "แสดง"}
            </button>
            <button type="button" onClick={() => duplicate(b.id)} className={cn(small, "px-2.5")}>
              ทำซ้ำ
            </button>
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <button
                    type="button"
                    className={cn(
                      small,
                      "border-call-border px-2.5 text-call-text hover:border-call-border hover:bg-call-soft"
                    )}
                  />
                }
              >
                ลบ
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>ลบ Section นี้?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {blockLabels[b.type]} · {b.heading}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                  <AlertDialogCancel
                    render={<Button variant="call" />}
                    onClick={() => remove(b.id)}
                  >
                    ลบ
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </span>
        </li>
      ))}
    </ol>
  )
}
