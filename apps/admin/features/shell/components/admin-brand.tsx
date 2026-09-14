import Image from "next/image"

import { site } from "@workspace/shared"

export function AdminBrand() {
  return (
    <div className="flex items-center gap-2.5 px-2 pt-1.5 pb-5">
      <Image
        src="/logo.jpg"
        alt={`โลโก้${site.name}`}
        width={36}
        height={36}
        className="size-9 rounded-[10px] object-cover"
      />
      <span className="flex flex-col leading-[1.2]">
        <span className="font-heading text-[15px] font-bold">{site.name}</span>
        <span className="text-[11.5px] text-muted-foreground">ระบบจัดการเว็บไซต์</span>
      </span>
    </div>
  )
}

export function PreviewModeNote() {
  return (
    <p className="mt-6 rounded-[12px] border border-warn-text/20 bg-warn-soft px-3 py-2.5 text-[12.5px] leading-[1.6] text-warn-text">
      โหมดตัวอย่าง: อ่านเนื้อหาจากโค้ด ยังบันทึกไม่ได้ และยังไม่มีระบบ login
      ห้ามเปิดใช้งานบนอินเทอร์เน็ต
    </p>
  )
}
