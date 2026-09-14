import { cn } from "@workspace/ui/lib/utils"

// Google truncates around these lengths; cut the same way so the preview is honest.
const TITLE_MAX = 60
const DESCRIPTION_MAX = 155

const clip = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text

function SerpPreview({
  url,
  title,
  description,
  className,
}: {
  url: string
  title: string
  description: string
  className?: string
}) {
  const { host, pathname } = new URL(url)
  const crumbs = [host, ...pathname.split("/").filter(Boolean)].join(" › ")
  return (
    <div className={cn("min-w-0", className)}>
      <p className="mb-1 text-[13px] text-muted-foreground [overflow-wrap:anywhere]">
        {crumbs}
      </p>
      <p className="mb-[5px] text-lg leading-[1.3] text-serp-title">
        {clip(title, TITLE_MAX)}
      </p>
      <p className="text-[13.5px] leading-[1.6] text-serp-desc">
        {clip(description, DESCRIPTION_MAX)}
      </p>
    </div>
  )
}

export { SerpPreview }
