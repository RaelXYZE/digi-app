import type { Service } from "@/types";

const PLACEHOLDER_PREFIX = "[ISI";

/** True when a service still carries [ISI: ...] placeholder content. */
export function isPlaceholderService(service: Service): boolean {
  return (
    service.longDescription?.startsWith(PLACEHOLDER_PREFIX) === true ||
    service.requirements?.some((r) => r.startsWith(PLACEHOLDER_PREFIX)) === true ||
    service.steps?.some((s) => s.startsWith(PLACEHOLDER_PREFIX)) === true
  );
}
