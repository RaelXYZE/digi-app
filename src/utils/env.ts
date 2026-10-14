const isProduction = process.env.NODE_ENV === "production";
const allowLocalhost = process.env.ALLOW_LOCALHOST_URLS === "true";

function resolveUrl(name: string, fallback: string): string {
  const raw = process.env[name];
  if (!raw) {
    if (isProduction) {
      throw new Error(
        `${name} is not set. Set it as an environment variable before building or starting the production server.`,
      );
    }
    return fallback;
  }
  const normalized = raw.replace(/\/+$/, "");
  if (isProduction && !allowLocalhost && normalized.startsWith("http://localhost")) {
    throw new Error(
      `${name} is set to a localhost URL. Set the production URL, or set ALLOW_LOCALHOST_URLS=true for local production testing.`,
    );
  }
  return normalized;
}

export const apiUrl = resolveUrl("API_URL", "http://localhost:8000");
export const siteUrl = resolveUrl("SITE_URL", "http://localhost:3000");
