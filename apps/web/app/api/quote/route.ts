import {
  quoteSubmissionSchema,
  spamReason,
  type QuoteResponse,
} from "@workspace/shared"

import { sendQuoteEmail } from "@/features/quote"
import { getQuoteEmailEnv } from "@/lib/env"

const callUs = (message: string, status: number) =>
  Response.json({ ok: false, message } satisfies QuoteResponse, { status })

export async function POST(request: Request) {
  const parsed = quoteSubmissionSchema.safeParse(
    await request.json().catch(() => null)
  )
  if (!parsed.success) {
    return callUs(parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง", 400)
  }

  // Refuse openly, never with a fake success: a real customer caught by
  // mistake must know the request did not arrive.
  const spam = spamReason(parsed.data)
  if (spam) {
    console.warn(`quote rejected as spam: ${spam}`)
    return callUs(
      spam === "too-fast"
        ? "กรุณารอสักครู่แล้วกดส่งอีกครั้ง หรือโทรหาเราโดยตรง"
        : "ส่งคำขอไม่สำเร็จ กรุณาโทรหาเราโดยตรง",
      400
    )
  }

  // Never answer "received" unless the email really went out.
  const config = getQuoteEmailEnv()
  if (!config.success) {
    console.error("quote email is not configured:", config.error.issues)
    return callUs(
      "ขณะนี้ระบบรับคำขอออนไลน์ยังไม่เปิดใช้งาน กรุณาโทรหาเราโดยตรง",
      503
    )
  }

  try {
    const reference = await sendQuoteEmail(parsed.data, {
      apiKey: config.data.RESEND_API_KEY,
      from: config.data.QUOTE_EMAIL_FROM,
      to: config.data.QUOTE_EMAIL_TO,
    })
    return Response.json({ ok: true, reference } satisfies QuoteResponse)
  } catch (error) {
    console.error("quote email failed:", error)
    return callUs("ส่งคำขอไม่สำเร็จ กรุณาโทรหาเราโดยตรง", 502)
  }
}
