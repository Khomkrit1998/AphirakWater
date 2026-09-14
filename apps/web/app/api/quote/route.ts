import { quoteRequestSchema, type QuoteResponse } from "@workspace/shared"

export async function POST(request: Request) {
  const parsed = quoteRequestSchema.safeParse(
    await request.json().catch(() => null)
  )
  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        message: parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง",
      } satisfies QuoteResponse,
      { status: 400 }
    )
  }

  // ponytail: no delivery channel yet (email / LINE / database undecided).
  // Answer 503 so the customer is told to call, never a fake "received".
  // Replace with the real delivery and return { ok: true, reference }.
  return Response.json(
    {
      ok: false,
      message: "ขณะนี้ระบบรับคำขอออนไลน์ยังไม่เปิดใช้งาน กรุณาโทรหาเราโดยตรง",
    } satisfies QuoteResponse,
    { status: 503 }
  )
}
