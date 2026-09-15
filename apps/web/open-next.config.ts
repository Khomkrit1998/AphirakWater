import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

// Every content page is prerendered at build time and nothing revalidates, so
// the build output is the whole cache: no R2 bucket needed. Cache interception
// answers those pages without booting Next, which keeps CPU per request low
// (Workers Free allows 10 ms).
// ponytail: read-only cache, switch to the R2 cache once a CMS publishes
// without a rebuild (revalidate / ISR).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
})
