// Runnable checks for the non-trivial shared logic: `pnpm --filter @workspace/shared test`
import assert from "node:assert/strict"

import { resolveRef } from "@workspace/shared/links"
import {
  quoteDefaultsSchema,
  quoteHref,
  QUOTE_MIN_FILL_MS,
  quoteRequestSchema,
  quoteSubmissionSchema,
  spamReason,
  todayInBangkok,
} from "@workspace/shared/quote"
import { services } from "@workspace/shared/service"
import { countWords, listPageDocs, seoChecks, seoScore } from "@workspace/shared/seo"

const valid = {
  name: "ทดสอบ",
  phone: "081-234-5678",
  lineId: "",
  serviceType: "hotel",
  volume: "10000",
  date: "",
  location: "ป่าตอง",
  details: "",
}
const parse = (patch: Partial<typeof valid>) =>
  quoteRequestSchema.safeParse({ ...valid, ...patch }).success

assert.ok(parse({}))
assert.ok(parse({ phone: "08 1234 5678" }), "spaces allowed in phone")
assert.ok(parse({ phone: "076123456" }), "9-digit landline")
assert.ok(!parse({ phone: "12345" }), "too short")
assert.ok(!parse({ phone: "08a-234-5678" }), "letters")
assert.ok(!parse({ serviceType: "" }), "service required")
assert.ok(!parse({ volume: "999" }), "unknown volume")
assert.ok(!parse({ date: "2020-01-01" }), "past date")
assert.ok(parse({ date: todayInBangkok() }), "today is allowed")
assert.equal(todayInBangkok(new Date("2026-09-13T18:00:00Z")), "2026-09-14", "Bangkok is UTC+7")

const human = quoteSubmissionSchema.parse({ ...valid, website: "", elapsedMs: QUOTE_MIN_FILL_MS })
assert.equal(spamReason(human), null, "person who took long enough")
assert.equal(spamReason({ ...human, website: "https://spam.example" }), "honeypot")
assert.equal(spamReason({ ...human, website: "   " }), null, "whitespace is not a filled honeypot")
assert.equal(spamReason({ ...human, elapsedMs: QUOTE_MIN_FILL_MS - 1 }), "too-fast")
assert.ok(!quoteSubmissionSchema.safeParse(valid).success, "direct post without spam fields is rejected")

assert.deepEqual(quoteDefaultsSchema.parse({ service: "hotel", volume: "10000" }), { service: "hotel", volume: "10000" })
assert.deepEqual(quoteDefaultsSchema.parse({ service: "spa", volume: ["1", "2"] }), { service: undefined, volume: undefined }, "bad params ignored")
assert.equal(quoteHref({ service: "pool", volume: "20000" }), "/quote?service=pool&volume=20000")
assert.equal(quoteHref({}), "/quote")
for (const s of services) assert.ok(s.volumes.length > 0, `${s.slug} has truck sizes`)

assert.equal(resolveRef({ label: "x", kind: "service", slug: "hotel-water" }).href, "/services/hotel-water")
assert.equal(resolveRef({ label: "x", kind: "service", slug: "pool-water" }).href, "/quote")
assert.equal(resolveRef({ label: "x", href: "/blog" }).href, "/blog")

assert.equal(countWords("บริการส่งน้ำภูเก็ต"), 4)
const docs = listPageDocs()
assert.ok(docs.length >= 3)
for (const doc of docs) {
  const checks = seoChecks(doc, "https://example.com")
  assert.equal(checks.length, 9)
  assert.equal(seoScore(checks), Math.round((checks.filter((c) => c.ok).length / 9) * 100))
}

console.log("shared self-check passed")
