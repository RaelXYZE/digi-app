const isProduction = process.env.NODE_ENV === "production";
const allowLocalhost = process.env.ALLOW_LOCALHOST_URLS === "true";

function isLoopback(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/\.$/, "");
  return (
    h === "localhost" ||
    h.endsWith(".localhost") ||
    h === "127.0.0.1" ||
    h === "[::1]" ||
    h === "[::]" ||
    h === "0.0.0.0" ||
    /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(h)
  );
}

function resolveUrl(name: string, fallback: string, rejectLoopback: boolean): string {
  const raw = process.env[name]?.trim();
  if (!raw) {
    if (isProduction) {
      throw new Error(
        `${name} is not set. Set it as an environment variable before building or starting the production server.`,
      );
    }
    return fallback;
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    if (isProduction) {
      throw new Error(`${name} is not a valid URL.`);
    }
    console.warn(`${name} is not a valid URL, using fallback.`);
    return fallback;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    if (isProduction) {
      throw new Error(`${name} must use http or https protocol (got ${parsed.protocol}).`);
    }
    console.warn(`${name} uses unsupported protocol ${parsed.protocol}, using fallback.`);
    return fallback;
  }

  if (isProduction && rejectLoopback && !allowLocalhost && isLoopback(parsed.hostname)) {
    throw new Error(
      `${name} is set to a loopback address (${parsed.hostname}). Set the production URL, or set ALLOW_LOCALHOST_URLS=true for local production testing.`,
    );
  }

  if (isProduction && !rejectLoopback && isLoopback(parsed.hostname)) {
    console.warn(
      `${name} is set to a loopback address (${parsed.hostname}). Valid only if digi-api runs on the same host.`,
    );
  }

  return raw.replace(/\/+$/, "");
}

export const apiUrl = resolveUrl("API_URL", "http://localhost:8000", false);
export const siteUrl = resolveUrl("SITE_URL", "http://localhost:3000", true);
