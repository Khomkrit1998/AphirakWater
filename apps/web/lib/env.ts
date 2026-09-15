import { z } from "zod"

import { publicEnvSchema } from "@workspace/shared"

export const env = publicEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
})

// Server-only. Read per request, not at import, so the site still builds and
// serves pages before email is set up; the quote route then answers 503.
const quoteEmailEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  // Comma-separated, e.g. "owner@example.com, office@example.com".
  QUOTE_EMAIL_TO: z
    .string()
    .transform((v) => v.split(",").map((s) => s.trim()).filter(Boolean))
    .pipe(z.array(z.email()).min(1)),
  // Until a domain is verified in Resend, only onboarding@resend.dev works,
  // and it only delivers to the Resend account's own address.
  QUOTE_EMAIL_FROM: z.string().min(1).default("Apirak Water <onboarding@resend.dev>"),
})

export function getQuoteEmailEnv() {
  return quoteEmailEnvSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    QUOTE_EMAIL_TO: process.env.QUOTE_EMAIL_TO,
    QUOTE_EMAIL_FROM: process.env.QUOTE_EMAIL_FROM || undefined,
  })
}
