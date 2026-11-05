import { formatDate } from "@/utils/format-date";

/**
 * Relative publish labels, computed once at render time (no ticking).
 *
 * Rules (day boundaries use the Asia/Jayapura calendar):
 * | input                         | condition                          | label                       |
 * |-------------------------------|------------------------------------|-----------------------------|
 * | date-only "YYYY-MM-DD"        | same calendar day                  | "Hari ini"                  |
 * | date-only "YYYY-MM-DD"        | previous calendar day              | "Kemarin"                   |
 * | date-only "YYYY-MM-DD"        | older / future                     | formatDate(input)           |
 * | ISO datetime (offset or Z)    | diff < 1 minute                    | "Baru saja"                 |
 * | ISO datetime                  | 1-59 minutes                       | "N menit yang lalu"         |
 * | ISO datetime                  | >= 1 hour, same calendar day       | "N jam yang lalu"           |
 * | ISO datetime                  | previous calendar day (>= 1 hour)  | "Kemarin"                   |
 * | ISO datetime                  | 2+ days                            | formatDate(Jayapura date)   |
 * | ISO datetime                  | future <= 5 minutes (clock skew)   | "Baru saja"                 |
 * | ISO datetime                  | future > 5 minutes                 | formatDate(Jayapura date)   |
 * | invalid                       | any                                | original input (never throw)|
 *
 * Datetimes without an offset/`Z` are interpreted as Asia/Jayapura (+09:00).
 */

const TIME_ZONE = "Asia/Jayapura";
const FUTURE_SKEW_MS = 5 * 60 * 1000;

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const HAS_TIME = /[T ]\d{2}:\d{2}/;
const HAS_OFFSET = /(?:Z|[+-]\d{2}:?\d{2})$/i;

const partsFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

type CivilDate = { year: number; month: number; day: number };

/** Calendar date of an instant in Asia/Jayapura. */
function civilDate(date: Date): CivilDate | null {
  const parts: Record<string, string> = {};
  for (const part of partsFormatter.formatToParts(date)) {
    if (part.type !== "literal") parts[part.type] = part.value;
  }
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  if (!year || !month || !day) return null;
  return { year, month, day };
}

/** Days since 1970-01-01 for civil date parts (no millisecond division). */
function daysFromCivil({ year, month, day }: CivilDate): number {
  const y = month <= 2 ? year - 1 : year;
  const era = Math.floor(y / 400);
  const yearOfEra = y - era * 400;
  const dayOfYear = Math.floor((153 * (month + (month > 2 ? -3 : 9)) + 2) / 5) + day - 1;
  const dayOfEra =
    yearOfEra * 365 +
    Math.floor(yearOfEra / 4) -
    Math.floor(yearOfEra / 100) +
    dayOfYear;
  return era * 146097 + dayOfEra;
}

function parseDateOnly(input: string): CivilDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const probe = new Date(Date.UTC(year, month - 1, day));
  if (
    probe.getUTCFullYear() !== year ||
    probe.getUTCMonth() !== month - 1 ||
    probe.getUTCDate() !== day
  ) {
    return null;
  }
  return { year, month, day };
}

/**
 * Labels an article date relative to `now` (injectable for deterministic
 * renders/tests). Returns the original string when the input is invalid.
 */
export function formatRelativeDate(input: string, now: Date = new Date()): string {
  if (typeof input !== "string" || input.trim() === "") return input;
  const value = input.trim();

  if (DATE_ONLY.test(value)) {
    const inputDate = parseDateOnly(value);
    const today = civilDate(now);
    if (!inputDate || !today) return input;
    const diff = daysFromCivil(today) - daysFromCivil(inputDate);
    if (diff === 0) return "Hari ini";
    if (diff === 1) return "Kemarin";
    return formatDate(value);
  }

  let normalized = value;
  if (HAS_TIME.test(normalized) && !HAS_OFFSET.test(normalized)) {
    normalized = `${normalized.replace(" ", "T")}+09:00`;
  }
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return input;

  const delta = now.getTime() - date.getTime();
  if (delta < 0) {
    return delta > -FUTURE_SKEW_MS ? "Baru saja" : formatDate(toIso(civilDate(date)));
  }
  if (delta < 60_000) return "Baru saja";
  if (delta < 3_600_000) return `${Math.floor(delta / 60_000)} menit yang lalu`;

  const today = civilDate(now);
  const then = civilDate(date);
  if (!today || !then) return input;
  const dayDiff = daysFromCivil(today) - daysFromCivil(then);
  if (dayDiff === 0) return `${Math.floor(delta / 3_600_000)} jam yang lalu`;
  if (dayDiff === 1) return "Kemarin";
  return formatDate(toIso(then));
}

function toIso(date: CivilDate | null): string {
  if (!date) return "";
  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  return `${date.year}-${month}-${day}`;
}
