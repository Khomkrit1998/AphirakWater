import type { Metadata } from "next"
import { Anuphan, IBM_Plex_Sans_Thai } from "next/font/google"

import "@workspace/ui/globals.css"
import { site, siteGraphLd } from "@workspace/shared"
import { JsonLd } from "@workspace/ui/components/json-ld"
import { cn } from "@workspace/ui/lib/utils"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteFooter, SiteHeader, StickyCta } from "@/features/site"
import { env } from "@/lib/env"
import { defaultTitle } from "@/lib/metadata"

const fontSans = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
})

const fontHeading = Anuphan({
  subsets: ["thai", "latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
      className={cn("antialiased font-sans", fontSans.variable, fontHeading.variable)}
    >
      <body className="overflow-x-clip">
        <JsonLd data={siteGraphLd(env.NEXT_PUBLIC_SITE_URL)} />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-60 rounded-[10px] bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            ข้ามไปยังเนื้อหา
          </a>
          <SiteHeader />
          {/* clip, not hidden: bleeding decor never causes sideways scroll, and sticky/scroll timelines keep working */}
          <main id="main" className="overflow-x-clip">{children}</main>
          <SiteFooter />
          <StickyCta />
        </ThemeProvider>
      </body>
    </html>
  )
}
