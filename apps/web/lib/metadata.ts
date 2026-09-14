import type { Metadata } from "next"

import { site } from "@workspace/shared"

export const defaultTitle = `บริการส่งน้ำ ภูเก็ต–พังงา | ${site.name}`

// Next.js replaces (not merges) `openGraph` from the layout, so every page
// builds the full object here. No `title` = the layout's default title.
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title?: string
  description: string
  path: string
  type?: "website" | "article"
}): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ?? defaultTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "th_TH",
      type,
    },
  }
}
