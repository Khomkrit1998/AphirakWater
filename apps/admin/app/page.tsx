import { DashboardView } from "@/features/dashboard"
import { AdminTopbar } from "@/features/shell"
import { env } from "@/lib/env"

export default function Page() {
  return (
    <>
      <AdminTopbar title="Dashboard" subtitle="ภาพรวมเว็บไซต์และงานที่ต้องทำ" />
      <DashboardView siteUrl={env.NEXT_PUBLIC_SITE_URL} />
    </>
  )
}
