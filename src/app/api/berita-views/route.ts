import { apiUrl } from "@/utils/env";

/**
 * Same-origin proxy for the (planned) digi-api view-count endpoint.
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

    const headers: Record<string, string> = {};
    const clientIp = request.headers.get("x-forwarded-for");
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
    // Upstream 404/405 (endpoint not shipped yet), timeout, or bad body: stay silent.
  }
  return new Response(null, { status: 204 });
}
