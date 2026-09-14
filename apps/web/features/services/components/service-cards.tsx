import Link from "next/link"

import { resolveRef, services } from "@workspace/shared"

import { ServiceIcon } from "./service-icon"

// Card grid of all services (area pages). The home page uses ServiceExplorer.
export function ServiceCards({ titleSuffix = "" }: { titleSuffix?: string }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-[18px]">
      {services.map((service) => (
        <li key={service.slug} className="motion-rise">
          <Link
            href={resolveRef({ label: service.title, kind: "service", slug: service.slug }).href}
            className="block h-full rounded-[18px] border bg-card p-[22px] transition-colors hover:border-primary"
          >
            <ServiceIcon name={service.icon} className="mb-3 size-[22px] text-brand" />
            <h3 className="mb-1.5 text-lg text-foreground">
              {service.title}
              {titleSuffix}
            </h3>
            <p className="text-[14.5px] leading-[1.6] text-muted-foreground">
              {service.shortDescription}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
