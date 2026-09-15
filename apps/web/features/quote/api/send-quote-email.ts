import {
  serviceTypeOptions,
  todayInBangkok,
  volumeOptions,
  type QuoteRequest,
} from "@workspace/shared"

import { env } from "@/lib/env"

type EmailConfig = { apiKey: string; from: string; to: string[] }

// Server-only: sends one quote request to the business inbox through the
// Resend REST API. Throws when Resend does not accept the email.
export async function sendQuoteEmail(quote: QuoteRequest, config: EmailConfig) {
  // ponytail: no database, so the reference only pairs the customer's screen
  // with the email subject; 4 hex chars per day is plenty at this volume.
  const reference = `AW-${todayInBangkok().slice(2).replaceAll("-", "")}-${crypto
    .randomUUID()
    .slice(0, 4)
    .toUpperCase()}`
  const service = labelOf(serviceTypeOptions, quote.serviceType)

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: config.to,
      subject: `ขอใบเสนอราคา ${reference} · ${quote.name.replace(/\s+/g, " ")} · ${service}`,
      text: [
        `คำขอใบเสนอราคาใหม่ ${reference}`,
        "",
        `ชื่อผู้ติดต่อ: ${quote.name}`,
        `เบอร์โทรศัพท์: ${quote.phone}`,
        `LINE ID: ${quote.lineId || "-"}`,
        `ประเภทบริการ: ${service}`,
        `ปริมาณน้ำต่อเที่ยว: ${labelOf(volumeOptions, quote.volume)}`,
        `วันที่ต้องการใช้น้ำ: ${quote.date ? thaiDate(`${quote.date}T00:00:00+07:00`, { dateStyle: "long" }) : "ไม่ระบุ"}`,
        `พื้นที่หน้างาน: ${quote.location}`,
        "",
        "รายละเอียดเพิ่มเติม:",
        quote.details || "-",
        "",
        `ส่งจาก ${env.NEXT_PUBLIC_SITE_URL}/quote เมื่อ ${thaiDate(new Date(), { dateStyle: "long", timeStyle: "short" })} น.`,
      ].join("\n"),
    }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) {
    // Resend's error body names the problem (bad key, unverified sender) and
    // carries no customer data.
    throw new Error(`Resend ${res.status}: ${await res.text().catch(() => "")}`)
  }
  return reference
}

function labelOf(options: readonly { value: string; label: string }[], value: string) {
  return options.find((o) => o.value === value)?.label ?? value
}

function thaiDate(date: string | Date, style: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("th-TH", { ...style, timeZone: "Asia/Bangkok" }).format(
    new Date(date)
  )
}
