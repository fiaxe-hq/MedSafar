import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

// Pages are drawn on their first visit, with the changes made in /admin, and
// kept in KV (NEXT_INC_CACHE_KV). Saving in /admin marks them stale through
// the tag cache in D1 (NEXT_TAG_CACHE_D1), so the next visit draws them again.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  tagCache: d1NextTagCache,
  queue: memoryQueue,
  enableCacheInterception: true,
});
