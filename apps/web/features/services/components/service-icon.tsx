import {
  DropletsIcon,
  HardHatIcon,
  HotelIcon,
  TreePalmIcon,
  TruckIcon,
  WavesIcon,
  type LucideIcon,
} from "lucide-react"

import type { ServiceIcon as ServiceIconName } from "@workspace/shared"

const icons: Record<ServiceIconName, LucideIcon> = {
  truck: TruckIcon,
  tap: DropletsIcon,
  pool: WavesIcon,
  hotel: HotelIcon,
  villa: TreePalmIcon,
  construction: HardHatIcon,
}

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName
  className?: string
}) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" strokeWidth={1.75} className={className} />
}
