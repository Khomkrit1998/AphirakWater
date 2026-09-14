import { AdminBrand, PreviewModeNote } from "./admin-brand"
import { SidebarNav } from "./sidebar-nav"

export function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-svh overflow-y-auto border-r bg-card px-3.5 pt-[18px] pb-8 md:block">
      <AdminBrand />
      <SidebarNav />
      <PreviewModeNote />
    </aside>
  )
}
