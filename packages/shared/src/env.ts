import { z } from "zod"

// Public env shared by both apps. Each app parses process.env with this schema.
export const publicEnvSchema = z.object({
  // The default is the real domain (confirmed by the Developer, 2026-09-16).
  // Set NEXT_PUBLIC_SITE_URL only to override it, e.g. for a staging URL.
  NEXT_PUBLIC_SITE_URL: z
    .url()
    .default("https://aphirakwater.com")
    .transform((url) => url.replace(/\/+$/, "")),
})
