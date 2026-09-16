import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

// Every content page is prerendered at build time and nothing revalidates, so
// the build output is the whole cache: no R2 bucket needed.
//
// Cache interception stays OFF. Next 16's router prefetches one segment at a
// time (`Next-Router-Segment-Prefetch: /_tree`), but OpenNext 1.20's
// interceptor skips segment responses whenever `experimental.prefetchInlining`
// is set, and Next 16.3 sets it by default. It then answers the segment request
// with the whole page payload, 200 and no `x-nextjs-postponed`, the router
// finds no tree in it and asks again at once: ~65 requests a second, forever,
// per open tab. The Next server answers those requests correctly.
// ponytail: switch to the R2 cache once a CMS publishes without a rebuild (ISR).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
})
