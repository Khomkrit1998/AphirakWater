import Image from "next/image"
import Link from "next/link"

import { site } from "@workspace/shared"
import { cn } from "@workspace/ui/lib/utils"

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex shrink-0 items-center gap-2.5", className)}
    >
      <Image
        src="/logo.png"
        alt={site.legalName}
        width={44}
        height={44}
        loading="eager"
        className="size-10 object-contain sm:size-11"
      />
      <span className="flex min-w-0 flex-col leading-[1.15]">
        <span className="font-heading text-[15px] font-bold text-foreground sm:text-[17px]">
          {site.name}
        </span>
        <span className="text-[10.5px] tracking-[0.04em] text-muted-foreground sm:text-[11.5px]">
          {site.tagline}
        </span>
      </span>
    </Link>
  )
}
