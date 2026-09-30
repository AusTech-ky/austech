/**
 * Server-side guards for the contact form: a per-IP rate limit and
 * Cloudflare Turnstile verification. Both exist because every accepted
 * submission sends an email to an address the visitor typed in.
 */

const WINDOW_MS = 15 * 60_000;
const PER_IP = 5;
const hits = new Map<string, number[]>();

/**
 * In-memory limit: at most PER_IP submissions per IP per 15 minutes.
 * Per server instance, which is enough for one small site; Turnstile is the
 * main defence.
 */
export function allowSubmission(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= PER_IP) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound.
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return true;
}

/** The visitor's IP from the proxy headers the host or Cloudflare set. */
export function clientIp(h: Headers): string {
  return (
    h.get("cf-connecting-ip") ??
    h.get("x-real-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/**
 * Verifies a Turnstile token with Cloudflare. Passes when TURNSTILE_SECRET_KEY
 * isn't set, so development and preview builds work without keys.
 */
export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, ...(ip !== "unknown" ? { remoteip: ip } : {}) }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] verification failed", err);
    return false;
  }
}
