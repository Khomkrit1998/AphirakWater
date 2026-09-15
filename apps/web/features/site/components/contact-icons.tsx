import {
  siFacebook,
  siLine,
  siTiktok,
  siWhatsapp,
  siYoutube,
  type SimpleIcon,
} from "simple-icons"

import { site } from "@workspace/shared"
import { cn } from "@workspace/ui/lib/utils"

// Server component: the icon path data never ships to the client bundle.
const channels = [
  { label: "LINE", href: site.lineHref, icon: siLine },
  { label: "WhatsApp", href: site.whatsappHref, icon: siWhatsapp },
  { label: "Facebook", href: site.social.facebook, icon: siFacebook },
  { label: "YouTube", href: site.social.youtube, icon: siYoutube },
  { label: "TikTok", href: site.social.tiktok, icon: siTiktok },
]

export function BrandIcon({
  icon,
  className,
}: {
  icon: SimpleIcon
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("size-5", className)}
    >
      <path d={icon.path} />
    </svg>
  )
}

export function ContactIcons({
  className,
  linkClassName,
}: {
  className?: string
  linkClassName?: string
}) {
  return (
    <ul
      aria-label="ช่องทางติดต่อ"
      className={cn("flex flex-wrap items-center gap-1", className)}
    >
      {channels.map((c) => (
        <li key={c.label}>
          <a
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.label}
            title={c.label}
            className={cn(
              "flex size-9 items-center justify-center rounded-[10px] transition-colors",
              linkClassName
            )}
          >
            <BrandIcon icon={c.icon} className="size-4.5" />
          </a>
        </li>
      ))}
    </ul>
  )
}
