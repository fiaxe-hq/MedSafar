import { getCloudflareContext } from "@opennextjs/cloudflare";

/** The Worker's bindings and secrets (D1, R2, ADMIN_PASSWORD). */
export function env() {
  return getCloudflareContext().env;
}
