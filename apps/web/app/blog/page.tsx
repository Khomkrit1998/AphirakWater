import { BlogIndex } from "@/features/blog"
import { Breadcrumbs } from "@/features/site"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({
  title: "บทความ",
  description:
    "บทความความรู้เรื่องน้ำ การสำรองน้ำ และการใช้บริการรถส่งน้ำในภูเก็ตและพังงา",
  path: "/blog",
})

export default function Page() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "หน้าหลัก", href: "/" }]}
        current={{ label: "บทความ", href: "/blog" }}
      />
      <BlogIndex />
    </>
  )
}
