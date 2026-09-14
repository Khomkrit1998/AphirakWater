import Link from "next/link"

import { articles } from "@workspace/shared"

import { ArticleMeta } from "./article-meta"

// No design for /blog yet; follows the handoff note to reuse the service card grid.
export function BlogIndex() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pt-[52px] pb-[90px]">
      <h1 className="mb-9 text-[clamp(30px,4vw,46px)] leading-[1.12]">บทความ</h1>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/blog/${article.slug}`}
              className="block h-full rounded-[20px] border bg-card p-[26px] transition-[transform,box-shadow,border-color] duration-200 hover:border-soft-border hover:shadow-card-hover motion-safe:hover:-translate-y-1"
            >
              <ArticleMeta article={article} className="mb-4" />
              <h2 className="mb-2 text-xl text-foreground">{article.h1}</h2>
              <p className="mb-[18px] text-[15px] leading-[1.6] text-muted-foreground">
                {article.lead}
              </p>
              <span className="text-[14.5px] font-semibold text-brand">
                อ่านบทความ →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
