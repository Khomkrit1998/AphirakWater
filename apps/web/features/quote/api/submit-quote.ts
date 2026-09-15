import { quoteResponseSchema, type QuoteSubmission } from "@workspace/shared"

const fallback = "ส่งคำขอไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือโทรหาเราโดยตรง"

export async function submitQuote(values: QuoteSubmission) {
  const res = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  }).catch(() => null)
  if (!res) throw new Error(fallback)

  const parsed = quoteResponseSchema.safeParse(await res.json().catch(() => null))
  if (!parsed.success) throw new Error(fallback)
  if (!parsed.data.ok) throw new Error(parsed.data.message)
  return parsed.data
}
