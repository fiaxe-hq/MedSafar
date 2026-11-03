import { env } from "./cloudflare";

/**
 * Cloudflare Turnstile: tells a person from a bot without a puzzle. The form
 * carries a token from the widget (components/form/Turnstile.tsx), checked
 * here once per enquiry.
 *
 * Locally Cloudflare's test keys are used, which always pass. On the Worker
 * the check is on once TURNSTILE_SECRET_KEY is set; until then it is skipped,
 * so enquiries keep coming in.
 */

/** Cloudflare's always-pass test secret, for local work. */
const TEST_SECRET = "1x0000000000000000000000000000000AA";

function secret(): string | null {
  if (process.env.NODE_ENV !== "production") return TEST_SECRET;
  return (env().TURNSTILE_SECRET_KEY ?? "").trim() || null;
}

/** True if the form's token is a fresh one from a person (or the check is off). */
export async function passedTurnstile(formData: FormData, ip: string | null): Promise<boolean> {
  const key = secret();
  if (!key) return true;
  const token = formData.get("cf-turnstile-response");
  if (typeof token !== "string" || !token || token.length > 2048) return false;

  const body = new FormData();
  body.append("secret", key);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const outcome = (await res.json()) as { success?: boolean };
    return outcome.success === true;
  } catch (error) {
    // Cloudflare unreachable: let the enquiry through rather than lose it.
    console.error("[turnstile] check failed", error instanceof Error ? error.message : String(error));
    return true;
  }
}
