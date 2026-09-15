import Link from "next/link"

import { resolveRef, type Article, type ArticleBlock } from "@workspace/shared"
import { buttonVariants } from "@workspace/ui/components/button"
import { CheckList } from "@workspace/ui/components/check-list"
import { ImagePlaceholder } from "@workspace/ui/components/image-placeholder"
import { InfoTable } from "@workspace/ui/components/info-table"
import { cn } from "@workspace/ui/lib/utils"

import { ArticleMeta } from "./article-meta"

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mb-[18px] text-[17px] leading-[1.85] text-ink-600">
          {block.content.map((part, i) => {
            if (typeof part === "string") return part
            const link = resolveRef(part)
            return (
              <Link
                key={i}
                href={link.href}
                className="text-brand underline underline-offset-4 hover:text-brand-strong"
              >
                {link.label}
              </Link>
            )
          })}
        </p>
      )
    case "h2":
      return (
        <h2
          id={block.id}
          className="mt-[34px] mb-3.5 text-[clamp(24px,2.8vw,32px)]"
        >
          {block.text}
        </h2>
      )
    case "h3":
      return (
        <h3 id={block.id} className="mt-[26px] mb-3 text-[21px]">
          {block.text}
        </h3>
      )
    case "checklist":
      return (
        <CheckList
          items={block.items}
          className="mb-[26px] text-[16.5px] leading-[1.7]"
        />
      )
    case "table":
      return <InfoTable head={block.head} rows={block.rows} className="mb-[30px]" />
  }
}

export function ArticleView({ article }: { article: Article }) {
  const toc = article.body.filter(
    (b): b is Extract<ArticleBlock, { type: "h2" | "h3" }> =>
      b.type === "h2" || b.type === "h3"
  )

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-5 pt-12">
        <div className="max-w-[760px]">
          <ArticleMeta article={article} className="mb-[18px]" />
          <h1 className="mb-[18px] text-[clamp(30px,4vw,46px)] leading-[1.14]">
            {article.h1}
          </h1>
          <p className="text-lg leading-[1.75] text-ink-600">{article.lead}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-5 pt-[30px]">
        <div className="aspect-[21/9] overflow-hidden rounded-[24px] border">
          <ImagePlaceholder label={article.coverLabel} />
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 pt-11 pb-[84px]">
        <div className="grid items-start gap-12 min-[900px]:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0 max-w-[760px]">
            {article.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            <div className="mt-[34px] flex flex-wrap items-center justify-between gap-[18px] rounded-[20px] border border-tint-border bg-tint p-[26px]">
              <div className="min-w-[min(240px,100%)] flex-1">
                <p className="mb-1.5 font-heading text-[19px] font-bold">
                  {article.cta.title}
                </p>
                <p className="text-[15px] leading-[1.65] text-ink-600">
                  {article.cta.text}
                </p>
              </div>
              <Link
                href="/quote"
                className={cn(buttonVariants({ size: "cta-sm" }), "max-sm:w-full")}
              >
                ขอราคาน้ำ
              </Link>
            </div>
          </article>

          <aside className="grid min-w-0 gap-4 min-[900px]:sticky min-[900px]:top-(--sticky-top)">
            <nav aria-labelledby="toc" className="rounded-[20px] border bg-card p-[22px]">
              <p id="toc" className="mb-3 font-heading text-[15.5px] font-semibold">
                หัวข้อในบทความ
              </p>
              <ol className="grid gap-2.5">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="text-[14.5px] leading-[1.5] text-ink-600 hover:text-brand-strong"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            {article.related.length > 0 && (
              <nav
                aria-labelledby="related"
                className="rounded-[20px] border bg-card p-[22px]"
              >
                <p id="related" className="mb-3 font-heading text-[15.5px] font-semibold">
                  บริการที่เกี่ยวข้อง
                </p>
                <ul className="grid gap-[9px]">
                  {article.related.map((ref) => {
                    const link = resolveRef(ref)
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[14.5px] text-ink-600 hover:text-brand-strong"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </div>
    </>
  )
}
