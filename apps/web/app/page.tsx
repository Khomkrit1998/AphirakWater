import { faqPageLd, home, site } from "@workspace/shared"
import { JsonLd } from "@workspace/ui/components/json-ld"

import { HomePage } from "@/features/home"
import { ServiceExplorer } from "@/features/services"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata({ description: site.description, path: "/" })

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageLd(home.faq.items)} />
      <HomePage services={<ServiceExplorer />} />
    </>
  )
}
