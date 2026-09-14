import type { Article } from "@workspace/shared"
import { cn } from "@workspace/ui/lib/utils"

// th-TH uses the Buddhist calendar: 2026-09-04 -> "4 กันยายน 2569".
const thaiDate = new Intl.DateTimeFormat("th-TH", {
  dateStyle: "long",
  timeZone: "Asia/Bangkok",
})

export function ArticleMeta({
  article,
  className,
}: {
  article: Article
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 text-[13.5px] text-muted-foreground",
        className
      )}
    >
      <span className="rounded-full bg-soft px-[13px] py-1.5 font-semibold text-brand-strong">
        {article.category}
      </span>
      <time dateTime={article.publishedAt}>
        {thaiDate.format(new Date(article.publishedAt))}
      </time>
      <span aria-hidden="true">·</span>
      <span>อ่าน {article.readMinutes} นาที</span>
    </div>
  )
}
