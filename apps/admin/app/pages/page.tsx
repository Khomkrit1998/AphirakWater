import type { Metadata } from "next"

import { getPageRows, LandingPagesView } from "@/features/landing-pages"
import { AdminTopbar } from "@/features/shell"
import { env } from "@/lib/env"

export const metadata: Metadata = { title: "Landing Pages" }

export default function Page() {
  return (
    <>
      <AdminTopbar
        title="Landing Pages"
        subtitle="จัดการหน้าบริการ พื้นที่ และบทความทั้งหมด"
      />
      <LandingPagesView rows={getPageRows(env.NEXT_PUBLIC_SITE_URL)} />
    </>
  )
}
