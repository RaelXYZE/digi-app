const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

/** "2026-09-21" -> "21 September 2026". No Intl to keep SSR and client identical. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day || month < 1 || month > 12) return iso;
  const monthName = MONTHS[month - 1];
  return monthName ? `${day} ${monthName} ${year}` : iso;
}
