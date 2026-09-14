import type { Metadata } from "next"
import { Anuphan, IBM_Plex_Sans_Thai } from "next/font/google"

import "@workspace/ui/globals.css"
import { site } from "@workspace/shared"
import { cn } from "@workspace/ui/lib/utils"

import { ThemeProvider } from "@/components/theme-provider"
import { AdminSidebar } from "@/features/shell"

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
  title: { default: `หลังบ้าน | ${site.name}`, template: `%s | หลังบ้าน ${site.name}` },
  robots: { index: false, follow: false },
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
      <body className="bg-canvas">
        <ThemeProvider>
          <div className="min-h-svh md:grid md:grid-cols-[250px_minmax(0,1fr)]">
            <AdminSidebar />
            <div className="min-w-0 pb-16">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
