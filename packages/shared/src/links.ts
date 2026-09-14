import { areaPageSlugs } from "@workspace/shared/area"
import type { ContentRef, SiteLink } from "@workspace/shared/common"
import { servicePageSlugs } from "@workspace/shared/service"

// Links only point at pages that exist. Until a service or area has its own
// content, its links go to the quote form instead of a 404.
export function resolveRef(ref: ContentRef | SiteLink): SiteLink {
  if ("href" in ref) return ref
  const slugs = ref.kind === "service" ? servicePageSlugs : areaPageSlugs
  const base = ref.kind === "service" ? "/services" : "/areas"
  return {
    label: ref.label,
    href: slugs.includes(ref.slug) ? `${base}/${ref.slug}` : "/quote",
  }
}
