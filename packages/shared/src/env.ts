import { z } from "zod"

// Public env shared by both apps. Each app parses process.env with this schema.
export const publicEnvSchema = z.object({
  // Unconfirmed: the default is the example domain from the design prototype.
  // Set NEXT_PUBLIC_SITE_URL to the real domain before going live.
  NEXT_PUBLIC_SITE_URL: z
    .url()
    .default("https://apirakwater.co.th")
    .transform((url) => url.replace(/\/+$/, "")),
})
