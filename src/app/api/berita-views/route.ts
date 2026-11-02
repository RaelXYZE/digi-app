import { apiUrl, beritaViewsSecret } from "@/utils/env";

/**
 * Same-origin proxy for digi-api's berita view-count endpoint.
 * Always responds 204 so the browser never sees upstream errors.
 */
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const raw = typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)["id"]
      : null;
    const id = typeof raw === "string" ? raw : null;

    if (!id || !/^[a-zA-Z0-9_-]{1,100}$/.test(id)) {
      return new Response(null, { status: 204 });
    }

    // No secret configured: counting is disabled upstream. Stay silent.
    if (!beritaViewsSecret) {
      return new Response(null, { status: 204 });
    }

    const headers: Record<string, string> = {
      "X-Internal-Key": beritaViewsSecret,
    };
    // First XFF value only; without it digi-api falls back to REMOTE_ADDR
    // (the Next.js server IP), collapsing all visitors into one bucket.
    const xff = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = xff?.split(",")[0].trim() || realIp?.trim() || null;
    if (clientIp) headers["x-forwarded-for"] = clientIp;

    await fetch(
      `${apiUrl}/api/v1/berita/${encodeURIComponent(id)}/views/`,
      {
        method: "POST",
        cache: "no-store",
        headers,
        signal: AbortSignal.timeout(3000),
      },
    );
  } catch {
    // Upstream rejection (403/404/405), timeout, or bad body: stay silent.
  }
  return new Response(null, { status: 204 });
}
