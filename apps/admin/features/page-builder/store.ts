import { create } from "zustand"

import { blockLabels, type Block, type BlockType } from "@workspace/shared"

type BuilderState = {
  blocks: Block[]
  selectedId: string | null
  dirty: boolean
  load: (blocks: Block[]) => void
  add: (type: BlockType) => void
  move: (id: string, dir: -1 | 1) => void
  toggle: (id: string) => void
  duplicate: (id: string) => void
  remove: (id: string) => void
  select: (id: string) => void
  update: (id: string, patch: Partial<Pick<Block, "heading" | "background">>) => void
}

const swap = <T>(list: T[], i: number, j: number) => {
  const next = [...list]
  ;[next[i], next[j]] = [next[j]!, next[i]!]
  return next
}

// ponytail: one global store = one builder open at a time. Nothing persists
// until a backend exists; swap `dirty` for autosave then.
export const useBuilderStore = create<BuilderState>()((set) => ({
  blocks: [],
  selectedId: null,
  dirty: false,
  load: (blocks) => set({ blocks, selectedId: blocks[0]?.id ?? null, dirty: false }),
  add: (type) =>
    set((s) => {
      const block: Block = {
        id: crypto.randomUUID(),
        type,
        heading: blockLabels[type],
        note: "บล็อกใหม่ · ยังไม่ใส่เนื้อหา",
        visible: true,
        background: "white",
      }
      return { blocks: [...s.blocks, block], selectedId: block.id, dirty: true }
    }),
  move: (id, dir) =>
    set((s) => {
      const i = s.blocks.findIndex((b) => b.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= s.blocks.length) return s
      return { blocks: swap(s.blocks, i, j), dirty: true }
    }),
  toggle: (id) =>
    set((s) => ({
      blocks: s.blocks.map((b) => (b.id === id ? { ...b, visible: !b.visible } : b)),
      dirty: true,
    })),
  duplicate: (id) =>
    set((s) => {
      const i = s.blocks.findIndex((b) => b.id === id)
      if (i < 0) return s
      const copy = { ...s.blocks[i]!, id: crypto.randomUUID() }
      return {
        blocks: [...s.blocks.slice(0, i + 1), copy, ...s.blocks.slice(i + 1)],
        selectedId: copy.id,
        dirty: true,
      }
    }),
  remove: (id) =>
    set((s) => {
      const blocks = s.blocks.filter((b) => b.id !== id)
      const selectedId = s.selectedId === id ? (blocks[0]?.id ?? null) : s.selectedId
      return { blocks, selectedId, dirty: true }
    }),
  select: (id) => set({ selectedId: id }),
  update: (id, patch) =>
    set((s) => ({
      blocks: s.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
      dirty: true,
    })),
}))
